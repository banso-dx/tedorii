module Api
  module V1
    class JobAgentsController < BaseController
      def index
        agents = JobAgent.where(is_active: true).map do |agent|
          {
            agentId: agent.id,
            name: agent.name,
            slug: agent.slug,
            logoUrl: agent.logo_url,
            targetSegment: agent.target_segment,
            referralUrlTemplate: agent.referral_url_template,
            commissionType: agent.commission_type,
          }
        end
        render json: agents
      end
    end
  end
end
