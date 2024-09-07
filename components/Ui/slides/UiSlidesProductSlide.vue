<template>
  <div v-if="products.length > 0">
    <div class="flex items-center space-x-4">
      <p class="text-md font-medium my-2">{{ props.title }}</p>
      <NuxtLink v-if="props.to" :to="props.to" class="flex space-x-1 items-center text-sm font-medium text-orange-500">
        <span>Tümü</span>
        <UIcon name="i-heroicons-chevron-right" />
      </NuxtLink>
    </div>
    <UCarousel arrows v-slot="{ item }" :items="products" :ui="{ item: 'snap-end' }">
      <PartialsProductCard class="mr-4" :product="item" :key="item.id"></PartialsProductCard>
    </UCarousel>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'filters', 'to'])
const productState = useProductState()

const { data: products } = await useAsyncData('initIndexPage', async () => {
  const response = await productState.getProducts(props.filters, true)
  return response
})

</script>
