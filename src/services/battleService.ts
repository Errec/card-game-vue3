import { Monster } from "@/schemas/monsterSchema"; // Ensure Monster is imported from the correct schema
import axios from "axios";

// Start the battle between player's monster and CPU's monster
export const startBattle = async (
  playerMonsterId: string,
  cpuMonsterId: string
): Promise<{ winner: Monster | null; tie: boolean }> => {
  try {
    const response = await axios.post("/battle", {
      monster1Id: playerMonsterId,
      monster2Id: cpuMonsterId,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Error occurred during battle:", error);
    throw new Error(error instanceof Error ? error.message : "Battle failed");
  }
};
