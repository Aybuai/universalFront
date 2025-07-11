<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
</script>
<style scoped></style>
