<template>
  <header class="h-14 shadow relative">
    <div class="flex flex-row-reverse mr-20">
      <div class="absolute bottom-0 font-bold text-gray-dark cursor-pointer hover:opacity-30" @click="login">
        Login
      </div>
    </div>
    <div v-if="successOrFailAlert && successOrFailAlert === 'ログインに成功しました'" class="bg-blue-light border-t border-b border-blue-dark px-4 py-3 absolute top-10 w-4/6">
      <div class="text-sm text-gray-dark">
        ログインに成功しました
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
    const successOrFailAlert = ref<string>('')

    const login = async () => {
      try {
        await auth.login()
        userName.value = auth.name
        await displayAlert('ログインに成功しました')
      } catch (e) {
        await displayAlert('ログインに失敗しました')
      }
    }

    async function displayAlert (message: string): Promise<void> {
      successOrFailAlert.value = message

      await new Promise((resolve) => {
        setTimeout(resolve, 3000)
      })

      successOrFailAlert.value = ''
    }

    return {
      login,
      userName,
      successOrFailAlert
    }
  }
})
</script>
