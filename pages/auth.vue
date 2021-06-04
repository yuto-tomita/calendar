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
    const login = () => {
      console.log(auth)
    }

    return {
      formState,
      login
    }
  }
})
</script>
