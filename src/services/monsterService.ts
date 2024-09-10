import { Monster, MonsterSchema } from "@/schemas/monsterSchema";
import axios from "axios";

export async function fetchMonsters(): Promise<Monster[]> {
  try {
    const response = await axios.get("http://localhost:8081/monsters");
    const monsters = response.data;
    return monsters.map((monster: unknown) => MonsterSchema.parse(monster));
  } catch (error: unknown) {
    console.error("Error occurred while fetching monsters:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch monsters"
    );
  }
}
