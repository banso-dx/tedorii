"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/calculator", label: "手取り計算" },
  { href: "/companies", label: "企業を探す" },
  { href: "/industries", label: "業界" },
  { href: "/rankings", label: "ランキング" },
]

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-primary" onClick={() => setIsMenuOpen(false)}>
          tedorii
        </Link>
        <nav className="hidden items-center gap-5 text-sm sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/80 hover:bg-secondary sm:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-foreground/80 hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
