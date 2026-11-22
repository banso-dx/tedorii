"use client"

import { useState } from "react"
import { calculateTakeHome, type TakeHomeBreakdown } from "@/lib/takehome/calculate"
import { formatManYen, formatYen } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TakeHomeBreakdownBar } from "@/components/site/takehome-breakdown-bar"

export function CalculatorForm() {
  const [annualManYen, setAnnualManYen] = useState("500")
  const [age, setAge] = useState("30")
  const [result, setResult] = useState<TakeHomeBreakdown | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const grossAnnualYen = Number(annualManYen) * 10_000
    const ageNum = Number(age)
    if (!Number.isFinite(grossAnnualYen) || grossAnnualYen <= 0) return
    setResult(calculateTakeHome(grossAnnualYen, Number.isFinite(ageNum) ? ageNum : 30))
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>年収から手取りを計算</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
            <label className="flex flex-col gap-1 text-sm">
              年収（万円）
              <Input
                type="number"
                min={0}
                value={annualManYen}
                onChange={(e) => setAnnualManYen(e.target.value)}
                className="w-32"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              年齢
              <Input type="number" min={15} max={80} value={age} onChange={(e) => setAge(e.target.value)} className="w-24" />
            </label>
            <Button type="submit">計算する</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>計算結果</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1 rounded-lg bg-accent/10 p-4">
              <span className="text-sm text-muted-foreground">年間の手取り</span>
              <span className="text-3xl font-bold text-accent">{formatManYen(result.takeHomeAnnualYen)}</span>
              <span className="text-sm text-muted-foreground">
                月あたり概算 {formatManYen(result.takeHomeMonthlyYen)}
              </span>
            </div>

            <TakeHomeBreakdownBar
              totalYen={result.grossAnnualYen}
              segments={[
                { label: "手取り", valueYen: result.takeHomeAnnualYen, colorClassName: "bg-chart-1" },
                { label: "社会保険料", valueYen: result.socialInsurance.totalYen, colorClassName: "bg-chart-2" },
                { label: "所得税", valueYen: result.incomeTaxYen, colorClassName: "bg-chart-3" },
                { label: "住民税", valueYen: result.residentTaxYen, colorClassName: "bg-chart-4" },
              ]}
            />

            <dl className="grid grid-cols-2 gap-y-2 text-sm sm:grid-cols-4">
              <dt className="text-muted-foreground">年収（総支給）</dt>
              <dd className="text-right font-medium sm:text-left">{formatYen(result.grossAnnualYen)}</dd>

              <dt className="text-muted-foreground">社会保険料</dt>
              <dd className="text-right font-medium sm:text-left">{formatYen(result.socialInsurance.totalYen)}</dd>

              <dt className="text-muted-foreground">所得税</dt>
              <dd className="text-right font-medium sm:text-left">{formatYen(result.incomeTaxYen)}</dd>

              <dt className="text-muted-foreground">住民税（概算）</dt>
              <dd className="text-right font-medium sm:text-left">{formatYen(result.residentTaxYen)}</dd>
            </dl>

            <p className="text-xs text-muted-foreground">
              ※ 独身・扶養なし・標準的な保険料率を前提にした概算です。実際の金額は勤務先や居住地、各種控除により異なります。住民税は前年所得を基準に算出されるため、入社初年度は実際と異なります。
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
