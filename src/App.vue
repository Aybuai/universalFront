<script setup>
import { isMobileTerminal } from './utils/flexible'
</script>

<template>
  <div class="md:p-8 text-2xl">{{ isMobileTerminal }}</div>
</template>

<style scoped></style>
