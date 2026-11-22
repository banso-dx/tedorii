class AgentPlacement < ApplicationRecord
  include Ransackable

  TARGET_TYPES = ["global", "industry", "company", "age_band"].freeze

  belongs_to :agent, class_name: "JobAgent", foreign_key: "agent_id", inverse_of: :agent_placements

  validates :target_type, presence: true, inclusion: { in: TARGET_TYPES }
end
