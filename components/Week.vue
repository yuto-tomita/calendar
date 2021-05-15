<template>
  <div class="flex">
    <div v-for="(day, index) in 7" :key="index" class="flex-1">
      <Day :display-day="currentWeek[index]" :today="today" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface CalendarObject {
  label: number
  value: string
}

export default defineComponent({
  props: {
    currentWeek: {
      type: Array as PropType<string[]>,
      required: true
    },
    schedule: {
      type: Object as PropType<CalendarObject>,
      required: true
    },
    today: {
      type: String,
      required: true
    }
  }
})
</script>
