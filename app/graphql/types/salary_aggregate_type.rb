module Types
  class SalaryAggregateType < Types::BaseObject
    field :id, ID, null: false
    field :company_id, ID, null: false
    field :position, String, null: true
    field :age_band, String, null: true
    field :avg_annual_salary_yen, Integer, null: false
    field :sample_size, Integer, null: false
  end
end
