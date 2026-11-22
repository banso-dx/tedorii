module Types
  class CompanyType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :employee_band, String, null: false
    field :hq_prefecture, String, null: true
    field :is_listed, Boolean, null: false
    field :established_year, Integer, null: true
    field :official_avg_salary_yen, Integer, null: true
    field :logo_url, String, null: true
    field :description, String, null: true
    field :industry_id, ID, null: false
    field :industry_name, String, null: false
    field :industry_slug, String, null: false

    def industry_name
      object.industry.name
    end

    def industry_slug
      object.industry.slug
    end
  end
end
