import { Monster } from "@/schemas/monsterSchema";
import axios from "axios";

export const startBattle = async (
  playerMonsterId: string,
  cpuMonsterId: string
): Promise<{ winner: Monster | null; tie: boolean }> => {
  try {
    const response = await axios.post("http://localhost:8081/battle", {
      monster1Id: playerMonsterId,
      monster2Id: cpuMonsterId,
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error occurred during battle:", error);
    throw new Error(error instanceof Error ? error.message : "Battle failed");
  }
};
