<template>
  <div class="flex">
    <div v-for="day in 7" :key="day">
      <Day />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>
