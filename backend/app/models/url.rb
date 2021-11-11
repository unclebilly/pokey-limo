class Url < ApplicationRecord
  validates :url, url: true, presence: true, uniqueness: true, length: {in: 10..2048}
  validates_uniqueness_of :slug, case_sensitive: true
  validates :slug, length: { in: 8..255 }

  before_validation :generate_unique_slug, on: :create


  private

  def generate_unique_slug
    self.slug ||= generate_slug

    while(self.class.where(slug: slug).count) > 0
      self.slug = generate_slug
    end
  end

  ##
  # Confusingly, this returns a size of 8 (even though we pass in 6 - 
  # because the string is 4/3 the size of n according to the docs.)
  # URL-safe base64 is 62 ascii characters.  With 8 characters in a slug
  # that's 218,340,105,584,896 possibilities.
  #
  def generate_slug
    SecureRandom.urlsafe_base64(6)
  end
end
