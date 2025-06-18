<template>
  <v-container class="mt-10" max-width="500px">
    <v-card>
      <v-card-title>Créer un compte</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field label="Nom" v-model="name" required />
          <v-text-field label="Email" v-model="email" required type="email" />
          <v-text-field label="Mot de passe" v-model="password" required type="password" />

          <v-btn type="submit" color="primary" class="mt-4">S’inscrire</v-btn>
        </v-form>

        <div class="mt-4">
          <NuxtLink to="/connexion">Déjà un compte ? Se connecter</NuxtLink>
        </div>

        <v-alert v-if="error" type="error" class="mt-4">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function register() {
  error.value = ''
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })

    if (res && res.token) {
      document.cookie = `token=${res.token}; path=/`
      router.push('/forums')
    } else {
      error.value = 'Échec de l’inscription.'
    }
  } catch (err: any) {
    error.value = err?.data?.message || 'Erreur inconnue.'
  }
}
</script>
