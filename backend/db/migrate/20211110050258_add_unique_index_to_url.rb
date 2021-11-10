class AddUniqueIndexToUrl < ActiveRecord::Migration[6.1]
  def change
    add_index :urls, :url, unique: true
  end
end
