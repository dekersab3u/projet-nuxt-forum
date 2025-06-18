<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ sujet?.titre }}</h1>

    <div v-if="messages && messages.length > 0">
      <div
          v-for="message in messages"
          :key="message.id"
          class="pa-4 mb-2 rounded border"
      >
        <p class="text-caption grey--text">
          Posté par <strong>{{ message.utilisateur.nom }}</strong>
          le {{ formatDate(message.date_creation) }}
        </p>
        <p>{{ message.contenu }}</p>
      </div>
    </div>
    <div v-else>
      <p>Aucun message pour ce sujet.</p>
    </div>
  </div>
  <div v-if="auth.value" class="mt-4">
    <v-card>
      <v-card-title>Répondre au sujet</v-card-title>
      <v-card-text>
        <v-textarea
            v-model="newMessage"
            label="Votre message"
            auto-grow
            rows="3"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitMessage" :loading="loading">
          Envoyer
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <p>Veuillez vous connecter pour répondre.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const sujetId = Number(route.params.id)

const { data: sujet } = await useFetch(`/api/sujets/${sujetId}`)
const { data: messages } = await useFetch(`/api/sujets/${sujetId}/messages`)

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const auth = useAuthStore()
const sujetId = Number(route.params.id)
const newMessage = ref('')
const loading = ref(false)

const submitMessage = async () => {
  if (!newMessage.value.trim()) return
  loading.value = true

  const res = await $fetch('/api/messages', {
    method: 'POST',
    body: {
      sujetId,
      contenu: newMessage.value,
    },
  })

  newMessage.value = ''
  loading.value = false
}
</script>
