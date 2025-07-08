<template>
  <div :id="props.id" class="py-12 lg:py-16 relative overflow-hidden">


    <!-- Subtle texture overlay -->
    <div class="absolute inset-0 opacity-5 texture-pattern"></div>

    <div class="relative z-10">
      <!-- Skeleton ekranı, yükleme sırasında gösterilir -->
      <div v-if="isLoading" class="w-full overflow-x-hidden">
        <!-- Mobile Skeleton -->
        <div class="flex gap-3 lg:hidden overflow-x-auto px-6">
          <div v-for="item in 6" :key="item" class="flex-shrink-0 space-y-3 w-[260px] first:ml-0">
            <USkeleton class="w-full h-[340px]" :ui="{ rounded: 'rounded-2xl' }" />
            <div class="p-4 space-y-3">
              <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-lg' }" />
              <USkeleton class="w-2/6 mx-auto h-3" :ui="{ rounded: 'rounded-lg' }" />
            </div>
          </div>
        </div>

        <!-- Desktop Skeleton -->
        <div class="hidden lg:block">
          <div class="md:container md:mx-auto  md:px-8 lg:px-12">
            <div class="flex gap-4">
              <div v-for="item in 6" :key="item" class="flex-shrink-0 space-y-3 w-[280px] card">
                <USkeleton class="w-full h-[340px]" :ui="{ rounded: 'rounded-2xl' }" />
                <div class="p-4 space-y-3">
                  <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-lg' }" />
                  <USkeleton class="w-2/6 mx-auto h-3" :ui="{ rounded: 'rounded-lg' }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLoading && products?.length > 0" class="space-y-12">
        <!-- Elegant Header -->
        <div class="container mx-auto px-6 md:px-8 lg:px-12">
          <div class="flex justify-between lg:flex-row lg:justify-between lg:items-center gap-6 mb-12">
            <div class="space-y-3">
              <h2 class="text-2xl lg:text-4xl font-light text-slate-800 dark:text-slate-100 tracking-wide">
                {{ props.title }}
              </h2>
              <div class="h-0.5 w-16 bg-gradient-to-r from-secondary-600 to-rose-400"></div>
            </div>

            <NuxtLink v-if="props.to" :to="props.to"
              class="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:!text-white">
              <span class="text-sm lg:text-base tracking-wide">Tümünü Gör</span>
              <UIcon name="i-heroicons-arrow-right"
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile Carousel - Premium Design -->
        <div class="lg:hidden -mx-6 md:-mx-8 lg:-mx-12">
          <div class="overflow-x-auto scrollbar-hide py-2">
            <div class="flex gap-3 pb-4"
              style="scroll-snap-type: x mandatory; padding-left: 1.5rem; padding-right: 1.5rem;">
              <div v-for="(item, index) in products" :key="item.id"
                class="flex-shrink-0 snap-start product-card-mobile !w-[200px]" style="scroll-snap-align: start;">
                <PartialsProductCard :lcp="props.lcp" :index="index" :product="item" :key="item.id" />
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Carousel - Luxury Experience -->
        <div class="hidden lg:block relative">
          <div class="container mx-auto px-6 md:px-8 lg:px-12 py-2">
            <UCarousel arrows v-slot="{ item, index }" :items="products" :prev-button="{
              color: 'white',
              icon: 'i-heroicons-chevron-left-20-solid',
              class: 'absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-slate-800/90 hover:bg-secondary-600 hover:text-white text-slate-600 dark:text-slate-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-slate-200 dark:border-slate-700 z-10'
            }" :next-button="{
              color: 'white',
              icon: 'i-heroicons-chevron-right-20-solid',
              class: 'absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-slate-800/90 hover:bg-secondary-600 hover:text-white text-slate-600 dark:text-slate-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-slate-200 dark:border-slate-700 z-10'
            }" :ui="{
              item: 'snap-end',
              container: 'gap-4 px-2 py-2'
            }">
              <div class="product-card-desktop !w-[220px]">
                <PartialsProductCard :lcp="props.lcp" :index="index" :product="item" :key="item.id" />
              </div>
            </UCarousel>
          </div>
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
  // Response formatını kontrol et - data varsa kullan, yoksa doğrudan response'u kullan
  products.value = data.value?.data || data.value || []
  isLoading.value = false // Yükleme bittiğinde durumu güncelle
}

useShowElement(props.id, async () => {
  if (products?.value?.length == 0) {
    isLoading.value = true // Yükleme başlatılıyor
    const response = await productState.getProducts(props.filters, true)
    // Response formatını kontrol et - data varsa kullan, yoksa doğrudan response'u kullan
    products.value = response?.data || response || []
    isLoading.value = false // Yükleme tamamlandı
  }
})
</script>

<style scoped>
/* Premium scrollbar styling */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ultra smooth scrolling */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Product card animations */
.product-card-mobile {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card-desktop {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Premium hover effects */
.product-card-mobile:hover {
  transform: translateY(-4px);
}

.product-card-desktop:hover {
  transform: translateY(-6px);
}

/* Elegant focus states */
.product-card-mobile:focus-within,
.product-card-desktop:focus-within {
  outline-offset: 4px;
}

/* Subtle texture pattern */
.texture-pattern {
  background-image: radial-gradient(circle at 3px 3px, rgba(0, 0, 0, 0.1) 1px, transparent 0),
    radial-gradient(circle at 13px 13px, rgba(0, 0, 0, 0.1) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Typography enhancements */
h2 {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.025em;
}

/* Responsive design optimizations */
@media (max-width: 768px) {
  .product-card-mobile {
    width: 260px;
  }
}

@media (min-width: 1024px) {
  .product-card-desktop {
    width: 280px;
  }
}
</style>
