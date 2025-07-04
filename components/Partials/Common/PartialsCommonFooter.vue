<template>
  <footer
    class="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 text-neutral-700 dark:text-neutral-200 relative overflow-hidden">
    <!-- Dekoratif arka plan -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.12),transparent_50%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,116,139,0.08),transparent_50%)]"></div>

    <!-- Ana Footer İçeriği -->
    <div class="container relative z-10 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        <!-- Kişisel Bölümü -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 relative">
            Kişisel
            <div
              class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full">
            </div>
          </h3>
          <nav class="space-y-4">
            <NuxtLink to="/hesap/siparislerim"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <span
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary-500/25 to-secondary-400/25 dark:from-secondary-500/20 dark:to-secondary-400/20 rounded-lg flex items-center justify-center group-hover:from-secondary-500/35 group-hover:to-secondary-400/35 dark:group-hover:from-secondary-500/30 dark:group-hover:to-secondary-400/30 transition-all duration-300">
                  <UIcon name="i-heroicons-shopping-bag"
                    class="w-4 h-4 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300" />
                </div>
                <span class="font-medium">Siparişlerim</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/hesap/adreslerim"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <span
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary-500/25 to-secondary-400/25 dark:from-secondary-500/20 dark:to-secondary-400/20 rounded-lg flex items-center justify-center group-hover:from-secondary-500/35 group-hover:to-secondary-400/35 dark:group-hover:from-secondary-500/30 dark:group-hover:to-secondary-400/30 transition-all duration-300">
                  <UIcon name="i-heroicons-map-pin"
                    class="w-4 h-4 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300" />
                </div>
                <span class="font-medium">Adreslerim</span>
              </span>
            </NuxtLink>
            <NuxtLink to="/sepet"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <span
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary-500/25 to-secondary-400/25 dark:from-secondary-500/20 dark:to-secondary-400/20 rounded-lg flex items-center justify-center group-hover:from-secondary-500/35 group-hover:to-secondary-400/35 dark:group-hover:from-secondary-500/30 dark:group-hover:to-secondary-400/30 transition-all duration-300">
                  <UIcon name="i-heroicons-shopping-cart"
                    class="w-4 h-4 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300" />
                </div>
                <span class="font-medium">Sepet</span>
              </span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Kurumsal Bölümü -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 relative">
            Kurumsal
            <div
              class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full">
            </div>
          </h3>
          <nav class="space-y-4">
            <NuxtLink to="/menu/iade-ve-degisim"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <span
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary-500/25 to-secondary-400/25 dark:from-secondary-500/20 dark:to-secondary-400/20 rounded-lg flex items-center justify-center group-hover:from-secondary-500/35 group-hover:to-secondary-400/35 dark:group-hover:from-secondary-500/30 dark:group-hover:to-secondary-400/30 transition-all duration-300">
                  <UIcon name="i-heroicons-arrow-path"
                    class="w-4 h-4 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300" />
                </div>
                <span class="font-medium">İade ve Değişim</span>
              </span>
            </NuxtLink>
          </nav>
        </div>

        <!-- İletişim Bölümü -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 relative">
            İletişim
            <div
              class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full">
            </div>
          </h3>
          <div class="space-y-4">
            <a v-if="whatsappNumber" :href="`https://wa.me/${whatsappNumber}`" target="_blank"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <div
                class="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700/60 hover:border-success-400/60 dark:hover:border-success-500/40 hover:bg-gradient-to-r hover:from-success-50/80 hover:to-success-100/40 dark:hover:from-success-900/20 dark:hover:to-success-800/20 transition-all duration-300">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 dark:from-success-500 dark:to-success-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-success-500/30 dark:group-hover:shadow-success-400/20 group-hover:scale-105 transition-all duration-300">
                  <UIcon name="i-heroicons-phone" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-neutral-800 dark:text-neutral-100">WhatsApp Destek</div>
                  <div
                    class="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    {{ formatPhoneNumber(whatsappNumber) }}</div>
                </div>
              </div>
            </a>
            <a v-if="contactEmail" :href="`mailto:${contactEmail}`"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <div
                class="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700/60 hover:border-secondary-400/60 dark:hover:border-secondary-500/40 hover:bg-gradient-to-r hover:from-secondary-50/80 hover:to-secondary-100/40 dark:hover:from-secondary-900/20 dark:hover:to-secondary-800/20 transition-all duration-300">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 dark:from-secondary-500 dark:to-secondary-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-secondary-500/30 dark:group-hover:shadow-secondary-400/20 group-hover:scale-105 transition-all duration-300">
                  <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-neutral-800 dark:text-neutral-100">E-posta</div>
                  <div
                    class="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    {{ contactEmail }}</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Sosyal Medya Bölümü -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 relative">
            Sosyal Medya
            <div
              class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full">
            </div>
          </h3>
          <div class="space-y-4">
            <a href="https://instagram.com/beyrahaislamigiyim" target="_blank"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <div
                class="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700/60 hover:border-pink-400/60 dark:hover:border-pink-500/40 hover:bg-gradient-to-r hover:from-pink-50/80 hover:to-purple-50/40 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 dark:from-purple-500 dark:via-pink-500 dark:to-orange-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 dark:group-hover:shadow-pink-400/20 group-hover:scale-105 transition-all duration-300">
                  <Icon name="mdi:instagram" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-neutral-800 dark:text-neutral-100">Instagram</div>
                  <div
                    class="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    @beyrahaislamigiyim</div>
                </div>
              </div>
            </a>
            <a href="https://www.facebook.com/beyraha.marketplace" target="_blank"
              class="block text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-300 group">
              <div
                class="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700/60 hover:border-accent-400/60 dark:hover:border-accent-500/40 hover:bg-gradient-to-r hover:from-accent-50/80 hover:to-accent-100/40 dark:hover:from-accent-900/20 dark:hover:to-accent-800/20 transition-all duration-300">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-500 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-accent-500/30 dark:group-hover:shadow-accent-400/20 group-hover:scale-105 transition-all duration-300">
                  <Icon name="mdi:facebook" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-neutral-800 dark:text-neutral-100">Facebook</div>
                  <div
                    class="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    Beyraha</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Alt Footer -->
    <div
      class="border-t border-neutral-200 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-800/60 backdrop-blur-sm">
      <div class="container relative z-10 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div class="text-center md:text-left">
            <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              © 2017 - 2024 <span class="text-neutral-800 dark:text-neutral-100 font-semibold">{{ siteName || 'Beyraha'
                }}</span>
              <br class="md:hidden">
              <span class="hidden md:inline text-neutral-400 dark:text-neutral-500">•</span> Tüm hakları saklıdır.
            </p>
          </div>
          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 text-sm group">
              <div
                class="w-8 h-8 bg-success-500/25 dark:bg-success-500/20 rounded-lg flex items-center justify-center group-hover:bg-success-500/35 dark:group-hover:bg-success-500/30 transition-colors duration-300">
                <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-success-600 dark:text-success-400" />
              </div>
              <span class="font-medium">Güvenli Alışveriş</span>
            </div>
            <div class="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 text-sm group">
              <div
                class="w-8 h-8 bg-secondary-500/25 dark:bg-secondary-500/20 rounded-lg flex items-center justify-center group-hover:bg-secondary-500/35 dark:group-hover:bg-secondary-500/30 transition-colors duration-300">
                <UIcon name="i-heroicons-truck" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              </div>
              <span class="font-medium">Hızlı Teslimat</span>
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
</script>
