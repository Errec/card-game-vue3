import { Monster } from "@/schemas/monsterSchema";
import { computed } from "vue";
import { useStore } from "vuex";

export function useMonsterStore() {
  const store = useStore();

  return {
    // Computed properties that retrieve data from the store
    monsters: computed(() => store.state.monsters.monsters), // All monsters
    playerMonster: computed(() => store.state.monsters.playerMonster), // Player's selected monster
    cpuMonster: computed(() => store.state.monsters.cpuMonster), // CPU's selected monster
    battleResult: computed(() => store.state.monsters.battleResult), // Result of the battle
    loading: computed(() => store.state.monsters.loading), // Loading state
    errorFetchingMonsters: computed(
      () => store.state.monsters.errorFetchingMonsters
    ), // Error while fetching monsters
    errorBattle: computed(() => store.state.monsters.errorBattle), // Error during battle

    // Methods to interact with the store
    setPlayerMonster: (monster: Monster) => {
      store.commit("monsters/setPlayerMonster", monster); // Set the player's selected monster
    },
    clearBattleResult: () => store.commit("monsters/clearBattleResult"), // Clear the battle result
    selectRandomCpuMonster: () =>
      store.dispatch("monsters/selectRandomCpuMonster"), // Select a random monster for the CPU
    startBattle: () => store.dispatch("monsters/startBattle"), // Start the battle
    fetchMonsters: () => store.dispatch("monsters/fetchMonsters"), // Fetch all monsters
  };
}
