import { lucia } from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db } from '../../../lib/server/db';
import { users } from '../../../lib/server/db/schemas/users';
import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { username, password } = form.data;

    const userId = generateIdFromEntropySize(10); // 16 characters long
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // TODO: check if username is already used
    const user = (
      await db
        .insert(users)
        .values({
          id: userId,
          username: username,
          passwordHash: passwordHash,
        })
        .returning()
    )[0];

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    redirect(302, '/');
  },
};
