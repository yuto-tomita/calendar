<template>
  <div
    class=" border-t border-b bg-opacity-40 px-4 py-3 w-4/6"
    :class="{
      'bg-blue-light border-blue-dark ': status,
      'bg-red-light border-red-dark': !status
    }"
  >
    <div class="text-sm">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    message: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }
})
</script>
