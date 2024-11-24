import { Form, useActionData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@vercel/remix';
import { createPerson, findPerson } from '~/api/people';
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
import { HttpError } from '~/lib/httpError';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const person = await findPerson({
    sub: user.id,
    accessToken: user.accessToken,
  });

  if (person.length === 1) {
    return redirect('/app');
  }

  const formData = await request.formData();

  const name = formData.get('name') as string;

  if (!name) {
    return {
      errors: {
        name: ['El nombre es requerido'],
      },
    };
  }

  try {
    await createPerson({
      sub: user.id,
      name,
      accessToken: user.accessToken,
    });

    return redirect('/app');
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        errors: {
          name: [error.message],
        },
      };
    }
  }
};

export default function Page() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/logo.svg" alt="Elephorum" className="w-52 mx-auto" />
          <CardTitle className="text-3xl font-semibold">
            Bienvenido a <span className="text-primary">Elephorum</span>
          </CardTitle>
          <CardDescription>Comenzemos con tu nombre...</CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent>
            <div className="space-y-0">
              <Label htmlFor="name">Tu nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Escribe tu nombre"
                className={actionData?.errors?.name ? 'border-destructive' : ''}
              />
              {actionData?.errors?.name && (
                <p
                  id="name-error"
                  className="text-destructive text-sm italic py-0.5 text-left ml-1"
                >
                  {actionData.errors.name[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Comienza a colaborar
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
