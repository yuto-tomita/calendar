
<template>
  <Calendar :calendar-list="calendarList" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { tokenStore, apiStore } from '../store'
import { DaySchedule } from '../store/type'
export default defineComponent({
  setup () {
    const token = tokenStore()
    const api = apiStore()

    const calendarList = async (): Promise<DaySchedule[]> => {
      if (token.accessToken.length) {
        await api.getCalendarList(token.accessToken)
        return api.returnCalendarList
      } else {
        return []
      }
    }

    return { calendarList }
  }
})
</script>
