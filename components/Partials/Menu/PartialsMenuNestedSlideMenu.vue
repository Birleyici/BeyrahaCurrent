<template>
  <div class="relative overflow-hidden">
    <div @click="activeIndex !=0 ? activeIndex--:''"  class="py-3 px-5 border-b flex items-center space-x-3" v-if="activeIndex!=0">
      <Icon name="solar:alt-arrow-left-line-duotone" class="w-5 h-5"></Icon>
      <p class="font-medium">Geri</p>
    </div>
    <div   class="py-3 px-6 border-b flex items-center space-x-3" v-else>
      <p class="font-medium">Menü</p>
    </div>
    
    <!-- Ana Menü -->
    <div class="flex">
      <div
        v-for="(item, index) in 3"
        :style="'transform:translateX(-' + activeIndex * 100 + '%)'"
        class="transition-transform duration-300 min-w-full"
      >

      <div
          class="border-b py-3 flex justify-between items-center px-6"
        >
          <NuxtLink to="kategori">Kategori</NuxtLink>
          <Icon name="ic:baseline-keyboard-arrow-right"></Icon>
        </div>


        <div
          class="border-b py-3 flex justify-between items-center px-6"
          v-for="(item, index2) in 8"
          @click="index!=2 ? activeIndex++ : ''"
          :key="index2"
        >
          <a to="/kategori">Menü Link {{ index2 }}</a>
          <Icon name="ic:baseline-keyboard-arrow-right"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeIndex = ref(0);
</script>
