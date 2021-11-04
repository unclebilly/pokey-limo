require 'rails_helper'

RSpec.describe Url, type: :model do
  subject { Url.new(url: "https://example.com")}

  [:url, :slug].each do |field|
    it { is_expected.to validate_uniqueness_of(field) }
    it { is_expected.to validate_presence_of(field) }
  end

  it { is_expected.to validate_url_of(:url) }
end
