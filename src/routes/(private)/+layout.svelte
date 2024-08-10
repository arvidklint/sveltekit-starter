<script lang="ts">
  import Header from '../../lib/components/Header.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div
  class="bg-surface grid min-h-screen grid-cols-1 grid-rows-[auto,_1fr] border-foreground text-foreground"
>
  <Header user={data.user} />
  <main>
    <slot />
  </main>
</div>
