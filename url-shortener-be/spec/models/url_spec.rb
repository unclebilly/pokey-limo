require 'rails_helper'

RSpec.describe Url, type: :model do
  subject { Url.new(url: "https://example.com", slug: "aAa")}

  describe "URL" do
    it { is_expected.to validate_uniqueness_of(:url) }
    it { is_expected.to validate_presence_of(:url) }
    it { is_expected.to validate_url_of(:url) }
    it { is_expected.to validate_length_of(:url).is_at_least(10).is_at_most(2048) }
  end

  describe "Slug" do
    it { is_expected.to validate_length_of(:slug).is_at_least(8).is_at_most(255) }
  end
end
