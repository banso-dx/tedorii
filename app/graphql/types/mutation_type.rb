# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_referral_click, mutation: Mutations::CreateReferralClick
  end
end
