import { Monster } from "@/schemas/monsterSchema";
import { BattleResult, MonsterState } from "./state";

// Define the mutations to update the state
export const mutations = {
  setMonsters(state: MonsterState, monsters: Monster[]) {
    state.monsters = monsters;
  },
  setPlayerMonster(state: MonsterState, monster: Monster | null) {
    state.playerMonster = monster;
  },
  setCpuMonster(state: MonsterState, monster: Monster | null) {
    state.cpuMonster = monster;
  },
  setBattleResult(state: MonsterState, result: BattleResult | null) {
    state.battleResult = result;
  },
  setLoading(state: MonsterState, isLoading: boolean) {
    state.loading = isLoading;
  },
  setErrorFetchingMonsters(state: MonsterState, error: string | null) {
    state.errorFetchingMonsters = error;
  },
  setErrorBattle(state: MonsterState, error: string | null) {
    state.errorBattle = error;
  },
  clearBattleResult(state: MonsterState) {
    state.battleResult = null;
  },
};
