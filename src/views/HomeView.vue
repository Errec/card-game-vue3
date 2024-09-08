<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Battle of Monsters</h1>

    <ErrorBoundary>
      <template v-if="loading">
        <LoadingSpinner />
      </template>

      <template v-else-if="monsters.length === 0">
        <NoMonstersAvailable />
      </template>

      <template v-else>
        <h2 class="text-2xl mb-4">Select your monster</h2>

        <!-- Monster selection area -->
        <SelectMonster @monster-selected="clearBattleResult" />
        <WinnerMonster
          v-if="showWinner && battleResult"
          :winner="battleResult.winner"
          :tie="battleResult.tie"
        />
        <!-- Display both Player and CPU monsters after selection -->
        <div class="flex justify-between mt-8 space-x-4">
          <MonsterCard :monster="playerMonster" role="Player" />

          <div class="flex items-center justify-center w-40">
            <StartBattleBtn
              :enabled="!!playerMonster && !isBattleDisabled"
              @start-battle="startBattleHandler"
            />
          </div>
          <!-- Winner Component (after battle) -->

          <MonsterCard :monster="cpuMonster" role="Computer" />
        </div>
      </template>
    </ErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import MonsterCard from "@/components/MonsterCard.vue";
import NoMonstersAvailable from "@/components/NoMonstersAvailable.vue";
import SelectMonster from "@/components/SelectMonster.vue";
import WinnerMonster from "@/components/WinnerMonster.vue";
import StartBattleBtn from "@/components/StartBattleBtn.vue";
import { useMonsterStore } from "@/composables/useMonsterStore";

const {
  loading,
  battleResult,
  monsters,
  clearBattleResult,
  fetchMonsters,
  playerMonster,
  cpuMonster,
  selectRandomCpuMonster,
  startBattle,
} = useMonsterStore();

const isBattleDisabled = ref(false);
const showWinner = ref(false);

onMounted(() => {
  fetchMonsters();
});

const startBattleHandler = async () => {
  isBattleDisabled.value = true; // Disable the battle button
  showWinner.value = false; // Hide the winner while the battle happens

  // Choose the CPU monster and display it
  selectRandomCpuMonster();

  // Wait for 1 second before starting the battle
  setTimeout(async () => {
    await startBattle(); // Start the battle after the delay

    // Show the winner after the battle
    showWinner.value = true;

    // Display the winner for 2 seconds, then reset the state
    setTimeout(() => {
      clearBattleResult();
      isBattleDisabled.value = false; // Enable the battle button again
      showWinner.value = false; // Hide the winner after 2 seconds
    }, 2000);
  }, 1000);
};
</script>
