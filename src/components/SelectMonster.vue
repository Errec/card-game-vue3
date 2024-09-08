<template>
  <div class="flex flex-wrap justify-center gap-4">
    <SelectMonsterItem
      v-for="monster in monsters"
      :key="monster.id"
      :monster="monster"
      :selected="isSelected(monster)"
      @click="selectMonster(monster)"
    />
  </div>
</template>

<script setup>
import SelectMonsterItem from "@/components/SelectMonsterItem.vue";
import { useMonsterStore } from "@/composables/useMonsterStore";

const { monsters, playerMonster, setPlayerMonster } = useMonsterStore();

const isSelected = (monster) => playerMonster.value?.id === monster.id;

const selectMonster = (monster) => {
  setPlayerMonster(monster);
};
</script>
