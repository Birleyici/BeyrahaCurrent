<template>
  <USlideover side="left" v-model="model" :ui="{ wrapper: 'fixed inset-0 flex z-[999999]' }">
    <UCard class="flex flex-col flex-1" :ui="{
      body: { base: 'flex-1' },
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <div class="flex justify-between items-center">
          <UButton v-if="currentLevel > 0" @click="goBack" icon="i-heroicons-chevron-left" size="sm" color="gray"
            variant="link" label="Geri" class="!p-0" :trailing="false" />
          <h3 v-else class="text-lg font-semibold text-neutral-900">Kategoriler</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="model = false" />
        </div>
      </template>

      <div class="relative w-full h-full scroll-container">
        <div v-for="(level, index) in nestedMenus" :key="index" :class="{
          'absolute top-0 left-0 w-full h-full pr-2': true,
          'translate-x-full': index > currentLevel,
          'translate-x-0': index === currentLevel,
          '-translate-x-full': index < currentLevel,
        }">
          <ul class="list-none space-y-2">
            <li v-for="(item, idx) in level" :key="idx"
              class="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 cursor-pointer">

              <NuxtLink :to="`/${item.slug}-a${item.id}`" class="flex items-center justify-between p-4 w-full">
                <div class="flex items-center space-x-3">
                  <!-- İkon yerine modern bir indicator -->
                  <div
                    class="w-3 h-3 rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600 group-hover:scale-110 transition-transform duration-200">
                  </div>
                  <span
                    class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200">
                    {{ item.name }}
                  </span>
                </div>

                <!-- Alt kategori varsa ok ikonu -->
                <div v-if="item.children" @click.prevent="() => handleClick(item, idx, index)"
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-secondary-100 transition-colors duration-200">
                  <UIcon name="i-heroicons-chevron-right"
                    class="w-4 h-4 text-neutral-600 group-hover:text-secondary-600" />
                </div>
              </NuxtLink>

              <!-- Hover efekti için gradient overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UCard>
  </USlideover>
</template>

<script setup>
const props = defineProps({
  menu: Array,
  selectedCategory: Object
});
const model = defineModel();
const nestedMenus = ref([props.menu]);
const currentLevel = ref(0);

watch(
  () => props.selectedCategory,
  (newCategory) => {
    if (newCategory) {
      let currentMenu = props.menu;
      nestedMenus.value = [currentMenu];
      currentLevel.value = 0;

      while (newCategory && currentMenu) {
        const found = currentMenu.find(item => item.name === newCategory.name);
        if (found && found.children) {
          nestedMenus.value.push(found.children);
          currentLevel.value++;
          currentMenu = found.children;
        } else {
          break;
        }
      }
    }
  },
  { immediate: true }
);

const handleClick = (item, idx, levelIndex) => {
  if (item.children) {
    nestedMenus.value = [...nestedMenus.value.slice(0, levelIndex + 1), item.children];
    currentLevel.value++;
  }
};

const goBack = () => {
  if (currentLevel.value > 0) {
    currentLevel.value--;
  }
};
</script>
