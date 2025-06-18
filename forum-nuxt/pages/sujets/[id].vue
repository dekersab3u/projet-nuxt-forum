<template>
  <div>
    <h2 class="text-h5 mb-2">{{ sujet?.titre }}</h2>

    <div v-for="message in messages" :key="message.id" class="pa-2 mb-3 border">
      <p class="text-caption">
        Par <strong>{{ message.username }}</strong>
        le {{ formatDate(message.created_at) }}
      </p>

      <!-- Mode édition -->
      <div v-if="editingMessageId === message.id">
        <v-textarea
            v-model="editedContent"
            auto-grow
            label="Modifier le message"
        />
        <v-btn color="primary" @click="saveEdit(message.id)" class="mr-2">Enregistrer</v-btn>
        <v-btn @click="editingMessageId = null">Annuler</v-btn>
      </div>

      <!-- Mode lecture -->
      <div v-else>
        <p>{{ message.contenu }}</p>
        <v-btn
            v-if="canEdit(message)"
            size="small"
            variant="text"
            @click="startEditing(message)"
        >
          Modifier
        </v-btn>
      </div>
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

const editingMessageId = ref<number | null>(null)
const editedContent = ref('')

const canEdit = (msg: any) => {
  return auth.role === 'admin' || auth.id === msg.utilisateur_id
}

const startEditing = (msg: any) => {
  editingMessageId.value = msg.id
  editedContent.value = msg.contenu
}

const saveEdit = async (id: number) => {
  await $fetch(`/api/messages/${id}`, {
    method: 'PUT',
    body: {
      userId: auth.id,
      role: auth.role,
      newContent: editedContent.value
    }
  })

  // Option 1 : re-fetch
  await refreshNuxtData()

  // Option 2 : modifier localement le message
  // const msg = messages.value.find(m => m.id === id)
  // if (msg) msg.contenu = editedContent.value

  editingMessageId.value = null
  editedContent.value = ''
}
</script>
