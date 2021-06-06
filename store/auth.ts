import { defineStore } from 'pinia'
import { auth, provider } from '../plugins/firebase'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    email: ''
  }),
  actions: {
    async login () {
      try {
        const res = await auth.signInWithPopup(provider)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
