
<template>
  <Calendar :calendar-list="calendarList" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { tokenStore, apiStore } from '../store'
import { DaySchedule } from '../store/type'
export default defineComponent({
  setup () {
    const token = tokenStore()
    const api = apiStore()
    const calendarList = ref<DaySchedule[]>()

    getCalendarList()

    async function getCalendarList (): Promise<void> {
      if (token.accessToken.length) {
        await api.getCalendarList(token.accessToken)
        calendarList.value = api.returnCalendarList
      }
    }

    return { calendarList }
  }
})
</script>
