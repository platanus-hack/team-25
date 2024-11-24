import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@vercel/remix';
import { Navbar } from './navbar';
import { authenticator } from '~/services/auth.server';
import { Form } from '@remix-run/react';
import { Button } from '~/components/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

type ErrorCodes = 401 | 403 | 404 | 500;

const errors = {
  401: 'No estas autorizado para ver esta página',
  403: 'No tienes permisos para ver esta página',
  404: 'No se encontró la página',
  500: 'Ups! Algo salió mal',
} as {
  [key in ErrorCodes]: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (await authenticator.isAuthenticated(request)) {
    return redirect('/app');
  }
  const searchParams = new URLSearchParams(request.url);
  const error = searchParams.get('error');
  if (!error) {
    return null;
  }

  const errorCode = +error as ErrorCodes;

  return {
    error: errors[errorCode],
  };
};

export default function Index() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col w-1/3 items-center justify-center">
        <img src="/logo.svg" alt="Elephorum" className="w-64 h-64" />
        <p className="text-4xl text-center font-semibold">
          Unidos por ideas gigantes: conecta, crea y transforma con una red tan
          fuerte como un <span className="text-primary">elefante</span>.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <Form method="post" action="/auth/auth0" className="w-full">
            <Button className="w-full">Login</Button>
          </Form>
          <Form
            action="/auth/auth0?screen_hint=signup"
            method="post"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              Registrarse
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
