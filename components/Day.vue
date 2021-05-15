<template>
  <div>
    <div :class="{ 'text-red-default': isToday() }">
      {{ displayDay }}
    </div>
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
    },
    today: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const hours = computed(() => {
      return [...Array(24)].map((_, index) => {
        return {
          id: index,
          label: `${index}:00`
        }
      })
    })

    const isToday = () => props.today === props.displayDay

    return { hours, isToday }
  }
})
</script>
