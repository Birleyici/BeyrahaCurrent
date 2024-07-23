<template>

  <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal" v-if="props.products?.length > 0">
    <UCarousel arrows v-slot="{ item }" :items="props.products" :ui="{ item: 'snap-end' }">
      <PartialsProductCard class="mr-4" :product="item" :key="item.id"></PartialsProductCard>
    </UCarousel>
  </div>
</template>

<script setup>
const props = defineProps(['products', 'title'])
</script>
