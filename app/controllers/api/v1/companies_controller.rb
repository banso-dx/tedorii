module Api
  module V1
    class CompaniesController < BaseController
      def index
        companies = Company.includes(:industry).order(official_avg_salary_yen: :desc).map do |company|
          {
            id: company.id,
            name: company.name,
            slug: company.slug,
            employeeBand: company.employee_band,
            hqPrefecture: company.hq_prefecture,
            isListed: company.is_listed,
            establishedYear: company.established_year,
            officialAvgSalaryYen: company.official_avg_salary_yen,
            logoUrl: company.logo_url,
            description: company.description,
            industryId: company.industry_id,
            industryName: company.industry.name,
            industrySlug: company.industry.slug,
          }
        end
        render json: companies
      end
    end
  end
end
