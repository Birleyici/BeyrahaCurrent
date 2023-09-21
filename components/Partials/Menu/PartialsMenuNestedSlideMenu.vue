<template>
  <div class="relative overflow-hidden">
    <div
      @click="activeIndex > 0 ? activeIndex-- : ''"
      class="py-3 px-2 border-b flex items-center space-x-3"
      v-if="activeIndex > 0"
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
        v-for="(currentMenu, index) in nestedMenus"
        :style="'transform:translateX(-' + activeIndex * 100 + '%)'"
        class="min-w-full"
      >
        <div
          class="border-b py-3 pl-4 grid grid-cols-3 items-center duration-300"
          v-for="item in currentMenu"
          @click="item.children ? navigateToSubMenu(index + 1, item.children) : ''"
          :key="item.name"
        >
          <a to="/kategori" class="col-span-2 flex items-center space-x-2"
            ><Icon v-if="item.icon != null" :name="item.icon"></Icon>
            <p>{{ item.name }}</p>
          </a>
          <div class="flex justify-end pr-4" v-if="item.children">
            <Icon name="ic:baseline-keyboard-arrow-right"></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { menu } = defineProps(["menu"]);
const activeIndex = ref(0);
const nestedMenus = ref([menu]);

const navigateToSubMenu = (index, subMenu) => {
  activeIndex.value = index;
  nestedMenus.value.push(subMenu);
};

watch(activeIndex, (newIndex) => {
  if (newIndex < nestedMenus.value.length - 1) {
    nestedMenus.value = nestedMenus.value.slice(0, newIndex + 1);
  }
});
</script>
