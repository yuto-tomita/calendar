<template>
  <div
    class=" border-t border-b  px-4 py-3 w-4/6"
    :class="{
      'bg-blue-light border-blue-dark': status,
      'bg-red-default border-red-default': !status
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
