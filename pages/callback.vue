import { defineComponent } from "@nuxtjs/composition-api";

<template>
  <div>
    <p>トップページに遷移しない場合、下のリンクをクリックしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import axios from 'axios'
import { calendarApi } from '../store'

export default defineComponent({
  setup () {
    const route = useRoute()
    const api = calendarApi()
    getAccessToken()

    async function getAccessToken () {
      const returnCode = computed(() => route.value.query)
      api.saveCode(returnCode.value.code)
      console.log(returnCode.value.code)

      const params = new URLSearchParams()

      // const body = {
      //   client_id: '513531115468-qkllk6l03aq2pa2rmcouju8hiu0mefdp.apps.googleusercontent.com',
      //   client_secret: 'Zozm5cUXJ-NNPqay5jlMocvO',
      //   grant_type: 'authorization_code',
      //   redirect_uri: 'http://localhost:3000',
      //   code: returnCode.value.code
      // }

      params.append('client_id', '513531115468-qkllk6l03aq2pa2rmcouju8hiu0mefdp.apps.googleusercontent.com')
      params.append('client_secret', 'Zozm5cUXJ-NNPqay5jlMocvO')
      params.append('grant_type', 'authorization_code')
      params.append('redirect_uri', 'http://localhost:3000/callback')
      if (typeof returnCode.value.code === 'string') {
        params.append('code', returnCode.value.code)
      }

      await axios.post('https://oauth2.googleapis.com/token', params).then(response => console.log(response)).catch(err => console.log(err))

      // const router = useRouter()
      // router.push('/')
    }
  }
})
</script>

<style>

</style>
