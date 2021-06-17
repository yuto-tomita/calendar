/* eslint-disable camelcase */
import { defineStore } from 'pinia'
import { auth, provider } from '../plugins/firebase'
import { UserState } from './type'

export const authStore = defineStore({
  id: 'auth',
  state: (): UserState => ({
    email: '',
    name: ''
  }),
  getters: {
    userInfo (state): UserState {
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
