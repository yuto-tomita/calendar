<template>
  <div class="bg-gray-dark fixed w-full h-full top-0 left-0 bg-opacity-80 flex justify-items-center" @click.self="closeModal">
    <div class="bg-white-default mx-auto rounded shadow-lg z-50 overflow-y-auto h-3/6 w-2/3 my-auto relative">
      <div class="absolute right-5 cursor-pointer" @click="closeModal">
        ×
      </div>
      <div class="mr-20 mt-7 ml-7">
        <div class="font-medium mb-3">
          {{ selectDays.value }}の予定
        </div>
        <InputText v-model="schedule.event" label="予定" />

        <Selectbox v-model="schedule.selectStartHour" :data="canSelectHours" label="開始時間" />
        <Selectbox v-model="schedule.selectEndHour" :data="canSelectHours" label="終了時間" />

        <div class="text-right mt-10">
          <Button label="日程登録" @click="saveSchedule" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@vue/composition-api'

interface CalendarObject {
  label: number
  value: string
}

interface Hours {
  label: string
  value: number
}

interface Schedule {
  date: string
  startHour: number | string
  endHour: number | string
  event: string
}

export default defineComponent({
  props: {
    selectDays: {
      type: Object as PropType<CalendarObject>,
      required: true
    }
  },
  emit: ['closeModal'],
  setup (props, { emit }) {
    const closeModal = () => emit('closeModal')
    const schedule = reactive<Schedule>({
      event: '',
      startHour: 0,
      endHour: 0,
      date: props.selectDays.value
    })
    const canSelectHours: Hours[] = [
      { label: '0時', value: 0 },
      { label: '1時', value: 1 },
      { label: '2時', value: 2 },
      { label: '3時', value: 3 },
      { label: '4時', value: 4 },
      { label: '5時', value: 5 },
      { label: '6時', value: 6 },
      { label: '7時', value: 7 },
      { label: '8時', value: 8 },
      { label: '9時', value: 9 },
      { label: '10時', value: 10 },
      { label: '11時', value: 11 },
      { label: '12時', value: 12 },
      { label: '13時', value: 13 },
      { label: '14時', value: 14 },
      { label: '15時', value: 15 },
      { label: '16時', value: 16 },
      { label: '17時', value: 17 },
      { label: '18時', value: 18 },
      { label: '19時', value: 19 },
      { label: '20時', value: 20 },
      { label: '21時', value: 21 },
      { label: '22時', value: 22 },
      { label: '23時', value: 23 },
      { label: '24時', value: 24 }
    ]

    const saveSchedule = () => emit('saveSchedule', schedule)

    return {
      closeModal,
      schedule,
      canSelectHours,
      saveSchedule
    }
  }
})
</script>
