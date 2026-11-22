import { graphqlRequest } from "@/lib/api/client"
import type { AgentPlacementRaw, JobAgentRaw } from "@/lib/api/types"

type PlacementContext = {
  companyId?: string
  industryId?: string
  ageBand?: string
}

async function fetchAgents(): Promise<JobAgentRaw[]> {
  const data = await graphqlRequest<{ jobAgents: JobAgentRaw[] }>(
    `{ jobAgents { agentId name slug logoUrl targetSegment referralUrlTemplate commissionType } }`
  )
  return data.jobAgents
}

async function fetchPlacements(): Promise<AgentPlacementRaw[]> {
  const data = await graphqlRequest<{ agentPlacements: AgentPlacementRaw[] }>(
    `{ agentPlacements { agentId targetType targetId priority } }`
  )
  return data.agentPlacements
}

/**
 * Resolves which agents to show for a given page context, most specific first:
 * company > industry > age_band > global. Falls back to global placements only
 * when nothing more specific is active.
 */
export async function resolveAgentsForContext(ctx: PlacementContext, limit = 3) {
  const targetTypes: Array<{ type: "company" | "industry" | "age_band" | "global"; id: string | null }> = [
    ...(ctx.companyId ? [{ type: "company" as const, id: ctx.companyId }] : []),
    ...(ctx.industryId ? [{ type: "industry" as const, id: ctx.industryId }] : []),
    ...(ctx.ageBand ? [{ type: "age_band" as const, id: ctx.ageBand }] : []),
    { type: "global" as const, id: null },
  ]

  const [agents, placements] = await Promise.all([fetchAgents(), fetchPlacements()])
  const agentById = new Map(agents.map((a) => [a.agentId, a]))

  const rows = placements
    .filter((p) => targetTypes.some((t) => t.type === p.targetType))
    .map((p) => {
      const agent = agentById.get(p.agentId)
      if (!agent) return null
      return { ...agent, priority: p.priority, targetType: p.targetType }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => b.priority - a.priority)

  const rank = new Map(targetTypes.map((t, i) => [`${t.type}:${t.id ?? ""}`, i]))

  return rows
    .sort((a, b) => {
      const aKey =
        rank.get(`${a.targetType}:${ctx[a.targetType === "company" ? "companyId" : a.targetType === "industry" ? "industryId" : "ageBand"] ?? ""}`) ?? 99
      const bKey =
        rank.get(`${b.targetType}:${ctx[b.targetType === "company" ? "companyId" : b.targetType === "industry" ? "industryId" : "ageBand"] ?? ""}`) ?? 99
      return aKey - bKey || b.priority - a.priority
    })
    .slice(0, limit)
}

export async function getAgentBySlug(slug: string) {
  const agents = await fetchAgents()
  return agents.find((a) => a.slug === slug) ?? null
}

export async function recordReferralClick(input: {
  agentId: string
  companyId?: string | null
  pagePath: string
  sessionId?: string | null
  utmParams?: Record<string, string>
}) {
  await graphqlRequest(
    `mutation($agentId: ID!, $companyId: ID, $pagePath: String!, $sessionId: String, $utmParams: JSON) {
      createReferralClick(input: {
        agentId: $agentId
        companyId: $companyId
        pagePath: $pagePath
        sessionId: $sessionId
        utmParams: $utmParams
      }) {
        success
      }
    }`,
    {
      agentId: input.agentId,
      companyId: input.companyId ?? null,
      pagePath: input.pagePath,
      sessionId: input.sessionId ?? null,
      utmParams: input.utmParams ?? null,
    }
  )
}

export function buildReferralUrl(referralUrlTemplate: string, utm: Record<string, string>) {
  const url = new URL(referralUrlTemplate)
  for (const [key, value] of Object.entries(utm)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}
