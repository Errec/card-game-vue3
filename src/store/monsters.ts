import { Monster } from "@/schemas/monsterSchema";
import { startBattle } from "@/services/battleService";
import { fetchMonsters } from "@/services/monsterService";
import { Commit } from "vuex";

type BattleResult = {
  winner: Monster | null;
  tie: boolean;
};

type MonsterState = {
  monsters: Monster[];
  playerMonster: Monster | null;
  cpuMonster: Monster | null;
  battleResult: BattleResult | null;
  loading: boolean;
  errorFetchingMonsters: string | null; // Separate error for fetching monsters
  errorBattle: string | null; // Separate error for battle
};

const state: MonsterState = {
  monsters: [],
  playerMonster: null,
  cpuMonster: null,
  battleResult: null,
  loading: false,
  errorFetchingMonsters: null, // Start as null
  errorBattle: null, // Start as null
};

const mutations = {
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
    state.errorFetchingMonsters = error; // Set the error only for fetching monsters
  },
  setErrorBattle(state: MonsterState, error: string | null) {
    state.errorBattle = error; // Set the error only for battle
  },
  clearBattleResult(state: MonsterState) {
    state.battleResult = null;
  },
};

const actions = {
  async fetchMonsters({ commit }: { commit: Commit }) {
    commit("setLoading", true);
    commit("setErrorFetchingMonsters", null); // Clear error before fetch
    try {
      const monsters = await fetchMonsters();
      commit("setMonsters", monsters);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch monsters";
      commit("setErrorFetchingMonsters", errorMessage); // Set fetch error
    } finally {
      commit("setLoading", false);
    }
  },

  selectRandomCpuMonster({
    state,
    commit,
  }: {
    state: MonsterState;
    commit: Commit;
  }) {
    const availableMonsters = state.monsters.filter(
      (m) => m.id !== state.playerMonster?.id
    );

    if (availableMonsters.length === 0) {
      console.error("No available monsters to select as CPU opponent.");
      return;
    }

    const randomMonster =
      availableMonsters[Math.floor(Math.random() * availableMonsters.length)];

    commit("setCpuMonster", randomMonster);
  },

  async startBattle({
    commit,
    state,
  }: {
    commit: Commit;
    state: MonsterState;
  }) {
    if (state.playerMonster && state.cpuMonster) {
      commit("setLoading", true);
      commit("setErrorBattle", null); // Clear error before starting the battle
      try {
        const result = await startBattle(
          state.playerMonster.id,
          state.cpuMonster.id
        );
        commit("setBattleResult", result);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Battle failed";
        commit("setErrorBattle", errorMessage); // Set battle error
      } finally {
        commit("setLoading", false);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
