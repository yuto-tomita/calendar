import { defineComponent } from "@nuxtjs/composition-api";

<template>
  <div>
    <p>トップページに遷移しない場合、下のリンクをクリックしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import axios from 'axios'
import { tokenStore } from '../store'

export default defineComponent({
  setup () {
    const route = useRoute()
    const store = tokenStore()

    getAccessToken()

    async function getAccessToken () {
      try {
        const code = computed(() => route.value.query)
  
        if (typeof code.value.code === 'string') {
          store.getToken(code.value.code)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script