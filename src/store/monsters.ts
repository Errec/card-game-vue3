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
  error: string | null;
};

const state: MonsterState = {
  monsters: [],
  playerMonster: null,
  cpuMonster: null,
  battleResult: null,
  loading: false,
  error: null,
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
  setError(state: MonsterState, error: string | null) {
    state.error = error;
  },
  clearBattleResult(state: MonsterState) {
    state.battleResult = null;
  },
};

const actions = {
  async fetchMonsters({ commit }: { commit: Commit }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const monsters = await fetchMonsters();
      commit("setMonsters", monsters);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch monsters";
      commit("setError", errorMessage);
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
      commit("setError", null);
      try {
        const result = await startBattle(
          state.playerMonster.id,
          state.cpuMonster.id,
          state.monsters // Pass the full list of monsters for battle logic
        );
        commit("setBattleResult", result);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Battle failed";
        commit("setError", errorMessage);
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
