import type { Metadata } from "next"
import Link from "next/link"
import { getTakeHomeRanking } from "@/lib/api/companies"
import { listIndustries } from "@/lib/api/industries"
import { formatManYen } from "@/lib/format"
import { Disclaimer } from "@/components/site/disclaimer"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "実質手取りランキング | tedorii",
  description: "企業別の実質手取り推定データをランキング形式で掲載しています。",
}

const MEDALS = ["🥇", "🥈", "🥉"]

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>
}) {
  const { industry } = await searchParams

  const [ranking, industries] = await Promise.all([
    getTakeHomeRanking(30, industry),
    listIndustries(),
  ])

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold">実質手取りランキング</h1>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link
          href="/rankings"
          className={cn("rounded-full border border-border px-3 py-1", !industry && "border-primary text-primary")}
        >
          すべて
        </Link>
        {industries.map((ind) => (
          <Link
            key={ind.id}
            href={`/rankings?industry=${ind.slug}`}
            className={cn(
              "rounded-full border border-border px-3 py-1",
              industry === ind.slug && "border-primary text-primary"
            )}
          >
            {ind.name}
          </Link>
        ))}
      </div>

      {ranking.length === 0 ? (
        <p className="text-sm text-muted-foreground">ランキングデータはまだ準備中です。</p>
      ) : (
        <ol className="flex flex-col gap-2">
          {ranking.map((row, i) => (
            <li key={row.companyId}>
              <Link
                href={`/companies/${row.slug}`}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-lg border px-4 py-3 hover:border-primary",
                  i < 3 ? "border-accent/40 bg-accent/5" : "border-border"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="w-7 text-right text-lg">{MEDALS[i] ?? <span className="font-bold text-muted-foreground">{i + 1}</span>}</span>
                  <span>
                    <span className="font-semibold">{row.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{row.industryName}</span>
                  </span>
                </span>
                <span className="font-semibold text-accent">{formatManYen(row.avgAnnualTakeHomeYen)}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <Disclaimer />
    </div>
  )
}
