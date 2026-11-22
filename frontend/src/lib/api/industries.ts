import { graphqlRequest } from "@/lib/api/client"
import type { CompanyRaw, IndustryRaw, SalaryAggregateRaw } from "@/lib/api/types"
import { calculateTakeHome, representativeAgeForBand } from "@/lib/takehome/calculate"

async function fetchIndustries(): Promise<IndustryRaw[]> {
  const data = await graphqlRequest<{ industries: IndustryRaw[] }>(`{ industries { id name slug } }`)
  return data.industries
}

async function fetchCompanies(): Promise<CompanyRaw[]> {
  const data = await graphqlRequest<{ companies: CompanyRaw[] }>(
    `{ companies { id name slug employeeBand officialAvgSalaryYen industryId industryName industrySlug } }`
  )
  return data.companies
}

async function fetchAggregates(): Promise<SalaryAggregateRaw[]> {
  const data = await graphqlRequest<{ salaryAggregates: SalaryAggregateRaw[] }>(
    `{ salaryAggregates { id companyId position ageBand avgAnnualSalaryYen sampleSize } }`
  )
  return data.salaryAggregates
}

export async function listIndustries() {
  const industries = await fetchIndustries()
  return [...industries].sort((a, b) => a.name.localeCompare(b.name, "ja"))
}

export async function listIndustriesWithCompanyCount() {
  const [industries, companies] = await Promise.all([fetchIndustries(), fetchCompanies()])

  return [...industries]
    .sort((a, b) => a.name.localeCompare(b.name, "ja"))
    .map((industry) => ({
      id: industry.id,
      name: industry.name,
      slug: industry.slug,
      companyCount: companies.filter((c) => c.industryId === industry.id).length,
    }))
}

export async function getIndustryBySlug(slug: string) {
  const industries = await fetchIndustries()
  return industries.find((i) => i.slug === slug) ?? null
}

export async function listCompaniesByIndustry(industryId: string) {
  const [companies, aggregates] = await Promise.all([fetchCompanies(), fetchAggregates()])

  return companies
    .filter((c) => c.industryId === industryId)
    .sort((a, b) => (b.officialAvgSalaryYen ?? 0) - (a.officialAvgSalaryYen ?? 0))
    .map((c) => {
      const overall = aggregates.find((a) => a.companyId === c.id && a.position === null && a.ageBand === null)
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        employeeBand: c.employeeBand,
        officialAvgSalaryYen: c.officialAvgSalaryYen,
        avgAnnualTakeHomeYen: overall
          ? calculateTakeHome(overall.avgAnnualSalaryYen, representativeAgeForBand(null)).takeHomeAnnualYen
          : null,
      }
    })
}
