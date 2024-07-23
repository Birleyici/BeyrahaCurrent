<template>
  <USlideover v-model="model">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <UButton
            v-if="currentLevel > 0"
            @click="goBack"
            icon="i-heroicons-chevron-left"
            size="sm"
            color="gray"
            variant="link"
            label="Geri"
            class="!p-0"
            :trailing="false"
          />
          <p v-else>Menü</p>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="model = false"
          />
        </div>
      </template>

      <div class="relative w-full h-full overflow-hidden">
        <div
          v-for="(level, index) in nestedMenus"
          :key="index"
          :class="{
            'absolute top-0 left-0 w-full h-full ': true,
            'translate-x-full': index > currentLevel,
            'translate-x-0': index === currentLevel,
            '-translate-x-full': index < currentLevel,
          }"
        >
          <ul class="list-none">
            <li
              v-for="(item, idx) in level"
              :key="idx"
              @click="() => handleClick(item, idx, index)"
              class="flex items-center p-4 mb-2 bg-slate-100 hover:bg-slate-50 cursor-pointer select-none duration-200"
            >
              <NuxtLink :href="item.url && '/management/' + item.url">
                <i :class="item.icon"></i>
                <span class="ml-2">{{ item.name }}</span>
                <i v-if="item.children" class="mdi mdi-chevron-right ml-auto"></i>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </UCard>
  </USlideover>
</template>

<script setup>
const model = defineModel();
const props = defineProps(["menu"]);
const nestedMenus = ref([props.menu]);

const currentLevel = ref(0);

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
