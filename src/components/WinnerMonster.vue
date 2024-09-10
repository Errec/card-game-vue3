<template>
  <div
    role="status"
    :class="statusClass"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 w-80 text-center shadow-3xl rounded-lg"
  >
    <h3 class="font-bold text-2xl">{{ message }}</h3>
  </div>
</template>

<script setup lang="ts">
import { Monster } from "@/schemas/monsterSchema";
import { computed, defineProps } from "vue";

const props = defineProps<{
  winner: Monster | null;
  tie: boolean;
  playerMonster: Monster | null; // Added to compare the player's monster
  cpuMonster: Monster | null; // Added to compare the CPU's monster
}>();

// Compute the message based on winner and tie
const message = computed(() =>
  props.tie ? "Draw Battle..." : `${props.winner?.name ?? "Unknown"} Wins!`
);

// Determine the background color based on whether the winner is the player or computer
const statusClass = computed(() => {
  if (props.tie) {
    return "bg-yellow-100"; // Soft yellow for tie
  }

  // Check if the winner is the player's monster or the CPU's monster
  if (props.winner?.id === props.cpuMonster?.id) {
    return "bg-red-100"; // Red for Computer win
  } else if (props.winner?.id === props.playerMonster?.id) {
    return "bg-blue-100"; // Blue for Player win
  }

  // Fallback in case of unknown winner
  return "bg-gray-100";
});
</script>

<style scoped>
.shadow-3xl {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
