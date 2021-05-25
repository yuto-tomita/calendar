<template>
  <div class="bg-gray-dark fixed w-full h-full top-0 left-0 bg-opacity-80 flex justify-items-center">
    <div class="bg-white-default mx-auto rounded shadow-lg z-50 overflow-y-auto h-3/6 w-2/3 my-auto relative">
      <div class="absolute right-5">
        ×
      </div>
      {{ selectDays }}
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
    selectDays: {
      type: Object as PropType<CalendarObject>,
      required: true
    }
  }
})
</script>
