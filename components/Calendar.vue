<template>
  <div>
    <button @click="incrementMonth">
      click me
    </button>
    <Selectbox />
    {{ state.formatDate }}
    <br>
    <div class="grid grid-cols-7">
      <div v-for="week in state.weeks" :key="week">
        {{ week }}
      </div>
      <div v-for="(day, week) in dayCells" :key="week">
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
      month: moment().month(),
      formatDate: moment().format('YYYY-MM-DD'),
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    })

    const incrementMonth = () => {
      state.formatDate = moment(state.formatDate).add(1, 'M').format('YYYY-MM-DD')
    }

    const dayCells = computed(() => {
      // 日付を格納するために、一ヶ月の日数の分だけundefined要素が格納されている配列を作成
      const dayLength = [...Array(moment(state.formatDate).daysInMonth())]
      const selectMonthDayCells = dayLength.map((_, index) => index + 1)
      return [...lastMonthCell(), ...selectMonthDayCells, ...nextMonthCell(dayLength)]
    })

    function lastMonthCell () {
      const selectMonthStartDay = moment(state.formatDate).format('YYYY-MM-01')
      const weekNumber = Number(moment(selectMonthStartDay).format('d'))
      const lastMonthFirstWeekDay = [...Array(Number(weekNumber))].map((_, index) => Number(moment(selectMonthStartDay).subtract(index + 1, 'd').format('D')))

      return lastMonthFirstWeekDay.sort((a, b) => a - b)
    }

    function nextMonthCell (dayLength: string[]) {
      const lastDay = `${moment(state.formatDate).format('YYYY-MM')}-${dayLength.length}`
      const lastDayWeekNumber = moment(lastDay).format('d')
      const remainingDays = 6 - Number(lastDayWeekNumber)

      return [...Array(remainingDays)].map((_, index) => Number(moment(lastDay).add(index + 1, 'd').format('D')))
    }

    return { state, incrementMonth, dayCells }
  }
})
</script>
