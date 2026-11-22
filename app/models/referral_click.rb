class ReferralClick < ApplicationRecord
  include Ransackable

  belongs_to :agent, class_name: "JobAgent", foreign_key: "agent_id", inverse_of: :referral_clicks
  belongs_to :company, optional: true

  validates :page_path, presence: true
end
