<template>
  <div class="fixed-center" role="status">
    <div
      class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
    ></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style scoped>
.fixed-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
}
</style>
