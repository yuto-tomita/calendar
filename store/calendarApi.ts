import { defineStore } from 'pinia'

interface Code {
  code: string | null | string[]
}

export const calendarApi = defineStore({
  id: 'calendarApi',
  state: ():Code => ({
    code: ''
  }),
  getters: {
    code (state) {
      return state.code
    }
  },
  actions: {
    saveCode<T> (code: T) {
      this.code = code
    }
  }
})
