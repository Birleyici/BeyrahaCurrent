<template>
  <footer class="bg-gradient-neutral text-white">
    <!-- Ana Footer İçeriği -->
    <div class="container section-spacing">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        <!-- Kişisel Bölümü -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white mb-6 relative">
            Kişisel
            <div class="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary-500 rounded-full"></div>
          </h3>
          <nav class="space-y-3">
            <NuxtLink to="/hesap/siparislerim"
              class="block text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <span class="flex items-center space-x-2">
                <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span>Siparişlerim</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/hesap/adreslerim"
              class="block text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <span class="flex items-center space-x-2">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span>Adreslerim</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/sepet"
              class="block text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <span class="flex items-center space-x-2">
                <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span>Sepet</span>
              </span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Kurumsal Bölümü -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white mb-6 relative">
            Kurumsal
            <div class="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary-500 rounded-full"></div>
          </h3>
          <nav class="space-y-3">
            <NuxtLink to="/menu/iade-ve-degisim"
              class="block text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <span class="flex items-center space-x-2">
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span>İade ve Değişim</span>
              </span>
            </NuxtLink>
          </nav>
        </div>

        <!-- İletişim Bölümü -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white mb-6 relative">
            İletişim / Destek
            <div class="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary-500 rounded-full"></div>
          </h3>
          <div class="space-y-3">
            <a href="https://wa.me/05436024821" target="_blank"
              class="flex items-center space-x-3 text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors duration-200">
                <UIcon name="i-heroicons-phone" class="w-5 h-5 text-white" />
              </div>
              <div>
                <div class="font-medium">WhatsApp Destek</div>
                <div class="text-sm text-neutral-400">0543 602 48 21</div>
              </div>
            </a>
            <a href="mailto:destek@beyraha.com"
              class="flex items-center space-x-3 text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <div
                class="flex-shrink-0 w-10 h-10 bg-secondary-600 rounded-lg flex items-center justify-center group-hover:bg-secondary-500 transition-colors duration-200">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-white" />
              </div>
              <div>
                <div class="font-medium">E-posta</div>
                <div class="text-sm text-neutral-400">destek@beyraha.com</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Sosyal Medya Bölümü -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white mb-6 relative">
            Sosyal Medya
            <div class="absolute bottom-0 left-0 w-12 h-0.5 bg-secondary-500 rounded-full"></div>
          </h3>
          <div class="space-y-3">
            <a href="https://instagram.com/beyrahaislamigiyim" target="_blank"
              class="flex items-center space-x-3 text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <div
                class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="mdi:instagram" class="w-5 h-5 text-white" />
              </div>
              <div>
                <div class="font-medium">Instagram</div>
                <div class="text-sm text-neutral-400">@beyrahaislamigiyim</div>
              </div>
            </a>
            <a href="https://www.facebook.com/beyraha.marketplace" target="_blank"
              class="flex items-center space-x-3 text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="mdi:facebook" class="w-5 h-5 text-white" />
              </div>
              <div>
                <div class="font-medium">Facebook</div>
                <div class="text-sm text-neutral-400">Beyraha</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Alt Footer -->
    <div class="border-t border-neutral-700">
      <div class="container py-6">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <p class="text-neutral-400 text-sm">
              © 2017 - 2024 <span class="text-white font-medium">Beyraha</span>. Tüm hakları saklıdır.
            </p>
          </div>
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2 text-neutral-400 text-sm">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-500" />
              <span>Güvenli Alışveriş</span>
            </div>
            <div class="flex items-center space-x-2 text-neutral-400 text-sm">
              <UIcon name="i-heroicons-truck" class="w-4 h-4 text-secondary-500" />
              <span>Hızlı Teslimat</span>
            </div>
            <!-- PWA Install Butonu -->
            <button v-if="pwaStore.canInstall && !pwaStore.isInstalled" @click="installPwa"
              class="flex items-center space-x-2 text-neutral-400 hover:text-white text-sm transition-colors duration-200 group"
              :disabled="isInstalling">
              <UIcon :name="isInstalling ? 'i-heroicons-arrow-path' : 'i-heroicons-device-phone-mobile'" :class="[
                'w-4 h-4 text-primary-500',
                isInstalling ? 'animate-spin' : 'group-hover:scale-110 transition-transform'
              ]" />
              <span>{{ isInstalling ? 'Yükleniyor...' : 'Uygulamayı Yükle' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// PWA Store
const pwaStore = usePwaStore()
const isInstalling = ref(false)

// PWA'yı yükle
const installPwa = async () => {
  isInstalling.value = true
  try {
    const result = await pwaStore.installPwa()
    if (result) {
      // Başarılı yükleme toast'ı göster (eğer toast sistemi varsa)
      console.log('PWA başarıyla yüklendi!')
    }
  } catch (error) {
    console.error('PWA yükleme hatası:', error)
  } finally {
    isInstalling.value = false
  }
}
</script>
