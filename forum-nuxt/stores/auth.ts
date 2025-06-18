// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id: number; username: string; role: 'user' | 'admin' },
    }),

    getters: {
        isAuthenticated: (state) => state.user !== null,
        isAdmin: (state) => state.user?.role === 'admin',
        userId: (state) => state.user?.id,
        username: (state) => state.user?.username,
    },

    actions: {
        login(userData: { id: number; username: string; role: 'user' | 'admin' }) {
            this.user = userData
        },

        logout() {
            this.user = null
        },
    },
})
