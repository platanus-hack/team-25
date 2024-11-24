import type { ActionFunctionArgs, LoaderFunctionArgs } from '@vercel/remix';
import { redirect, useLoaderData, useNavigate } from '@remix-run/react';
import { ArrowLeftCircle } from 'lucide-react';
import { Button } from '~/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/card';

import { createRole, getProject } from '~/api/projects';
import { authenticator } from '~/services/auth.server';
import { PositionsTable } from './positions-table';
import { CreatePositionDialog } from './create-position-dialog';
import { PostulationsTable } from './postulations-table';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const projectId = +params.id!;

  if (isNaN(projectId)) {
    return redirect('/app/projects');
  }

  try {
    const project = await getProject({
      projectId: projectId,
      accessToken: user.accessToken,
    });

    console.log({ ...project });

    return { user, project };
  } catch (error) {
    return redirect('/app/projects');
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const vacancies = formData.get('vacancies') as string;

  if (!name) {
    return {
      error: 'No se pudo crear el rol sin nombre',
    };
  }

  if (!description) {
    return {
      error: 'No se pudo crear el rol sin descripción',
    };
  }

  if (!vacancies) {
    return {
      error: 'No se pudo crear el rol sin vacantes',
    };
  }

  try {
    await createRole({
      projectId: +params.id!,
      name,
      description,
      vacancies: +vacancies,
      accessToken: user.accessToken,
    });

    return {
      message: 'Rol creado con éxito',
    };
  } catch (error) {
    return {
      error: 'No se pudo postular al proyecto',
    };
  }
};

export default function Page() {
  const { project, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const isOwner = user.id === project.owner.auth0_id;

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <Button
        variant={'outline'}
        className="flex items-center justify-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle /> Volver
      </Button>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between h-full">
            <CardTitle className="text-3xl">{project.name}</CardTitle>
            {isOwner && <CreatePositionDialog project_id={project.id} />}
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="h-full">
            <span className="text-lg italic text-muted-foreground font-light">
              Que es?
            </span>
            <div className="flex flex-col justify-between h-full">
              <p className="text-justify">{project.description}</p>
              <div className="flex flex-row gap-2">
                {project.categories.map((category) => (
                  <span
                    key={category.name}
                    className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end ">
              <span className="text-lg italic text-muted-foreground font-light">
                Que busca?
              </span>
            </div>
            <PositionsTable positions={project.positions} isOwner={isOwner} />
          </div>
        </CardContent>
        <CardFooter className="flex  pt-4"></CardFooter>
      </Card>
      {isOwner && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Postulaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <PostulationsTable
              applications={project.applications}
              positions={project.positions}
              projectId={project.id}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
