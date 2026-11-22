module Types
  class JobAgentType < Types::BaseObject
    field :agent_id, ID, null: false, method: :id
    field :name, String, null: false
    field :slug, String, null: false
    field :logo_url, String, null: true
    field :target_segment, String, null: false
    field :referral_url_template, String, null: false
    field :commission_type, String, null: false
  end
end
