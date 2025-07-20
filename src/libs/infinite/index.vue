<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了！
      </p>
    </div>
  </div>
</template>

<script setup>
import { useIntersectionObserver, useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)

// 利用 useIntersectionObserver 方法，监听元素可见行为，用于判断列表滚动到底部
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

/**
 * 触发 load
 */
const emitLoad = () => {
  // 当加载更多的视图可见时，且 loading 为 false，且数据没有全部加载完成
  // 加载更多数据
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    // 修改加载数据标记
    loading.value = true
    // 触发加载更多行为
    emits('onLoad')
  }
}

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, () => {
  // 触发 load，延迟处理，等待渲染和 useIntersectionObserver 的再次触发
  // TODO 当是图片预加载时，没有容器固定高度，导致会一直请求接口
  setTimeout(() => {
    emitLoad()
  }, 100)
})
</script>
<style scoped lang="scss"></style>
