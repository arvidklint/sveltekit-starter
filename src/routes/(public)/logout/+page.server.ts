import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    console.log('logging out');
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    event.locals.user = null;
    event.locals.session = null;

    redirect(302, '/login');
  },
};
