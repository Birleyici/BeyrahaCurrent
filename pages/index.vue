<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 flex py-32 lg:py-48 items-center overflow-hidden transition-colors duration-300">
      <!-- Background Image with Enhanced Styling -->
      <div class="absolute inset-0 z-0">
        <NuxtImg src="cdn-cgi/imagedelivery/st1uxlphT2vI8j_75ka47g/a1b16e65-a1d1-4348-faeb-2b97373d7900/new"
          format="webp" quality="95" fit="contain" alt="Beyraha Mağaza"
          class="w-full h-full object-cover object-top opacity-40 dark:opacity-30" loading="eager" />
        <!-- Subtle Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-neutral-50/50 dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-neutral-800/70">
        </div>
      </div>

      <!-- Minimal Floating Elements -->
      <div class="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full opacity-60">
      </div>
      <div class="absolute bottom-1/3 left-1/5 w-1 h-1 bg-secondary-500 dark:bg-secondary-400 rounded-full opacity-40">
      </div>
      <div
        class="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-secondary-300 dark:bg-secondary-500 rounded-full opacity-50">
      </div>

      <div class="container relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Modern Badge -->

          <!-- Main Heading -->
          <h1
            class="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 leading-tight transition-colors duration-300">
            <span class="block">Zarif</span>
            <span class="text-secondary-600 dark:text-secondary-400">Tesettür</span>
            <span class="block">Koleksiyonu</span>
          </h1>

          <p
            class="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light transition-colors duration-300">
            Kaliteli kumaşlar ve özenli işçilikle hazırlanmış
            <span class="font-medium text-neutral-800 dark:text-neutral-200">çarşaf, ferace, peçe ve sufle</span>
            modellerimizle tarzınızı ve
            konforunuzu bir arada yaşayın

          </p>

          <!-- Modern CTA Button -->
          <div class="flex justify-center">
            <NuxtLink to="/arama-a0"
              class="group inline-flex items-center gap-3 bg-secondary-600 dark:bg-secondary-500 hover:bg-secondary-700 dark:hover:bg-secondary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md hover:!text-white">
              <UIcon name="i-heroicons-cursor-arrow-rays"
                class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Koleksiyonu Keşfet</span>
              <UIcon name="i-heroicons-arrow-right"
                class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NuxtLink>
          </div>

          <!-- Clean Trust Indicators -->
          <div class="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span class="font-medium">Yüksek Müşteri Memnuniyeti</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <UIcon name="i-heroicons-truck" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              <span class="font-medium">Hızlı Teslimat</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              <span class="font-medium">Güvenli Alışveriş</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ürün Kategorileri -->
    <section class="enhanced-section-spacing">
      <div class="container content-gap">

        <!-- Çarşaf Koleksiyonu -->
        <div class="animate-fade-in section-gap">
          <div class="text-center mb-12">
            <h2
              class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 transition-colors duration-300">
              Çarşaf Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transition-colors duration-300">
              Kaliteli kumaşlar ve şık tasarımlarla hazırlanmış çarşaf modellerimizi keşfedin
            </p>
          </div>
          <UiSlidesProductSlide :lcp="true" title="Çarşaf" to="/carsaf-cilbab-a51" :is-ssr="true" :filters="{
            selectedCategoryIds: '[51]',
            piece: 8
          }" />
        </div>

        <!-- Peçe Koleksiyonu -->
        <div class="animate-fade-in section-gap">
          <div class="text-center mb-12">
            <h2
              class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 transition-colors duration-300">
              Peçe Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transition-colors duration-300">
              Zarafet ve rahatlığı bir arada sunan peçe modellerimiz
            </p>
          </div>
          <UiSlidesProductSlide title="Peçe" to="/pece-a56" :is-ssr="true" :filters="{
            selectedCategoryIds: '[56]',
            piece: 8
          }" />
        </div>

        <!-- Sufle Koleksiyonu -->
        <div class="animate-fade-in section-gap">
          <div class="text-center mb-12">
            <h2
              class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 transition-colors duration-300">
              Sufle Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transition-colors duration-300">
              Hafif ve şık sufle modellerimizle tarzınızı tamamlayın
            </p>
          </div>
          <UiSlidesProductSlide :is-ssr="true" title="Sufle" to="/sufle-a55" :filters="{
            selectedCategoryIds: '[55]',
            piece: 8
          }" />
        </div>
      </div>
    </section>

    <!-- Özellikler Bölümü -->
    <section class="bg-white dark:bg-neutral-800 enhanced-section-spacing transition-colors duration-300">
      <div class="container">
        <div class="text-center mb-16">
          <h2
            class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 transition-colors duration-300">
            Neden Beyraha?
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transition-colors duration-300">
            Müşteri memnuniyeti odaklı hizmet anlayışımızla sizlere en iyi alışveriş deneyimini sunuyoruz
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-200">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Güvenli Alışveriş</h3>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">SSL sertifikası ile korunan
              güvenli ödeme sistemi</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-200">
              <UIcon name="i-heroicons-truck" class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Hızlı Teslimat</h3>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">Türkiye geneli hızlı ve
              güvenli kargo hizmeti</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-200">
              <UIcon name="i-heroicons-star" class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Yüksek Müşteri Memnuniyeti</h3>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">Binlerce memnun
              müşterimizin güveni ve desteği</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-200">
              <UIcon name="i-heroicons-chat-bubble-left-right"
                class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3
              class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Hızlı Destek</h3>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">WhatsApp ve telefon ile
              hızlı müşteri desteği</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Settings composable'ını kullan
const { settings } = useSettings()

// SEO meta tags
useHead({
  title: settings.value.siteTitle + ' - ' + settings.value.siteName,
  meta: [
    {
      name: 'description',
      content: computed(() => settings.value.siteDescription || 'Kaliteli kumaşlar ve özenli işçilikle hazırlanmış çarşaf, ferace, peçe ve sufle modellerimizle tarzınızı ve konforunuzu bir arada yaşayın')
    }
  ],
})
</script>

<style scoped>
/* Enhanced Dotted Pattern */
.hero-dotted-pattern {
  background-image: radial-gradient(circle, rgba(var(--color-secondary-400), 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Text Gradient Enhancement */
.text-gradient {
  background: linear-gradient(135deg,
      rgb(var(--color-secondary-600)) 0%,
      rgb(var(--color-secondary-500)) 25%,
      rgb(var(--color-primary-600)) 50%,
      rgb(var(--color-secondary-600)) 75%,
      rgb(var(--color-primary-500)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Backdrop Blur Support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}
</style>
