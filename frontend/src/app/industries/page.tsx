import type { Metadata } from "next"
import Link from "next/link"
import { listIndustriesWithCompanyCount } from "@/lib/api/industries"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "業界から探す | tedorii",
  description: "業界別に企業の実質手取り推定データを探せます。",
}

export default async function IndustriesPage() {
  const industries = await listIndustriesWithCompanyCount()

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold">業界から探す</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link
            key={industry.id}
            href={`/industries/${industry.slug}`}
            className="flex flex-col gap-1 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="font-semibold">{industry.name}</span>
            <span className="text-sm text-muted-foreground">{industry.companyCount}社掲載</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
