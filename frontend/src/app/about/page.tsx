import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "tedoriiについて",
  description: "tedoriiのサービス概要・運営方針・データの扱いについて説明します。",
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">tedoriiについて</h1>
        <p className="text-sm text-muted-foreground">
          tedoriiは、企業・職種・年代別の「実質手取り」をデータで可視化する転職メディアです。求人情報や口コミだけでは分かりにくい「結局、手元にいくら残るのか」を、税金・社会保険料まで踏み込んで具体的な金額で示すことを目指しています。
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">運営方針</h2>
        <p className="text-sm text-muted-foreground">
          掲載している企業データは、提示年収だけでなく税金・社会保険料を加味した「実質手取り」の推定値を中心に構成しています。特定企業・エージェントの掲載順位を恣意的に操作することはなく、データの算出ロジックは
          <Link href="/methodology" className="text-primary hover:underline">
            データ・算出方法について
          </Link>
          のページで公開しています。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">データについて</h2>
        <p className="text-sm text-muted-foreground">
          現時点で掲載している企業別データは、公開されている統計・企業情報をもとにしたサンプル／推定データです。個別企業の確定した実績値ではなく、将来的には実際の給与明細データなど、より精度の高い情報源への切り替えを予定しています。詳しい前提は
          <Link href="/methodology" className="text-primary hover:underline">
            データ・算出方法について
          </Link>
          をご覧ください。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">収益モデル</h2>
        <p className="text-sm text-muted-foreground">
          tedoriiは、提携する転職エージェントへの送客によって運営されています。各ページに表示される転職エージェントのご紹介は、閲覧しているページの文脈（業界・企業・年代など）に応じて自動的に選ばれており、掲載企業の評価そのものには影響しません。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">運営者情報</h2>
        <p className="text-sm text-muted-foreground">
          サービス名: tedorii（準備中・運営者情報は正式公開に合わせて追記します）
        </p>
      </section>
    </div>
  )
}
