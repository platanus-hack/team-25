import { authenticator } from '~/services/auth.server';
import type { LoaderFunctionArgs } from '@vercel/remix';
import { MetaFunction, Outlet, redirect } from '@remix-run/react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { findPerson } from '~/api/people';

export const meta: MetaFunction = () => {
  return [{ title: 'Elephorum' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const person = await findPerson({
    sub: user.id,
    accessToken: user.accessToken,
  });

  if (person.length === 0) {
    return redirect('/onboarding');
  }

  return { user };
};

export default function Page() {
  return (
    <div className="flex w-full min-h-screen flex-col bg-muted/40 no-scrollbar">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16 h-full no-scrollbar">
        <Topbar />
        <main className="p-4 sm:px-6 sm:py-0 h-full no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
