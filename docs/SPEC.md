# tedorii 要件定義・データモデル・画面設計

## 1. サービス概要

**tedorii** は「実質手取り」に特化したDB型の転職メディア。

- ベンチマーク
  - **OneCareer**: 企業DB＋口コミ/選考体験の構造化データで、求職者の比較検討を支援。企業側送客・広告で収益化。
  - **給与明細買取屋**: ユーザーの給与明細を基に「本当の手取り」を企業・職種別に公開。SEOで集客し、転職エージェントへ送客して収益化。

- tedorii のポジション: 「企業×年代×職種でリアルな手取りがいくらか」を見える化するDB＋そこから転職エージェントへ送客するメディア。

### コアバリュー
> このサイトを見れば「自分がこの会社・職種・年代で働いたら、実際の手取りはいくらになるか」がわかる。

### 収益モデル
転職エージェントへの送客（送客導線のクリック課金 or 送客後の成約時CPA）。企業からの広告出稿は本MVPスコープ外。

---

## 2. 初期データ戦略（今回決定）

- 自社でシードデータを用意してサイトを先に形にする（ユーザー投稿は将来フェーズ）。
- シードデータの想定ソース: 公的統計（賃金構造基本統計調査、民間企業実態調査等）を加工した業界・企業規模別の推定値、および一般公開されている有価証券報告書の平均年間給与。
- 将来、ユーザー投稿（給与明細買取屋方式 or 無料投稿方式）を追加できるよう、データモデルは「データソース種別」を持たせて拡張可能にする。
- **免責表示が必須**: シードデータは「推定値」であり、個別企業の確定値ではないことを明記する（法務・信頼性の観点）。

---

## 3. 機能スコープ（MVP）

| # | 機能 | 概要 |
|---|------|------|
| 1 | 手取り計算シミュレーター | 年収→手取り（月/年）を税・社保込みで計算。SEO流入の柱、単独でも使える独立ツール |
| 2 | 企業DB・検索/一覧 | 企業名・業種・従業員規模・平均年収でフィルタ検索 |
| 3 | 企業詳細ページ | 年代別・職種別の手取り推定、サンプル数・データ更新日、類似企業、エージェントCTA |
| 4 | 業界別ページ | 業界平均手取り、所属企業一覧（SEOロングテール） |
| 5 | 手取りランキング | 業界別/年代別ランキング（SNS・SEOでの拡散を狙う） |
| 6 | エージェント送客導線 | クリックログを取得してからエージェントのトラッキングURLへリダイレクト |
| 7 | （将来）データ投稿フォーム | ユーザーが実績を匿名投稿できる機能。schemaのみ今回対応、画面は次フェーズ |

---

## 4. データモデル

Drizzle (PostgreSQL / Supabase) を想定。将来の投稿機能を見据え、`salary_data_points.source` で出自を区別する。

### 4.1 企業・業界

```
industries
  id            uuid pk
  name          text            -- 例: IT・インターネット
  slug          text unique
  created_at    timestamptz

companies
  id                 uuid pk
  name               text
  slug               text unique
  industry_id        uuid fk -> industries.id
  employee_band      enum('1-50','51-300','301-1000','1001-5000','5001+')
  hq_prefecture      text
  is_listed          boolean
  established_year   int null
  official_avg_salary_yen  int null   -- 有報等の公式平均年収（参考値）
  logo_url           text null
  description        text null
  created_at         timestamptz
  updated_at         timestamptz
```

### 4.2 手取りデータ（粒度データ + 集計）

```
salary_data_points           -- 粒度データ（シード or 将来のユーザー投稿）
  id                 uuid pk
  company_id         uuid fk -> companies.id
  position           text            -- 例: エンジニア, 営業, 企画
  age_band           enum('20-24','25-29','30-34','35-39','40-44','45-49','50+')
  years_experience_band enum('0-2','3-5','6-10','11+')
  annual_salary_yen        int        -- 年収（総支給）
  monthly_take_home_yen    int null   -- 月の手取り（実データがある場合）
  annual_take_home_yen     int        -- 年間手取り（計算 or 実データ）
  overtime_hours_monthly   int null
  bonus_yen                int null
  source             enum('seed_estimate','public_stat','user_submission')
  is_published       boolean default true
  submitted_at       timestamptz
  created_at         timestamptz

take_home_aggregates          -- company × position × age_band の集計（view or バッチ生成テーブル）
  id                      uuid pk
  company_id              uuid fk
  position                text null   -- null = 全職種平均
  age_band                text null   -- null = 全年代平均
  avg_annual_salary_yen   int
  avg_annual_take_home_yen int
  avg_monthly_take_home_yen int
  sample_size             int
  updated_at              timestamptz
```

### 4.3 税・社保計算用マスタ（手取り計算ロジックの根拠データ）

```
tax_rule_sets
  id             uuid pk
  fiscal_year    int unique         -- 制度変更に追従するため年度で管理
  income_tax_brackets   jsonb       -- 所得税の速算表
  resident_tax_rate     numeric     -- 住民税率（概算10%等）
  social_insurance_rules jsonb      -- 健康保険・厚生年金・雇用保険の概算率
  created_at     timestamptz
```

### 4.4 転職エージェント送客

