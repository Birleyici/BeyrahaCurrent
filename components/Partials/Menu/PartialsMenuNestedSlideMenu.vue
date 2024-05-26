<template>
  <div class="relative w-full h-full overflow-hidden">
    <div class="sticky top-0 left-0 p-4 bg-gray-100 z-10">
      <button v-if="currentLevel > 0" @click="goBack" class="p-2 bg-gray-200 rounded">
        Geri
      </button>
      <p class="p-2" v-else >Menü</p>

    </div>
    <div
      v-for="(level, index) in nestedMenus"
      :key="index"
      class="mt-16"
      :class="{
        'absolute top-0 left-0 w-full h-full ': true,
        'translate-x-full': index > currentLevel,
        'translate-x-0': index === currentLevel,
        '-translate-x-full': index < currentLevel,
      }"
    >
      <ul class="list-none p-4">
        <li
          v-for="(item, idx) in level"
          :key="idx"
          @click="() => handleClick(item, idx, index)"
          class="flex items-center p-4 mb-2 bg-white rounded shadow cursor-pointer"
        >
          <i :class="item.icon"></i>
          <span class="ml-2">{{ item.name }}</span>
          <i v-if="item.children" class="mdi mdi-chevron-right ml-auto"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { menu } = defineProps(["menu"]);
const nestedMenus = ref([menu]);

const currentLevel = ref(0);

const handleClick = (item, idx, levelIndex) => {
  if (item.children) {
    nestedMenus.value = [
      ...nestedMenus.value.slice(0, levelIndex + 1),
      item.children,
    ];
    currentLevel.value++;
  }
};

const goBack = () => {
  if (currentLevel.value > 0) {
    currentLevel.value--;
  }
};
</script>

<style scoped>
.mdi-chevron-right {
  margin-left: auto;
}
</style>
