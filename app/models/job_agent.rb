class JobAgent < ApplicationRecord
  include Ransackable

  COMMISSION_TYPES = ["cpa", "cpl", "flat"].freeze

  has_many :agent_placements, dependent: :destroy
  has_many :referral_clicks, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :target_segment, presence: true
  validates :referral_url_template, presence: true
  validates :commission_type, presence: true, inclusion: { in: COMMISSION_TYPES }
end
