import type { Metadata } from "next"
import { listCompanies } from "@/lib/api/companies"
import { listIndustries } from "@/lib/api/industries"
import { CompanyCard } from "@/components/site/company-card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "企業を探す | tedorii",
  description: "業種・従業員規模・平均年収で企業を検索し、実質手取りの推定データを確認できます。",
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string }>
}) {
  const { q, industry } = await searchParams

  const [companies, industries] = await Promise.all([
    listCompanies({ search: q, industrySlug: industry }),
    listIndustries(),
  ])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold">企業を探す</h1>

      <form className="flex flex-wrap gap-3" method="get">
        <Input name="q" defaultValue={q} placeholder="企業名で検索" className="max-w-xs" />
        {industry && <input type="hidden" name="industry" value={industry} />}
      </form>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link
          href="/companies"
          className={cn("rounded-full border border-border px-3 py-1", !industry && "border-primary text-primary")}
        >
          すべて
        </Link>
        {industries.map((ind) => (
          <Link
            key={ind.id}
            href={`/companies?industry=${ind.slug}`}
            className={cn(
              "rounded-full border border-border px-3 py-1",
              industry === ind.slug && "border-primary text-primary"
            )}
          >
            {ind.name}
          </Link>
        ))}
      </div>

      {companies.length === 0 ? (
        <p className="text-sm text-muted-foreground">該当する企業が見つかりませんでした。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              name={company.name}
              slug={company.slug}
              industryName={company.industryName}
              employeeBand={company.employeeBand}
              officialAvgSalaryYen={company.officialAvgSalaryYen}
              avgAnnualTakeHomeYen={company.avgAnnualTakeHomeYen}
            />
          ))}
        </div>
      )}
    </div>
  )
}
