# backend\app\controllers\application_controller.rb

class ApplicationController < ActionController::API
    private

    def authorize_request
        header = request.headers['Authorization']
        token = header&.split(' ')&.last
        begin
            decoded = JWT.decode(token,Rails.application.secret_key_base)[0]
            @current_user_id = decoded['user_id']
        rescue
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end
end