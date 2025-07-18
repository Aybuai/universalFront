<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import { useStore } from 'vuex'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'

const store = useStore()
// 触发 category 数据获取动作
store.dispatch('category/useCategoriesData')
</script>
<style scoped></style>
