module Api
  module V1
    class ReferralClicksController < BaseController
      def create
        ReferralClick.create!(
          agent_id: params.require(:agentId),
          company_id: params[:companyId].presence,
          page_path: params.require(:pagePath),
          session_id: params[:sessionId],
          utm_params: params[:utmParams]&.to_unsafe_h,
          clicked_at: Time.current
        )
        head :created
      end
    end
  end
end
