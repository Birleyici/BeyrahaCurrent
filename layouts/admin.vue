<template>
  <div>
    <USlideover side="left" v-model="menuStatus">
      <PartialsMenuNestedSlideMenu
        :menu="kategoriler"
      ></PartialsMenuNestedSlideMenu>
    </USlideover>

    <div class="p-1 px-[3%] bg-tertiary-100 flex justify-between items-center">
      <button @click="menuStatus = true">
        <Icon name="mdi:menu" class="w-6 h-6"></Icon>
      </button>
      <div class="space-x-2">
        <UAvatar
          chip-color="primary"
          chip-position="bottom-right"
          size="md"
          imgClass="object-contain border p-1"
          src="https://beyraha.vercel.app/logo.jpg"
          alt="Avatar"
        />
      </div>
    </div>

    <div class="bg-tertiary-5 p-minimal lg:p-maximal">
      <LazyNuxtPage></LazyNuxtPage>
    </div>
    <footer class="text-center py-2 text-sm">
      Beyraha - Admin Managemenet
    </footer>
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
