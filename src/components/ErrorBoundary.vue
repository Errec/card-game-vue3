<!-- src/components/ErrorBoundary.vue -->
<template>
  <div>
    <slot v-if="!error" />
    <div
      v-else
      role="alert"
      class="p-6 bg-red-100 text-red-800 border border-red-400 rounded-md shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p class="mb-4">{{ error.message }}</p>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="handleReset"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

const error = ref<Error | null>(null);

function errorCaptured(err: Error) {
  error.value = err;
  return false;
}

function handleReset() {
  error.value = null;
  location.reload();
}

defineExpose({ errorCaptured });

// Improvements:
// 1. Removed unnecessary props and watch logic.
// 2. Simplified the component to focus on its core functionality of capturing and displaying errors.
// 3. Kept the accessibility improvements and styling.
// 4. Renamed resetError to handleReset for clarity.
// 5. Removed the emit logic, as it's no longer necessary in this simplified version.
// 6. Kept the errorCaptured method exposed for parent components to use if needed.
</script>
