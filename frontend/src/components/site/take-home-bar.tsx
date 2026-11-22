import { formatManYen } from "@/lib/format"
import { TakeHomeBreakdownBar } from "@/components/site/takehome-breakdown-bar"

export function TakeHomeBar({
  label,
  grossAnnualYen,
  takeHomeAnnualYen,
  sampleSize,
}: {
  label: string
  grossAnnualYen: number
  takeHomeAnnualYen: number
  sampleSize?: number
}) {
  const deductionYen = Math.max(0, grossAnnualYen - takeHomeAnnualYen)

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">
          {label}
          {sampleSize !== undefined && (
            <span className="ml-2 text-xs text-muted-foreground">サンプル数: {sampleSize}</span>
          )}
        </span>
        <span>
          <span className="font-semibold text-accent">{formatManYen(takeHomeAnnualYen)}</span>
          <span className="text-muted-foreground"> / 年収{formatManYen(grossAnnualYen)}</span>
        </span>
      </div>
      <TakeHomeBreakdownBar
        totalYen={grossAnnualYen}
        segments={[
          { label: "手取り", valueYen: takeHomeAnnualYen, colorClassName: "bg-chart-1" },
          { label: "税金・社会保険料", valueYen: deductionYen, colorClassName: "bg-muted-foreground/30" },
        ]}
      />
    </div>
  )
}
