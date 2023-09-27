<template>
  <div>
    <LazyUiMenuSideBarMenu :status="menuStatus" @change-status="(e) => (menuStatus = e)">
      <PartialsMenuNestedSlideMenu :menu="kategoriler"></PartialsMenuNestedSlideMenu>
    </LazyUiMenuSideBarMenu>

    <div class="p-minimal bg-tertiary-100">
      <button @click="menuStatus = true">
        <Icon name="mdi:menu" class="w-6 h-6"></Icon>
      </button>
    </div>

    <div class="bg-tertiary-5 p-minimal lg:p-maximal">
      <NuxtPage></NuxtPage>
    </div>
    <footer class="text-center py-2 text-sm">Beyraha - Admin Managemenet</footer>
  </div>
</template>

<script setup>
const menuStatus = ref(false);

const kategoriler = reactive([
  {
    name: "Genel görünüm",
    icon: "mdi:view-dashboard",
    children: [
      {
        name: "Tesettür",
        icon: null,
      },
    ],
  },
  {
    name: "Ayarlar",
    icon: "mdi:settings",
  },
]);
</script>
