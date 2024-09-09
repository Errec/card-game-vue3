<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
    role="alert"
  >
    <div
      class="p-6 text-center bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-lg"
    >
      <p class="text-lg font-semibold">Battle Error</p>
      <p class="text-gray-600">
        Failed to start the battle. Please try again later.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// Define the 'visible' prop
defineProps<{
  visible: boolean;
}>();
</script>
