<!-- src/components/WinnerMonster.vue -->
<template>
  <div
    role="status"
    class="w-full p-4 bg-blue-200 text-center shadow-md rounded-md"
  >
    <h3 class="font-bold text-xl">{{ message }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Monster } from "@/schemas/monsterSchema";

const props = defineProps<{
  winner: Monster | null;
  tie: boolean;
}>();

const message = computed(() =>
  props.tie ? "Draw Battle..." : `${props.winner?.name ?? "Unknown"} Wins!`
);

// Improvements:
// 1. Used <script setup> for Composition API.
// 2. Added role="status" for better accessibility.
// 3. Used TypeScript for props definition.
// 4. Created a computed property for the message to simplify the template.
// 5. Used nullish coalescing operator for better null handling.
</script>
