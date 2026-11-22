module Mutations
  class CreateReferralClick < BaseMutation
    argument :agent_id, ID, required: true
    argument :company_id, ID, required: false
    argument :page_path, String, required: true
    argument :session_id, String, required: false
    argument :utm_params, GraphQL::Types::JSON, required: false

    field :success, Boolean, null: false

    def resolve(agent_id:, page_path:, company_id: nil, session_id: nil, utm_params: nil)
      ReferralClick.create!(
        agent_id: agent_id,
        company_id: company_id,
        page_path: page_path,
        session_id: session_id,
        utm_params: utm_params,
        clicked_at: Time.current
      )
      { success: true }
    end
  end
end
