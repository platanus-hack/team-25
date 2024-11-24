import type { ActionFunctionArgs } from '@remix-run/node';
import { modifyApplication } from '~/api/projects';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/?error=401',
  });

  console.log(action);

  const formData = await request.formData();
  const applicationId = formData.get('applicationId');
  const status = formData.get('status');

  if (!applicationId || !status) {
    return {
      error: 'No se pudo modificar la postulación',
    };
  }

  try {
    await modifyApplication({
      accessToken: user.accessToken,
      applicationId: Number(applicationId),
      status: status as string,
      sub: user.id,
    });

    return {
      message: 'Postulación modificada con éxito',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'No se pudo modificar la postulación',
    };
  }
};
