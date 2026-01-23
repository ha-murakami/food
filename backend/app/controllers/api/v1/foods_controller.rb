# backend/app/controllers/api/v1/foods_controller.rb

module Api
  module V1
    class FoodsController < ApplicationController
      before_action :authorize_request, except: [:index, :show]

      def create
        food = Food.new(food_params)
        
        # 画像ファイル保存処理
        if params[:food][:image].present?
          # アップロードされたファイルオブジェクトを取得
          uploaded_file = params[:food][:image] 

          # 保存用のファイル名を生成 (時間がかぶらないようにTime.nowをつける) 
          file_name = "#{Time.now.to_i}_#{uploaded_file.original_filename}"
          
          # 保存先パスを指定 (public/uploadsフォルダ) 
          save_path = Rails.root.join('public', 'uploads', file_name)

          # フォルダが存在しない場合は作成する
          FileUtils.mkdir_p(File.dirname(save_path))

          # ファイルを書き込む
          File.open(save_path, 'wb') do |f|
            f.write(uploaded_file.read)
          end

          # データベースには「ファイル名」を保存する
          food.image = file_name
        end

        if food.save
          render json: food, status: :created
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def update
        food = Food.find(params[:id])
        
        update_params = food_params.to_h

        if params[:food][:image].present? && params[:food][:image].is_a?(ActionDispatch::Http::UploadedFile)
          uploaded_file = params[:food][:image]
          file_name = "#{Time.now.to_i}_#{uploaded_file.original_filename}"
          save_path = Rails.root.join('public', 'uploads', file_name)
          
          FileUtils.mkdir_p(File.dirname(save_path))
          File.open(save_path, 'wb') do |f|
            f.write(uploaded_file.read)
          end

          update_params[:image] = file_name
        else
          update_params.delete(:image)
        end

        if food.update(update_params)
          render json: food
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end
      def index
        foods = Food.all

        if params[:q].present?
          q = "%#{ActiveRecord::Base.sanitize_sql_like(params[:q].to_s.strip)}%"
          foods = foods.where("name LIKE ? OR description LIKE ?", q, q)
        end

        if params[:category].present?
          foods = foods.where(category: params[:category])
        end

        render json: foods
      end


      def show
        food = Food.find(params[:id])
        render json: food
      end

      def destroy
        food = Food.find(params[:id])
        food.destroy
        head :no_content
      end

      private

      def food_params
        params.require(:food).permit(:name, :price, :description, :full_description, :category, :available, :image)
      end
    end
  end
end