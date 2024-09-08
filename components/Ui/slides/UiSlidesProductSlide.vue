<template>
<div :id="props.id" >
  <div v-if="products.length == 0" class="w-full overflow-x-hidden">
    <div class="flex gap-4">
      <div v-for="item in 6" class="flex-shrink-0 space-y-2 w-[250px] border rounded-md">
        <USkeleton class="w-full h-[300px]" :ui="{ rounded: 'rounded-md' }" />
        <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
        <USkeleton class="w-2/6 mx-auto h-4 mb-2" :ui="{ rounded: 'rounded-md' }" />
      </div>
    </div>
  </div>
  <div v-else>
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

</div>
  
</template>

<script setup>
const props = defineProps(['title', 'filters', 'to', 'isSsr', 'id'])
const productState = useProductState()
const products = ref([])

if (props.isSsr) {
  const { data } = await useAsyncData(props.to, async () => {
    return await productState.getProducts(props.filters, true)
  })
  products.value = data.value
}

useShowElement(props.id, async () => {
  if (products?.value?.length == 0) {
    const response = await productState.getProducts(props.filters, true)
    products.value = response
  }
})

</script>
