module Types
  class AgentPlacementType < Types::BaseObject
    field :agent_id, ID, null: false
    field :target_type, String, null: false
    field :target_id, String, null: true
    field :priority, Integer, null: false
  end
end
