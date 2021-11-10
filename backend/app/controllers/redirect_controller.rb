class RedirectController < ApplicationController
  before_action :find_url

  def show
    redirect_to @url.url, status: :moved_permanently
  end

  private

  def find_url
    slug = params.require(:slug)
    @url = find_url_with_cache(slug)
  end

  def find_url_with_cache(slug)
    Rails.cache.fetch(slug, expires_in: 1.hour) do
      Url.find_by!(slug: slug)
    end
  end
end
