Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :api do
    namespace :v1 do
      resources :industries, only: [:index]
      resources :companies, only: [:index]
      resources :salary_aggregates, only: [:index]
      resources :job_agents, only: [:index]
      resources :agent_placements, only: [:index]
      resources :referral_clicks, only: [:create]
    end
  end
end
