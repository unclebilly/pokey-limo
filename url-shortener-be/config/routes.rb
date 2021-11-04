Rails.application.routes.draw do
  namespace :api do
    resources :urls, only: [:create]
  end
end
