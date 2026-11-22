import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatManYen, formatYen } from "@/lib/format"

export function CompanyCard({
  name,
  slug,
  industryName,
  employeeBand,
  officialAvgSalaryYen,
  avgAnnualTakeHomeYen,
}: {
  name: string
  slug: string
  industryName: string
  employeeBand: string
  officialAvgSalaryYen: number | null
  avgAnnualTakeHomeYen?: number | null
}) {
  return (
    <Link href={`/companies/${slug}`}>
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold leading-snug">{name}</span>
            <Badge variant="outline" className="shrink-0">
              {employeeBand}名
            </Badge>
          </div>
          <Badge variant="secondary" className="w-fit">
            {industryName}
          </Badge>

          <div className="mt-1 flex flex-col gap-0.5 border-t border-border pt-2">
            {avgAnnualTakeHomeYen ? (
              <>
                <span className="text-xs text-muted-foreground">想定年収手取り</span>
                <span className="text-lg font-bold text-accent">{formatManYen(avgAnnualTakeHomeYen)}</span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">手取りデータ準備中</span>
            )}
            <span className="text-xs text-muted-foreground">
              公式平均年収: {officialAvgSalaryYen ? formatYen(officialAvgSalaryYen) : "データ準備中"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
