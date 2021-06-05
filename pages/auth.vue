<template>
  <div>
    <button @click="login">
      clickMe
    </button>
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
