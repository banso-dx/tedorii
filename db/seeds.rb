# サンプル/プレースホルダーデータ。実データのソース選定は docs/SPEC.md §8 を参照。
# 手取り計算済みの値は保存しない。avg_annual_salary_yen(生の年収)のみを管理し、
# 手取りはフロントエンド(Next.js)の calculateTakeHome() で表示時に算出する。
AdminUser.create!(email: "admin@example.com", password: "password", password_confirmation: "password") if Rails.env.development? && AdminUser.count.zero?

AGE_CURVE = [
  { band: "20-24", multiplier: 0.62, sample: 9 },
  { band: "25-29", multiplier: 0.78, sample: 16 },
  { band: "30-34", multiplier: 0.95, sample: 21 },
  { band: "35-39", multiplier: 1.08, sample: 19 },
  { band: "40-44", multiplier: 1.15, sample: 15 },
  { band: "45-49", multiplier: 1.18, sample: 11 },
  { band: "50+", multiplier: 1.12, sample: 7 },
].freeze

def years_experience_band_for(age_band)
  case age_band
  when "20-24" then "0-2"
  when "25-29" then "3-5"
  when "30-34" then "6-10"
  else "11+"
  end
end

INDUSTRIES = [
  {
    name: "IT・インターネット",
    slug: "it-internet",
    companies: [
      { name: "サンプルテック株式会社", slug: "sample-tech", employee_band: "301-1000", hq_prefecture: "東京都", is_listed: true, established_year: 2005, official_avg_salary_yen: 7_200_000, description: "Webサービスを展開するIT企業（サンプルデータ）。" },
      { name: "サンプルクラウド株式会社", slug: "sample-cloud", employee_band: "51-300", hq_prefecture: "東京都", is_listed: false, established_year: 2014, official_avg_salary_yen: 6_400_000, description: "SaaSプロダクトを開発するスタートアップ（サンプルデータ）。" },
      { name: "サンプルシステムズ株式会社", slug: "sample-systems", employee_band: "1001-5000", hq_prefecture: "大阪府", is_listed: true, established_year: 1992, official_avg_salary_yen: 6_900_000, description: "受託開発・SIを手がける独立系システム会社（サンプルデータ）。" },
    ],
  },
  {
    name: "金融",
    slug: "finance",
    companies: [
      { name: "サンプル銀行株式会社", slug: "sample-bank", employee_band: "5001+", hq_prefecture: "東京都", is_listed: true, established_year: 1950, official_avg_salary_yen: 8_100_000, description: "大手金融機関（サンプルデータ）。" },
      { name: "サンプル証券株式会社", slug: "sample-securities", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: true, established_year: 1965, official_avg_salary_yen: 8_800_000, description: "個人・法人向けの証券会社（サンプルデータ）。" },
      { name: "サンプル生命保険株式会社", slug: "sample-life-insurance", employee_band: "5001+", hq_prefecture: "東京都", is_listed: false, established_year: 1948, official_avg_salary_yen: 7_300_000, description: "生命保険の販売・運用を行う保険会社（サンプルデータ）。" },
    ],
  },
  {
    name: "商社",
    slug: "trading",
    companies: [
      { name: "サンプル物産株式会社", slug: "sample-bussan", employee_band: "5001+", hq_prefecture: "東京都", is_listed: true, established_year: 1947, official_avg_salary_yen: 9_500_000, description: "総合商社（サンプルデータ）。" },
      { name: "サンプル商事株式会社", slug: "sample-shoji", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: true, established_year: 1958, official_avg_salary_yen: 8_300_000, description: "専門商社（サンプルデータ）。" },
      { name: "サンプルトレーディング株式会社", slug: "sample-trading", employee_band: "301-1000", hq_prefecture: "愛知県", is_listed: false, established_year: 1973, official_avg_salary_yen: 6_700_000, description: "機械部品・資材を扱う中堅商社（サンプルデータ）。" },
    ],
  },
  {
    name: "メーカー",
    slug: "manufacturing",
    companies: [
      { name: "サンプル重工業株式会社", slug: "sample-heavy-industries", employee_band: "5001+", hq_prefecture: "神奈川県", is_listed: true, established_year: 1917, official_avg_salary_yen: 7_600_000, description: "産業機械・輸送機器を製造する大手メーカー（サンプルデータ）。" },
      { name: "サンプル電機株式会社", slug: "sample-denki", employee_band: "1001-5000", hq_prefecture: "大阪府", is_listed: true, established_year: 1935, official_avg_salary_yen: 6_600_000, description: "家電・電子部品を製造するメーカー（サンプルデータ）。" },
      { name: "サンプル化学工業株式会社", slug: "sample-chemical", employee_band: "301-1000", hq_prefecture: "千葉県", is_listed: false, established_year: 1961, official_avg_salary_yen: 6_100_000, description: "化学素材を製造するメーカー（サンプルデータ）。" },
    ],
  },
  {
    name: "広告・マスコミ",
    slug: "advertising-media",
    companies: [
      { name: "サンプル広告株式会社", slug: "sample-ad", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: true, established_year: 1960, official_avg_salary_yen: 7_900_000, description: "総合広告代理店（サンプルデータ）。" },
      { name: "サンプル放送株式会社", slug: "sample-broadcast", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: true, established_year: 1953, official_avg_salary_yen: 8_600_000, description: "放送局（サンプルデータ）。" },
      { name: "サンプル出版株式会社", slug: "sample-publishing", employee_band: "301-1000", hq_prefecture: "東京都", is_listed: false, established_year: 1949, official_avg_salary_yen: 5_800_000, description: "出版社（サンプルデータ）。" },
    ],
  },
  {
    name: "コンサルティング",
    slug: "consulting",
    companies: [
      { name: "サンプル戦略コンサルティング株式会社", slug: "sample-strategy-consulting", employee_band: "301-1000", hq_prefecture: "東京都", is_listed: false, established_year: 1998, official_avg_salary_yen: 10_200_000, description: "外資系戦略コンサルティングファーム（サンプルデータ）。" },
      { name: "サンプル総合研究所株式会社", slug: "sample-research-institute", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: true, established_year: 1980, official_avg_salary_yen: 8_200_000, description: "シンクタンク・ITコンサルティング（サンプルデータ）。" },
      { name: "サンプルHRコンサルティング株式会社", slug: "sample-hr-consulting", employee_band: "51-300", hq_prefecture: "東京都", is_listed: false, established_year: 2009, official_avg_salary_yen: 6_800_000, description: "組織・人事領域のコンサルティング会社（サンプルデータ）。" },
    ],
  },
  {
    name: "医療・ヘルスケア",
    slug: "healthcare",
    companies: [
      { name: "サンプル製薬株式会社", slug: "sample-pharma", employee_band: "5001+", hq_prefecture: "大阪府", is_listed: true, established_year: 1940, official_avg_salary_yen: 8_400_000, description: "医薬品メーカー（サンプルデータ）。" },
      { name: "サンプル医療法人グループ", slug: "sample-medical-group", employee_band: "1001-5000", hq_prefecture: "東京都", is_listed: false, established_year: 1975, official_avg_salary_yen: 5_600_000, description: "病院・介護施設を運営する医療法人グループ（サンプルデータ）。" },
      { name: "サンプルヘルステック株式会社", slug: "sample-healthtech", employee_band: "51-300", hq_prefecture: "東京都", is_listed: false, established_year: 2017, official_avg_salary_yen: 6_200_000, description: "デジタルヘルス領域のスタートアップ（サンプルデータ）。" },
    ],
  },
].freeze

