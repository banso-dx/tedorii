module Types
  class SalaryDataPointType < Types::BaseObject
    field :id, ID, null: false
    field :company_id, ID, null: false
    field :position, String, null: false
    field :age_band, String, null: false
    field :annual_salary_yen, Integer, null: false
    # user_submission由来で承認済みの行のみ値が入る実測の月間手取り。
    # null の行は calculateTakeHome() による推定値をフロント側で使う。
    field :actual_monthly_take_home_yen, Integer, null: true
    field :source, String, null: false
    field :submission_id, ID, null: true
  end
end
