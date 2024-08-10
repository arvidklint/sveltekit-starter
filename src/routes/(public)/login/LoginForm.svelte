<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema, type FormSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance, errors } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="username">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.username} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input {...attrs} type="password" bind:value={$formData.password} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <div class="flex items-center justify-between">
    <a href="/register">Register</a>
    <Form.Button>Login</Form.Button>
  </div>
  {#if $errors._errors}
    <div class="text-destructive">
      <ul>
        {#each $errors._errors as error}
          <li>{error}</li>
        {/each}
      </ul>
    </div>
  {/if}
</form>
