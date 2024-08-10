<script lang="ts">
  import type { PageData } from './$types';
  import RegisterForm from './RegisterForm.svelte';

  export let data: PageData;
</script>

<div class="mt-1/5 mx-auto h-screen max-w-sm p-4">
  <div class="h-1/5"></div>
  <h1 class="text-center">Sign up</h1>
  <div class="w-full">
    <RegisterForm data={data.form} />
  </div>
</div>
