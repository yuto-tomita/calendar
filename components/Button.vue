<template>
  <button class="bg-blue-dark px-4 py-2 font-semibold text-white-default inline-flex items-center space-x-2 rounded text-xs h-8 w-auto" @click="emitClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    }
  },
  emit: ['click'],
  setup (_, { emit }) {
    const emitClick = () => emit('click')
    return { emitClick }
  }
})
</script>
