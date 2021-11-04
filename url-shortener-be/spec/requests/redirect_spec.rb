require 'rails_helper'

RSpec.describe "Redirects", type: :request do
  let(:url) { Url.create!(url: 'https://example.com') }

  describe "GET /index" do
    it "renders correctly" do
      get "/#{url.slug}"
      expect(response).to have_http_status(:ok)
    end
  end
end
