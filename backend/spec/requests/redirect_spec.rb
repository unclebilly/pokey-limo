require 'rails_helper'

RSpec.describe "Redirects", type: :request do
  let(:url) { Url.create!(url: 'https://example.com') }

  describe "GET /:slug" do
    it "renders correctly" do
      get "/#{url.slug}"
      expect(response).to have_http_status(:moved_permanently)
      expect(response).to redirect_to(url.url)
    end

    it "renders 404 when missing" do
      get '/not_a_slug'
      expect(response).to have_http_status(:not_found)
    end

    it "caches URLs" do
      expect(Url).to receive(:find_by!).with(slug: url.slug).once.and_return(url)

      2.times do
        get "/#{url.slug}"
        expect(response).to have_http_status(:moved_permanently)
        expect(response).to redirect_to(url.url)
      end
    end
  end
end