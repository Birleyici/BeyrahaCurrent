<template>
  <div :id="props.id" class="py-8 lg:py-12">
    <!-- Skeleton ekranı, yükleme sırasında gösterilir -->
    <div v-if="isLoading" class="w-full overflow-x-hidden">
      <!-- Mobile Skeleton -->
      <div class="flex gap-4 lg:hidden overflow-x-auto mobile-breakout-x px-4">
        <div v-for="item in 6" :key="item" class="flex-shrink-0 space-y-4 w-[280px] first:ml-0">
          <USkeleton class="w-full h-[320px]" :ui="{ rounded: 'rounded-xl' }" />
          <div class="p-4 lg:p-6 space-y-3">
            <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
            <USkeleton class="w-2/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
          </div>
        </div>
      </div>

      <!-- Desktop Skeleton -->
      <div class="hidden lg:block">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
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
      </div>
    </div>

    <div v-if="!isLoading && products?.length > 0" class="space-y-8">
      <!-- Header -->
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-heading-2 font-semibold text-neutral-900 dark:text-neutral-100">{{ props.title }}</h2>
          <NuxtLink v-if="props.to" :to="props.to"
            class="group flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 font-medium transition-colors duration-200">
            <span>Tümünü Gör</span>
            <UIcon name="i-heroicons-chevron-right"
              class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Carousel - Tam viewport genişliği -->
      <div class="lg:hidden mobile-breakout-viewport">
        <div class="overflow-x-auto scrollbar-hide">
          <div class="flex gap-4 pb-4 pl-4" style="scroll-snap-type: x mandatory;">
            <div v-for="(item, index) in products" :key="item.id"
              class="flex-shrink-0 w-[280px] sm:w-[320px] snap-start" :class="{ 'pr-4': index === products.length - 1 }"
              style="scroll-snap-align: start;">
              <PartialsProductCard :lcp="props.lcp" :index="index" :product="item" :key="item.id" />
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Carousel - Mevcut görünüm -->
      <div class="hidden lg:block">
        <div class="container mx-auto px-4 md:px-6 lg:px-8">
          <UCarousel arrows v-slot="{ item, index }" :items="products" :ui="{
            item: 'snap-end',
            container: 'gap-6 px-2'
          }">
            <PartialsProductCard :lcp="props.lcp" :index="index" :product="item" :key="item.id" />
          </UCarousel>
        </div>
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

<style scoped>
/* Scrollbar gizleme */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling */
.overflow-x-auto {
  scroll-behavior: smooth;
}
</style>
