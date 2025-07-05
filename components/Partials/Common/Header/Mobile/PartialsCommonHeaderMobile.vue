<template>
  <div
    class="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50 transition-colors duration-300">
    <PartialsCommonHeaderSlideNestedMenu v-model="uiStore.menuSlide" :menu="props.categories" />
    <LazyPartialsCommonHeaderSlideAccount v-model="uiStore.accountSlide" />
    <LazyPartialsCommonHeaderSlideCart v-model="uiStore.cartSlide" />

    <!-- Ana Header -->
    <div class="container py-5">
      <div class="flex items-center justify-between">
        <!-- Sol Menü -->
        <div class="flex items-center space-x-3">
          <button @click="uiStore.menuSlide = true"
            class="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 shadow-sm">
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </button>

          <button @click="$changeMainState({ isOpenSearch: true })"
            class="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 shadow-sm">
            <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>

        <!-- Logo -->
        <div class="flex-1 flex justify-center">
          <NuxtLink href="/" class="group">
            <img :src="logoSrc" class="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
              format="webp" width="102" height="45" alt="Beyraha Logo" />
          </NuxtLink>
        </div>

        <!-- Sağ Menü -->
        <div class="flex items-center space-x-3">
          <!-- Hesap -->
          <button @click="uiStore.accountSlide = true"
            class="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 shadow-sm">
            <UIcon name="i-heroicons-user" class="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </button>

          <!-- Sepet -->
          <button @click="uiStore.cartSlide = true"
            class="relative p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 shadow-sm">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            <ClientOnly>
              <span v-if="props.cart.cartQyt > 0"
                class="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {{ props.cart.cartQyt }}
              </span>
            </ClientOnly>
          </button>
        </div>
      </div>

      <!-- Hoşgeldiniz mesajı (mobile için) -->
      <div v-if="authStore.token && authStore.currentUser?.name" class="mt-3 flex justify-center">
        <div
          class="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-900/30 dark:to-secondary-800/30 rounded-lg border border-secondary-200 dark:border-secondary-700">
          <UIcon name="i-heroicons-hand-raised" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Hoşgeldiniz, {{ getFirstName(authStore.currentUser?.name) }}
          </span>
        </div>
      </div>

      <!-- Loading state - user verisi yüklenirken (mobile) -->
      <div v-else-if="authStore.token && authStore.loading?.fetchUser" class="mt-3 flex justify-center">
        <div
          class="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-900/30 dark:to-secondary-800/30 rounded-lg border border-secondary-200 dark:border-secondary-700">
          <UIcon name="i-heroicons-arrow-path"
            class="w-4 h-4 text-secondary-600 dark:text-secondary-400 animate-spin" />
          <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Yükleniyor...
          </span>
        </div>
      </div>
    </div>

    <!-- Arama Input'u -->
    <LazyPartialsCommonSearchInput />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(["categories", "cart"]);

// Stores
const uiStore = useUIStore();
const authStore = useAuthStore();

// Dark mode composable
const { isDark, toggleDarkMode } = useDarkMode();

// Logo source'u dark mode'a göre belirle
const logoSrc = computed(() => {
  return isDark.value ? '/logo-for-dark.png' : '/logo-for-light.png';
});

// Helper function - sadece ilk ismi almak için
const getFirstName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';
  return fullName.trim().split(' ')[0];
};
</script>
