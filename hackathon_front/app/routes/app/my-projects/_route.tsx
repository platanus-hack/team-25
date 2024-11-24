import type { LoaderFunctionArgs } from '@vercel/remix';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { HandMetal, PlusCircle } from 'lucide-react';
import { Button } from '~/components/button';
import { authenticator } from '~/services/auth.server';
import { getMyProjects } from '~/api/projects';
import { Suspense } from 'react';
import { ProjectCard, ProjectCardSkeleton } from '~/components/projectCard';
import { ProjectTypeTab } from './project-type-tab';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get('type');

  const myProjects = getMyProjects({
    sub: user.id,
    accessToken: user.accessToken,
    owner: type !== 'member',
  });

  return {
    myProjects,
  };
};

export default function Page() {
  const { myProjects } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-none tracking-tight">
            Mis Proyectos
          </h1>
          <ProjectTypeTab />
        </div>
        <Button asChild variant={'default'}>
          <Link
            to="../projects/new"
            className="flex items-center justify-center gap-2"
          >
            Crear proyecto <PlusCircle />
          </Link>
        </Button>
      </div>
      <Suspense fallback={<PageSkeleton />}>
        <Await resolve={myProjects}>
          {(data) => {
            if (data === null || data.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center h-1/2 mt-10 gap-2">
                  <img
                    src="/lonely.png"
                    alt="No tienes proyectos"
                    className="w-1/4"
                  />
                  <div className="text-center">
                    <p className="text-2xl text-muted-foreground font-light">
                      Uhhh... No tienes proyectos.
                    </p>
                    <Button variant="link">
                      <Link
                        to="../projects/new"
                        className="flex items-center justify-center gap-2 text-2xl text-primary font-medium"
                      >
                        Crea uno!
                        <HandMetal strokeWidth={3} className="text-xl" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            }
            return (
              <div className="grid md:grid-cols-2 gap-4 auto-rows-[minmax(0,auto)]">
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
