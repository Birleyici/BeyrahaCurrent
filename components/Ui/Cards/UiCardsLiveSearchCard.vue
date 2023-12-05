<template>
    <div class="rounded-md pt-minimal w-full ">
          <div
            @click="isOpen = !isOpen"
            :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
            class="no-select cursor-pointer border py-2 px-4 bg-tertiary-100 font-medium flex justify-between items-center"
          >
            <p>{{ title }}</p>
            <Icon
              v-if="isOpen"
              name="material-symbols:keyboard-arrow-down"
              class="w-4 h-4"
            ></Icon>
            <Icon
              v-else
              name="material-symbols:keyboard-arrow-right"
              class="w-4 h-4"
            ></Icon>
          </div>
          <div
      :class="isOpen ? 'border-l border-r border-b max-h-[200px] p-4' : 'max-h-0'"
      class="duration-300 bg-white rounded-b-md grid gap-2 overflow-hidden overflow-y-scroll"
    >
      <UiFormInput v-model="searchQuery" placeholder="Marka ara"></UiFormInput>
      <UiFormCheckbox
        v-for="item in filteredData"
        v-model="selecteds"
        :id="item.id"
        name="stock"
        :value="item.id"
      >{{ item.name }}</UiFormCheckbox>
      <p class="text-sm" v-if="filteredData.length ==0">Sonuç bulunamadı...</p>
    </div>


      </div>
</template>

<script setup>
const isOpen = ref(true);
const { title, categoriesData, selectedInit } =  defineProps(['title', 'categoriesData', 'selectedInit']);
const emit = defineEmits(['selecteds'])

console.log(categoriesData, 'props categoriesData categories')

const selecteds = ref(selectedInit);



const searchQuery = ref("");

const filteredData = computed(() => {
  if (searchQuery.value) {
    return categoriesData.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  return categoriesData;
});

watch(selecteds, ()=>{
  emit('selecteds', selecteds.value)
})
</script>