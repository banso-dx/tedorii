ActiveAdmin.register Submission do
  actions :index, :show, :edit, :update

  permit_params :status, :reviewed_at

  index do
    selectable_column
    id_column
    column :company
    column :position
    column :age_band
    column :annual_salary_yen
    column :status
    column :created_at
    actions
  end

  filter :company
  filter :status, as: :select, collection: Submission::STATUSES

  form do |f|
    f.inputs do
      f.input :status, as: :select, collection: Submission::STATUSES
      f.input :reviewed_at
    end
    f.actions
  end
end
