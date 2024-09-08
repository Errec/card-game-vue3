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

        <SelectMonster @monster-selected="clearBattleResult" />

        <div class="flex justify-between mt-8 space-x-4">
          <MonsterCard :monster="playerMonster" role="Player" />

          <div class="flex items-center justify-center w-40">
            <StartBattleBtn
              :enabled="!!playerMonster && !isBattleDisabled"
              @start-battle="startBattleHandler"
            />
          </div>

          <MonsterCard :monster="cpuMonster" role="Computer" />
        </div>

        <!-- Winner Component (after battle) -->
        <WinnerMonster
          v-if="showWinner && battleResult"
          :winner="battleResult.winner"
          :tie="battleResult.tie"
        />
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

// Using the Monster store
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

// State for disabling the battle button and controlling winner display
const isBattleDisabled = ref(false);
const showWinner = ref(false); // Controls visibility of WinnerMonster

// Fetch monsters when component is mounted
onMounted(() => {
  fetchMonsters();
});

// Start battle handler
const startBattleHandler = async () => {
  isBattleDisabled.value = true; // Disable battle button when battle starts
  showWinner.value = false; // Hide winner while battle is happening

  selectRandomCpuMonster(); // Select a random CPU monster

  await startBattle(); // Start the battle

  // Show winner for 2 seconds, then reset the state
  showWinner.value = true;
  setTimeout(() => {
    clearBattleResult();
    isBattleDisabled.value = false; // Re-enable the button after 2 seconds
    showWinner.value = false; // Hide the winner after 2 seconds
  }, 2000);
};
</script>
