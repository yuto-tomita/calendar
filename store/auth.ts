import { defineStore } from 'pinia'
import { auth, provider } from '../plugins/firebase'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
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
        const res = await auth.signInWithPopup(provider)

        this.email = res.additionalUserInfo.profile.email
        this.name = res.additionalUserInfo.profile.name
      } catch (e) {
        throw new Error('ログインに失敗 ')
      }
    }
  }
})