puts "🌱 Seeding database..."

it_industry = nil
all_companies = []

INDUSTRIES.each do |industry_def|
  industry = Industry.find_or_create_by!(slug: industry_def[:slug]) { |i| i.name = industry_def[:name] }
  it_industry = industry if industry_def[:slug] == "it-internet"

  industry_def[:companies].each do |company_def|
    company = Company.find_or_create_by!(slug: company_def[:slug]) do |c|
      c.name = company_def[:name]
      c.industry = industry
      c.employee_band = company_def[:employee_band]
      c.hq_prefecture = company_def[:hq_prefecture]
      c.is_listed = company_def[:is_listed]
      c.established_year = company_def[:established_year]
      c.official_avg_salary_yen = company_def[:official_avg_salary_yen]
      c.description = company_def[:description]
    end

    all_companies << company

    salary_sum = 0
    sample_total = 0

    AGE_CURVE.each do |row|
      annual_salary_yen = (company_def[:official_avg_salary_yen] * row[:multiplier]).round

      SalaryDataPoint.find_or_create_by!(company: company, position: "全職種", age_band: row[:band]) do |sdp|
        sdp.years_experience_band = years_experience_band_for(row[:band])
        sdp.annual_salary_yen = annual_salary_yen
        sdp.source = "seed_estimate"
        sdp.is_published = true
        sdp.submitted_at = Time.current
      end

      TakeHomeAggregate.find_or_create_by!(company: company, position: nil, age_band: row[:band]) do |agg|
        agg.avg_annual_salary_yen = annual_salary_yen
        agg.sample_size = row[:sample]
      end

      salary_sum += annual_salary_yen * row[:sample]
      sample_total += row[:sample]
    end

    TakeHomeAggregate.find_or_create_by!(company: company, position: nil, age_band: nil) do |agg|
      agg.avg_annual_salary_yen = (salary_sum / sample_total.to_f).round
      agg.sample_size = sample_total
    end
  end

  puts "✓ industry: #{industry_def[:name]} (#{industry_def[:companies].size} companies)"
