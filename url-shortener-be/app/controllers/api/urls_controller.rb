module Api
  class UrlsController < ApplicationController

    def create
      ljlkjkj
      @url = Url.create!(url_params)
      render partial: @url, status: :created
    end

    private

    def url_params
      params.require(:url).permit(:url)
    end
  end
end
