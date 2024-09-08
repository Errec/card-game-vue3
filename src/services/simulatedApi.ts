import { Monster } from "@/schemas/monsterSchema";

const imageUrl = "@/assets/images/monster.png";

function generateRandomStat(): number {
  return Math.floor(Math.random() * 100) + 1;
}

function generateRandomMonster(id: string): Monster {
  const monsterNames = [
    "Groknak",
    "Zephyra",
    "Blorbus",
    "Quixel",
    "Fenroth",
    "Luminara",
    "Squelch",
    "Vorpal",
    "Nyx",
    "Zorgon",
    "Crimson",
    "Azure",
  ];

  return {
    id,
    name: monsterNames[Math.floor(Math.random() * monsterNames.length)],
    attack: generateRandomStat(),
    defense: generateRandomStat(),
    hp: generateRandomStat(),
    speed: generateRandomStat(),
    imageUrl, // Use the direct image URL
  };
}

export const simulatedApi = {
  getMonsters: (): Promise<Monster[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const monsters: Monster[] = Array.from({ length: 6 }, (_, index) =>
          generateRandomMonster(`monster-${index + 1}`)
        );
        console.log("Simulated API Monsters: ", monsters); // Debugging log
        resolve(monsters);
      }, 3000); // 3 seconds delay
    });
  },

  battle: (
    monster1Id: string,
    monster2Id: string
  ): Promise<{ winner: Monster | null; tie: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomOutcome = Math.random();
        if (randomOutcome < 0.4) {
          resolve({ winner: generateRandomMonster(monster1Id), tie: false });
        } else if (randomOutcome < 0.8) {
          resolve({ winner: generateRandomMonster(monster2Id), tie: false });
        } else {
          resolve({ winner: null, tie: true });
        }
      }, 1000); // 1 second delay for battle
    });
  },
};
