<template>
  <UCarousel arrows v-slot="{ item }" :items="items" :ui="{ item: 'snap-end' }">
    <PartialsProductCard class="mr-4" :key="item"></PartialsProductCard>
  </UCarousel>
</template>

<script setup>
const items = 8
</script>

