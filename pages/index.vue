<template>
  <div>
    <Calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Calendar from '~/components/Calendar.vue'

export default defineComponent({
  components: {
    Calendar
  }
})

</script>
