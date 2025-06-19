<template>
  <div
    class="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50 transition-colors duration-300">
    <LazyPartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />
    <LazyPartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <!-- Ana Header -->
    <div class="container">
      <div class="flex items-center justify-between py-6">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink href="/" class="group">
            <img :src="logoSrc" class="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
              format="webp" width="102" height="45" alt="Beyraha Logo" />
          </NuxtLink>
        </div>

        <!-- Arama - Merkezi konumlandırma -->
        <div class="flex-1 flex justify-center px-8">
          <div class="w-full max-w-lg">
            <LazyPartialsCommonSearchInput />
          </div>
        </div>

        <!-- Sağ Menü -->
        <div class="flex items-center space-x-6 flex-shrink-0">
          <!-- Theme Toggle -->
          <button @click="toggleDarkMode"
            class="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
            <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              class="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400" />
            <span
              class="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white hidden lg:block">
              {{ isDark ? 'Açık' : 'Koyu' }}
            </span>
          </button>

          <!-- Hesap -->
          <button @click="$uiStore.state.accountSlide = true"
            class="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
            <UIcon name="i-heroicons-user"
              class="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400" />
            <span
              class="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white hidden lg:block">Hesap</span>
          </button>

          <!-- Sepet -->
          <button @click="$uiStore.state.cartSlide = true"
            class="group relative flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
            <div class="relative">
              <UIcon name="i-heroicons-shopping-bag"
                class="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400" />
              <ClientOnly>
                <span v-if="props.cart.cartQyt > 0"
                  class="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {{ props.cart.cartQyt }}
                </span>
              </ClientOnly>
            </div>
            <div class="flex flex-col items-start hidden lg:block">
              <span
                class="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white">Sepet</span>
              <ClientOnly>
                <span class="text-xs text-secondary-600 dark:text-secondary-400 font-medium">
                  {{ formatPrice(props.cart.cartTotalAmount) }}
                </span>
              </ClientOnly>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Kategori Navigasyonu -->
    <div
      class="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div class="container">
        <div class="scroll-container py-4">
          <div class="flex items-center space-x-8">
            <NuxtLink v-for="cat in props.categories" :key="cat.id" class="group py-3 transition-colors duration-200"
              :to="`/${cat.slug}-a${cat.id}`">

              <span
                class="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200 whitespace-nowrap">
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

// Dark mode composable
const { isDark, toggleDarkMode } = useDarkMode();

// Logo source'u dark mode'a göre belirle
const logoSrc = computed(() => {
  return isDark.value ? '/logo-for-dark.png' : '/logo-for-light.png';
});

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
