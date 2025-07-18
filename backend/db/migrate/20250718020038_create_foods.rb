class CreateFoods < ActiveRecord::Migration[8.0]
  def change
    create_table :foods do |t|
      t.string :image
      t.string :name
      t.integer :price
      t.string :description
      t.text :full_description
      t.string :category

      t.timestamps
    end
  end
end
