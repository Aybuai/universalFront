<script setup></script>

<template>
  <!-- 一级路由出口 -->
  <!-- 移动端下 navigationBar 定位，添加样式 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <!-- <router-view /> -->

    <!-- 移动端路由切换展示过渡动画 -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></m-transition-router-view>
  </div>
</template>

<style scoped></style>
