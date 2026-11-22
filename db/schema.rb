# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2026_11_22_084230) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "agent_placements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "agent_id", null: false
    t.string "target_type", null: false
    t.string "target_id"
    t.integer "priority", default: 0, null: false
    t.datetime "created_at", null: false
    t.index ["target_type", "target_id"], name: "index_agent_placements_on_target"
  end

  create_table "companies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "name", null: false
    t.text "slug", null: false
    t.uuid "industry_id", null: false
    t.string "employee_band", null: false
    t.string "hq_prefecture"
    t.boolean "is_listed", default: false, null: false
    t.integer "established_year"
    t.integer "official_avg_salary_yen"
    t.string "logo_url"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["industry_id"], name: "index_companies_on_industry_id"
    t.index ["slug"], name: "index_companies_on_slug", unique: true
  end

  create_table "industries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "name", null: false
    t.text "slug", null: false
    t.datetime "created_at", null: false
    t.index ["slug"], name: "index_industries_on_slug", unique: true
  end

  create_table "job_agents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "name", null: false
    t.text "slug", null: false
    t.string "logo_url"
    t.text "target_segment", null: false
    t.text "referral_url_template", null: false
    t.string "commission_type", default: "cpa", null: false
    t.boolean "is_active", default: true, null: false
    t.datetime "created_at", null: false
    t.index ["slug"], name: "index_job_agents_on_slug", unique: true
  end

  create_table "referral_clicks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "agent_id", null: false
    t.uuid "company_id"
    t.text "page_path", null: false
    t.string "session_id"
    t.jsonb "utm_params"
    t.datetime "clicked_at", null: false
    t.index ["agent_id"], name: "index_referral_clicks_on_agent_id"
    t.index ["clicked_at"], name: "index_referral_clicks_on_clicked_at"
  end

  create_table "salary_data_points", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "company_id", null: false
    t.string "position", null: false
    t.string "age_band", null: false
    t.string "years_experience_band", null: false
    t.integer "annual_salary_yen", null: false
    t.integer "overtime_hours_monthly"
    t.integer "bonus_yen"
    t.string "source", default: "seed_estimate", null: false
    t.boolean "is_published", default: true, null: false
    t.datetime "submitted_at", null: false
    t.datetime "created_at", null: false
    t.integer "actual_monthly_take_home_yen"
    t.uuid "submission_id"
    t.index ["company_id", "age_band"], name: "index_salary_data_points_on_company_id_and_age_band"
    t.index ["company_id"], name: "index_salary_data_points_on_company_id"
    t.index ["submission_id"], name: "index_salary_data_points_on_submission_id", unique: true
  end

  create_table "submissions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "company_id", null: false
    t.string "contact_email"
    t.string "position", null: false
    t.string "age_band", null: false
    t.integer "annual_salary_yen", null: false
    t.integer "monthly_take_home_yen", null: false
    t.text "evidence_note"
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "reviewed_at"
    t.string "years_experience_band", null: false
    t.text "rejection_reason"
  end

  create_table "take_home_aggregates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "company_id", null: false
    t.string "position"
    t.string "age_band"
    t.integer "avg_annual_salary_yen", null: false
    t.integer "sample_size", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "position", "age_band"], name: "index_take_home_aggregates_on_company_position_age", unique: true
    t.index ["company_id"], name: "index_take_home_aggregates_on_company_id"
  end

  create_table "tax_rule_sets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "fiscal_year", null: false
    t.jsonb "income_tax_brackets", null: false
    t.decimal "resident_tax_rate", precision: 5, scale: 4, null: false
    t.jsonb "social_insurance_rules", null: false
    t.datetime "created_at", null: false
    t.index ["fiscal_year"], name: "index_tax_rule_sets_on_fiscal_year", unique: true
  end

  add_foreign_key "agent_placements", "job_agents", column: "agent_id", on_delete: :cascade
  add_foreign_key "companies", "industries", on_delete: :restrict
  add_foreign_key "referral_clicks", "companies", on_delete: :nullify
  add_foreign_key "referral_clicks", "job_agents", column: "agent_id", on_delete: :cascade
  add_foreign_key "salary_data_points", "companies", on_delete: :cascade
  add_foreign_key "salary_data_points", "submissions", on_delete: :nullify
  add_foreign_key "submissions", "companies", on_delete: :cascade
  add_foreign_key "take_home_aggregates", "companies", on_delete: :cascade
end
