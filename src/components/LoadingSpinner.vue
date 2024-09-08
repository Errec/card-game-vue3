<!-- src/components/LoadingSpinner.vue -->
<template>
  <div class="flex justify-center items-center" role="status">
    <div
      class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
    ></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
// Improvements:
// 1. Added role="status" for accessibility, indicating that this component represents a loading state.
// 2. Removed unnecessary props and optimized the design by keeping it simple.
// 3. Used Tailwind CSS for consistent styling.
</script>
