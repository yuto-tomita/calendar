<template>
  <header class="h-14 shadow relative">
    <div class="flex flex-row-reverse mr-20">
      <div class="absolute bottom-0 font-bold text-gray-dark cursor-pointer hover:opacity-30" @click="login">
        Login
      </div>
    </div>
    <div v-if="successOrFailAlert && successOrFailAlert === 'ログインに成功しました'">
      <Alert :message="successOrFailAlert" :status="true" />
    </div>
    <div v-else-if="successOrFailAlert && successOrFailAlert === 'ログインに失敗しました'">
      <Alert :message="successOrFailAlert" :status="false" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { authStore } from '../store'
import { connectApi } from '../plugins/calendar'
export default defineComponent({
  setup () {
    const auth = authStore()
    const userName = ref<string | undefined | null>('')
    const successOrFailAlert = ref<string>('')

    const login = async () => {
      try {
        await auth.login()
        userName.value = auth.name
        connectApi()
      } catch (e) {
        console.log(e)
      }
    }

    // async function displayAlert (message: string): Promise<void> {
    //   successOrFailAlert.value = message

    //   await new Promise((resolve) => {
    //     setTimeout(resolve, 3000)
    //   })

    //   successOrFailAlert.value = ''
    // }

    return {
      login,
      userName,
      successOrFailAlert
    }
  }
})
</script>
