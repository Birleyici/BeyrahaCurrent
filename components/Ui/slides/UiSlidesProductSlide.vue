<template>
  <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal" v-if="products.length > 0">
    <p class="mb-2 font-bold">{{title}}</p>
    <UCarousel arrows v-slot="{ item }" :items="products" :ui="{ item: 'snap-end' }">
      <PartialsProductCard class="mr-4" :product="item" :key="item"></PartialsProductCard>
    </UCarousel>
  </div>
</template>

<script setup>
const { products , title} = defineProps(['products', 'title'])
</script>
