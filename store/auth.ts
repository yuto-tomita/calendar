/* eslint-disable camelcase */
import { defineStore } from 'pinia'
import { auth, provider } from '../plugins/firebase'

interface User {
  email: string | undefined | null
  name: string | undefined | null
}

export const authStore = defineStore({
  id: 'auth',
  state: (): User => ({
    email: '',
    name: ''
  }),
  getters: {
    userInfo (state) {
      return state
    }
  },
  actions: {
    async login () {
      try {
        await auth.signInWithPopup(provider)

        this.email = auth.currentUser?.email
        this.name = auth.currentUser?.displayName
      } catch (e) {
        throw new Error('ログインに失敗 ')
      }
    }
  }
})
