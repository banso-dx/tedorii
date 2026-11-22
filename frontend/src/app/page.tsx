import Link from "next/link"
import { listCompanies } from "@/lib/api/companies"
import { listIndustries } from "@/lib/api/industries"
import { getSiteStats } from "@/lib/api/stats"
import { buttonVariants } from "@/components/ui/button"
import { CompanyCard } from "@/components/site/company-card"
import { Disclaimer } from "@/components/site/disclaimer"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [companies, industries, stats] = await Promise.all([
    listCompanies().then((rows) => rows.slice(0, 6)),
    listIndustries(),
    getSiteStats(),
  ])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12">
      <section className="flex flex-col items-start gap-5">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          その会社、本当の
          <span className="text-accent">手取り</span>
          はいくら？
        </h1>
        <p className="max-w-xl text-muted-foreground">
          企業・職種・年代別のリアルな実質手取りをデータで確認。自分の年収の手取りシミュレーションもできます。
        </p>
        <div className="flex gap-3">
          <Link href="/calculator" className={buttonVariants({ size: "lg" })}>
            手取りを計算する
          </Link>
          <Link href="/companies" className={buttonVariants({ size: "lg", variant: "outline" })}>
            企業を探す
          </Link>
        </div>

        <dl className="mt-2 grid w-full grid-cols-3 gap-4 rounded-xl border border-border bg-card px-6 py-4">
          <div className="flex flex-col">
            <dd className="text-2xl font-bold text-primary">{stats.companyCount}</dd>
            <dt className="text-xs text-muted-foreground">掲載企業数</dt>
          </div>
          <div className="flex flex-col">
            <dd className="text-2xl font-bold text-primary">{stats.industryCount}</dd>
            <dt className="text-xs text-muted-foreground">業界数</dt>
          </div>
          <div className="flex flex-col">
            <dd className="text-2xl font-bold text-primary">{stats.agentCount}</dd>
            <dt className="text-xs text-muted-foreground">提携エージェント数</dt>
          </div>
        </dl>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">平均年収ランキング上位の企業</h2>
          <Link href="/companies" className="text-sm text-primary hover:underline">
            すべて見る →
          </Link>
        </div>
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
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">業界から探す</h2>
          <Link href="/industries" className="text-sm text-primary hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-sm hover:border-primary hover:text-primary"
            >
              {industry.name}
            </Link>
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  )
}
