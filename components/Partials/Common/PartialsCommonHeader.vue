<template>
  <div class="standart-section-spacing mt-y-desktop">
    <PartialsCommonHeaderMobile :cart="cartState" :categories="categories" v-if="$device.isMobile" />
    <PartialsCommonHeaderDesktop :cart="cartState" :categories="categories" v-else />
  </div>
</template>
<script setup>
const cartState = useCartState()
const { data: categories } = await useFetch(useBaseUrl() + 'categories', {
  params: {
    transform: true
  }
})
</script>
