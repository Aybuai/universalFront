<template>
  <div>
    <!-- 把组件 dom 挂载到 body上 -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <!-- 无需主动触发 emits 事件 => @click="emits('update:modelValue', false)" -->
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          ref="menuTarget"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useEventListener, useScrollLock, useVModel } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 不需要主动触发了
// const emits = defineEmits(['update:modelValue'])

// 组件间双向数据绑定功能优化
// vueuse 提供的 useVModel
// 通过 useVModel 获取到响应式数据 isVisible，当 isVisible 改变时，会自动触发 'update:modelValue' emits
const isVisible = useVModel(props)

// 滚动锁定
const isLocked = useScrollLock(document.body)
watch(
  isVisible,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)

const menuTarget = ref(null)
onMounted(() => {
  // 解决 @vueuse/core 新版本 useScrollLock 会导致所有元素无法响应 touchmove 事件问题
  useEventListener(menuTarget, 'touchmove', (event) => {
    // 阻止事件冒泡
    event.stopPropagation()
  })
})
</script>
<style scoped lang="scss">
// fade 展示动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// popup-down-up 展示动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
