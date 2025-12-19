class Food < ApplicationRecord
  # ⬇️ 衝突の原因になるため、以下の行を削除またはコメントアウト
  # has_one_attached :image

  validates :name, presence: true
  validates :price, presence: true

  # ⬇️ imageカラム(string)をそのまま使うので、URL生成メソッドも不要です。削除してください。
  # def image_url
  #   if image.attached?
  #     Rails.application.routes.url_helpers.url_for(image)
  #   else
  #     nil
  #   end
  # end
end