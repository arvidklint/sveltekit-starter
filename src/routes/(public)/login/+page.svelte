<script lang="ts">
  import type { PageData } from './$types';
  import LoginForm from './LoginForm.svelte';

  export let data: PageData;
</script>

<div class="mt-1/5 mx-auto h-screen max-w-sm p-4">
  <div class="h-1/5"></div>
  <h1 class="text-center">Login</h1>
  <div class="w-full">
    <LoginForm data={data.form} />
  </div>
</div>
