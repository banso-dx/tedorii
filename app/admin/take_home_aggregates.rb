ActiveAdmin.register TakeHomeAggregate do
  permit_params :company_id, :position, :age_band, :avg_annual_salary_yen, :sample_size

  index do
    selectable_column
    id_column
    column :company
    column :position
    column :age_band
    column :avg_annual_salary_yen
    column :sample_size
    actions
  end

  filter :company
  filter :age_band, as: :select, collection: SalaryDataPoint::AGE_BANDS

  form do |f|
    f.inputs do
      f.input :company
      f.input :position
      f.input :age_band, as: :select, collection: SalaryDataPoint::AGE_BANDS, include_blank: "全体"
      f.input :avg_annual_salary_yen
      f.input :sample_size
    end
    f.actions
  end
end
