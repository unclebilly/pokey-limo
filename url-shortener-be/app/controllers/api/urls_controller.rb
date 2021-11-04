module Api
  class UrlsController < ApplicationController

    def create
      @url = Url.create!(url_params)
      render json: @url, status: :created
    end

    private

    def url_params
      params.require(:url).permit(:url)
    end
  end
end
