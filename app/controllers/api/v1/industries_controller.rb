module Api
  module V1
    class IndustriesController < BaseController
      def index
        industries = Industry.order(:name).map do |industry|
          { id: industry.id, name: industry.name, slug: industry.slug }
        end
        render json: industries
      end
    end
  end
end
