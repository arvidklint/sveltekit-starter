import { auth } from './lib/server/auth';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const guard = (event: RequestEvent) => {
  if (event.route.id?.includes('(public)')) {
    return true;
  }
  if (!event.locals.user) {
    redirect(302, '/login');
  }
};

export const handle: Handle = async ({ event, resolve }) => {
  event = await auth(event);

  guard(event);

  return resolve(event);
};
