import { redirect, type ActionFunctionArgs } from '@vercel/remix';

import { authenticator } from '~/services/auth.server';

export const loader = () => redirect('/login');

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('auth0', request);
};
