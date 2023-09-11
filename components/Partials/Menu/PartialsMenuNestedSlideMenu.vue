<template>
  <div class="relative overflow-hidden">
    <div
      @click="activeIndex != 0 ? activeIndex-- : ''"
      class="py-3 px-2 border-b flex items-center space-x-3"
      v-if="activeIndex != 0"
    >
      <Icon name="solar:alt-arrow-left-line-duotone" class="w-5 h-5"></Icon>
      <p class="font-medium">Geri</p>
    </div>
    <div class="py-3 px-4 border-b flex items-center space-x-3" v-else>
      <p class="font-medium">Menü</p>
    </div>

    <!-- Ana Menü -->
    <div class="flex overflow-hidden">
      <div
        v-for="(item, index) in 3"
        :style="'transform:translateX(-' + activeIndex * 100 + '%)'"
        class="duration-300 min-w-full"
      >
        <div
          class="border-b py-3 pl-4 grid grid-cols-3 items-center"
          v-for="(item, index2) in 8"
          @click="index != 2 ? activeIndex++ : ''"
          :key="index2"
        >
          <a to="/kategori" class="col-span-2">Menü Link {{ index2 }}</a>
          <div class="flex justify-end pr-4">
            <Icon name="ic:baseline-keyboard-arrow-right"></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeIndex = ref(0);
</script>
