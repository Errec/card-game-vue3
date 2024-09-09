// src/services/monsterService.ts
import { Monster } from "@/schemas/monsterSchema";
import axios from "axios";

// Fetch the list of monsters from the real API
export async function fetchMonsters(): Promise<Monster[]> {
  try {
    const response = await axios.get("/monsters"); // Assume base URL is already configured
    const monsters = response.data;

    // Validate the data using Zod schema
    return monsters.map((monster: unknown) => Monster.parse(monster));
  } catch (error: unknown) {
    console.error("Error occurred while fetching monsters:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch monsters"
    );
  }
}
