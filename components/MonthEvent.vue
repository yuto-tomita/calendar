<template>
  <div>
    <div class="bg-blue-default text-xs w-11/12 mt-1 rounded cursor-pointer" style="color: white">
      <div class="ml-4">
        {{ schedule.event }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface Schedule {
  date: string
  startHour: string | number
  endHour: string | number
  event: string
}

export default defineComponent({
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
      required: true
    }
  }
})
</script>
