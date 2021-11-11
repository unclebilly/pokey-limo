class ApplicationController < ActionController::API
  include ErrorHandling

  def default_url_options
    { 
      host: ENV['APP_HOST'], 
      port: ENV['APP_PORT'] 
    }
  end
end
