import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

type AgentForCta = {
  agentId: string
  name: string
  slug: string
  targetSegment: string
}

export function AgentCta({
  agents,
  companySlug,
  pagePath,
  title = "本気で転職を考えるなら",
}: {
  agents: AgentForCta[]
  companySlug?: string
  pagePath: string
  title?: string
}) {
  if (agents.length === 0) return null

  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>相性の良い転職エージェントに無料で相談できます</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {agents.map((agent) => {
          const params = new URLSearchParams({ from: pagePath })
          if (companySlug) params.set("company", companySlug)

          return (
            <a
              key={agent.agentId}
              href={`/go/${agent.slug}?${params.toString()}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex flex-col rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-accent"
            >
              <span className="font-semibold">{agent.name}</span>
              <span className="text-xs text-muted-foreground">{agent.targetSegment}</span>
            </a>
          )
        })}
      </CardContent>
    </Card>
  )
}
