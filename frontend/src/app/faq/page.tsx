import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "よくある質問 | tedorii",
  description: "tedoriiのデータや仕組みについてよくある質問にお答えします。",
}

const FAQS: Array<{ question: string; answer: React.ReactNode }> = [
  {
    question: "なぜ「手取り」は確定額ではなく推定値なのですか？",
    answer: (
      <>
        手取り額は居住地・加入している健康保険組合・各種控除の有無などによって個人ごとに変わるため、確定額としてお示しすることができません。tedoriiでは独身・扶養なしなど一定の前提のもとで標準的な税率・保険料率を用いた推定値を掲載しています。前提の詳細は
        <Link href="/methodology" className="text-primary hover:underline">
          データ・算出方法について
        </Link>
        をご覧ください。
      </>
    ),
  },
  {
    question: "企業別のデータはどこから来ていますか？",
    answer: (
      <>
        現時点では、各企業の公開平均年収をもとに年代別の年収カーブを掛け合わせて算出したサンプル・推定データです。個別企業の確定した実績値ではありません。今後、公開統計やより精度の高い情報源への切り替えを予定しています。
      </>
    ),
  },
  {
    question: "データはどのくらいの頻度で更新されますか？",
    answer: <>現在は開発段階のため不定期の更新となります。本格運用開始後の更新方針は追ってこちらに記載します。</>,
  },
  {
    question: "表示される転職エージェントはどうやって選ばれていますか？",
    answer: (
      <>
        閲覧しているページの文脈（業界・企業・年代など）に応じて、あらかじめ設定された対象条件に合うエージェントが自動的に表示されます。掲載企業の評価やデータの算出結果に影響を与えることはありません。
      </>
    ),
  },
  {
    question: "tedoriiの利用は無料ですか？",
    answer: <>はい、手取り計算・企業データの閲覧はすべて無料でご利用いただけます。</>,
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
      <h1 className="text-2xl font-bold">よくある質問</h1>
      <div className="flex flex-col gap-6">
        {FAQS.map((faq) => (
          <div key={faq.question} className="flex flex-col gap-1.5 border-b border-border pb-5">
            <h2 className="font-semibold">Q. {faq.question}</h2>
            <p className="text-sm text-muted-foreground">A. {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
