<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { ref } from 'vue'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = [ALL_CATEGORY_ITEM, ...categorys]
}
getCategoryData()
</script>
<style scoped></style>
