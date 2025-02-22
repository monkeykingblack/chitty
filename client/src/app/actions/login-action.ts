import type { ActionFunctionArgs } from 'react-router-dom';

import { redirect } from 'react-router-dom';

import { useAuthStore } from '../../store/use-auth-store';

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as { username: string };

  if (!data.username) {
    throw new Error('Username not provided');
  }

  await useAuthStore.getState().login(data);

  return redirect('/');
};
