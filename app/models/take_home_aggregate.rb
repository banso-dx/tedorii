class TakeHomeAggregate < ApplicationRecord
  include Ransackable

  belongs_to :company

  validates :avg_annual_salary_yen, presence: true
  validates :sample_size, presence: true
end
