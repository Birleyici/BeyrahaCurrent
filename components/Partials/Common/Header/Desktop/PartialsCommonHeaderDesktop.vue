<template>
  <div class="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
    <LazyPartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />
    <LazyPartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <!-- Ana Header -->
    <div class="container">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink href="/" class="group">
            <NuxtImg :src="logoSrc" class="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
              format="webp" width="102" height="45" alt="Beyraha Logo" />
          </NuxtLink>
        </div>

        <!-- Arama - Merkezi konumlandırma -->
        <div class="flex-1 flex justify-center px-6">
          <div class="w-full max-w-lg">
            <LazyPartialsCommonSearchInput />
          </div>
        </div>

        <!-- Sağ Menü -->
        <div class="flex items-center space-x-4 flex-shrink-0">
          <!-- Hesap -->
          <button @click="$uiStore.state.accountSlide = true"
            class="group flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-neutral-100 transition-all duration-200">
            <UIcon name="i-heroicons-user" class="w-5 h-5 text-neutral-600 group-hover:text-secondary-600" />
            <span class="font-medium text-neutral-700 group-hover:text-neutral-900 hidden lg:block">Hesap</span>
          </button>

          <!-- Sepet -->
          <button @click="$uiStore.state.cartSlide = true"
            class="group relative flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-neutral-100 transition-all duration-200">
            <div class="relative">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-neutral-600 group-hover:text-secondary-600" />
              <ClientOnly>
                <span v-if="props.cart.cartQyt > 0"
                  class="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {{ props.cart.cartQyt }}
                </span>
              </ClientOnly>
            </div>
            <div class="flex flex-col items-start hidden lg:block">
              <span class="font-medium text-neutral-700 group-hover:text-neutral-900">Sepet</span>
              <ClientOnly>
                <span class="text-xs text-secondary-600 font-medium">
                  {{ formatPrice(props.cart.cartTotalAmount) }}
                </span>
              </ClientOnly>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Kategori Navigasyonu -->
    <div class="border-t border-neutral-200 bg-white">
      <div class="container">
        <div class="scroll-container py-4">
          <div class="flex items-center space-x-8">
            <NuxtLink v-for="cat in props.categories" :key="cat.id" class="group py-3 transition-colors duration-200"
              :to="`/${cat.slug}-a${cat.id}`">

              <span
                class="text-sm font-medium text-neutral-700 group-hover:text-secondary-600 transition-colors duration-200">
                {{ cat.name }}
              </span>

            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <PartialsCommonHeaderSlideNestedMenu v-model="$uiStore.state.menuSlide" :menu="props.categories"
      :selected-category="selectedCategory" />
  </div>
</template>

<script setup>
const props = defineProps(["categories", "cart"]);
const logoSrc = "cl/cfd082d7-37a8-4067-fafe-f214b571f700/public";
const selectedCategory = ref(null);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
