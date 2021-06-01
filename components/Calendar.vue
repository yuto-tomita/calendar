<template>
  <div>
    <button @click="decrementMonth">
      ◀︎
    </button>
    {{ monthState }}
    <button @click="incrementMonth">
      ▶︎
    </button>

    <EventRegisterModal v-if="isModalOpen" :select-days="selectDays" @closeModal="isModalOpen = false" @saveSchedule="saveSchedule" />
    <!-- <Selectbox v-model="selectStatus" :data="state.status" /> -->
    <br>
    <div v-if="selectStatus === 2" class="grid grid-cols-7">
      <div v-for="week in weeks" :key="week" class="m-auto">
        {{ week }}
      </div>
      <div
        v-for="(day, index) in dayCells"
        :key="index"
        class="h-20 border-gray-light overflow-auto"
        :class="{
          'border-b border-r' : isCurrentMonth(day),
          'bg-gray-light' : !isCurrentMonth(day),
          'border-t': isTopRows(index)
        }"
      >
        <div :class="{ 'text-red-default' : isToday(day) }" class="text-center">
          <span
            class="select-none rounded-full transition duration-500 ease-in-out cursor-pointer inline-block w-6 h-6 hover:bg-gray-light"
            @click="changeModalStatus(day)"
          >
            {{ day.label }}
          </span>
        </div>
        <div v-for="event in schedule" :key="event.event">
          <MonthEvent v-if="event.date === day.value" :schedule="event" />
        </div>
      </div>
    </div>
    <!-- <div v-if="selectStatus === 1">
      <Week :current-week="returnWeek" :schedule="schedule" :today="today" />
    </div>
    <div v-if="selectStatus === 0">
      <Day :display-day="returnToday" :schedule="schedule" :today="today" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import moment from 'moment'

interface CalendarObject {
  label: number
  value: string
}

interface Schedule {
  date: string
  startHour: number | string
  endHour: number | string
  event: string
}

interface CalendarState {
  label: string
  value: number
}

export default defineComponent({
  setup () {
    const weeks: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthState = ref<string>(moment().format('YYYY-MM'))
    const selectStatus = ref<number>(2)
    const isModalOpen = ref<boolean>(false)
    const selectDays = ref<CalendarObject>({
      label: 0,
      value: ''
    })
    const calendarState: CalendarState[] = [
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
    const schedule = ref<Schedule[]>(
      [
        {
          date: moment().format('YYYY-MM-DD'),
          startHour: 13,
          endHour: 15,
          event: 'ショッピング'
        },
        {
          date: moment().format('YYYY-MM-DD'),
          startHour: 15,
          endHour: 17,
          event: 'Meeting'
        }
      ]
    )
    const today = moment().format('MM-DD')

    const incrementMonth = (): void => {
      monthState.value = moment(monthState.value).add(1, 'M').format('YYYY-MM')
    }

    const decrementMonth = (): void => {
      monthState.value = moment(monthState.value).subtract(1, 'M').format('YYYY-MM')
    }

    const dayCells = computed((): CalendarObject[] => {
      // 日付を格納するために、一ヶ月の日数の分だけundefined要素が格納されている配列を作成
      const dayLength = [...Array(moment(monthState.value).daysInMonth())]
      const selectMonthStartDay = moment(monthState.value).format('YYYY-MM-01')
      const selectMonthDayCells: CalendarObject[] = dayLength.map((_, index) => {
        return {
          label: index + 1,
          value: moment(selectMonthStartDay).add(index, 'd').format('YYYY-MM-DD')
        }
      })

      return [...lastMonthCell(), ...selectMonthDayCells, ...nextMonthCell(dayLength)]
    })

    function lastMonthCell (): CalendarObject[] {
      const selectMonthStartDay = moment(monthState.value).format('YYYY-MM-01')
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
      const lastDay = `${moment(monthState.value).format('YYYY-MM')}-${dayLength.length}`
      const lastDayWeekNumber = moment(lastDay).format('d')
      const remainingDays = 6 - Number(lastDayWeekNumber)

      return [...Array(remainingDays)].map((_, index) => {
        return {
          label: Number(moment(lastDay).add(index + 1, 'd').format('D')),
          value: moment(lastDay).add(index + 1, 'd').format('YYYY-MM-DD')
        }
      })
    }

    const returnToday = computed(() => moment().format('MM-DD'))

    const returnWeek = computed(() => {
      const weekNumber = moment().format('d')
      const sunday = moment().subtract(Number(weekNumber), 'd').format('YYYY-MM-DD')
      return [...Array(7)].map((_, index) => {
        return moment(sunday).add(index, 'd').format('YYYY-MM-DD')
      })
    })

    const isToday = (day: CalendarObject) => day.value === moment().format('YYYY-MM-DD')
    const isCurrentMonth = (day: CalendarObject) => monthState.value === moment(day.value).format('YYYY-MM')
    const isTopRows = (index: number) => index < 7

    const changeModalStatus = (day: CalendarObject) => {
      selectDays.value = day
      isModalOpen.value = true
    }
    const saveSchedule = (emitValue: Schedule):void => {
      schedule.value.push(emitValue)
      isModalOpen.value = false
    }

    return {
      weeks,
      selectStatus,
      monthState,
      calendarState,
      schedule,
      incrementMonth,
      dayCells,
      decrementMonth,
      returnToday,
      returnWeek,
      isToday,
      today,
      isCurrentMonth,
      isTopRows,
      isModalOpen,
      selectDays,
      changeModalStatus,
      saveSchedule
    }
  }
})
</script>
