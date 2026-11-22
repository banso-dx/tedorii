class SalaryDataPoint < ApplicationRecord
  include Ransackable

  AGE_BANDS = ["20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50+"].freeze
  YEARS_EXPERIENCE_BANDS = ["0-2", "3-5", "6-10", "11+"].freeze
  SOURCES = ["seed_estimate", "public_stat", "user_submission"].freeze

  belongs_to :company

  validates :position, presence: true
  validates :age_band, presence: true, inclusion: { in: AGE_BANDS }
  validates :years_experience_band, presence: true, inclusion: { in: YEARS_EXPERIENCE_BANDS }
  validates :annual_salary_yen, presence: true
  validates :source, presence: true, inclusion: { in: SOURCES }
end
