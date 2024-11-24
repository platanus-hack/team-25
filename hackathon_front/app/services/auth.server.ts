// app/utils/auth.server.ts
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from '~/services/session.server';

type User = {
  name: string;
  id: string;
  accessToken: string;
  idToken: string;
};

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: import.meta.env.VITE_BASE_URL + '/auth/callback/auth0',
    clientID: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    domain: process.env.AUTH0_DOMAIN!,
    // audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    audience: 'https://hackaton.elflargo.com/',
  },
  async ({ accessToken, profile, extraParams }) => {
    // Get the user data from your DB or API using the tokens and profile
    return {
      id: profile.id,
      name: profile.name,
      accessToken,
      idToken: extraParams.id_token,
    } as User;
  }
);

authenticator.use(auth0Strategy);
