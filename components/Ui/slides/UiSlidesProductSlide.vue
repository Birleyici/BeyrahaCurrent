<template>
  <div class="grid gap-2 mt-minimal lg:mt-maximal" v-if="props.products?.length > 0">
    <b class="text-md">{{props.title}}</b>
    <UCarousel arrows v-slot="{ item }" :items="props.products" :ui="{ item: 'snap-end' }">
      <PartialsProductCard class="mr-4" :product="item" :key="item.id"></PartialsProductCard>
    </UCarousel>
  </div>
</template>

<script setup>
const props = defineProps(['products', 'title'])
</script>
