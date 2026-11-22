import { formatManYen, formatYen } from "@/lib/format"

export type BreakdownSegment = {
  label: string
  valueYen: number
  colorClassName: string
}

export function TakeHomeBreakdownBar({
  totalYen,
  segments,
}: {
  totalYen: number
  segments: BreakdownSegment[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((segment) => {
          const widthPercent = totalYen > 0 ? Math.max(0, Math.min(100, (segment.valueYen / totalYen) * 100)) : 0
          return (
            <div
              key={segment.label}
              className={segment.colorClassName}
              style={{ width: `${widthPercent}%` }}
              title={`${segment.label}: ${formatYen(segment.valueYen)}`}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {segments.map((segment) => (
          <span key={segment.label} className="flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${segment.colorClassName}`} />
            {segment.label} {formatManYen(segment.valueYen)}
          </span>
        ))}
      </div>
    </div>
  )
}
