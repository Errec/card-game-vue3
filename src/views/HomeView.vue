<template>
  <div class="p-8 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Battle of Monsters</h1>

    <!-- Loading State -->
    <template v-if="loading">
      <LoadingSpinner />
    </template>

    <!-- Display "No monsters available" -->
    <template v-else-if="monsters.length === 0">
      <NoMonstersAvailable />
    </template>

    <!-- Monster and Battle Area -->
    <template v-else>
      <h2 class="text-2xl mb-4">Select your monster</h2>

      <SelectMonster @monster-selected="clearBattleResult" />
      <WinnerMonster
        v-if="showWinner && battleResult"
        :winner="battleResult.winner"
        :tie="battleResult.tie"
        :playerMonster="playerMonster"
        :cpuMonster="cpuMonster"
      />
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
    </template>

    <!-- Battle Error Toast (appears only when battle fails) -->
    <BattleErrorToast :visible="showBattleError" />
  </div>
</template>

<script setup lang="ts">
import BattleErrorToast from "@/components/BattleErrorToast.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import MonsterCard from "@/components/MonsterCard.vue";
import NoMonstersAvailable from "@/components/NoMonstersAvailable.vue";
import SelectMonster from "@/components/SelectMonster.vue";
import StartBattleBtn from "@/components/StartBattleBtn.vue";
import WinnerMonster from "@/components/WinnerMonster.vue";
import { useMonsterStore } from "@/composables/useMonsterStore";
import { onMounted, ref, watch } from "vue";

// State and store access from the composable
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
  errorBattle, // Battle error only
} = useMonsterStore();

const isBattleDisabled = ref(false);
const showWinner = ref(false);
const showBattleError = ref(false); // For battle error toast

// Fetch monsters on mount
onMounted(async () => {
  await fetchMonsters(); // Fetch monsters on app load
});

// Watch battle API errors and trigger the toast (only battle errors)
watch(errorBattle, (newError) => {
  if (newError) {
    showBattleError.value = true;

    // Hide the toast after 3 seconds
    setTimeout(() => {
      showBattleError.value = false;
    }, 3000);
  }
});

// Function to handle battle start
const startBattleHandler = async () => {
  isBattleDisabled.value = true;
  showWinner.value = false;
  showBattleError.value = false; // Hide toast before starting new battle

  selectRandomCpuMonster();

  setTimeout(async () => {
    try {
      await startBattle(); // Call battle API
      showWinner.value = true;
    } catch (e) {
      showBattleError.value = true; // Trigger toast when battle fails
    } finally {
      setTimeout(() => {
        clearBattleResult();
        isBattleDisabled.value = false;
        showWinner.value = false;
      }, 2000);
    }
  }, 1000);
};
</script>
