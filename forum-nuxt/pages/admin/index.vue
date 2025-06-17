<template>
  <div>
    <h1>Administration</h1>

    <VCard class="pa-4 mb-4" max-width="500">
      <VTextField v-model="nom" label="Nom du forum" />
      <VTextarea v-model="description" label="Description" />
      <VBtn @click="createForum" color="primary">Créer</VBtn>
    </VCard>
  </div>
</template>

<script setup lang="ts">
const nom = ref('')
const description = ref('')

async function createForum() {
  await $fetch('/api/forums/create', {
    method: 'POST',
    body: { nom: nom.value, description: description.value },
  })
  nom.value = ''
  description.value = ''
}
</script>
