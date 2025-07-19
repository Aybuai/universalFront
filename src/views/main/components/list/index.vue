<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexel'
import { ref } from 'vue'
import itemVue from './item.vue'

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsData = async () => {
  const { list } = await getPexelsList()
  pexelsList.value = list
}
getPexelsData()
</script>
<style scoped lang="scss"></style>
