class Url < ApplicationRecord
  validates :url, url: true, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true

  before_create :generate_unique_slug

  private

  def generate_unique_slug
    self.slug ||= generate_slug

    while(self.class.where(slug: slug).count) > 0
      self.slug = generate_slug
    end
  end

  ##
  # URL-safe base64 is 62 ascii characters.  With 8 characters in a slug
  # that's 218,340,105,584,896 possibilities.
  #
  def generate_slug
    SecureRandom.urlsafe_base64(8)
  end
end
