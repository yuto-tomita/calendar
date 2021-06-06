<template>
  <div class="m-24 w-4/5 ml-auto mr-auto">
    <div class="mt-5 mb-5">
      <InputText v-model="formState.email" label="メールアドレス" />
    </div>
    <div class="mb-5">
      <InputText v-model="formState.password" label="パスワード" />
    </div>
    <div class="text-right">
      <Button label="ログイン" @click="login" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { provider, auth } from '../plugins/firebase'
// import { validateRequired } from '../utils/validate'
export default defineComponent({
  setup () {
    const formState = reactive({
      email: '',
      password: ''
    })

    const login = async () => {
      const googleProvider = provider
      try {
        await auth.signInWithPopup(googleProvider)
      } catch (e) {
        console.log(e)
      }
    }

    return {
      formState,
      login
    }
  }
})
</script>
