<template>
  <div>
    <p>hoge</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import { tokenStore } from '../store'

export default defineComponent({
  setup () {
    const route = useRoute()
    const store = tokenStore()
    getAccessToken()

    async function getAccessToken () {
      try {
        const code = computed(() => route.value.query)

        if (typeof code.value.code === 'string') {
          await store.getAccessToken(code.value.code)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>
