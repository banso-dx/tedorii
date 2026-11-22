import Link from "next/link"

const FOOTER_COLUMNS = [
  {
    heading: "サービス",
    links: [
      { href: "/calculator", label: "手取り計算" },
      { href: "/companies", label: "企業を探す" },
      { href: "/industries", label: "業界から探す" },
      { href: "/rankings", label: "手取りランキング" },
    ],
  },
  {
    heading: "運営",
    links: [
      { href: "/about", label: "tedoriiについて" },
      { href: "/methodology", label: "データ・算出方法について" },
      { href: "/faq", label: "よくある質問" },
    ],
  },
  {
    heading: "規約",
    links: [
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/terms", label: "利用規約" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-3">
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-2">
            <span className="text-sm font-semibold">{column.heading}</span>
            <ul className="flex flex-col gap-1.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} tedorii
      </div>
    </footer>
  )
}
