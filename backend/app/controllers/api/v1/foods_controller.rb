# backend\app\controllers\api\v1\foods_controller.rb

module Api
  module V1
    class FoodsController < ApplicationController
      before_action :authorize_request

      def create
        food = Food.new(food_params)
        if food.save
          render json: food, status: :created
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def index
        if params[:keyword].present?
          keyword = params[:keyword].downcase
          foods = Food.where("LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?",
          "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
          else
          foods = Food.all
        end

        render json: foods
      end

      def update
        food = Food.find(params[:id])
        if food.update(food_params)
          render json: food
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def destroy
        food = Food.find(params[:id])
        food.destroy
        head :no_content
      end

      def show
        food = Food.find(params[:id])
        render json: food
      end

      private

      def food_params
        params.require(:food).permit(:image, :name, :price, :description, :full_description, :category)
      end
    end
  end
end