<template>
  <div>
    <PartialsCommonHeaderMobile :categories="categories" v-if="$device.isMobile" />
    <PartialsCommonHeaderDesktop :categories="categories" v-else />
  </div>
</template>
<script setup>

const categories = reactive([
  {
    name: "Giyim",
    icon: "mdi:clothes",
    children: [
      {
        name: "Tesettür",
        icon: null,
        children: [
          {
            name: "alt alt",
            icon: null,
            children: [
              {
                name: "alt alt alt",
                icon: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Takı",
    icon: "mdi:gold",
  },
]);


</script>
