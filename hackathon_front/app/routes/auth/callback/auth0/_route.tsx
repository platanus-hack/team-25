import { type LoaderFunctionArgs } from '@vercel/remix';

import { authenticator } from '~/services/auth.server';

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/app',
    failureRedirect: '/auth/login',
  });
};