end

puts "✓ #{INDUSTRIES.size} industries / #{all_companies.size} companies seeded"

top_companies_by_salary = all_companies.sort_by { |c| -c.official_avg_salary_yen.to_i }.first(2)

agent_general = JobAgent.find_or_create_by!(slug: "sample-agent-general") do |a|
  a.name = "サンプル転職エージェントA"
  a.target_segment = "20代〜40代・総合型"
  a.referral_url_template = "https://example.com/lp/sample-agent-general"
  a.commission_type = "cpa"
end

agent_it = JobAgent.find_or_create_by!(slug: "sample-agent-it") do |a|
  a.name = "サンプル転職エージェントB"
  a.target_segment = "IT・Webエンジニア特化"
  a.referral_url_template = "https://example.com/lp/sample-agent-it"
  a.commission_type = "cpl"
end

agent_high_class = JobAgent.find_or_create_by!(slug: "sample-agent-highclass") do |a|
  a.name = "サンプル転職エージェントC"
  a.target_segment = "ハイクラス・管理職特化"
  a.referral_url_template = "https://example.com/lp/sample-agent-highclass"
  a.commission_type = "flat"
end

AgentPlacement.find_or_create_by!(agent: agent_general, target_type: "global", target_id: nil) do |p|
  p.priority = 0
end

if it_industry
  AgentPlacement.find_or_create_by!(agent: agent_it, target_type: "industry", target_id: it_industry.id) do |p|
    p.priority = 10
  end
end

top_companies_by_salary.each do |company|
  AgentPlacement.find_or_create_by!(agent: agent_high_class, target_type: "company", target_id: company.id) do |p|
    p.priority = 20
  end
end

puts "✓ job_agents + agent_placements"

TaxRuleSet.find_or_create_by!(fiscal_year: 2025) do |t|
  t.income_tax_brackets = { note: "国税庁の速算表をフロントエンド(calculateTakeHome)に直接実装済み。本テーブルは将来の年度別管理用。" }
  t.resident_tax_rate = 0.1
  t.social_insurance_rules = { note: "健康保険9.98%・厚生年金18.3%・雇用保険0.6%（労使合計、2024年度ベースの概算）。" }
end

puts "✓ tax_rule_sets"
puts "✅ Seed complete!"
