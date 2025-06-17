<!-- pages/index.vue -->
<template>
  <div>
    <h1>Bienvenue sur le forum Nuxt</h1>
    <p>Explorez les forums, les sujets, et participez aux discussions !</p>
  </div>
  <div>
    <h1 class="text-h4 mb-4">Liste des forums</h1>
    <VList>
      <VListItem
          v-for="forum in forums"
          :key="forum.id"
          :to="`/forums/${forum.id}`"
          link
      >
        <VListItemTitle>{{ forum.nom }}</VListItemTitle>
        <VListItemSubtitle>{{ forum.description }}</VListItemSubtitle>
      </VListItem>
    </VList>
  </div>
</template>

<script setup lang="ts">
const { data: forums } = await useFetch('/api/forums')
</script>