module Api
  module V1
    # Next.js(サーバー側)からのみ呼ばれる読み取り中心のJSON API。
    # ブラウザから直接叩かれる想定がないため、CSRF保護は外す。
    class BaseController < ActionController::Base
      skip_before_action :verify_authenticity_token
    end
  end
end
