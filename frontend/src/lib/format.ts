export function formatYen(amountYen: number): string {
  return `${Math.round(amountYen).toLocaleString("ja-JP")}円`
}

export function formatManYen(amountYen: number): string {
  return `${Math.round(amountYen / 10_000).toLocaleString("ja-JP")}万円`
}
