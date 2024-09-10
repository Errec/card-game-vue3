import { Monster } from "@/schemas/monsterSchema";
import { startBattle } from "@/services/battleService";
import { fetchMonsters } from "@/services/monsterService";
import { Commit } from "vuex";
import { MonsterState } from "./state";

export const actions = {
  async fetchMonsters({ commit }: { commit: Commit }) {
    commit("setLoading", true);
    commit("setErrorFetchingMonsters", null);
    try {
      const monsters = await fetchMonsters();
      commit("setMonsters", monsters);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch monsters";
      commit("setErrorFetchingMonsters", errorMessage);
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
    const availableMonsters: Monster[] = state.monsters.filter(
      (m: Monster) => m.id !== state.playerMonster?.id
    );

    if (availableMonsters.length === 0) {
      console.error("No available monsters to select as CPU opponent.");
      return;
    }

    const randomMonster: Monster =
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
      commit("setErrorBattle", null);
      try {
        const result = await startBattle(
          state.playerMonster.id,
          state.cpuMonster.id
        );
        commit("setBattleResult", result);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Battle failed";
        commit("setErrorBattle", errorMessage);
      } finally {
        commit("setLoading", false);
      }
    }
  },
};
