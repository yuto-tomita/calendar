<template>
  <div class="flex w-full">
    <label class="w-1/6">
      <div class="text-center">{{ label }}</div>
    </label>
    <input class="appearance-none bg-transparent border-b w-full text-gray-dark h-8 focus:outline-none focus:border-blue-dark" type="text" placeholder="予定を入力してください">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>
