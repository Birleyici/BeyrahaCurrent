<template>
  <div>
    <PartialsCommonHeaderMobile v-if="isMobile" :cart="cartState" :categories="categories" />
    <PartialsCommonHeaderDesktop v-else :cart="cartState" :categories="categories" />
  </div>
</template>
<script setup>

const { isMobile } = useDevice()

const cartState = useCartState()
const config = useRuntimeConfig()
const { data: categories } = await useFetch(config.public.apiBase + '/categories', {
  params: {
    transform: true
  }
})
</script>
