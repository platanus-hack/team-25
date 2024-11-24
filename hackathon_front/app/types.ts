type User = {
  name: string;
  id: string;
  accessToken?: string;
  idToken?: string;
};

type Person = {
  name: string;
  id: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  positions: Position[];
  owner: Owner;
  categories: Categorie[];
  applications: Application[];
};

type Position = {
  id: number;
  name: string;
  description: string;
  vacancies: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  applications_count: number;
  has_vacancies_left: boolean;
};

type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'declined';

type Application = {
  id: number;
  motivation: string;
  position_id: number;
  person_id: number;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  person: Person;
};

type Categorie = {
  name: string;
};

type Owner = {
  auth0_id: string;
};

export type { User, Person, Project, Position, ApplicationStatus, Application };
