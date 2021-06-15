import { defineStore } from 'pinia'
import axios from 'axios'

export const apiStore = defineStore({
  id: 'api',
  state: () => ({
    calendarList: []
  }),
  getters: {
    returnCalendarList (state) {
      return state.calendarList
    }
  },
  actions: {
    async getCalendarList (accessToken: string) {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/qualidea01@gmail.com/events', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {}
          })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
