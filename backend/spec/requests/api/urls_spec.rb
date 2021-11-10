require 'rails_helper'

RSpec.describe "Urls", type: :request do
  let(:headers){{ "ACCEPT" => "application/json" }}
  let(:json) { JSON.parse(response.body) }
  let(:json_url) { json["url"] }
  let(:preexisting_url) { Url.create!(url: 'https://www.example.com/long_url')}

  it "creates urls" do
    post "/api/urls", params: { url: { url: "https://example.com" }}, headers: headers

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:created)
    expect(json_url["url"]).to eq("https://example.com")
    expect(json_url["slug"]).to be
    expect(json_url["shortened_url"]).to eq("http://localhost:3000/#{json_url['slug']}")
  end

  it "handles validation errors" do
    post "/api/urls", params: { url: { url: "not a url" }}, headers: headers

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:unprocessable_entity)
    expect(json["message"]).to be
  end

  it "returns urls already created" do
    post "/api/urls", params: { url: { url: preexisting_url.url }}, headers: headers

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:created)
    expect(json_url["url"]).to eq(preexisting_url.url)
    expect(json_url["slug"]).to eq(preexisting_url.slug)
    expect(json_url["shortened_url"]).to eq(redirect_slug_url(slug: preexisting_url.slug))
  end
end

