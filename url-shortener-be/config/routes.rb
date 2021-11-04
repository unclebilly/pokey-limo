Rails.application.routes.draw do
  namespace :api do
    resources :urls, only: [:create]
  end

  get '/:slug', as: 'redirect_slug', to: 'redirect#show' # constraints: {slug: regex}
end
