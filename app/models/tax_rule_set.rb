class TaxRuleSet < ApplicationRecord
  include Ransackable

  validates :fiscal_year, presence: true, uniqueness: true
end
