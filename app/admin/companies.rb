ActiveAdmin.register Company do
  permit_params :name, :slug, :industry_id, :employee_band, :hq_prefecture, :is_listed,
                :established_year, :official_avg_salary_yen, :logo_url, :description

  index do
    selectable_column
    id_column
    column :name
    column :industry
    column :employee_band
    column :is_listed
    column :official_avg_salary_yen
    actions
  end

  filter :name
  filter :industry
  filter :is_listed

  form do |f|
    f.inputs do
      f.input :name
      f.input :slug
      f.input :industry
      f.input :employee_band, as: :select, collection: Company::EMPLOYEE_BANDS
      f.input :hq_prefecture
      f.input :is_listed
      f.input :established_year
      f.input :official_avg_salary_yen
      f.input :logo_url
      f.input :description
    end
    f.actions
  end
end
