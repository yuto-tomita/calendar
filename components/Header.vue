<template>
  <header class="h-14 shadow relative">
    <div class="flex flex-row-reverse mr-20">
      <div class="absolute bottom-0 font-bold text-gray-dark cursor-pointer hover:opacity-30" @click="login">
        Login
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { authStore } from '../store'
export default defineComponent({
  setup () {
    const auth = authStore()
    const userName = ref<string>('')

    const login = async () => {
      try {
        await auth.login()
        userName.value = auth.name
      } catch (e) {
        alert(e)
      }
    }

    return { login }
  }
})
</script>
