<template>
  <UCarousel arrows v-slot="{ item }" :items="products" :ui="{ item: 'snap-end' }">
    <PartialsProductCard class="mr-4" :product="item" :key="item"></PartialsProductCard>
  </UCarousel>
</template>

<script setup>
const { products } = defineProps(['products'])
</script>
