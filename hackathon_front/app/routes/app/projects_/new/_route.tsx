import type { ActionFunctionArgs } from '@vercel/remix';
import { Form, redirect, useNavigate, useNavigation } from '@remix-run/react';
import { Rocket } from 'lucide-react';
import { Button } from '~/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/card';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { Textarea } from '~/components/textarea';
import { HttpError } from '~/lib/httpError';
import { createProject } from '~/api/projects';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const formData = await request.formData();

  const name = formData.get('name');
  const description = formData.get('description');

  if (!name) {
    return {
      errors: {
        name: ['El nombre es requerido'],
      },
    };
  }

  if (!description) {
    return {
      errors: {
        description: ['La descripcion es requerida'],
      },
    };
  }

  try {
    const project = await createProject({
      sub: user.id,
      name: name as string,
      description: description as string,
      accessToken: user.accessToken,
    });

    return redirect(`/app/projects/${project.id}`);
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        errors: {
          error: [error.message],
        },
      };
    }
    console.error(error);
  }
};

export default function Page() {
  const navigate = useNavigate();
  const { state } = useNavigation();

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-3xl">Crea un nuevo proyecto</CardTitle>
          <CardDescription>
            Completa el formulario para crear un nuevo proyecto y comenzar a
            colaborar con otros estudiantes.
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Nombre del proyecto</Label>
              <Input id="name" name="name" type="text" />
            </div>
            <div>
              <Label htmlFor="name">Descripcion</Label>
              <Textarea
                id="description"
                name="description"
                className="min-h-48"
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4 pt-4">
            <Button
              onClick={() => navigate(-1)}
              disabled={state !== 'idle'}
              variant={'outline'}
              className="flex items-center justify-center gap-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={state !== 'idle'}
              className="flex items-center justify-center gap-2"
            >
              Comienza tu aventura <Rocket />
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
