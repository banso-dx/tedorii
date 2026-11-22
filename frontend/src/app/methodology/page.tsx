import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "データ・算出方法について | tedorii",
  description: "tedoriiの手取り計算ロジックと企業データの算出方法・前提条件について説明します。",
}

export default function MethodologyPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-12">
      <h1 className="text-2xl font-bold">データ・算出方法について</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">手取り計算のロジック</h2>
        <p className="text-sm text-muted-foreground">
          年収から手取りを計算する際、以下の項目を順に差し引いています。
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>健康保険料・介護保険料（40歳以上）・厚生年金保険料・雇用保険料（社会保険料）</li>
          <li>所得税（給与所得控除後の課税所得に対する速算表＋復興特別所得税2.1%）</li>
          <li>住民税（課税所得の10% ＋ 一人当たり年5,000円の均等割）</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          2024〜2025年度ベースの公的な税率・保険料率・給与所得控除の速算表を用いています。計算ロジックの実装は
          <code className="rounded bg-muted px-1 py-0.5 text-xs">src/lib/takehome/calculate.ts</code>
          にあります。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">前提としている条件</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>独身・扶養家族なしの単身者を前提としています（配偶者控除・扶養控除等は考慮していません）</li>
          <li>標準的な保険料率を前提とした概算で、加入している健康保険組合や居住地によって実際の金額は異なります</li>
          <li>
            住民税は前年の所得を基準に算出されるため、入社・転職1年目は実際の金額と異なる場合があります
          </li>
          <li>ボーナスの有無や金額は反映していません（年収に含まれているものとして計算しています）</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">企業別データの算出方法</h2>
        <p className="text-sm text-muted-foreground">
          企業ページやランキングに表示している年代別の「想定年収」「想定手取り」は、各企業の公開平均年収を起点に、一般的な年代別の年収カーブを掛け合わせて算出した推定値です。算出した年収をもとに、上記と同じ手取り計算ロジックを適用して手取り額を求めています。
        </p>
        <p className="text-sm text-muted-foreground">
          現時点のデータはサービス開発段階のサンプル・推定データであり、個別企業の確定した実績値ではありません。実際の金額は職種・等級・勤続年数・居住地等により大きく異なります。今後、公開統計やより精度の高い情報源に段階的に切り替えていく予定です。
        </p>
      </section>
    </div>
  )
}
