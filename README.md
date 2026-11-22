# tedorii

企業・職種・年代別の実質手取りを可視化し、転職エージェントへ送客するメディア。要件は [docs/SPEC.md](docs/SPEC.md) を参照。

## 構成

このリポジトリはRailsアプリ（リポジトリルート自体）と、`frontend/`配下のNext.jsアプリの2つで構成されます。

- **ルート（Rails）**: データの管理・CRUD用の管理画面（ActiveAdmin）と、Next.js向けの読み取り専用JSON API（`/api/v1/...`）を提供。スキーマの正は `Schemafile`（[Ridgepole](https://github.com/winebarrel/ridgepole)で反映。標準のRails migrationは使わない）
- **`frontend/`（Next.js）**: 公開サイト本体。Postgresには一切直接接続せず、すべてのデータをRailsのJSON APIから取得する。手取り計算ロジック（`frontend/src/lib/takehome/calculate.ts`）はフロントエンドのみに存在する

## セットアップ（ローカル）

### 1. Postgresを起動

```bash
docker compose up -d db
```

### 2. Railsをセットアップ

```bash
bundle install
bin/rails db:create
# pgcryptoエクステンションを有効化（UUID主キーの生成に使用。初回のみ）
docker compose exec db psql -U tedorii -d tedorii_development -c 'CREATE EXTENSION IF NOT EXISTS pgcrypto;'
bundle exec ridgepole -c config/database.yml -E development -f Schemafile --apply
bin/rails db:seed
bin/rails server -p 4000
```

管理画面: http://localhost:4000/admin （初期ログイン: `admin@example.com` / `password`。`db/seeds.rb`参照）

### 3. Next.jsをセットアップ

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

http://localhost:3000 で公開サイトを確認できます。

## スキーマを変更するとき

`Schemafile`を編集し、以下を実行:

```bash
bundle exec ridgepole -c config/database.yml -E development -f Schemafile --apply
```

Next.js側は `frontend/src/lib/api/types.ts` のraw型とRailsコントローラ（`app/controllers/api/v1/`）が返すJSON項目を手動で対応させる構成。カラムを追加した場合はAPIコントローラとフロントの型を合わせて更新する。
