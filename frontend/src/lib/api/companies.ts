import { apiGet } from "@/lib/api/client"
import type { CompanyRaw, SalaryAggregateRaw } from "@/lib/api/types"
import { calculateTakeHome, representativeAgeForBand } from "@/lib/takehome/calculate"

function takeHomeFor(avgAnnualSalaryYen: number, ageBand: string | null) {
  return calculateTakeHome(avgAnnualSalaryYen, representativeAgeForBand(ageBand)).takeHomeAnnualYen
}

async function fetchCompanies(): Promise<CompanyRaw[]> {
  return apiGet<CompanyRaw[]>("/api/v1/companies")
}

async function fetchAggregates(): Promise<SalaryAggregateRaw[]> {
  return apiGet<SalaryAggregateRaw[]>("/api/v1/salary_aggregates")
}

function overallAggregateFor(aggregates: SalaryAggregateRaw[], companyId: string) {
  return aggregates.find((a) => a.companyId === companyId && a.position === null && a.ageBand === null) ?? null
}

export async function listCompanies(opts?: { search?: string; industrySlug?: string }) {
  const [companies, aggregates] = await Promise.all([fetchCompanies(), fetchAggregates()])

  return companies
    .filter((c) => (opts?.search ? c.name.toLowerCase().includes(opts.search.toLowerCase()) : true))
    .filter((c) => (opts?.industrySlug ? c.industrySlug === opts.industrySlug : true))
    .sort((a, b) => (b.officialAvgSalaryYen ?? 0) - (a.officialAvgSalaryYen ?? 0))
    .map((c) => {
      const overall = overallAggregateFor(aggregates, c.id)
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        employeeBand: c.employeeBand,
        hqPrefecture: c.hqPrefecture,
        officialAvgSalaryYen: c.officialAvgSalaryYen,
        industryName: c.industryName,
        industrySlug: c.industrySlug,
        avgAnnualTakeHomeYen: overall ? takeHomeFor(overall.avgAnnualSalaryYen, null) : null,
      }
    })
}

export async function getCompanyBySlug(slug: string): Promise<CompanyRaw | null> {
  const companies = await fetchCompanies()
  return companies.find((c) => c.slug === slug) ?? null
}

export async function getTakeHomeAggregatesForCompany(companyId: string) {
  const aggregates = await fetchAggregates()

  return aggregates
    .filter((a) => a.companyId === companyId)
    .map((a) => ({
      id: a.id,
      companyId: a.companyId,
      position: a.position,
      ageBand: a.ageBand,
      avgAnnualSalaryYen: a.avgAnnualSalaryYen,
      avgAnnualTakeHomeYen: takeHomeFor(a.avgAnnualSalaryYen, a.ageBand),
      avgMonthlyTakeHomeYen: Math.round(takeHomeFor(a.avgAnnualSalaryYen, a.ageBand) / 12),
      sampleSize: a.sampleSize,
    }))
    .sort((a, b) => (a.ageBand ?? "").localeCompare(b.ageBand ?? ""))
}

export async function getCompanyOverallAggregate(companyId: string) {
  const rows = await getTakeHomeAggregatesForCompany(companyId)
  return rows.find((r) => r.position === null && r.ageBand === null) ?? null
}

export async function getTakeHomeRanking(limit = 20, industrySlug?: string) {
  const [companies, aggregates] = await Promise.all([fetchCompanies(), fetchAggregates()])

  return aggregates
    .filter((a) => a.position === null && a.ageBand === null)
    .map((a) => {
      const company = companies.find((c) => c.id === a.companyId)
      if (!company) return null
      if (industrySlug && company.industrySlug !== industrySlug) return null

      return {
        companyId: company.id,
        name: company.name,
        slug: company.slug,
        industryName: company.industryName,
        avgAnnualTakeHomeYen: takeHomeFor(a.avgAnnualSalaryYen, null),
        avgAnnualSalaryYen: a.avgAnnualSalaryYen,
        sampleSize: a.sampleSize,
      }
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .sort((a, b) => b.avgAnnualTakeHomeYen - a.avgAnnualTakeHomeYen)
    .slice(0, limit)
}

export async function getSimilarCompanies(industryId: string, excludeCompanyId: string, limit = 4) {
  const companies = await fetchCompanies()

  return companies
    .filter((c) => c.industryId === industryId && c.id !== excludeCompanyId)
    .slice(0, limit)
    .map((c) => ({ id: c.id, name: c.name, slug: c.slug, officialAvgSalaryYen: c.officialAvgSalaryYen }))
}
