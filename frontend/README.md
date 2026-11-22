# tedorii (frontend)

企業・職種・年代別の実質手取りを可視化し、転職エージェントへ送客するメディアの公開サイト。要件は [../docs/SPEC.md](../docs/SPEC.md) を参照。

このアプリはPostgresに直接接続しません。すべてのデータはリポジトリルートのRailsアプリが提供するJSON API（`/api/v1/...`）から取得します。データのCRUD・管理はRails側のActiveAdmin管理画面（`/admin`）で行います。詳しい全体構成は [../README.md](../README.md) を参照。

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local に RAILS_API_URL を設定（デフォルト: http://localhost:4000）
npm run dev
```

Railsアプリ（`../`）が先に起動している必要があります。

## スクリプト

- `npm run dev` — 開発サーバー起動
- `npm run build` / `npm run start` — 本番ビルド/起動
- `npm run typecheck` / `npm run lint` — 型チェック/Lint

## データ取得層

`src/lib/api/` 配下にRailsのJSON APIを叩くデータアクセス関数がある（`companies.ts` `industries.ts` `agents.ts` `stats.ts`）。手取り計算（`src/lib/takehome/calculate.ts`）はここでのみ行い、Railsはサンプルサイズや年収などの生データのみを返す。
