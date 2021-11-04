class CreateUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :urls do |t|
      t.string :url, null: false
      t.string :slug, null: false
      t.timestamps
    end
  end
end
