<template>
  <div>{{ selectDays }}</div>
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
