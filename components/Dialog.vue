<template>
  <div class="bg-gray-dark fixed w-full h-full top-0 left-0 bg-opacity-80 flex justify-items-center" @click.self="closeDialog">
    <div class="bg-white-default mx-auto rounded shadow-lg z-50 overflow-y-auto h-3/6 w-2/3 my-auto relative">
      <div class="absolute right-5 cursor-pointer" @click="closeDialog">
        ×
      </div>
      <div class="mr-20 mt-7 ml-7">
        <h1>予定を削除しますか？</h1>
        <div class="flex mt-20">
          <Button label="削除" class="mr-5" @click="deleteSchedule()" />
          <!-- <Button label="編集" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  emit: ['closeDialog'],
  setup (_, { emit }) {
    const closeDialog = () => emit('closeDialog')
    return {
      closeDialog
    }
  }
})
</script>
