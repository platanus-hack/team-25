import { HttpError } from '~/lib/httpError';
import { Application, Project } from '~/types';

async function getMyProjects({
  sub,
  accessToken,
  owner,
}: {
  sub: string;
  accessToken: string;
  owner?: boolean;
}) {
  const url = new URL(
    `people/${sub}/projects${owner ? '?owner=true' : ''}`,
    process.env.API_URL
  );
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json() as Promise<Project[]>;
  }

  throw new HttpError(response.status, 'Failed to fetch projects');
}

async function getMyProject({
  sub,
  projectId,
  accessToken,
}: {
  sub: string;
  projectId: number;
  accessToken: string;
}) {
  const url = new URL(
    `people/${sub}/projects/${projectId}`,
    process.env.API_URL
  );
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new HttpError(response.status, 'Failed to fetch project');
}

async function getAllProjects({ accessToken }: { accessToken: string }) {
  const url = new URL(`projects`, process.env.API_URL);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json() as Promise<Project[]>;
  }

  throw new HttpError(response.status, 'Failed to fetch projects');
}

async function getProject({
  projectId,
  accessToken,
}: {
  projectId: number;
  accessToken: string;
}) {
  const url = new URL(`projects/${projectId}`, process.env.API_URL);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json() as Promise<Project>;
  }

  throw new HttpError(response.status, 'Failed to fetch project');
}

async function createProject({
  sub,
  name,
  description,
  accessToken,
}: {
  sub: string;
  name: string;
  description: string;
  accessToken: string;
}) {
  const url = new URL(`people/${sub}/projects`, process.env.API_URL);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      project: { name, description },
    }),
  });

  if (response.ok) {
    return response.json() as Promise<Project>;
  }

  throw new HttpError(response.status, 'Failed to create project');
}

async function applyToProject({
  motivation,
  positionId,
  accessToken,
}: {
  motivation: string;
  positionId: number;
  accessToken: string;
}) {
  const url = new URL(
    `positions/${positionId}/applications`,
    process.env.API_URL
  );
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      application: { motivation },
    }),
  });

  if (response.ok) {
    return response.json() as Promise<Project>;
  }

  throw new HttpError(response.status, 'Failed to apply to project');
}

async function createRole({
  projectId,
  name,
  description,
  vacancies,
  accessToken,
}: {
  projectId: number;
  name: string;
  description: string;
  vacancies: number;
  accessToken: string;
}) {
  const url = new URL(`projects/${projectId}/positions`, process.env.API_URL);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      position: { name, description, vacancies },
    }),
  });

  if (response.ok) {
    return response.json() as Promise<Project>;
  }

  throw new HttpError(response.status, 'Failed to create role');
}

async function getMyApplications({
  sub,
  accessToken,
}: {
  sub: string;
  accessToken: string;
}) {
  const url = new URL(`people/${sub}/applications`, process.env.API_URL);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json() as Promise<Application[]>;
  }

  throw new HttpError(response.status, 'Failed to fetch applications');
}

async function modifyApplication({
  accessToken,
  applicationId,
  status,
  sub,
}: {
  accessToken: string;
  applicationId: number;
  status: string;
  sub: string;
}) {
  const url = new URL(
    `people/${sub}/applications/${applicationId}/change_status`,
    process.env.API_URL
  );
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      application: { status },
    }),
  });

  if (response.ok) {
    return response.json() as Promise<Application>;
  }

  throw new HttpError(response.status, 'Failed to modify application');
}

export {
  getMyProjects,
  getMyProject,
  getAllProjects,
  getProject,
  createProject,
  applyToProject,
  createRole,
  getMyApplications,
  modifyApplication,
};
