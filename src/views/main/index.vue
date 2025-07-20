<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <navigation-vue />
    <!-- max-w-screen-xl tailwind4.0 以上版本宽度不生效 -->
    <div class="max-w-[1280px] mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
  </div>
</template>

<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>

<style scoped></style>
