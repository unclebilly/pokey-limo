module Api
  class UrlsController < ApplicationController

    def create
      @url = Url.find_or_create_by!(url: url_params[:url])
      render partial: @url, status: :created
    end

    private

    def url_params
      params.require(:url).permit(:url)
    end
  end
end
