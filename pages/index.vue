<template>
  <div class="bg-neutral-50 min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-secondary-50 to-secondary-100 min-h-screen flex items-center overflow-hidden">
      <!-- Background Image with Enhanced Styling -->
      <div class="absolute inset-0 z-0">
        <img src="/fiziki-magaza.jpeg" alt="Beyraha Mağaza" class="w-full h-full object-cover object-top opacity-60"
          loading="eager" />
        <!-- Enhanced Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-50/80 via-secondary-100/70 to-secondary-200/60">
        </div>
        <!-- Animated Particles Background -->
        <div class="absolute inset-0 hero-particles"></div>
        <!-- Dotted Pattern Overlay -->
        <div class="absolute inset-0 hero-dotted-pattern opacity-30"></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-secondary-200/30 rounded-full blur-xl animate-float"></div>
      <div class="absolute top-40 right-20 w-32 h-32 bg-primary-200/20 rounded-full blur-2xl animate-float-delayed">
      </div>
      <div class="absolute bottom-32 left-1/4 w-16 h-16 bg-secondary-300/40 rounded-full blur-lg animate-float-slow">
      </div>

      <div class="container relative z-10 py-20">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->


          <!-- Main Heading with Enhanced Typography -->
          <h1
            class="text-5xl lg:text-7xl xl:text-8xl font-bold text-neutral-900 mb-8 leading-tight animate-fade-in-up animation-delay-200">
            <span class="block mb-2">
              <span
                class="text-gradient bg-gradient-to-r from-secondary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                Beyraha
              </span>
            </span>

          </h1>

          <!-- Enhanced Description -->
          <p
            class="text-xl lg:text-2xl xl:text-3xl text-neutral-600 mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <span class="font-medium text-neutral-800">Zarif tasarımlar</span> ve
            <span class="font-medium text-neutral-800">üstün kalite</span> ile
            <br class="hidden sm:block" />
            tesettür modasında <span class="text-secondary-600 font-semibold">güvenilir tercih</span>
          </p>

          <!-- Enhanced CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">


            <NuxtLink to="/arama-a0"
              class="group bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-800 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md border border-white/50 min-w-[200px]">
              <span class="flex items-center gap-3">
                <UIcon name="i-heroicons-cursor-arrow-rays" class="w-5 h-5 text-secondary-600" />
                Koleksiyonu Keşfet
              </span>
            </NuxtLink>
          </div>

          <!-- Trust Indicators -->
          <div
            class="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70 animate-fade-in-up animation-delay-800">
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

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
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
/* Hero Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes float-delayed {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) rotate(-180deg);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes particles {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 100%;
  }
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  opacity: 0;
}

.animation-delay-800 {
  animation-delay: 0.8s;
  opacity: 0;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 4s;
}

/* Hero Particles Background */
.hero-particles {
  background-image: radial-gradient(circle at 25% 25%, rgba(var(--color-secondary-200), 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(var(--color-primary-200), 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(var(--color-secondary-300), 0.05) 0%, transparent 50%);
  background-size: 400px 400px, 300px 300px, 200px 200px;
  animation: particles 20s linear infinite;
}

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
  background-size: 200% 200%;
  animation: gradient-shift 3s ease-in-out infinite;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes gradient-shift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Button Hover Effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .animate-fade-in-up {
    animation-duration: 0.6s;
  }

  .hero-particles {
    background-size: 200px 200px, 150px 150px, 100px 100px;
  }
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
