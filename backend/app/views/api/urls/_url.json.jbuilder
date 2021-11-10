json.url do
  json.url @url.url
  json.slug @url.slug
  json.shortened_url redirect_slug_url(slug: @url.slug)
end