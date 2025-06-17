<template>
  <div>
    <h1 class="text-h4 mb-4">Forum : {{ forum?.nom }}</h1>
    <p>{{ forum?.description }}</p>
    <hr />

    <!-- Liste des sujets (à venir) -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const forumId = route.params.id
const { data: forum } = await useFetch(`/api/forums/${forumId}`)
</script>
