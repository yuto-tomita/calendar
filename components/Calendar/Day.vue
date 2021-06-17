<template>
  <div>
    <div :class="{ 'text-red-default': isToday() }">
      {{ displayDay }}
    </div>
    <div v-for="hour in hours" :key="hour.id" class="flex">
      <div>{{ hour.label }}</div>
      <div :class="returnSchedule(hour)">
        <div v-if="isExistSchedule(hour)">
          {{ schedule.schedule }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'

interface Schedule {
  date: string
  startHour: number
  endHour: number,
  schedule: string
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

    const returnSchedule = (hour: Hour) => {
      if (props.schedule.startHour === hour.id && isSameScheduleDay()) {
        return 'border-t-2 border-r-2 border-l-2'
      } else if (props.schedule.endHour === hour.id && isSameScheduleDay()) {
        return 'border-b-2 border-r-2 border-l-2'
      } else if ((props.schedule.startHour <= hour.id) && (hour.id <= props.schedule.endHour) && isSameScheduleDay()) {
        return 'border-r-2 border-l-2'
      }
    }

    const isExistSchedule = (hour: Hour) => (props.schedule.startHour <= hour.id) && (hour.id <= props.schedule.endHour) && isSameScheduleDay()

    return { hours, isToday, returnSchedule, isExistSchedule }
  }
})
</script>
