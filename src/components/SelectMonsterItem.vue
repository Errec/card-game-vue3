<template>
  <div
    class="p-4 m-2 w-48 h-64 shadow-lg rounded-lg cursor-pointer border-2"
    :class="selected ? 'border-green-500' : 'border-gray-300'"
    @click="$emit('click')"
  >
    <img
      :src="monster.imageUrl || ''"
      :alt="monster.name"
      class="w-full h-32 object-cover mb-4 rounded-md"
    />
    <h3 class="font-semibold text-lg text-center">{{ monster.name }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  monster: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>
