class AdminUser < ApplicationRecord
  include Ransackable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  def self.ransackable_attributes(_auth_object = nil)
    column_names - ["encrypted_password", "reset_password_token"]
  end
end
