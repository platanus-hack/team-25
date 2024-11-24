class Project < ApplicationRecord

  belongs_to :owner, class_name: "Person"
  has_many :positions
  has_many :project_memberships
  has_many :members, through: :project_memberships, source: :person

  validates :name, on: :create, presence: true
  validates :description, on: :create, presence: true
  validates :owner, on: :create, presence: true

  scope :with_more_vacancies, -> {
    joins(:positions)
      .where('positions.vacancies > positions.applications_count')
      .distinct
  }

  scope :with_more_vacancies_v2, -> {
    joins(positions: :applications)
      .where(applications: { status: 'accepted' })
      .group('projects.id', 'positions.id')
      .having('positions.vacancies > COUNT(applications.id)')
      .distinct
  }

  scope :not_mine, ->(id) { where('owner_id != ?', id) }

end
