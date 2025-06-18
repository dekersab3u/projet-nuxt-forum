<template>
  <div>
    <h1 class="text-h4 mb-4">Forum : {{ forum?.nom }}</h1>
    <p>{{ forum?.description }}</p>
    <hr />

    <div v-if="sujets?.length">
      <v-card
          v-for="sujet in sujets"
          :key="sujet.id"
          class="mb-2 pa-2"
      >
        <h3>{{ sujet.titre }}</h3>
        <p>Posté par {{ sujet.username }} - Dernier message de {{ sujet.last_author }}</p>
      </v-card>
    </div>
    <div v-else>
      <p>Aucun sujet pour ce forum.</p>
    </div>

    <v-pagination
        v-model="pageLocal"
        :length="totalPages"
        class="mt-4"
        @update:model-value="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const forumId = route.params.id
const page = computed(() => Number(route.query.page || 1))

const { data: forum } = await useFetch(`/api/forums/${forumId}`)
const { data: sujets } = await useFetch(`/api/forums/${forumId}?page=${page.value}`)

const pageLocal = ref(page.value)
const totalPages = 10 // à adapter dynamiquement si tu as un count total

const changePage = (newPage: number) => {
  router.push({ query: { page: newPage } })
}
</script>
