<template>
  <div>
    <h1 class="text-h4 mb-4">Forum : {{ forum?.nom }}</h1>
    <p>{{ forum?.description }}</p>
    <hr />

    <v-pagination
        v-model="pageLocal"
        :length="totalPages"
        @update:model-value="changePage"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const forumId = route.params.id
const page = computed(() => Number(route.query.page || 1))

const { data: sujets } = await useFetch(`/api/forums/${forumId}?page=${page.value}`)
const { data: forum } = await useFetch(`/api/forums/${forumId}`)
const setup = ( => {
  const pageLocal = ref(page.value)
  const totalPages = 10 // à adapter

  const changePage = (newPage: number) => {
    navigateTo({ query: { page: newPage } })
  }
})

</script>
