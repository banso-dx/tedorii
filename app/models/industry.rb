class Industry < ApplicationRecord
  include Ransackable

  has_many :companies, dependent: :restrict_with_error

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end
