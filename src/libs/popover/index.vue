<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图-->
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        v-show="isVisible"
        ref="contentTarget"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 延迟关闭时长
const DELAY_TIME = 100

const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 控制气泡弹出位置，并给出开发者错误的提示
  placement: {
    type: String,
    default: 'bottom-left',
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})

// 控制 menu 展示
const isVisible = ref(false)

/**
 * 鼠标移入的触发行为
 */
let timeout = null
const onMouseenter = () => {
  isVisible.value = true
  // 再次触发时，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}

/**
 * 鼠标移出的触发行为
 */
const onMouseleave = () => {
  // 延时装置
  timeout = setTimeout(() => {
    isVisible.value = false
    timeout = null
  }, DELAY_TIME)
}

/**
 * 计算元素尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}

  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 计算弹层位置
 */
const contentStyle = ref({
  top: 0,
  left: 0
})

/**
 * 监听展示的变化，在展示时计算气泡位置
 */
watch(isVisible, (val) => {
  if (!val) return
  // 等待渲染最新dom成功之后
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>
<style scoped lang="scss">
// slide 展示动画
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
