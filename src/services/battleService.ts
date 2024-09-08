import { Monster } from "@/schemas/monsterSchema";

export const startBattle = async (
  playerMonsterId: string,
  cpuMonsterId: string,
  monsters: Monster[]
): Promise<{ winner: Monster | null; tie: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const playerMonster = monsters.find(
        (monster) => monster.id === playerMonsterId
      );
      const cpuMonster = monsters.find(
        (monster) => monster.id === cpuMonsterId
      );

      if (!playerMonster || !cpuMonster) {
        console.error("Monsters not found!");
        resolve({ winner: null, tie: true });
        return;
      }

      // Add randomness to the battle outcome by factoring in a random chance
      const playerScore =
        playerMonster.attack +
        playerMonster.defense +
        playerMonster.hp +
        playerMonster.speed;
      const cpuScore =
        cpuMonster.attack +
        cpuMonster.defense +
        cpuMonster.hp +
        cpuMonster.speed;

      // Adding randomness by multiplying each score by a random number between 0.8 and 1.2
      const randomFactor = (min: number, max: number) =>
        Math.random() * (max - min) + min;
      const adjustedPlayerScore = playerScore * randomFactor(0.8, 1.2);
      const adjustedCpuScore = cpuScore * randomFactor(0.8, 1.2);

      if (adjustedPlayerScore > adjustedCpuScore) {
        resolve({ winner: playerMonster, tie: false });
      } else if (adjustedCpuScore > adjustedPlayerScore) {
        resolve({ winner: cpuMonster, tie: false });
      } else {
        resolve({ winner: null, tie: true });
      }
    }, 1000); // Simulate delay
  });
};
