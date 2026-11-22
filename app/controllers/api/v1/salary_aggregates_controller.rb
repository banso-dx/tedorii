module Api
  module V1
    class SalaryAggregatesController < BaseController
      def index
        aggregates = TakeHomeAggregate.all.map do |agg|
          {
            id: agg.id,
            companyId: agg.company_id,
            position: agg.position,
            ageBand: agg.age_band,
            avgAnnualSalaryYen: agg.avg_annual_salary_yen,
            sampleSize: agg.sample_size,
          }
        end
        render json: aggregates
      end
    end
  end
end
