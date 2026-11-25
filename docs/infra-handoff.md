# インフラ・開発環境 引き継ぎドキュメント

作成日: 2026-11-25 ／ 担当: infraセッション ／ 関連: [docs/year-end-2026-plan.md](./year-end-2026-plan.md) §1, [Epic #1](https://github.com/banso-dx/tedorii/issues/1)

このドキュメントは、tedoriiのインフラ・バックエンド/フロントエンド接続まわりの現状を、別のセッション／担当者が引き継げる状態にまとめたもの。PdMスレッドでの再分担判断に使う想定。

## 1. アーキテクチャ（確定・実装済み）

```
tedorii/                   # リポジトリルート = Railsアプリ本体
├── app/graphql/            # GraphQL API（industries/companies/salaryAggregates/
│                             salaryDataPoints/jobAgents/agentPlacements + createReferralClick mutation）
├── app/admin/              # ActiveAdmin（全テーブルCRUD、スキャフォールド済み）
├── Schemafile              # スキーマの正（ridgepole --apply で反映。標準migrationは使わない）
├── db/migrate/             # Devise/ActiveAdmin用テーブル(admin_users, active_admin_comments)のみ
├── Dockerfile / docker-compose.yml / bin/docker-entrypoint
└── frontend/               # Next.js（公開サイト）。Postgresには一切接続せず、
                              /graphql をfetchするだけ（frontend/src/lib/api/*）
```

- データの取得経路: Next.js(Server Components) → Rails `/graphql` → Postgres
- 手取り計算ロジック（`calculateTakeHome`）はフロントエンド（TypeScript）側にのみ存在。Rails/GraphQLは生の年収・サンプルサイズだけを返す
- 変遷: Next.js+Drizzle+Supabase直結 → Rails(ActiveAdmin+Ridgepole)分離(`e813ec5`) → REST(`/api/v1`)からGraphQLへ置き換え(`a5b3389`)

## 2. ホスティングの経緯と現状（未完了）

| 候補 | 結果 |
|---|---|
| DigitalOcean Kubernetes | 予算(¥3,000〜5,000/月)で検討したが、Vercelでのk8sに意味がない旨の議論の末、k8s学習目的も含めいったん保留 |
| Render | Blueprint(`render.yaml`)でデプロイまで到達したが、**無料プランのコールドスタート(スリープ復帰に90秒以上)がVercelのサーバーレス関数タイムアウトと衝突**し実用に至らず撤去(`a6d4cc1`) |
| **AWS Lightsail Container Service + Supabase + Vercel** | **現在の方針**。会社からAWS予算 ≤¥10,000/月が確保できたため、常時起動のLightsailに変更。Postgresは予算節約のためSupabase無料プランに移す |

### 現在の状態
- `render.yaml`・README等のRender関連記述は削除済み
- AWS Lightsail Container Serviceへの実際のデプロイは**未着手**（下記「必要な対応」待ち）
- Supabaseプロジェクトは**未作成**
- Vercelへのフロントエンドデプロイは**着手済みだが要再確認**: RAILS_API_URLをRenderのURLに向けて一度デプロイし、Render撤去に伴い現在は向き先が無効。Lightsailのデプロイ後にRAILS_API_URLを更新し、Vercelで再デプロイする必要がある

### 次の担当者が最初にやること
1. Supabaseで新規プロジェクト作成 → Settings → Database → Connection string(URI形式)を取得
2. ローカルで`aws configure`を実行しAWS認証を通す（このマシンには`aws` CLI導入済みだが未認証）
3. 既存の`Dockerfile`をLightsail Container Serviceにpush（`aws lightsail create-container-service` → `push-container-image` → `create-container-service-deployment`）。環境変数は`DATABASE_URL`(Supabase)・`RAILS_MASTER_KEY`(`config/master.key`の内容)・`RAILS_ENV=staging`
4. VercelのプロジェクトでNext.jsの`RAILS_API_URL`をLightsailのURLに更新し、**明示的に再デプロイ**（環境変数変更だけでは反映されない）
5. stg URLから公開ページ・`/admin`・`/graphiql`にアクセスできることを確認

## 3. ハマった点・既知の落とし穴（再発防止用）

- `config/database.yml`に`url: <%= ENV["DATABASE_URL"] %>`を明示しないと、host/username/password等の個別キーが優先されてしまい`DATABASE_URL`を無視する（Rails 7.0の挙動）。`staging`/`production`両方に設定済み
- `config/database.yml`に環境名のキー自体が無いと`"database configuration does not specify adapter"`で落ちる。`staging:`セクションは当初漏れていた
- Devise/ActiveAdmin用テーブルは標準Rails migration、それ以外はridgepole。**両方**実行しないと真っ白なDBで`db:seed`が「pending migrations」で失敗する（`bin/docker-entrypoint`で`db:migrate`→`ridgepole apply`→`db:seed`の順に統一済み）
- `RAILS_MASTER_KEY`が無いと`secret_key_base`エラーで起動しない。ローカルの`config/master.key`の内容をデプロイ先の環境変数にそのまま設定する必要がある（gitignore対象でリポジトリには含まれない）
- docker-composeで`bundle_cache`を名前付きボリュームにしていると、Gemfile変更後に`docker compose up --build`しても**イメージ内の新gemがボリュームに反映されない**。`docker compose run --rm --entrypoint "" web bundle install`で明示的に同期する必要がある
- GraphQLエンドポイントはNext.js(サーバー側)からのみ呼ばれるため、`GraphqlController`でCSRF保護(`protect_from_forgery`)を`null_session`にして外している
- 起動のたびにmigrate/ridgepole/seedを実行すると、コンテナ再起動(=コールドスタート)のたびに数秒〜数十秒のオーバーヘッドが乗る。`DATABASE_URL`がある環境では`psql`で`companies`テーブルの有無を確認し、セットアップ済みならスキップするようにしている(`bin/docker-entrypoint`)

## 4. 他セッションの並行作業との関係

- "data"セッションがsubmission承認/反映パイプライン（`Schemafile`・`app/models/*`・`app/services/*`・`app/admin/submissions.rb`）を実装中。**本ドキュメント作成時点で未コミット**。infraセッション側は`Schemafile`等を直接編集しないこと（GraphQL側は`salaryDataPoints`クエリ追加(`8189c7a`)で対応済み、追加の公開項目は不要と確認済み）
- `docs/year-end-2026-plan.md`が部署別タスクの進行管理ドキュメント。本ドキュメントはその§1(インフラ)の詳細版

## 5. 今すぐ引き継ぎ可能な作業単位

- [ ] Supabaseプロジェクト作成・接続文字列取得（ユーザー側アカウント操作が必要）
- [ ] AWS CLI認証（ユーザー側で`aws configure`、以降はCLIで代行可能）
- [ ] Lightsail Container Serviceへのデプロイ（AWS認証完了後、infra側で実行可能）
- [ ] Vercel側のRAILS_API_URL更新・再デプロイ確認
- [ ] stg URL経由での最終動作確認（Epic #1の残タスク）
