<template>
  <div class="bg-neutral-50 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-secondary-50 to-secondary-100 py-12 lg:py-20">
      <div class="container">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
            <span class="text-gradient">Beyraha</span> Tesettür Giyim
          </h1>
          <p class="text-xl lg:text-2xl text-neutral-600 mb-8 leading-relaxed">
            En sevdiğiniz tesettür mağazaları artık yeni Beyraha'da sizleri bekliyor
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/carsaf-cilbab-a51" class="btn btn-primary px-8 py-4 text-lg font-semibold">
              Koleksiyonu Keşfet
            </NuxtLink>
            <NuxtLink to="/menu/iade-ve-degisim" class="btn btn-secondary px-8 py-4 text-lg font-semibold">
              Güvenli Alışveriş
            </NuxtLink>
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
