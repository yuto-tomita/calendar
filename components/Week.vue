<template>
  <div class="flex">
    <div v-for="(day, index) in 7" :key="index" class="flex-1">
      <Day :display-day="currentWeek[index]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    currentWeek: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup () {

  }
})
</script>
