ActiveAdmin.register JobAgent do
  permit_params :name, :slug, :logo_url, :target_segment, :referral_url_template, :commission_type, :is_active

  index do
    selectable_column
    id_column
    column :name
    column :target_segment
    column :commission_type
    column :is_active
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :slug
      f.input :logo_url
      f.input :target_segment
      f.input :referral_url_template
      f.input :commission_type, as: :select, collection: JobAgent::COMMISSION_TYPES
      f.input :is_active
    end
    f.actions
  end
end
