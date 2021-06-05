<template>
  <div>
    <button @click="login">
      clickMe
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { auth } from '../plugins/firebase'
export default defineComponent({
  setup () {
    const formState = reactive({
      email: '',
      password: ''
    })

    const login = async () => {
      // console.log(auth.signInWithEmailAndPassword)
    }

    return {
      formState,
      login
    }
  }
})
</script>
