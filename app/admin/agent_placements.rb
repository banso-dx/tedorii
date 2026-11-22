ActiveAdmin.register AgentPlacement do
  permit_params :agent_id, :target_type, :target_id, :priority

  index do
    selectable_column
    id_column
    column :agent
    column :target_type
    column :target_id
    column :priority
    actions
  end

  filter :target_type, as: :select, collection: AgentPlacement::TARGET_TYPES

  form do |f|
    f.inputs do
      f.input :agent, as: :select, collection: JobAgent.all.map { |a| [a.name, a.id] }
      f.input :target_type, as: :select, collection: AgentPlacement::TARGET_TYPES
      f.input :target_id, hint: "company/industryのUUID、または age_band の値。globalの場合は空欄"
      f.input :priority
    end
    f.actions
  end
end
