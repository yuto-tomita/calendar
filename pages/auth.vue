<template>
  <div class="m-20">
    <InputText label="メールアドレス" />
    <InputText label="パスワード">
      <Button @click="login">
        clickMe
      </Button>
    </inputtext>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
// import { auth } from '../plugins/firebase'
// import { validateRequired } from '../utils/validate'
export default defineComponent({
  setup () {
    const formState = reactive({
      email: '',
      password: ''
    })

    const login = () => {
      // console.log(validate(formState))
      // console.log(await auth.signInWithEmailAndPassword)
    }

    return {
      formState,
      login
    }
  }
})
</script>
