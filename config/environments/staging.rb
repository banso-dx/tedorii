require "active_support/core_ext/integer/time"

# stg環境向け設定。production.rbをベースに、デバッグしやすいようログレベルを上げている。
Rails.application.configure do
  config.cache_classes = true
  config.eager_load = true

  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Ingressコンテナ内でPuma単体運用のため、静的ファイル配信を有効化。
  config.public_file_server.enabled = true

  # Dockerビルド時にprecompileを行わないため、オンザフライでコンパイルする。
  config.assets.compile = true

  config.active_storage.service = :local

  # stgはログを詳しく出す（本番相当にする場合はproduction.rbに合わせて:infoへ）。
  config.log_level = :debug
  config.log_tags = [ :request_id ]

  config.action_mailer.perform_caching = false

  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false

  config.log_formatter = ::Logger::Formatter.new

  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  config.active_record.dump_schema_after_migration = false
end
