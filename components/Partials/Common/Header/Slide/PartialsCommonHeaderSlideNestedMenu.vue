<template>
  <USlideover side="left" v-model="model">
    <UCard class="flex flex-col flex-1 " :ui="{
      body: { base: 'flex-1' },
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <div class="flex justify-between">
          <UButton v-if="currentLevel > 0" @click="goBack" icon="i-heroicons-chevron-left" size="sm" color="gray"
            variant="link" label="Geri" class="!p-0" :trailing="false" />
          <p v-else>Menü</p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="model = false" />
        </div>
      </template>

      <div class="relative w-full h-full  scroll-container">
        <div v-for="(level, index) in nestedMenus" :key="index" :class="{
          'absolute top-0 left-0 w-full h-full pr-2': true,
          'translate-x-full': index > currentLevel,
          'translate-x-0': index === currentLevel,
          '-translate-x-full': index < currentLevel,
        }">
          <ul class="list-none">
            <li v-for="(item, idx) in level" :key="idx" 
              class="grid grid-cols-3 items-center  mb-2 bg-slate-100 hover:bg-slate-50 cursor-pointer select-none duration-200">
             
              <NuxtLink :to="`/${item.slug}-a${item.id}`" class="col-span-2 p-4">{{ item.name }}</NuxtLink>
              <div v-if="item.children" @click="() => handleClick(item, idx, index)" class="bg-slate-50 p-4 h-full text-right">
                <UIcon  name="i-heroicons-arrow-right"  />
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



<style scoped>
.mdi-chevron-right {
  margin-left: auto;
}
</style>
