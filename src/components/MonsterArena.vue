<template>
  <div class="flex justify-between items-center">
    <!-- Player Monster Card -->
    <MonsterCard :monster="playerMonster" role="Player" />

    <!-- Start Battle Button in the center -->
    <div class="flex items-center justify-center w-full">
      <StartBattleBtn
        :enabled="!!playerMonster"
        @start-battle="startBattleHandler"
      />
    </div>

    <!-- CPU Monster Card -->
    <MonsterCard :monster="cpuMonster" role="Computer" />
  </div>
</template>

<script setup lang="ts">
import MonsterCard from "@/components/MonsterCard.vue";
import StartBattleBtn from "@/components/StartBattleBtn.vue";
import { useMonsterStore } from "@/composables/useMonsterStore";

const { playerMonster, cpuMonster, selectRandomCpuMonster, startBattle } =
  useMonsterStore();

// Start battle handler
async function startBattleHandler() {
  if (!playerMonster.value) return; // Ensure a player monster is selected

  // Select a random CPU monster
  await selectRandomCpuMonster();

  // Start the battle and call the battle API
  await startBattle();
}
</script>
