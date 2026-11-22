import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getIndustryBySlug, listCompaniesByIndustry } from "@/lib/api/industries"
import { resolveAgentsForContext } from "@/lib/api/agents"
import { CompanyCard } from "@/components/site/company-card"
import { AgentCta } from "@/components/site/agent-cta"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)
  if (!industry) return {}

  return {
    title: `${industry.name}の実質手取り | tedorii`,
    description: `${industry.name}に属する企業の実質手取り推定データ一覧。`,
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)
  if (!industry) notFound()

  const [companies, agents] = await Promise.all([
    listCompaniesByIndustry(industry.id),
    resolveAgentsForContext({ industryId: industry.id }),
  ])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <Link href="/industries" className="text-sm text-primary hover:underline">
          ← 業界一覧
        </Link>
        <h1 className="text-2xl font-bold">{industry.name}の実質手取り</h1>
      </div>

      {companies.length === 0 ? (
        <p className="text-sm text-muted-foreground">この業界のデータはまだ準備中です。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              name={company.name}
              slug={company.slug}
              industryName={industry.name}
              employeeBand={company.employeeBand}
              officialAvgSalaryYen={company.officialAvgSalaryYen}
              avgAnnualTakeHomeYen={company.avgAnnualTakeHomeYen}
            />
          ))}
        </div>
      )}

      <AgentCta agents={agents} pagePath={`/industries/${industry.slug}`} />
    </div>
  )
}
