<template>
  <m-waterfall
    :data="pexelsList"
    nodeKey="id"
    :column="5"
    :picturePreReading="true"
  >
    <template v-slot="{ item, width }">
      <item-vue :data="item"></item-vue>
    </template>
  </m-waterfall>
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
  const { list } = await getPexelsList(query)
  pexelsList.value = list
}
getPexelsData()
</script>
<style scoped lang="scss"></style>
