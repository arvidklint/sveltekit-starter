<script lang="ts">
  import { enhance } from '$app/forms';
  import type { User } from 'lucia';
  import Button from './ui/button/button.svelte';
  import { invalidateAll } from '$app/navigation';

  export let user: User;
</script>

<header class="mx-auto flex w-full max-w-7xl items-center justify-between px-2 py-2">
  <a href="/">Home</a>
  <div class="flex items-center gap-2">
    {user.username}
    <form
      method="post"
      action="/logout"
      use:enhance={() => {
        return () => {
          invalidateAll();
        };
      }}
    >
      <Button type="submit" size="sm" variant="outline">Logout</Button>
    </form>
  </div>
</header>
