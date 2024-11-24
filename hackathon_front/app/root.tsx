import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import { Analytics } from '@vercel/analytics/remix';
import type { LinksFunction } from '@vercel/remix';

import style from './tailwind.css?url';
import sonner from './sonner.css?url';

import { ErrorCard } from './components/errorCard';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'stylesheet', href: style },
  { rel: 'stylesheet', href: sonner },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'icon',
    type: 'image/svg',
    href: '/logo.svg',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="light no-scrollbar">
        {children}
        <ScrollRestoration />
        <SpeedInsights />
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="font-inter h-screen flex items-center justify-center">
          <ErrorCard error={error} />
        </div>
      );
    }
    return <p>Not found</p>;
  }
  return <div />;
}
