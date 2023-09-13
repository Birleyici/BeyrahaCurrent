<template>
  <div class="px-x-mobil lg:px-x-desktop lg:grid grid-cols-10 gap-10">
    
    <button @click="isOpenFilters = !isOpenFilters" v-if="useMain().isMobile" class="w-full bg-slate-50 border rounded-full mb-minimal py-2 text-secondary-500 flex items-center space-x-2 justify-center">
    <Icon name="ic:round-filter-alt" class="w-5 h-5"></Icon>
    <p class="font-medium">Filtreler</p>
    </button>
    <div v-if="useMain().isMobile" class="right-0 left-0 p-4 duration-300 h-full fixed z-10 bg-slate-50 rounded-t-xl border"
    :class="isOpenFilters ? 'translate-y-0':'translate-y-full'"
    >
      <b>Filtreler</b>
      <div class="space-y-minimal">
        <div class="rounded-md pt-minimal w-full">
          <div
            @click="isOpen = !isOpen"
            :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
            class="no-select cursor-pointer border py-2 px-4 bg-tertiary-50 font-medium flex justify-between items-center"
          >
            <p>Marka</p>
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
            <UiFormInput placeholder="Marka ara"></UiFormInput>
            <UiFormCheckbox v-for="item in 12">Marka {{ item }}</UiFormCheckbox>
          </div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 border-none after:border-none before:border-none peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-500"
          ></div>
          <span class="ml-3 text-sm font-medium text-gray-900">Ücretsiz kargo</span>
        </label>
      </div>
    </div>
    <div class="col-span-8 space-y-minimal">
      <div class="space-y-minimal lg:flex justify-between items-center">
        <div class="flex space-x-4 items-center">
            <div class="flex items-center space-x-2">
            <div class="bg-slate-100 rounded-full pl-2 pr-1 py-1 lg:!p-2 text-xs lg:text-sm flex items-center space-x-2">
              <span>Ücretsiz Kargo</span>
              <button
                class="rounded-full bg-slate-300 w-5 h-5 flex items-center justify-center"
              >
                <Icon name="mdi:close"></Icon>
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="bg-slate-100 rounded-full pl-2 pr-1 py-1 lg:!p-2 text-xs lg:text-sm flex items-center space-x-2">
              <span>Marka 1</span>
              <button
                class="rounded-full bg-slate-300 w-5 h-5 flex items-center justify-center"
              >
                <Icon name="mdi:close"></Icon>
              </button>
            </div>
          </div>
        </div>
        <select
          class="!w-72 bg-slate-50 text-sm focus:bg-white duration-300 p-3 focus:!outline-0 focus:!ring-0 focus:border-secondary-500 w-full rounded-md border"
        >
          <option value="">Akıllı sıralama</option>
          <option value="">En çok satanlar</option>
          <option value="">Azalan fiyat</option>
          <option value="">Artan fiyat</option>
        </select>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-5">
        <PartialsProductCard v-for="item in 15"></PartialsProductCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(true);
const isOpenFilters = ref(false)
</script>
