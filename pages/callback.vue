import { defineComponent } from "@nuxtjs/composition-api";

<template>
  <div>
    <p>トップページに遷移しない場合、下のリンクをクリックしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import { calendarApi } from '../store'

export default defineComponent({
  setup () {
    const route = useRoute()
    const api = calendarApi()

    const code = computed(() => route.value.query.code)
    api.saveCode(code)
    console.log(api.code)
  }
})
</script>

<style>

</style>
