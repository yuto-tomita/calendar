<template>
  <div class="bg-blue-default text-xs w-11/12 mt-1 rounded cursor-pointer" style="color: white">
    <div class="ml-4">
      {{ schedule.summary }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DaySchedule } from '@/store/type'

export default defineComponent({
  props: {
    schedule: {
      type: Object as PropType<DaySchedule[]>,
      required: true
    }
  }
})
</script>
