import { defineStore } from 'pinia'
import axios from 'axios'
import { CalendarList, ApiState, Schedule } from './type'

export const apiStore = defineStore({
  id: 'api',
  state: (): ApiState => ({ calendarList: [] }),
  getters: {
    returnCalendarList (state): Schedule[] {
      return state.calendarList.map((val: CalendarList): Schedule => {
        return {
          summary: val.summary,
          created: val.created,
          id: val.id,
          start: val.start
        }
      })
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
        this.calendarList = res.data.items
      } catch (e) {
        console.log(e)
      }
    }
  }
})
