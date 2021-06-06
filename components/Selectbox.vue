<template>
  <div class="relative flex w-full my-4">
    <label class="w-44">
      <div class="text-left mt-1">{{ label }}</div>
    </label>
    <select v-model="state.select" class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow w-full leading-tight focus:outline-none focus:shadow-outline" @change="emitValue">
      <option v-for="(option, index) in data" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from '@vue/composition-api'

interface DataStructure {
  label: string,
  value: number
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DataStructure[]>,
      required: true
    },
    value: {
      type: Number,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      select: props.value
    })

    const emitValue = () => emit('input', state.select)

    return { state, emitValue }
  }
})
</script>
