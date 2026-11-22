import { NextRequest, NextResponse } from "next/server"
import { getAgentBySlug, recordReferralClick, buildReferralUrl } from "@/lib/api/agents"
import { getCompanyBySlug } from "@/lib/api/companies"

export async function GET(request: NextRequest, { params }: { params: Promise<{ agentSlug: string }> }) {
  const { agentSlug } = await params
  const agent = await getAgentBySlug(agentSlug)

  if (!agent) {
    return NextResponse.redirect(new URL("/companies", request.url), 302)
  }

  const searchParams = request.nextUrl.searchParams
  const companySlug = searchParams.get("company") ?? undefined
  const pagePath = searchParams.get("from") ?? "/"

  const company = companySlug ? await getCompanyBySlug(companySlug) : null

  await recordReferralClick({
    agentId: agent.agentId,
    companyId: company?.id ?? null,
    pagePath,
    utmParams: companySlug ? { company: companySlug } : undefined,
  })

  const destination = buildReferralUrl(agent.referralUrlTemplate, {
    utm_source: "tedorii",
    utm_medium: "referral",
    utm_campaign: companySlug ?? "global",
  })

  return NextResponse.redirect(destination, 302)
}
