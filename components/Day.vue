<template>
  <div>
    <div v-for="hour in hours" :key="hour.id">
      {{ hour.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
export default defineComponent({
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
