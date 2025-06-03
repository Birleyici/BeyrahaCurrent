<template>
    <div class="bg-neutral-50 min-h-screen">
        <!-- Hero Section -->
        <section class="bg-white border-b border-neutral-200">
            <div class="container section-spacing">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-secondary-600" />
                    </div>
                    <h1 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                        İade ve Değişim Şartları
                    </h1>
                    <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Müşteri memnuniyeti odaklı iade ve değişim politikamız hakkında detaylı bilgiler
                    </p>
                </div>
            </div>
        </section>

        <!-- Ana İçerik -->
        <section class="section-spacing">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <!-- Giriş Mesajı -->
                    <div class="card mb-8">
                        <div class="card-body">
                            <div class="flex items-start space-x-4">
                                <div
                                    class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <UIcon name="i-heroicons-heart" class="w-6 h-6 text-secondary-600" />
                                </div>
                                <div>
                                    <h2 class="text-xl font-semibold text-neutral-900 mb-3">Değerli Müşterilerimiz,</h2>
                                    <p class="text-neutral-700 leading-relaxed">
                                        Firmamız, sizlere sunduğu ürünlerde en yüksek kalite ve memnuniyeti sağlama
                                        konusunda büyük bir özen göstermektedir. Ancak, bazen beklenmedik durumlar
                                        oluşabilmekte ve bu durumlarda yanınızda olmaktan mutluluk duyarız. İade ve
                                        değişim politikamız, satın aldığınız ürünlerle ilgili herhangi bir endişeniz
                                        olduğunda size rehberlik etmek üzere tasarlanmıştır.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- İade ve Değişim Şartları -->
                    <div class="space-y-6">
                        <!-- Firmamızdan Kaynaklı Hatalar -->
                        <div class="card">
                            <div class="card-body">
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-600" />
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-semibold text-neutral-900 mb-3">
                                            Firmamızdan Kaynaklı Hatalar
                                        </h3>
                                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                            <div class="flex items-center space-x-2 mb-2">
                                                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600" />
                                                <span class="font-medium text-green-800">Ücretsiz İade ve Değişim</span>
                                            </div>
                                        </div>
                                        <p class="text-neutral-700 leading-relaxed mb-4">
                                            Eğer satın aldığınız ürünler, defolu, dikim hatalı, yanlış ölçülü gibi
                                            firmamızdan kaynaklanan bir sorunla size ulaştıysa, bu ürünlerin ücretsiz
                                            olarak iade ve değişimi mümkündür.
                                        </p>
                                        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                            <div class="flex items-center space-x-2">
                                                <UIcon name="i-heroicons-clock" class="w-5 h-5 text-amber-600" />
                                                <span class="font-medium text-amber-800">15 gün içinde bizimle iletişime
                                                    geçin</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Standart Ürünlerde İade ve Değişim -->
                        <div class="card">
                            <div class="card-body">
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-semibold text-neutral-900 mb-3">
                                            Standart Ürünlerde İade ve Değişim
                                        </h3>
                                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                            <div class="flex items-center space-x-2 mb-2">
                                                <UIcon name="i-heroicons-truck" class="w-5 h-5 text-blue-600" />
                                                <span class="font-medium text-blue-800">Kargo masrafı müşteriye
                                                    aittir</span>
                                            </div>
                                        </div>
                                        <p class="text-neutral-700 leading-relaxed mb-4">
                                            "Özel dikim olmayan standart ürünler" için, eğer ürünü beğenmediyseniz ya da
                                            fikrinizi değiştirdiyseniz, kargo masraflarını karşılamak şartıyla iade veya
                                            değişim yapabilirsiniz.
                                        </p>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div class="bg-neutral-50 rounded-lg p-3 text-center">
                                                <UIcon name="i-heroicons-cube"
                                                    class="w-6 h-6 text-neutral-600 mx-auto mb-2" />
                                                <span class="text-sm font-medium text-neutral-700">Orijinal Paket</span>
                                            </div>
                                            <div class="bg-neutral-50 rounded-lg p-3 text-center">
                                                <UIcon name="i-heroicons-sparkles"
                                                    class="w-6 h-6 text-neutral-600 mx-auto mb-2" />
                                                <span class="text-sm font-medium text-neutral-700">Kullanılmamış</span>
                                            </div>
                                            <div class="bg-neutral-50 rounded-lg p-3 text-center">
                                                <UIcon name="i-heroicons-tag"
                                                    class="w-6 h-6 text-neutral-600 mx-auto mb-2" />
                                                <span class="text-sm font-medium text-neutral-700">Etiketli</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Özel Dikim Ürünlerde Sınırlamalar -->
                        <div class="card">
                            <div class="card-body">
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UIcon name="i-heroicons-scissors" class="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-semibold text-neutral-900 mb-3">
                                            Özel Dikim Ürünlerde İade ve Değişim Sınırlamaları
                                        </h3>
                                        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                                            <div class="flex items-center space-x-2 mb-2">
                                                <UIcon name="i-heroicons-exclamation-triangle"
                                                    class="w-5 h-5 text-amber-600" />
                                                <span class="font-medium text-amber-800">Sadece kalite ve üretim
                                                    hatalarında</span>
                                            </div>
                                        </div>
                                        <p class="text-neutral-700 leading-relaxed">
                                            Özel dikim ürünler için, yukarıda belirtilen firmamızdan kaynaklı hatalar
                                            dışında, keyfi nedenlerle iade ve değişim yapılamamaktadır. Bu ürünler,
                                            sizin özel talepleriniz doğrultusunda hazırlandığı için, sadece kalite veya
                                            üretim hatalarında iade veya değişim kabul edilmektedir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- İletişim Bilgisi -->
                    <div class="card mt-8">
                        <div class="card-body">
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <UIcon name="i-heroicons-chat-bubble-left-right"
                                        class="w-8 h-8 text-secondary-600" />
                                </div>
                                <h3 class="text-xl font-semibold text-neutral-900 mb-3">
                                    Size Yardımcı Olmaktan Mutluluk Duyarız
                                </h3>
                                <p class="text-neutral-700 leading-relaxed max-w-2xl mx-auto mb-6">
                                    Her zaman daha iyi bir alışveriş deneyimi sunmak için çalışıyoruz ve her türlü soru
                                    veya endişenizde size yardımcı olmaktan mutluluk duyarız. Satın alma işleminizle
                                    ilgili herhangi bir sorunuz olursa, lütfen bizimle iletişime geçmekten çekinmeyin.
                                </p>
                                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="tel:+905555555555"
                                        class="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white hover:!text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                                        <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                                        <span>Bizi Arayın</span>
                                    </a>
                                    <a href="https://wa.me/905555555555"
                                        class="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white hover:!text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                                        <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-5 h-5" />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
useHead({
    title: 'İade ve değişim şartları - Beyraha',
    meta: [
        { name: 'description', content: 'Beyraha iade ve değişim şartları. Müşteri memnuniyeti odaklı iade ve değişim politikamız hakkında detaylı bilgiler.' }
    ],
})
</script>