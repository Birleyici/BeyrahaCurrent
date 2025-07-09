<template>
  <footer
    class="border-t-2 border-gray-100 dark:border-neutral-700 relative bg-gradient-to-br from-neutral-100 via-neutral-50 to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 text-neutral-800 dark:text-white overflow-hidden">
    <!-- Geometrik Dekoratif Elementler -->
    <div class="absolute inset-0">

      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-full blur-3xl">
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neutral-300/30 dark:border-neutral-700/30 rounded-full">
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neutral-300/20 dark:border-neutral-700/20 rounded-full">
      </div>
    </div>

    <!-- Ana Footer İçeriği -->
    <div class="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">

        <!-- Sağ Taraf - Menüler -->
        <div class="lg:col-span-2 order-1">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">

            <!-- Site Haritası -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-neutral-800 dark:text-white font-semibold text-lg">Site Haritası</h3>
              <nav class="space-y-2.5 sm:space-y-3">
                <NuxtLink to="/"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  Ana Sayfa
                </NuxtLink>
                <NuxtLink to="/hesap/siparislerim"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  Siparişlerim
                </NuxtLink>
                <NuxtLink to="/hesap/adreslerim"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  Adreslerim
                </NuxtLink>
                <NuxtLink to="/sepet"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  Sepet
                </NuxtLink>
              </nav>
            </div>

            <!-- Kurumsal -->
            <div class="space-y-4 sm:space-y-6">
              <h3 class="text-neutral-800 dark:text-white font-semibold text-lg">Kurumsal</h3>
              <nav class="space-y-2.5 sm:space-y-3">
                <NuxtLink to="/menu/iade-ve-degisim"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  İade ve Değişim
                </NuxtLink>
                <NuxtLink to="/hakkimizda"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  Hakkımızda
                </NuxtLink>
                <NuxtLink to="/iletisim"
                  class="block text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  İletişim
                </NuxtLink>
              </nav>
            </div>

            <!-- İletişim -->
            <div class="col-span-2 sm:col-span-1 space-y-4 sm:space-y-6">
              <h3 class="text-neutral-800 dark:text-white font-semibold text-lg">İletişim</h3>
              <div class="space-y-2.5 sm:space-y-4">
                <a v-if="whatsappNumber" :href="`https://wa.me/${whatsappNumber}`" target="_blank"
                  class="flex items-center space-x-3 text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5 text-success-400" />
                  <span>{{ formatPhoneNumber(whatsappNumber) }}</span>
                </a>
                <a v-if="contactEmail" :href="`mailto:${contactEmail}`"
                  class="flex items-center space-x-3 text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 hover:translate-x-1 opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-secondary-400" />
                  <span>{{ contactEmail }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Sağ Taraf - Marka ve Açıklama -->
        <div class="lg:col-span-1 space-y-6 sm:space-y-8 order-2">
          <div class="space-y-6 flex justify-center lg:justify-end">
            <img src="/logo-for-dark.png" class="hidden dark:block w-40 sm:w-48 lg:w-52" alt="Beyraha Logo">
            <img src="/logo-for-light.png" class="block dark:hidden w-40 sm:w-48 lg:w-52" alt="Beyraha Logo">
          </div>

          <!-- Sosyal Medya -->
          <div class="space-y-4 flex flex-col items-center lg:items-end">
            <h3 class="text-neutral-800 dark:text-white font-semibold text-lg">Bizi Takip Edin</h3>
            <div class="flex flex-wrap gap-3 justify-center lg:justify-end">
              <a href="https://instagram.com/beyrahaislamigiyim" target="_blank"
                class="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 text-neutral-600 hover:text-white">
                <Icon name="mdi:instagram" class="w-6 h-6  dark:text-white" />
              </a>
              <a href="https://www.facebook.com/beyraha.marketplace" target="_blank"
                class="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 hover:!bg-secondary-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 text-neutral-600 dark:text-white hover:!text-white">
                <Icon name="mdi:facebook" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Üste Dön Butonu -->
      <div class="flex justify-center mt-12 sm:mt-16">
        <button @click="scrollToTop"
          class="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-neutral-400 dark:border-neutral-600 hover:border-secondary-500 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-secondary-500 transition-all duration-200 hover:bg-secondary-50 dark:hover:bg-neutral-800/50">
          <UIcon name="i-heroicons-arrow-up" class="w-4 h-4" />
          <span class="text-sm font-medium">Üste Dön</span>
        </button>
      </div>
    </div>

    <!-- Alt Footer -->
    <div
      class="relative z-10 border-t border-neutral-300/50 dark:border-neutral-700/50 bg-gradient-to-r from-secondary-500/90 to-secondary-600/90">
      <div class="container mx-auto px-4 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div class="text-center sm:text-left">
            <p class="text-white text-xs sm:text-sm">
              © 2017 - {{ new Date().getFullYear() }} {{ siteName || 'Beyraha' }}. Tüm hakları saklıdır.
            </p>
          </div>
          <div class="flex items-center gap-4 sm:gap-8">
            <div class="flex items-center space-x-2 text-white text-xs sm:text-sm">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4" />
              <span>Güvenli Alışveriş</span>
            </div>
            <div class="flex items-center space-x-2 text-white text-xs sm:text-sm">
              <UIcon name="i-heroicons-truck" class="w-4 h-4" />
              <span>Hızlı Teslimat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Settings composable'ından güvenli şekilde verileri al
const { whatsappNumber, contactEmail, siteName } = useSettings()

// Telefon numarasını formatla
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''

  // Eğer 90 ile başlıyorsa, onu +90 yapıp formatla
  if (phoneNumber.startsWith('90')) {
    const cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.length === 12) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`
    }
  }

  // Diğer durumlarda olduğu gibi döndür
  return phoneNumber
}

// Üste dön fonksiyonu
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
