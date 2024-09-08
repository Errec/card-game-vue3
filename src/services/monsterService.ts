// src/services/monsterService.ts
import { Monster } from "@/schemas/monsterSchema";
import { simulatedApi } from "@/services/simulatedApi"; // Use the simulated API

export async function fetchMonsters(): Promise<Monster[]> {
  try {
    const monsters = await simulatedApi.getMonsters(); // Fetch from simulated API
    return monsters;
  } catch (error: unknown) {
    console.error("Error occurred while fetching monsters:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch monsters"
    );
  }
}
