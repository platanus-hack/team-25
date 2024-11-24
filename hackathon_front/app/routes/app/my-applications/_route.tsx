import { Await, Link, useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, type LoaderFunctionArgs } from '@vercel/remix';
import { Rocket } from 'lucide-react';
import { Suspense } from 'react';
import { getMyApplications, modifyApplication } from '~/api/projects';
import { Button } from '~/components/button';
import { authenticator } from '~/services/auth.server';
import { ApplicationsTable } from './applications-table';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const applications = getMyApplications({
    sub: user.id,
    accessToken: user.accessToken,
  });

  return { applications };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const formData = await request.formData();

  const applicationId = formData.get('applicationId');

  try {
    await modifyApplication({
      accessToken: user.accessToken,
      applicationId: Number(applicationId),
      status: 'declined',
      sub: user.id,
    });

    return {
      message: 'Postulacion retirada con exito',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'No se pudo retirar la postulacion',
    };
  }
};

export default function Page() {
  const { applications } = useLoaderData<typeof loader>();

  console.log(applications);

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-3xl font-semibold leading-none tracking-tight pt-[6px]">
          Mis Postulaciones
        </h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={applications}>
          {(data) => {
            console.log(data);
            if (data.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center h-1/2 mt-10 gap-2">
                  <img
                    src="/apply.png"
                    alt="No tienes postulaciones"
                    className="w-1/4 mr-12"
                  />
                  <div className="text-center">
                    <p className="text-2xl text-muted-foreground font-light">
                      Aun no has postulado a ningun proyecto.
                    </p>
                    <Button variant="link">
                      <Link
                        to="../projects"
                        className="flex items-center justify-center gap-2 text-2xl text-primary font-medium"
                      >
                        Quiero ver proyectos!
                        <Rocket strokeWidth={3} className="text-xl" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            }
            return <ApplicationsTable applications={data} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
