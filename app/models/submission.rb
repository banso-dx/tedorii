class Submission < ApplicationRecord
  include Ransackable

  STATUSES = ["pending", "approved", "rejected"].freeze

  belongs_to :company

  validates :position, presence: true
  validates :age_band, presence: true
  validates :annual_salary_yen, presence: true
  validates :monthly_take_home_yen, presence: true
  validates :status, presence: true, inclusion: { in: STATUSES }
end
