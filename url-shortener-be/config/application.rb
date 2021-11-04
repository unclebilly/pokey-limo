require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module UrlShortenerBe
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    config.logger    = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
    config.cache_store = :redis_store, ENV['CACHE_URL'],
                     { namespace: 'url-shortener::cache' }
    config.active_job.queue_adapter = :sidekiq 
  end
end
