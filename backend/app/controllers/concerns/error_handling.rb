module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def invalid_record(e)
      render json: { message: e.message }, status: :unprocessable_entity
    end

    def not_found
      render file: 'public/404.html', status: :not_found, layout: false
    end
  end
end
