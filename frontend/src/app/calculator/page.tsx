import type { Metadata } from "next"
import { CalculatorForm } from "@/components/site/calculator-form"
import { AgentCta } from "@/components/site/agent-cta"
import { resolveAgentsForContext } from "@/lib/api/agents"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "手取り計算シミュレーター | tedorii",
  description: "年収を入力するだけで、税金・社会保険料を考慮した実質手取りを計算できます。",
}

export default async function CalculatorPage() {
  const agents = await resolveAgentsForContext({})

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">手取り計算シミュレーター</h1>
        <p className="text-sm text-muted-foreground">年収を入力すると、税金・社会保険料を引いた後の実質手取りがわかります。</p>
      </div>

      <CalculatorForm />

      <AgentCta agents={agents} pagePath="/calculator" title="その年収で、転職したらどうなる？" />
    </div>
  )
}
