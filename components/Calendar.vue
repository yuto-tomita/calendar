<template>
  <div>
    <button @click="incrementMonth">
      click me
    </button>
    {{ state.today }}
    <div class="grid grid-cols-7">
      <div v-for="week in state.weeks" :key="week">
        {{ week }}
      </div>
      <div v-for="day in monthLength" :key="day">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  setup () {
    const state = reactive({
      year: moment().month(),
      month: moment().month(),
      today: moment().format('YYYY-MM-DD'),
      weeks: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    })

    const incrementMonth = () => {
      state.today = moment(state.today).add(1, 'M').format('YYYY-MM-DD')
    }

    return { state, incrementMonth }
  }
})
</script>
