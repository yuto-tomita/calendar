
<template>
  <Calendar />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { tokenStore, apiStore } from '../store'
export default defineComponent({
  setup () {
    const token = tokenStore()
    const api = apiStore()

    if (token.accessToken.length) {
      api.getCalendarList(token.accessToken)
    }
  }
})
</script>
