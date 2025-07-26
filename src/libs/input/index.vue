<template>
  <div class="relative">
    <!-- 单行文本 -->
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <!-- 文本域 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-model="text"
      :maxlength="max"
      rows="5"
    ></textarea>
    <!-- max -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ '!text-red-700': currentNumber === parseInt(max) }"
    >
      {{ currentNumber }} / {{ max }}
    </span>
  </div>
</template>

<script>
// 单行文本
const TYPE_TEXT = 'text'
// 文本域
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  // v-model
  modelValue: {
    type: String,
    required: true
  },
  // type: text | textarea
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(val) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = arr.includes(val)
      if (!res) {
        throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
      }
      return res
    }
  },
  // max
  max: {
    type: [String, Number]
  }
})

// 事件声明
defineEmits(['update:modelValue'])

// 输入的字符
const text = useVModel(props)

// 输入的字符数
const currentNumber = computed(() => {
  return text.value.length
})
</script>
<style scoped lang="scss"></style>
