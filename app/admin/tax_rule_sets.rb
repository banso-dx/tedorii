ActiveAdmin.register TaxRuleSet do
  permit_params :fiscal_year, :resident_tax_rate

  index do
    selectable_column
    id_column
    column :fiscal_year
    column :resident_tax_rate
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :fiscal_year
      row :resident_tax_rate
      row(:income_tax_brackets) { |r| pre r.income_tax_brackets.to_json }
      row(:social_insurance_rules) { |r| pre r.social_insurance_rules.to_json }
      row :created_at
    end
  end

  form do |f|
    f.inputs do
      f.input :fiscal_year
      f.input :resident_tax_rate
    end
    f.actions
  end
end
