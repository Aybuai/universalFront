<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <floating-vue class="fixed bottom-10 right-2"></floating-vue>
  </div>
</template>

<script setup>
import floatingVue from './components/floating.vue'
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
</script>
<style scoped lang="scss"></style>
