import { defineStore } from 'pinia'
import { auth, provider } from '../plugins/firebase'

interface User {
  email: string
  name: string
}

export const authStore = defineStore({
  id: 'auth',
  state: ():User => ({
    email: '',
    name: ''
  }),
  actions: {
    async login () {
      try {
        const res = await auth.signInWithPopup(provider)

        this.email = res.additionalUserInfo.profile.email
        this.name = res.additionalUserInfo.profile.name
      } catch (e) {
        throw new Error('ログインに失敗 ')
      }
    }
  }
})
