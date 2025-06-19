<template>
  <div :id="props.id" class="component-spacing">
    <!-- Skeleton ekranı, yükleme sırasında gösterilir -->
    <div v-if="isLoading" class="w-full overflow-x-hidden">
      <div class="flex gap-6">
        <div v-for="item in 6" :key="item" class="flex-shrink-0 space-y-4 w-[280px] card">
          <USkeleton class="w-full h-[320px]" :ui="{ rounded: 'rounded-xl' }" />
          <div class="p-6 space-y-3">
            <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
            <USkeleton class="w-2/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && products?.length > 0" class="space-y-8">
      <!-- Header -->
      <div class="container">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-heading-2 font-semibold text-neutral-900">{{ props.title }}</h2>
          <NuxtLink v-if="props.to" :to="props.to"
            class="group flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 font-medium transition-colors duration-200">
            <span>Tümünü Gör</span>
            <UIcon name="i-heroicons-chevron-right"
              class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </div>

      <!-- Carousel -->
      <div class="container">
        <UCarousel arrows v-slot="{ item, index }" :items="products" :ui="{
          item: 'snap-end',
          container: 'gap-6 px-2'
        }">
          <PartialsProductCard :lcp="props.lcp" :index="index" :product="item" :key="item.id" />
        </UCarousel>
      </div>
    </div>

    <!-- Ürün yoksa hiçbir şey gösterilmez -->
  </div>
</template>

<script setup>
const props = defineProps(['title', 'filters', 'to', 'isSsr', 'id', 'lcp'])
const productState = useProductState()
const products = ref([])
const isLoading = ref(true) // Yüklenme durumu

if (props.isSsr) {
  const { data } = await useAsyncData(props.to, async () => {
    return await productState.getProducts(props.filters, true)
  })
  products.value = data.value
  isLoading.value = false // Yükleme bittiğinde durumu güncelle
}

useShowElement(props.id, async () => {
  if (products?.value?.length == 0) {
    isLoading.value = true // Yükleme başlatılıyor
    const response = await productState.getProducts(props.filters, true)
    products.value = response
    isLoading.value = false // Yükleme tamamlandı
  }
})
</script>
