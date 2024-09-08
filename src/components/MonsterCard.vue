<template>
  <div class="p-4 shadow-md rounded-lg bg-white w-80">
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
                  role="progressbar"
                ></div>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </template>

    <!-- If no monster is selected, display a placeholder -->
    <template v-else>
      <div
        class="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg"
      >
        <p class="text-gray-500">{{ role }} Monster</p>
      </div>
      <h3 class="font-bold text-xl mt-4 text-center">{{ role }}</h3>
      <hr class="my-2" aria-hidden="true" />
      <p class="text-center text-gray-500">No monster selected</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Monster } from "@/schemas/monsterSchema";

// Define the props
const props = defineProps<{
  monster: Monster | null; // Allow null for cases when no monster is selected
  role: string; // Role is passed from parent (Player or Computer)
}>();

// Compute the monster stats to display if a monster is selected
const stats = computed(() => ({
  Attack: props.monster?.attack || 0,
  Defense: props.monster?.defense || 0,
  HP: props.monster?.hp || 0,
  Speed: props.monster?.speed || 0,
}));
</script>
