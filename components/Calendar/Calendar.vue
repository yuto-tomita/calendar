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
    <!-- <Dialog v-if="isDialog" @closeDialog="isDialog = false" /> -->
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
        <div v-for="(event, eventIndex) in schedule" :key="event.event" @click="openDialog(eventIndex)">
          <MonthEvent v-if="event.start.dateTime === day.value" :schedule="event" />
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
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import { DaySchedule } from '@/store/type'
import moment from 'moment'
import MonthEvent from '@/components/Event/MonthEvent.vue'
import EventRegisterModal from '@/components/Event/EventRegisterModal.vue'
import { tokenStore, apiStore } from '@/store'
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
  components: { MonthEvent, EventRegisterModal },
  setup () {
    const api = apiStore()
    const token = tokenStore()
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
    const schedule = ref<DaySchedule[]>([])
    const isDialog = ref(false)
    const today = moment().format('MM-DD')

    addScheduleFromAPI()

    async function addScheduleFromAPI (): Promise<void> {
      if (token.accessToken.length) {
        await api.getCalendarList(token.accessToken)
        const scheduleList = api.returnCalendarList

        schedule.value = scheduleList.map((val) => {
          return {
            summary: val.summary,
            created: val.created,
            id: val.id,
            start: {
              dateTime: val.start?.dateTime ? moment(val.start.dateTime).format('YYYY-MM-DD') : moment(val.start.date).format('YYYY-MM-DD'),
              timeZone: val.start.timeZone
            },
            end: val.end
          }
        })
      }
    }

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

    const changeModalStatus = (day: CalendarObject):void => {
      selectDays.value = day
      isModalOpen.value = true
    }
    const saveSchedule = (emitValue: Schedule):void => {
      schedule.value = [...schedule.value, emitValue]
      isModalOpen.value = false
    }
    const openDialog = (eventIndex: number):void => {
      const confirmDelete = confirm('予定を削除してもよろしいですか？')

      if (confirmDelete) {
        schedule.value = schedule.value.filter((_, val) => eventIndex !== val)
      }
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
      saveSchedule,
      openDialog,
      isDialog
    }
  }
})
</script>
