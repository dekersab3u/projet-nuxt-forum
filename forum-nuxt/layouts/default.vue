<!-- layouts/default.vue -->
<template>
  <VApp>
    <VAppBar app color="primary" dark>
      <VToolbarTitle>Forum Nuxt</VToolbarTitle>
      <VSpacer />
      <NuxtLink to="/" class="text-white mx-2">Accueil</NuxtLink>
      <NuxtLink to="/auth/login" class="text-white mx-2">Connexion</NuxtLink>
      <NuxtLink to="/auth/register" class="text-white mx-2">Inscription</NuxtLink>
    </VAppBar>

    <VMain class="pa-4">
      <NuxtPage />
    </VMain>
  </VApp>
</template>
