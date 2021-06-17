
<template>
  <Calendar calendar-list="calendarList" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { tokenStore, apiStore } from '../store'
export default defineComponent({
  setup () {
    const token = tokenStore()
    const api = apiStore()

    const calendarList = async (): Promise<void> => {
      if (token.accessToken.length) {
        await api.getCalendarList(token.accessToken)
        return api.returnCalendarList
      }
    }

    return { calendarList }
  }
})
</script>
