import { apiGet } from "@/lib/api/client"
import type { CompanyRaw, IndustryRaw, JobAgentRaw } from "@/lib/api/types"

export async function getSiteStats() {
  const [companies, industries, agents] = await Promise.all([
    apiGet<CompanyRaw[]>("/api/v1/companies"),
    apiGet<IndustryRaw[]>("/api/v1/industries"),
    apiGet<JobAgentRaw[]>("/api/v1/job_agents"),
  ])

  return {
    companyCount: companies.length,
    industryCount: industries.length,
    agentCount: agents.length,
  }
}
