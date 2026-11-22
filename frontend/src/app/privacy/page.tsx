import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | tedorii",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
      <p className="text-xs text-muted-foreground">最終更新日: 2026年11月22日</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">1. 取得する情報</h2>
        <p className="text-sm text-muted-foreground">
          tedorii（以下「本サービス」）は、手取り計算ツールのご利用にあたり、入力された年収・年齢等の情報をサーバーに送信・保存しません。ブラウザ上での計算のみに利用されます。
        </p>
        <p className="text-sm text-muted-foreground">
          転職エージェントへのリンクをクリックした場合、クリック日時・遷移元ページ・紹介元エージェントなどの情報を、送客実績の計測のために記録します。これらの情報には氏名・メールアドレス等、個人を直接特定できる情報は含みません。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">2. 情報の利用目的</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>転職エージェントへの送客実績の集計・分析</li>
          <li>本サービスの品質改善・不正利用の防止</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">3. 第三者への提供</h2>
        <p className="text-sm text-muted-foreground">
          法令に基づく場合を除き、取得した情報を本人の同意なく第三者に提供することはありません。転職エージェントのリンク先では、各エージェントが定めるプライバシーポリシーが適用されます。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">4. Cookie等の利用</h2>
        <p className="text-sm text-muted-foreground">
          現時点で、広告配信や行動追跡を目的としたCookieは使用していません。アクセス解析ツールを導入する場合は、本ページにて事前に告知します。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">5. お問い合わせ</h2>
        <p className="text-sm text-muted-foreground">
          本ポリシーに関するお問い合わせ窓口は、サービスの正式公開に合わせて追記します。
        </p>
      </section>
    </div>
  )
}
