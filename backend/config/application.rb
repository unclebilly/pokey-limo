require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module UrlShortenerBe
  class Application < Rails::Application
    config.api_only = true
    config.load_defaults 6.1
    config.logger    = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
    config.cache_store = :redis_cache_store, {
      url: ENV['CACHE_URL'],
      namespace: 'url-shortener::cache' }
    config.active_job.queue_adapter = :sidekiq 
  end
end