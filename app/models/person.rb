class Person < ApplicationRecord
  has_many :projects, foreign_key: :owner_id
  has_many :applications, foreign_key: :person_id

  validates :name, on: :create, presence: true
  validates :auth0_id, on: :create, presence: true

end
