module Api
  module V1
    class AgentPlacementsController < BaseController
      def index
        placements = AgentPlacement.joins(:agent).where(job_agents: { is_active: true }).map do |placement|
          {
            agentId: placement.agent_id,
            targetType: placement.target_type,
            targetId: placement.target_id,
            priority: placement.priority,
          }
        end
        render json: placements
      end
    end
  end
end
