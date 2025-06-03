<template>
  <div class="bg-neutral-50 min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-secondary-50 to-secondary-100  flex  py-24 lg:py-44 items-center overflow-hidden">
      <!-- Background Image with Enhanced Styling -->
      <div class="absolute inset-0 z-0">
        <img src="/fiziki-magaza.jpeg" alt="Beyraha Mağaza" class="w-full h-full object-cover object-top opacity-60"
          loading="eager" />
        <!-- Enhanced Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-50/80 via-secondary-100/70 to-secondary-200/60">
        </div>
        <!-- Dotted Pattern Overlay -->
        <div class="absolute inset-0 hero-dotted-pattern opacity-30"></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-secondary-200/30 rounded-full blur-xl"></div>
      <div class="absolute top-40 right-20 w-32 h-32 bg-primary-200/20 rounded-full blur-2xl"></div>
      <div class="absolute bottom-32 left-1/4 w-16 h-16 bg-secondary-300/40 rounded-full blur-lg"></div>

      <div class="container relative z-10 ">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->

          <!-- Enhanced Description -->
          <p class="text-xl lg:text-2xl xl:text-3xl text-neutral-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            <span class="font-medium text-neutral-800">Zarif tasarımlar</span> ve
            <span class="font-medium text-neutral-800">üstün kalite</span> ile
            <br class="hidden sm:block" />
            tesettür giyimde <span class="text-secondary-600 font-semibold">güvenilir tercih</span>
          </p>

          <!-- Enhanced CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NuxtLink to="/arama-a0"
              class="group bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-800 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md border border-white/50 min-w-[200px]">
              <span class="flex items-center gap-3">
                <UIcon name="i-heroicons-cursor-arrow-rays" class="w-5 h-5 text-secondary-600" />
                Alışverişe Başla
              </span>
            </NuxtLink>
          </div>

          <!-- Trust Indicators -->
          <div class="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div class="flex items-center gap-2 text-sm text-neutral-600">
              <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-500" />
              <span class="font-medium">Yüksek Müşteri Memnuniyeti</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-neutral-600">
              <UIcon name="i-heroicons-truck" class="w-4 h-4 text-secondary-600" />
              <span class="font-medium">Ücretsiz Kargo</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-neutral-600">
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-secondary-600" />
              <span class="font-medium">14 Gün İade</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ürün Kategorileri -->
    <section class="section-spacing">
      <div class="container space-y-16">

        <!-- Çarşaf Koleksiyonu -->
        <div class="animate-fade-in">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Çarşaf Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
              Kaliteli kumaşlar ve şık tasarımlarla hazırlanmış çarşaf modellerimizi keşfedin
            </p>
          </div>
          <UiSlidesProductSlide :lcp="true" title="Çarşaf" to="/carsaf-cilbab-a51" :is-ssr="true" :filters="{
            selectedCategoryIds: '[51]',
            piece: 8
          }" class="card" />
        </div>

        <!-- Peçe Koleksiyonu -->
        <div class="animate-fade-in">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Peçe Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
              Zarafet ve rahatlığı bir arada sunan peçe modellerimiz
            </p>
          </div>
          <UiSlidesProductSlide title="Peçe" to="/pece-a56" :is-ssr="true" :filters="{
            selectedCategoryIds: '[56]',
            piece: 8
          }" class="card" />
        </div>

        <!-- Sufle Koleksiyonu -->
        <div class="animate-fade-in">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Sufle Koleksiyonu
            </h2>
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
              Hafif ve şık sufle modellerimizle tarzınızı tamamlayın
            </p>
          </div>
          <UiSlidesProductSlide :is-ssr="true" title="Sufle" to="/sufle-a55" :filters="{
            selectedCategoryIds: '[55]',
            piece: 8
          }" class="card" />
        </div>
      </div>
    </section>

    <!-- Özellikler Bölümü -->
    <section class="bg-white section-spacing">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Neden Beyraha?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Müşteri memnuniyeti odaklı hizmet anlayışımızla sizlere en iyi alışveriş deneyimini sunuyoruz
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors duration-200">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">Güvenli Alışveriş</h3>
            <p class="text-neutral-600">SSL sertifikası ile korunan güvenli ödeme sistemi</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors duration-200">
              <UIcon name="i-heroicons-truck" class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">Hızlı Teslimat</h3>
            <p class="text-neutral-600">Türkiye geneli hızlı ve güvenli kargo hizmeti</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors duration-200">
              <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">Kolay İade</h3>
            <p class="text-neutral-600">14 gün içinde koşulsuz iade ve değişim hakkı</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors duration-200">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">7/24 Destek</h3>
            <p class="text-neutral-600">WhatsApp ve e-posta ile kesintisiz müşteri desteği</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Beyraha Tesettür Giyim - Ana Sayfa',
  meta: [
    { name: 'description', content: 'En sevdiğiniz tesettür mağazaları artık yeni Beyraha da sizleri bekliyor. Kaliteli çarşaf, peçe ve sufle modellerimizi keşfedin.' }
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
