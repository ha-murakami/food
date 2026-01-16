# backend/app/controllers/api/v1/foods_controller.rb

module Api
  module V1
    class FoodsController < ApplicationController
      before_action :authorize_request, except: [:index, :show]

      def create
        # DB保存用のパラメータを準備
        food = Food.new(food_params)
        
        # 画像ファイル保存処理 (資料 P.5の内容 )
        if params[:food][:image].present?
          # 1. アップロードされたファイルオブジェクトを取得
          uploaded_file = params[:food][:image] 

          # 2. 保存用のファイル名を生成 (時間がかぶらないようにTime.nowをつける) [cite: 121]
          file_name = "#{Time.now.to_i}_#{uploaded_file.original_filename}"
          
          # 3. 保存先パスを指定 (public/uploadsフォルダ) [cite: 122]
          save_path = Rails.root.join('public', 'uploads', file_name)

          # 4. フォルダが存在しない場合は作成する (念の為)
          FileUtils.mkdir_p(File.dirname(save_path))

          # 5. ファイルを書き込む [cite: 123]
          File.open(save_path, 'wb') do |f|
            f.write(uploaded_file.read)
          end

          # 6. データベースには「ファイル名」を保存する
          food.image = file_name
        end

        if food.save
          render json: food, status: :created
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      # updateメソッドも同様に修正が必要です
      def update
        food = Food.find(params[:id])
        
        # update用のパラメータをコピー
        update_params = food_params.to_h

        # 画像が送られてきた場合のみ処理
        if params[:food][:image].present? && params[:food][:image].is_a?(ActionDispatch::Http::UploadedFile)
          uploaded_file = params[:food][:image]
          file_name = "#{Time.now.to_i}_#{uploaded_file.original_filename}"
          save_path = Rails.root.join('public', 'uploads', file_name)
          
          FileUtils.mkdir_p(File.dirname(save_path))
          File.open(save_path, 'wb') do |f|
            f.write(uploaded_file.read)
          end

          # パラメータ内の画像情報を「ファイル名(文字列)」に書き換える
          update_params[:image] = file_name
        else
          # 画像が送られてこなかった場合は、既存の画像を維持するためにキーを削除
          update_params.delete(:image)
        end

        if food.update(update_params)
          render json: food
        else
          render json: { errors: food.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      # ... (index, show, destroy は変更なし) ...
      def index
        # まず全件取得の準備
        foods = Food.all

        # もし params[:name] (検索ワード) があったら、名前であいまい検索(LIKE)する
        if params[:name].present?
          # % を使うことで「〜を含む」検索になります
          foods = foods.where("name LIKE ?", "%#{params[:name]}%")
        end

        render json: foods
      end
      
      def show
        # 省略 (前回と同じ)
        food = Food.find(params[:id])
        render json: food
      end

      def destroy
        # 省略 (前回と同じ)
        food = Food.find(params[:id])
        food.destroy
        head :no_content
      end

      private

      def food_params
        # image も許可する
        params.require(:food).permit(:name, :price, :description, :full_description, :category, :available, :image)
      end
    end
  end
end