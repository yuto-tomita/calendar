<template>
  <div>
    <div :class="{ 'text-red-default': isToday() }">
      {{ displayDay }}
    </div>
    <div v-for="hour in hours" :key="hour.id" class="flex">
      <div>{{ hour.label }}</div>
      <div>{{ returnSchedule(hour) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'

interface Schedule {
  date: string
  startHour: number
  endHour: number
}

interface Hour {
  id: number
  label: string
}

export default defineComponent({
  props: {
    displayDay: {
      type: String,
      required: true
    },
    today: {
      type: String,
      required: true
    },
    schedule: {
      type: Object as PropType<Schedule>,
      required: true
    }
  },
  setup (props) {
    const hours = computed((): Hour[] => {
      return [...Array(24)].map((_, index) => {
        return {
          id: index,
          label: `${index}:00`
        }
      })
    })

    const isToday = () => props.today === props.displayDay

    const isSameScheduleDay = () => props.schedule.date === props.displayDay
    // const scheduleHours = props.schedule.endHour - props.schedule.startHour
    const returnSchedule = (hour: Hour) => {
      if ((props.schedule.startHour <= hour.id) && (hour.id <= props.schedule.endHour) && isSameScheduleDay()) {
        return 'hoge'
      }
    }

    return { hours, isToday, returnSchedule }
  }
})
</script>
