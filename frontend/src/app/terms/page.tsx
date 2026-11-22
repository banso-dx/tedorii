import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約 | tedorii",
}

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold">利用規約</h1>
      <p className="text-xs text-muted-foreground">最終更新日: 2026年11月22日</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第1条（適用）</h2>
        <p className="text-sm text-muted-foreground">
          本規約は、tedorii（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用した時点で、本規約に同意したものとみなします。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第2条（データの性質・免責事項）</h2>
        <p className="text-sm text-muted-foreground">
          本サービスに掲載する手取り計算結果・企業別データは、公開統計・公開情報等をもとにした推定値であり、個別企業の確定した実績値を保証するものではありません。実際の金額は職種・等級・勤続年数・居住地・加入する保険組合等により異なります。
        </p>
        <p className="text-sm text-muted-foreground">
          本サービスの情報を利用した結果生じたいかなる損害についても、運営者は責任を負いません。転職等の意思決定にあたっては、必ず各企業・転職エージェント等への直接確認を行ってください。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第3条（禁止事項）</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>法令または公序良俗に違反する行為</li>
          <li>本サービスのサーバー・ネットワークに過度な負荷をかける行為、不正にアクセスする行為</li>
          <li>本サービスに掲載された情報を無断で複製・転載・改変する行為</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第4条（著作権）</h2>
        <p className="text-sm text-muted-foreground">
          本サービス内のコンテンツ（文章・デザイン・データ算出ロジック等）に関する著作権その他の権利は、運営者または正当な権利者に帰属します。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第5条（規約の変更）</h2>
        <p className="text-sm text-muted-foreground">
          運営者は、必要と判断した場合、本規約を予告なく変更できるものとします。変更後の規約は本ページに掲載した時点から効力を持ちます。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">第6条（準拠法・管轄）</h2>
        <p className="text-sm text-muted-foreground">本規約の解釈には日本法を準拠法とします。</p>
      </section>
    </div>
  )
}
