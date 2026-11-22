ActiveAdmin.register ReferralClick do
  actions :index, :show

  index do
    selectable_column
    id_column
    column :agent
    column :company
    column :page_path
    column :clicked_at
    actions defaults: false do |click|
      link_to "表示", admin_referral_click_path(click)
    end
  end

  filter :agent
  filter :company
  filter :clicked_at
end
