import type { LoaderFunctionArgs } from '@vercel/remix';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { PlusCircle } from 'lucide-react';
import { Button } from '~/components/button';
import { authenticator } from '~/services/auth.server';
import { getAllProjects } from '~/api/projects';
import { Suspense } from 'react';
import { ProjectCard, ProjectCardSkeleton } from '~/components/projectCard';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const projects = getAllProjects({
    accessToken: user.accessToken,
  });

  return {
    projects,
  };
};

export default function Page() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div className="no-scrollbar">
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-3xl font-semibold leading-none tracking-tight">
          Proyectos para ti
        </h1>
        <Button asChild variant={'default'}>
          <Link to="./new" className="flex items-center justify-center gap-2">
            Crear proyecto <PlusCircle />
          </Link>
        </Button>
      </div>
      <Suspense fallback={<PageSkeleton />}>
        <Await resolve={projects}>
          {(data) => {
            if (data.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center h-1/2 mt-10 gap-2">
                  <img
                    src="/lonely.png"
                    alt="No tienes proyectos"
                    className="w-1/4"
                  />
                  <div className="text-center">
                    <p className="text-2xl text-muted-foreground font-light">
                      No tienes recomendaciones por el momento.
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={new Date().toDateString()}
                className="grid md:grid-cols-2 gap-4 auto-rows-[minmax(0,auto)] no-scrollbar"
              >
                {data.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4 auto-rows-[minmax(0,auto)]">
      {[...Array(5)].map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
