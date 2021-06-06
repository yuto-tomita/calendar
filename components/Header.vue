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
import { defineComponent } from '@nuxtjs/composition-api'
import { auth, provider } from '../plugins/firebase'
export default defineComponent({
  setup () {
    const login = async () => {
      try {
        const res = await auth.signInWithPopup(provider)
        console.log(res)
      } catch (e) {
        alert(e)
      }
    }

    return { login }
  }
})
</script>
