import { graphqlRequest } from "@/lib/api/client"
import type { CompanyRaw, IndustryRaw, JobAgentRaw } from "@/lib/api/types"

export async function getSiteStats() {
  const data = await graphqlRequest<{ companies: CompanyRaw[]; industries: IndustryRaw[]; jobAgents: JobAgentRaw[] }>(
    `{ companies { id } industries { id } jobAgents { agentId } }`
  )

  return {
    companyCount: data.companies.length,
    industryCount: data.industries.length,
    agentCount: data.jobAgents.length,
  }
}
