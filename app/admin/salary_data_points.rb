ActiveAdmin.register SalaryDataPoint do
  permit_params :company_id, :position, :age_band, :years_experience_band, :annual_salary_yen,
                :overtime_hours_monthly, :bonus_yen, :source, :is_published, :submitted_at

  index do
    selectable_column
    id_column
    column :company
    column :position
    column :age_band
    column :annual_salary_yen
    column :source
    column :is_published
    actions
  end

  filter :company
  filter :age_band, as: :select, collection: SalaryDataPoint::AGE_BANDS
  filter :source, as: :select, collection: SalaryDataPoint::SOURCES

  form do |f|
    f.inputs do
      f.input :company
      f.input :position
      f.input :age_band, as: :select, collection: SalaryDataPoint::AGE_BANDS
      f.input :years_experience_band, as: :select, collection: SalaryDataPoint::YEARS_EXPERIENCE_BANDS
      f.input :annual_salary_yen
      f.input :overtime_hours_monthly
      f.input :bonus_yen
      f.input :source, as: :select, collection: SalaryDataPoint::SOURCES
      f.input :is_published
      f.input :submitted_at
    end
    f.actions
  end
end
