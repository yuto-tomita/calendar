export interface CalendarList {
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

export interface ApiState {
  calendarList: CalendarList[]
}

export type DaySchedule = Pick<CalendarList, 'summary' | 'created' | 'id' | 'start' | 'end'>

export interface UserState {
  email: string | null | undefined
  name: string | null | undefined
}
