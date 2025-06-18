<template>
  <div>
    <h2 class="text-h5 mb-2">{{ sujet?.titre }}</h2>

    <div v-for="message in messages" :key="message.id" class="pa-2 border mb-2">
      <p class="text-caption">
        Par <strong>{{ message.username }}</strong> le {{ formatDate(message.created_at) }}
      </p>
      <p>{{ message.content }}</p>
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

const sujetId = route.params.id
const page = computed(() => Number(route.query.page || 1))

const { data: sujet } = await useFetch(`/api/sujets/${sujetId}`)
const { data: messages } = await useFetch(`/api/messages/${sujetId}?page=${page.value}`)

const pageLocal = ref(page.value)
const totalPages = 5 // adapter dynamiquement si possible

const changePage = (newPage: number) => {
  router.push({ query: { page: newPage } })
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>
