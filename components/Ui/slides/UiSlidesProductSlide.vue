<template>
  <div class="mt-minimal lg:mt-maximal " v-if="props.products?.length > 0">
    <b class="text-md my-2">{{props.title}}</b>
    <UCarousel arrows v-slot="{ item }" :items="props.products" :ui="{ item: 'snap-end' }">
      <PartialsProductCard class="mr-4" :product="item" :key="item.id"></PartialsProductCard>
    </UCarousel>
  </div>
</template>

<script setup>
const props = defineProps(['products', 'title'])

const items = [
  'https://picsum.photos/600/600?random=1',
  'https://picsum.photos/600/600?random=2',
  'https://picsum.photos/600/600?random=3',
  'https://picsum.photos/600/600?random=4',
  'https://picsum.photos/600/600?random=5',
  'https://picsum.photos/600/600?random=6'
]
</script>
