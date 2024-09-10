<template>
  <div class="p-4 shadow-zinc-700 shadow-xl rounded-lg bg-white w-80 h-96">
    <!-- If the monster is selected, display its details -->
    <template v-if="monster">
      <img
        :src="monster.imageUrl || '/src/assets/images/placeholder.png'"
        :alt="`${monster.name} monster`"
        class="w-full h-40 object-cover rounded-lg"
      />
      <h3 class="font-bold text-xl mt-4">{{ monster.name }}</h3>
      <hr class="my-2" aria-hidden="true" />
      <dl>
        <div v-for="(stat, label) in stats" :key="label" class="mb-2">
          <dt class="sr-only">{{ label }}</dt>
          <dd>
            <div class="flex items-center">
              <span class="w-16 inline-block">{{ label }}:</span>
              <div class="relative h-1 bg-gray-200 flex-grow ml-2">
                <div
                  class="bg-monster-green h-1"
                  :style="{ width: `${stat}%` }"
                  :aria-valuenow="stat"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-label="`${label}: ${stat}%`"
                  role="progressbar"
                ></div>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </template>

    <!-- If no monster is selected, display a placeholder card -->
    <template v-else>
      <div
        class="w-full h-full flex flex-col items-center justify-center bg-gray-200 rounded-lg"
      >
        <p class="text-gray-700 text-2xl">{{ role }}</p>
        <p class="text-center text-gray-500 mt-4">No monster selected</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Monster } from "@/schemas/monsterSchema";
import { computed, defineProps } from "vue";

// Define props
const props = defineProps<{
  monster: Monster | null; // Allow null when no monster is selected
  role: string; // Player or Computer
}>();

// Compute stats, normalizing to percentage if needed
const maxStat = 100;
const stats = computed(() => ({
  Attack: props.monster ? (props.monster.attack / maxStat) * 100 : 0,
  Defense: props.monster ? (props.monster.defense / maxStat) * 100 : 0,
  HP: props.monster ? (props.monster.hp / maxStat) * 100 : 0,
  Speed: props.monster ? (props.monster.speed / maxStat) * 100 : 0,
}));
</script>
