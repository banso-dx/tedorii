import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCompanyBySlug, getTakeHomeAggregatesForCompany, getSimilarCompanies } from "@/lib/api/companies"
import { resolveAgentsForContext } from "@/lib/api/agents"
import { Badge } from "@/components/ui/badge"
import { TakeHomeBar } from "@/components/site/take-home-bar"
import { AgentCta } from "@/components/site/agent-cta"
import { Disclaimer } from "@/components/site/disclaimer"
import { formatYen, formatManYen } from "@/lib/format"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return {}

  return {
    title: `${company.name}の実質手取り | tedorii`,
    description: `${company.name}の年代別・職種別の実質手取り推定データを掲載。`,
  }
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) notFound()

  const [aggregates, similarCompanies, agents] = await Promise.all([
    getTakeHomeAggregatesForCompany(company.id),
    getSimilarCompanies(company.industryId, company.id),
    resolveAgentsForContext({ companyId: company.id, industryId: company.industryId }),
  ])

  const byAgeBand = aggregates.filter((a) => a.ageBand !== null && a.position === null)
  const overall = aggregates.find((a) => a.ageBand === null && a.position === null) ?? null

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-3">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/companies" className="hover:text-foreground">
            企業を探す
          </Link>
          <span>/</span>
          <Link href={`/industries/${company.industrySlug}`} className="hover:text-foreground">
            {company.industryName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{company.name}</span>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={`/industries/${company.industrySlug}`} className="text-sm text-primary hover:underline">
            {company.industryName}
          </Link>
          {company.isListed && <Badge variant="secondary">上場</Badge>}
        </div>
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>従業員規模: {company.employeeBand}名</span>
          {company.hqPrefecture && <span>本社: {company.hqPrefecture}</span>}
          {company.establishedYear && <span>設立: {company.establishedYear}年</span>}
          {company.officialAvgSalaryYen && <span>公式平均年収: {formatYen(company.officialAvgSalaryYen)}</span>}
        </div>
        {company.description && <p className="text-sm">{company.description}</p>}
      </div>

      {overall && (
        <div className="flex flex-col items-start gap-1 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <span className="text-sm text-muted-foreground">想定年収手取り（全年代平均）</span>
          <span className="text-3xl font-bold text-accent">{formatManYen(overall.avgAnnualTakeHomeYen)}</span>
          <span className="text-sm text-muted-foreground">
            月あたり概算 {formatManYen(overall.avgMonthlyTakeHomeYen)} ／ 平均年収 {formatManYen(overall.avgAnnualSalaryYen)}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">年代別の実質手取り</h2>
        {byAgeBand.length === 0 ? (
          <p className="text-sm text-muted-foreground">この企業のデータはまだ準備中です。</p>
        ) : (
          <div className="flex flex-col gap-3">
            {byAgeBand.map((row) => (
              <TakeHomeBar
                key={row.id}
                label={`${row.ageBand}歳`}
                sampleSize={row.sampleSize}
                grossAnnualYen={row.avgAnnualSalaryYen}
                takeHomeAnnualYen={row.avgAnnualTakeHomeYen}
              />
            ))}
          </div>
        )}
        <Disclaimer />
      </div>

      <AgentCta agents={agents} companySlug={company.slug} pagePath={`/companies/${company.slug}`} />

      {similarCompanies.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">似ている企業</h2>
          <div className="flex flex-wrap gap-2">
            {similarCompanies.map((c) => (
              <Link
                key={c.id}
                href={`/companies/${c.slug}`}
                className="rounded-full border border-border px-4 py-1.5 text-sm hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
