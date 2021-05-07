<template>
  <div>
    {{ displayDay }}
    <div v-for="hour in hours" :key="hour.id">
      {{ hour.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
export default defineComponent({
  props: {
    displayDay: {
      type: String,
      required: true
    }
  },
  setup () {
    const hours = computed(() => {
      return [...Array(24)].map((_, index) => {
        return {
          id: index,
          label: `${index}:00`
        }
      })
    })

    return { hours }
  }
})
</script>