```
job_agents
  id                 uuid pk
  name               text
  slug               text unique
  logo_url           text null
  target_segment     text           -- 例: 20代向け, ハイクラス, IT専門
  referral_url_template text         -- {utm}等のプレースホルダを含むテンプレートURL
  commission_type    enum('cpa','cpl','flat')
  is_active          boolean default true
  created_at         timestamptz

agent_placements             -- どの文脈でどのエージェントを出すか
  id              uuid pk
  agent_id        uuid fk -> job_agents.id
  target_type     enum('global','industry','company','age_band')
  target_id       text null        -- industry_id/company_id等。globalならnull
  priority        int
  created_at      timestamptz

referral_clicks               -- 送客クリックログ（CPA突合・効果測定用）
  id            uuid pk
  agent_id      uuid fk -> job_agents.id
  company_id    uuid null fk -> companies.id
  page_path     text
  session_id    text null
  utm_params    jsonb null
  clicked_at    timestamptz
```

### 4.5 （将来フェーズ）ユーザー投稿

```
submissions
  id              uuid pk
  company_id      uuid fk
  contact_email   text null        -- 謝礼方式を採る場合に使用、匿名投稿時はnull可
  position        text
  age_band        text
  annual_salary_yen     int
  monthly_take_home_yen int
  evidence_note   text null        -- 「明細の画像あり」等のメモ（モデレーション用）
  status          enum('pending','approved','rejected')
  created_at      timestamptz
  reviewed_at     timestamptz null
```

---

## 5. 画面設計

| パス | 画面 | 主要コンテンツ | 送客導線 |
|------|------|----------------|----------|
| `/` | トップ | 企業名/職種検索バー、手取り計算ツール入口、人気企業・業界ランキング | グローバルCTAバナー |
| `/calculator` | 手取り計算シミュレーター | 年収入力→月/年の手取り内訳（税・社保の内訳付き） | 結果直下に「その年収で転職したら？」CTA |
| `/companies` | 企業一覧 | 業種・従業員規模・平均年収でフィルタ、カード一覧 | リスト内に文脈CTA |
| `/companies/[slug]` | 企業詳細 | 基本情報、年代別手取りグラフ、サンプル数・更新日、類似企業 | company向けagent_placementsのCTA |
| `/industries/[slug]` | 業界別ページ | 業界平均手取り、所属企業一覧 | industry向けCTA |
| `/rankings` | 手取りランキング | 業界別/年代別ランキング | - |
| `/go/[agentSlug]` | 送客リダイレクトAPI | referral_clicksに記録後、302でエージェントURLへ | （画面なし、APIルート） |
| `/submit`（次フェーズ） | データ投稿フォーム | 匿名投稿フォーム | - |
| `/about` `/privacy` `/terms` | 法務系固定ページ | データの扱い・免責事項（推定値である旨） | - |

### 送客導線の実装方針
- 企業詳細・業界ページ・計算結果ページに表示するエージェントは `agent_placements` の `target_type`/`priority` で解決。
- クリックは `/go/[agentSlug]?company=...` を経由させ、`referral_clicks` に記録してからエージェント側のトラッキングURL（UTM付き）に302リダイレクト。CPA請求の根拠ログとして保持。

---

## 6. 技術スタック（決定・2026-11-22更新）

フロントエンド（`frontend/`）とバックエンド（リポジトリルート）を分離する構成に変更。

- フロントエンド: Next.js 16 / React 19 / TypeScript, Tailwind CSS 4 + shadcn/ui。Postgresには直接接続せず、バックエンドのJSON APIからデータ取得。手取り計算ロジックはフロントエンドのみに存在
- バックエンド: Rails 7（リポジトリルート直下）。データ管理用CRUD画面はActiveAdmin、スキーマの正は`Schemafile`（Ridgepoleで反映）。Next.js向けに`/api/v1/...`の読み取り専用JSON APIを提供
- DB: Postgres（docker-composeでRailsが管理。Supabaseは使わない）
- 旧構成（Next.js + Drizzle + Supabase直結）から移行済み。詳細は[../README.md](../README.md)

---

## 7. 法務・信頼性に関する注意点

- シードデータは統計的推定値である旨をサイト全体（企業詳細ページ・計算結果）に明示する免責文を設置。
- 将来ユーザー投稿を開始する場合、個人情報保護方針・虚偽投稿対策（画像証跡の確認等）・利用規約の整備が必要。
- 社保・税制は年度で変わるため `tax_rule_sets` を年度管理し、制度改正時の更新を運用タスクとして残す。

---

## 8. 未決事項（次回以降に決める）

- 提携する転職エージェント（アフィリエイトASP経由か直接契約か）の初期ラインアップ
- シードデータの具体的な出典・加工方法（どの統計を使うか）
- ユーザー投稿開始時の謝礼方式を採用するか否か
- デザインテイスト（配色・雰囲気）

---

## 9. 次のステップ

1. 本SPECの合意
2. Next.jsプロジェクトのscaffold（moation構成を踏襲）
3. Drizzle schema実装
4. 手取り計算ロジック（税・社保）の実装
5. トップ/企業一覧/企業詳細/計算ツールの画面実装
6. シードデータ投入
