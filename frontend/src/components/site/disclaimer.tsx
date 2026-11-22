import Link from "next/link"

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={`text-xs text-muted-foreground ${className ?? ""}`}>
      ※ 掲載データは公開統計・公開情報をもとにした推定値であり、個別企業の確定した実績値ではありません。実際の金額は職種・等級・勤続年数・居住地等により異なります。詳しい前提は
      <Link href="/methodology" className="text-primary hover:underline">
        データ・算出方法について
      </Link>
      をご覧ください。
    </p>
  )
}
