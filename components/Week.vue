<template>
  <div class="flex">
    <div v-for="(day, index) in 7" :key="index" class="flex-1">
      <Day :display-day="currentWeek[index]" :today="today" :schedule="schedule" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface Schedule {
  date: string
  startHour: number | string
  endHour: number | string,
  schedule: string
}

export default defineComponent({
  props: {
    currentWeek: {
      type: Array as PropType<string[]>,
      required: true
    },
    schedule: {
      type: Object as PropType<Schedule>,
      required: true
    },
    today: {
      type: String,
      required: true
    }
  }
})
</script>
