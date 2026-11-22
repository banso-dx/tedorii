# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :industries, [Types::IndustryType], null: false
    def industries
      Industry.order(:name)
    end

    field :companies, [Types::CompanyType], null: false
    def companies
      Company.includes(:industry).order(official_avg_salary_yen: :desc)
    end

    field :salary_aggregates, [Types::SalaryAggregateType], null: false
    def salary_aggregates
      TakeHomeAggregate.all
    end

    # 承認済み(is_published)の生データ行。actual_monthly_take_home_yenが入っている行は
    # 給与明細の実測値、nullの行はcalculateTakeHome()による推定値をフロント側で使う。
    field :salary_data_points, [Types::SalaryDataPointType], null: false
    def salary_data_points
      SalaryDataPoint.where(is_published: true)
    end

    field :job_agents, [Types::JobAgentType], null: false
    def job_agents
      JobAgent.where(is_active: true)
    end

    field :agent_placements, [Types::AgentPlacementType], null: false
    def agent_placements
      AgentPlacement.joins(:agent).where(job_agents: { is_active: true })
    end
  end
end
