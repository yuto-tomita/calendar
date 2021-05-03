<template>
  <div>
    <button @click="incrementMonth">
      click me
    </button>
    {{ state.formatDate }}
    <div class="grid grid-cols-7">
      <div v-for="week in state.weeks" :key="week">
        {{ week }}
      </div>
      <div v-for="day in monthLengthArray" :key="day">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  setup () {
    const state = reactive({
      year: moment().month(),
      month: moment().month(),
      formatDate: moment().format('YYYY-MM-DD'),
      weeks: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    })

    const incrementMonth = () => {
      state.formatDate = moment(state.formatDate).add(1, 'M').format('YYYY-MM-DD')
    }

    const monthLengthArray = computed(() => {
      const arr = [...Array(moment(state.formatDate).daysInMonth())]
      return arr.map((val, index) => {
        return index + 1
      })
    })

    return { state, incrementMonth, monthLengthArray }
  }
})
</script>
