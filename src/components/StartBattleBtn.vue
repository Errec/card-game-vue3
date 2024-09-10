<template>
  <button
    :disabled="!enabled"
    class="w-40 h-12 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    :class="[
      enabled
        ? 'bg-monster-green hover:bg-monster-green-dark'
        : 'bg-monster-disabled-green',
    ]"
    @click="$emit('start-battle')"
  >
    Start Battle
  </button>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
  enabled: boolean;
}>();

defineEmits<{
  (e: "start-battle"): void;
}>();
</script>
