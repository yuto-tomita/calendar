<template>
  <div>
    <button @click="login">
      clickMe
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { initializeApp } from '../utils/firebase'
export default defineComponent({
  setup () {
    const formState = reactive({
      email: '',
      password: ''
    })
    const login = () => {
      console.log(initializeApp('email', 'password'))
    }

    return {
      formState,
      login
    }
  }
})
</script>
