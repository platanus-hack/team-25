import { HttpError } from '~/lib/httpError';
import { Person } from '~/types';

async function findPerson({
  sub,
  accessToken,
}: {
  sub: string;
  accessToken: string;
}) {
  const url = new URL('people?sub=' + sub, process.env.API_URL);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return response.json() as Promise<Person[]>;
  }

  throw new HttpError(response.status, 'Failed to fetch person');
}

async function createPerson({
  sub,
  name,
  accessToken,
}: {
  sub: string;
  name: string;
  accessToken: string;
}) {
  const url = new URL('people', process.env.API_URL);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      person: { auth0_id: sub, name },
    }),
  });

  if (response.ok) {
    return response.json() as Promise<Person>;
  }

  throw new HttpError(response.status, 'Failed to create person');
}

export { findPerson, createPerson };
