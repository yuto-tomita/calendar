<template>
  <div>
    <div>
      <button @click="decrementMonth">
        ◀︎
      </button>
      {{ state.formatDate }}
      <button @click="incrementMonth">
        ▶︎
      </button>
      <Selectbox v-model="state.selectStatus" :data="state.status" />
      {{ state.selectStatus }}
    </div>
    <br>
    <div v-if="state.selectStatus === 2" class="grid grid-cols-7">
      <div v-for="week in state.weeks" :key="week">
        {{ week }}
      </div>
      <div v-for="(day, week) in dayCells" :key="week">
        {{ day.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import moment from 'moment'

interface CalendarObject {
  label: number;
  value: string
}

export default defineComponent({
  setup () {
    const state = reactive({
      formatDate: moment().format('YYYY-MM'),
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selectStatus: 2,
      status: [
        {
          label: 'day',
          value: 0
        },
        {
          label: 'week',
          value: 1
        },
        {
          label: 'month',
          value: 2
        }
      ]
    })

    const incrementMonth = () => {
      state.formatDate = moment(state.formatDate).add(1, 'M').format('YYYY-MM')
    }

    const decrementMonth = () => {
      state.formatDate = moment(state.formatDate).subtract(1, 'M').format('YYYY-MM')
    }

    const test = (value: number) => {
      console.log(value)
    }

    const dayCells = computed((): CalendarObject[] => {
      // 日付を格納するために、一ヶ月の日数の分だけundefined要素が格納されている配列を作成
      const dayLength = [...Array(moment(state.formatDate).daysInMonth())]
      const selectMonthStartDay = moment(state.formatDate).format('YYYY-MM-01')
      const selectMonthDayCells: CalendarObject[] = dayLength.map((_, index) => {
        return {
          label: index + 1,
          value: moment(selectMonthStartDay).add(index, 'd').format('YYYY-MM-DD')
        }
      })

      return [...lastMonthCell(), ...selectMonthDayCells, ...nextMonthCell(dayLength)]
    })

    function lastMonthCell (): CalendarObject[] {
      const selectMonthStartDay = moment(state.formatDate).format('YYYY-MM-01')
      const weekNumber = Number(moment(selectMonthStartDay).format('d'))
      const lastMonthFirstWeekDay: CalendarObject[] = [...Array(Number(weekNumber))].map((_, index) => {
        return {
          label: Number(moment(selectMonthStartDay).subtract(index + 1, 'd').format('D')),
          value: moment(selectMonthStartDay).subtract(index + 1, 'd').format('YYYY-MM-DD')
        }
      })

      return lastMonthFirstWeekDay.slice().sort((a, b) => a.label - b.label)
    }

    function nextMonthCell (dayLength: string[]): CalendarObject[] {
      const lastDay = `${moment(state.formatDate).format('YYYY-MM')}-${dayLength.length}`
      const lastDayWeekNumber = moment(lastDay).format('d')
      const remainingDays = 6 - Number(lastDayWeekNumber)

      return [...Array(remainingDays)].map((_, index) => {
        return {
          label: Number(moment(lastDay).add(index + 1, 'd').format('D')),
          value: moment(lastDay).add(index + 1, 'd').format('YYYY-MM-DD')
        }
      })
    }

    return { state, incrementMonth, dayCells, decrementMonth, test }
  }
})
</script>
