<template>
  <div class="w-full">
    <!-- Mobil: Yatay Scroll -->
    <div class="lg:hidden overflow-x-auto pb-4">
      <div class="flex space-x-3  min-w-max px-1">
        <!-- Siparişlerim -->
        <NuxtLink to="/hesap/siparislerim" class="flex-shrink-0">
          <div
            class="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 w-[200px]"
            :class="{ 'border-secondary-300 shadow-md bg-secondary-50': useRoute().fullPath == '/hesap/siparislerim' }">
            <div class="flex items-center space-x-3 p-4">
              <!-- İkon -->
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 group-hover:from-secondary-200 group-hover:to-secondary-300 transition-all duration-200"
                :class="{ 'from-secondary-200 to-secondary-300': useRoute().fullPath == '/hesap/siparislerim' }">
                <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-secondary-600" />
              </div>
              <!-- Menü adı -->
              <span class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200"
                :class="{ 'text-secondary-700': useRoute().fullPath == '/hesap/siparislerim' }">
                Siparişlerim
              </span>
            </div>
            <!-- Hover efekti için gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              :class="{ 'opacity-100': useRoute().fullPath == '/hesap/siparislerim' }"></div>
          </div>
        </NuxtLink>

        <!-- Adreslerim -->
        <NuxtLink to="/hesap/adreslerim" class="flex-shrink-0">
          <div
            class="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 w-[200px]"
            :class="{ 'border-secondary-300 shadow-md bg-secondary-50': useRoute().fullPath == '/hesap/adreslerim' }">
            <div class="flex items-center space-x-3  p-4">
              <!-- İkon -->
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 group-hover:from-secondary-200 group-hover:to-secondary-300 transition-all duration-200"
                :class="{ 'from-secondary-200 to-secondary-300': useRoute().fullPath == '/hesap/adreslerim' }">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-secondary-600" />
              </div>
              <!-- Menü adı -->
              <span class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200"
                :class="{ 'text-secondary-700': useRoute().fullPath == '/hesap/adreslerim' }">
                Adreslerim
              </span>
            </div>
            <!-- Hover efekti için gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              :class="{ 'opacity-100': useRoute().fullPath == '/hesap/adreslerim' }"></div>
          </div>
        </NuxtLink>

        <!-- Çıkış Yap -->
        <button @click="authStore.logout()" class="flex-shrink-0">
          <div
            class="group relative overflow-hidden rounded-xl bg-white border border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-300 w-[200px]">
            <div class="flex items-center space-x-3 p-4">
              <!-- İkon -->
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 text-red-600" />
              </div>
              <!-- Menü adı -->
              <span class="font-medium text-neutral-800 group-hover:text-red-700 transition-colors duration-200">
                Çıkış Yap
              </span>
            </div>
            <!-- Hover efekti için gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            </div>
          </div>
        </button>

      </div>
    </div>

    <!-- Desktop: Dikey Liste -->
    <div class="hidden lg:block space-y-3">

      <!-- Siparişlerim -->
      <NuxtLink to="/hesap/siparislerim">
        <div
          class="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 w-full"
          :class="{ 'border-secondary-300 shadow-md bg-secondary-50': useRoute().fullPath == '/hesap/siparislerim' }">
          <div class="flex items-center space-x-3 p-4">
            <!-- İkon -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 group-hover:from-secondary-200 group-hover:to-secondary-300 transition-all duration-200"
              :class="{ 'from-secondary-200 to-secondary-300': useRoute().fullPath == '/hesap/siparislerim' }">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-secondary-600" />
            </div>
            <!-- Menü adı -->
            <span class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200"
              :class="{ 'text-secondary-700': useRoute().fullPath == '/hesap/siparislerim' }">
              Siparişlerim
            </span>
            <!-- Ok ikonu -->
            <div class="ml-auto">
              <UIcon name="i-heroicons-chevron-right"
                class="w-4 h-4 text-neutral-400 group-hover:text-secondary-500 transition-colors duration-200"
                :class="{ 'text-secondary-500': useRoute().fullPath == '/hesap/siparislerim' }" />
            </div>
          </div>
          <!-- Hover efekti için gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :class="{ 'opacity-100': useRoute().fullPath == '/hesap/siparislerim' }"></div>
        </div>
      </NuxtLink>

      <!-- Adreslerim -->
      <NuxtLink to="/hesap/adreslerim">
        <div
          class="group relative overflow-hidden rounded-xl mt-3 bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 w-full"
          :class="{ 'border-secondary-300 shadow-md bg-secondary-50': useRoute().fullPath == '/hesap/adreslerim' }">
          <div class="flex items-center space-x-3 p-4">
            <!-- İkon -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 group-hover:from-secondary-200 group-hover:to-secondary-300 transition-all duration-200"
              :class="{ 'from-secondary-200 to-secondary-300': useRoute().fullPath == '/hesap/adreslerim' }">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-secondary-600" />
            </div>
            <!-- Menü adı -->
            <span class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200"
              :class="{ 'text-secondary-700': useRoute().fullPath == '/hesap/adreslerim' }">
              Adreslerim
            </span>
            <!-- Ok ikonu -->
            <div class="ml-auto">
              <UIcon name="i-heroicons-chevron-right"
                class="w-4 h-4 text-neutral-400 group-hover:text-secondary-500 transition-colors duration-200"
                :class="{ 'text-secondary-500': useRoute().fullPath == '/hesap/adreslerim' }" />
            </div>
          </div>
          <!-- Hover efekti için gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :class="{ 'opacity-100': useRoute().fullPath == '/hesap/adreslerim' }"></div>
        </div>
      </NuxtLink>

      <!-- Çıkış Yap -->
      <button @click="authStore.logout()" class="w-full">
        <div
          class="group relative overflow-hidden rounded-xl bg-white border border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-300 w-full">
          <div class="flex items-center space-x-3 p-4">
            <!-- İkon -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 text-red-600" />
            </div>
            <!-- Menü adı -->
            <span class="font-medium text-neutral-800 group-hover:text-red-700 transition-colors duration-200">
              Çıkış Yap
            </span>
            <!-- Ok ikonu -->
            <div class="ml-auto">
              <UIcon name="i-heroicons-chevron-right"
                class="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors duration-200" />
            </div>
          </div>
          <!-- Hover efekti için gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          </div>
        </div>
      </button>

    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
</script>
