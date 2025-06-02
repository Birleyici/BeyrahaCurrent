<template>
  <div class="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
    <PartialsCommonHeaderSlideNestedMenu v-model="$uiStore.state.menuSlide" :menu="props.categories" />
    <LazyPartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />
    <LazyPartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <!-- Ana Header -->
    <div class="container py-4">
      <div class="flex items-center justify-between">
        <!-- Sol Menü -->
        <div class="flex items-center space-x-3">
          <button @click="$uiStore.state.menuSlide = true"
            class="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200">
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6 text-neutral-700" />
          </button>

          <button @click="$changeMainState({ isOpenSearch: true })"
            class="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200">
            <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 text-neutral-700" />
          </button>
        </div>

        <!-- Logo -->
        <div class="flex-1 flex justify-center">
          <NuxtLink href="/" class="group">
            <NuxtImg :src="logoSrc" class="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
              format="webp" width="102" height="45" alt="Beyraha Logo" />
          </NuxtLink>
        </div>

        <!-- Sağ Menü -->
        <div class="flex items-center space-x-2">
          <!-- Hesap -->
          <button @click="$uiStore.state.accountSlide = true"
            class="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200">
            <UIcon name="i-heroicons-user" class="w-6 h-6 text-neutral-700" />
          </button>

          <!-- Sepet -->
          <button @click="$uiStore.state.cartSlide = true"
            class="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-neutral-700" />
            <ClientOnly>
              <div v-if="props.cart.cartQyt > 0" class="absolute -top-1 -right-1">
                <span
                  class="bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {{ props.cart.cartQyt }}
                </span>
                <div
                  class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {{ formatPrice(props.cart.cartTotalAmount) }}
                </div>
              </div>
            </ClientOnly>
          </button>
        </div>
      </div>
    </div>

    <!-- Arama Input'u -->
    <LazyPartialsCommonSearchInput />
  </div>
</template>

<script setup>
const props = defineProps(["categories", "cart"]);
const logoSrc = "cl/cfd082d7-37a8-4067-fafe-f214b571f700/public";
</script>
