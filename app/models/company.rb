class Company < ApplicationRecord
  include Ransackable

  EMPLOYEE_BANDS = ["1-50", "51-300", "301-1000", "1001-5000", "5001+"].freeze

  belongs_to :industry
  has_many :salary_data_points, dependent: :destroy
  has_many :take_home_aggregates, dependent: :destroy
  has_many :referral_clicks, dependent: :nullify
  has_many :submissions, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :employee_band, presence: true, inclusion: { in: EMPLOYEE_BANDS }
end
