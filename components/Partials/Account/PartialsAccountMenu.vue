<template>
  <div class="w-full mt-4">
    <!-- Mobil: Yatay Scroll -->
    <div class="lg:hidden overflow-x-auto pb-4">
      <div class="flex space-x-3 min-w-max px-1">
        <!-- Menü Öğeleri -->
        <NuxtLink v-for="item in accountMenuItems" :key="item.link" :to="item.link" class="flex-shrink-0">
          <div
            class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:shadow-md transition-all duration-300 w-[200px]"
            :class="{ 'border-secondary-300 dark:border-secondary-600 shadow-md bg-secondary-50 dark:bg-secondary-900/30': isItemActive(item) }">
            <div class="flex items-center space-x-3 p-4">
              <!-- İkon -->
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-800/50 dark:to-secondary-700/50 group-hover:from-secondary-200 group-hover:to-secondary-300 dark:group-hover:from-secondary-700/70 dark:group-hover:to-secondary-600/70 transition-all duration-200"
                :class="{ 'from-secondary-200 to-secondary-300 dark:from-secondary-700/70 dark:to-secondary-600/70': isItemActive(item) }">
                <UIcon :name="item.icon" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              </div>
              <!-- Menü adı -->
              <span
                class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-200"
                :class="{ 'text-secondary-700 dark:text-secondary-300': isItemActive(item) }">
                {{ item.name }}
              </span>
            </div>
            <!-- Hover efekti için gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 dark:from-secondary-900/0 dark:to-secondary-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              :class="{ 'opacity-100': isItemActive(item) }"></div>
          </div>
        </NuxtLink>

        <!-- Çıkış Yap -->
        <div @click="authStore.logout()" class="flex-shrink-0 cursor-pointer">
          <div
            class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all duration-300 w-[200px]">
            <div class="flex items-center space-x-3 p-4">
              <!-- İkon -->
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 group-hover:from-red-200 group-hover:to-red-300 dark:group-hover:from-red-800/50 dark:group-hover:to-red-700/50 transition-all duration-200">
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <!-- Menü adı -->
              <span
                class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200">
                Çıkış Yap
              </span>
            </div>
            <!-- Hover efekti için gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 dark:from-red-900/0 dark:to-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: Dikey Liste -->
    <div class="hidden lg:grid space-y-3">
      <!-- Menü Öğeleri -->
      <NuxtLink v-for="item in accountMenuItems" :key="item.link" :to="item.link">
        <div
          class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:shadow-md transition-all duration-300 w-full"
          :class="{ 'border-secondary-300 dark:border-secondary-600 shadow-md bg-secondary-50 dark:bg-secondary-900/30': isItemActive(item) }">
          <div class="flex items-center space-x-3 p-4">
            <!-- İkon -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-800/50 dark:to-secondary-700/50 group-hover:from-secondary-200 group-hover:to-secondary-300 dark:group-hover:from-secondary-700/70 dark:group-hover:to-secondary-600/70 transition-all duration-200"
              :class="{ 'from-secondary-200 to-secondary-300 dark:from-secondary-700/70 dark:to-secondary-600/70': isItemActive(item) }">
              <UIcon :name="item.icon" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </div>
            <!-- Menü adı -->
            <span
              class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-200"
              :class="{ 'text-secondary-700 dark:text-secondary-300': isItemActive(item) }">
              {{ item.name }}
            </span>
            <!-- Ok ikonu -->
            <div class="ml-auto">
              <UIcon name="i-heroicons-chevron-right"
                class="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-secondary-500 dark:group-hover:text-secondary-400 transition-colors duration-200"
                :class="{ 'text-secondary-500 dark:text-secondary-400': isItemActive(item) }" />
            </div>
          </div>
          <!-- Hover efekti için gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 dark:from-secondary-900/0 dark:to-secondary-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :class="{ 'opacity-100': isItemActive(item) }"></div>
        </div>
      </NuxtLink>

      <!-- Çıkış Yap -->
      <div @click="authStore.logout()" class="cursor-pointer">
        <div
          class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all duration-300 w-full">
          <div class="flex items-center space-x-3 p-4">
            <!-- İkon -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 group-hover:from-red-200 group-hover:to-red-300 dark:group-hover:from-red-800/50 dark:group-hover:to-red-700/50 transition-all duration-200">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <!-- Menü adı -->
            <span
              class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200">
              Çıkış Yap
            </span>
            <!-- Ok ikonu -->
            <div class="ml-auto">
              <UIcon name="i-heroicons-chevron-right"
                class="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
            </div>
          </div>
          <!-- Hover efekti için gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 dark:from-red-900/0 dark:to-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const route = useRoute()

// Merkezi account menu composable'ını kullan
const { accountMenuItems, getActiveItem } = useAccountMenu()

// Aktif öğe kontrolü
const isItemActive = (item) => {
  const currentPath = route.fullPath

  // Sorularım için özel kontrol (nested routes)
  if (item.link === '/hesap/sorularim') {
    return currentPath.startsWith('/hesap/sorularim')
  }

  // Diğer öğeler için exact match
  return currentPath === item.link
}
</script>
