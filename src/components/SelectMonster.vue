<template>
  <!-- Container for displaying the list of monsters -->
  <div class="flex flex-wrap justify-center gap-4">
    <!-- Loop through each monster in the monsters array -->
    <SelectMonsterItem
      v-for="monster in monsters"
      :key="monster.id"
      :monster="monster"
      :selected="isSelected(monster)"
      @click="selectMonster(monster)"
    />
  </div>
</template>

<script setup>
import SelectMonsterItem from "@/components/SelectMonsterItem.vue";
import { useMonsterStore } from "@/composables/useMonsterStore";

// Import the monster store and destructure its properties
const { monsters, playerMonster, setPlayerMonster } = useMonsterStore();

// Check if a monster is currently selected by comparing its ID with the playerMonster's ID
const isSelected = (monster) => playerMonster.value?.id === monster.id;

// Function to select a monster and update the playerMonster
const selectMonster = (monster) => {
  setPlayerMonster(monster);
};
</script>
