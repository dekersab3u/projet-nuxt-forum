import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@vuetify/nuxt'
  ],
  nitro: {
    experimental: {
      websocket: true
    }
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [vuetify()],
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: {
    mysql: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'forum',
    },
  },
})
