import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "tedorii — 企業・職種別のリアルな実質手取りがわかる",
  description:
    "企業・職種・年代別の実質手取りを推定データで可視化。あなたの年収で手取りがいくらになるかもシミュレーションできます。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
