import { ActionFunctionArgs, redirect } from '@vercel/remix';
import { applyToProject } from '~/api/projects';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  const formData = await request.formData();
  const motivation = formData.get('motivation') as string;
  const positionId = formData.get('positionId');

  if (!positionId) {
    return redirect('/app/projects');
  }

  try {
    await applyToProject({
      positionId: +positionId,
      motivation,
      accessToken: user.accessToken,
    });

    return redirect('/app/my-applications');
  } catch (error) {
    console.error(error);
    return {
      error: 'No se pudo postular al proyecto',
    };
  }
};
