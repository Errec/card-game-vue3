import { Monster } from "@/schemas/monsterSchema";
import { computed } from "vue";
import { useStore } from "vuex";

export function useMonsterStore() {
  const store = useStore();

  return {
    monsters: computed(() => store.state.monsters.monsters),
    playerMonster: computed(() => store.state.monsters.playerMonster),
    cpuMonster: computed(() => store.state.monsters.cpuMonster),
    battleResult: computed(() => store.state.monsters.battleResult),
    loading: computed(() => store.state.monsters.loading),
    errorFetchingMonsters: computed(
      () => store.state.monsters.errorFetchingMonsters
    ), // Fetching error
    errorBattle: computed(() => store.state.monsters.errorBattle), // Battle error

    setPlayerMonster: (monster: Monster) => {
      store.commit("monsters/setPlayerMonster", monster);
    },
    clearBattleResult: () => store.commit("monsters/clearBattleResult"),
    selectRandomCpuMonster: () =>
      store.dispatch("monsters/selectRandomCpuMonster"),
    startBattle: () => store.dispatch("monsters/startBattle"),
    fetchMonsters: () => store.dispatch("monsters/fetchMonsters"),
  };
}
