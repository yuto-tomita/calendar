<template>
  <div>
    <p>{{ isAuthSuccess }}</p>
    <p>{{ timeLimit }}秒後にホーム画面に遷移します</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed, ref, useRouter } from '@nuxtjs/composition-api'
import { tokenStore } from '../store'

export default defineComponent({
  setup () {
    const route = useRoute()
    const store = tokenStore()
    const code = computed(() => route.value.query)
    const timeLimit = ref<number>(5)
    const isAuthSuccess = ref<string>('')
    const router = useRouter()

    getAccessToken()
    fiveCountToTopPage()

    async function getAccessToken () {
      try {
        if (typeof code.value.code === 'string') {
          await store.getAccessToken(code.value.code)
          isAuthSuccess.value = 'ログインに成功しました'
        }
      } catch (e) {
        isAuthSuccess.value = 'ログインに失敗しました'
      }
    }

    function fiveCountToTopPage () {
      const timer = setInterval(() => {
        if (timeLimit.value !== 0) {
          timeLimit.value = timeLimit.value - 1
        } else {
          clearInterval(timer)
          router.push('/')
        }
      }, 1000)
    }

    return { isAuthSuccess, timeLimit }
  }
})
</script>
