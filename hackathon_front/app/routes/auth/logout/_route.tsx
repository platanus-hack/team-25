// app/routes/auth.logout.ts
import { redirect, type ActionFunctionArgs } from '@vercel/remix';

import { destroySession, getSession } from '~/services/session.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const logoutURL = new URL(
    '/v2/logout',
    'https://' + process.env.AUTH0_DOMAIN
  );

  logoutURL.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID!);
  logoutURL.searchParams.set('returnTo', import.meta.env.VITE_BASE_URL);

  return redirect(logoutURL.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
