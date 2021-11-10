class AddUniqueIndexToSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :urls, :slug, unique: true
  end
end
