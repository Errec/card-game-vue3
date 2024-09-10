import { Monster } from "@/schemas/monsterSchema";

// Export the BattleResult type
export type BattleResult = {
  winner: Monster | null;
  tie: boolean;
};

// Define the state shape for the monsters module
export type MonsterState = {
  monsters: Monster[]; // Array of monsters
  playerMonster: Monster | null; // The selected player monster
  cpuMonster: Monster | null; // The selected CPU monster
  battleResult: BattleResult | null; // The result of the battle
  loading: boolean; // Indicates if data is being loaded
  errorFetchingMonsters: string | null; // Separate error for fetching monsters
  errorBattle: string | null; // Separate error for battle
};

// Define the initial state
export const state: MonsterState = {
  monsters: [],
  playerMonster: null,
  cpuMonster: null,
  battleResult: null,
  loading: false,
  errorFetchingMonsters: null, // Start as null
  errorBattle: null, // Start as null
};
