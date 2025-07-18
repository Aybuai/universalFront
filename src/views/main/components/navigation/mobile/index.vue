<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="onShowPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- items -->
      <li
        v-for="(item, index) in $store.getters.categories"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100': currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
import MenuVue from '@/views/main/components/menu/index.vue'

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

/**
 * 计算滑块的展示 宽度width 和 偏移量left
 * 1、选中的 item 下标：currentCategoryIndex
 * 2、所有 item 元素：itemRefs
 * 3、ul 的横向滚动偏离位置：ulScrollLeft
 * 4、最后在 currentCategoryIndex 发生改变时，获取 item 下标元素的 left 和 width，计算 sliderStyle 即可
 */

// 选中 item 的下标
const currentCategoryIndex = ref(0)
// 获取填充的所有 item 元素
let itemRefs = []
// 想获取动态dom元素的ref得用函数获取
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
// 数据更前后，dom 更新前，把获取的 dom 重置
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (index) => {
  // 获取选中元素的 left、width
  const { width, left } = itemRefs[index].getBoundingClientRect()
  // 为 sliderStyle 设置样式
  sliderStyle.value = {
    // 滑块的位置 = ul 横向滚动位置 + 当前元素的 left 偏移量 - ul padding
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`
  }
  // popup 弹出点击 menu时，navigationBar 定位到已切换的滑块
  if (isOpenPopup.value) {
    ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft - 10
    isOpenPopup.value = false
  }
})

// item 点击事件
const onItemClick = (index) => {
  if (currentCategoryIndex.value === index) {
    isOpenPopup.value = false
    return
  }
  currentCategoryIndex.value = index
}

// popup 展示
const isOpenPopup = ref(false)

// 汉堡点击事件
const onShowPopup = () => {
  isOpenPopup.value = true
}
</script>
<style scoped></style>
