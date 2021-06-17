import { defineStore } from 'pinia'
import axios from 'axios'

interface CalendarList {
  created: string
  creator: {
    email: string
    self: boolean
  }
  end: {
    dateTime: string
    timeZone: string
  }
  etag: string
  eventType: string
  htmlLink: string
  iCaUID: string
  id: string
  kind: string
  organizer: {
    email: string
    self: boolean
  }
  reminders: {
    useDefault: boolean
  }
  sequence: number
  start: {
    dateTime: string
    timeZone: string
  }
  status: string
  summary: string
  updated: string
}

interface State {
  calendarList: CalendarList[]
}

export const apiStore = defineStore({
  id: 'api',
  state: (): State => ({ calendarList: [] }),
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
        this.calendarList = res.data.items
        console.log(this.calendarList)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
