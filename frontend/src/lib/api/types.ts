export type CompanyRaw = {
  id: string
  name: string
  slug: string
  employeeBand: string
  hqPrefecture: string | null
  isListed: boolean
  establishedYear: number | null
  officialAvgSalaryYen: number | null
  logoUrl: string | null
  description: string | null
  industryId: string
  industryName: string
  industrySlug: string
}

export type IndustryRaw = {
  id: string
  name: string
  slug: string
}

export type SalaryAggregateRaw = {
  id: string
  companyId: string
  position: string | null
  ageBand: string | null
  avgAnnualSalaryYen: number
  sampleSize: number
}

export type JobAgentRaw = {
  agentId: string
  name: string
  slug: string
  logoUrl: string | null
  targetSegment: string
  referralUrlTemplate: string
  commissionType: string
}

export type AgentPlacementRaw = {
  agentId: string
  targetType: "global" | "industry" | "company" | "age_band"
  targetId: string | null
  priority: number
}
