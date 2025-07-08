<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <!-- Breadcrumb -->
        <UiCommonBreadcrumb :links="breadcrumbLinks" />

        <div class="page-content-spacing">
            <div class="container">
                <!-- Hero Bölümü -->
                <div class="text-center mb-16">
                    <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                        Hakkımızda
                    </h1>
                    <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                        2017'den beri sahih tesettür anlayışı ile sizlere hizmet veriyoruz
                    </p>
                </div>

                <!-- Ana İçerik -->
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <!-- Sol Taraf - İçerik -->
                    <div class="space-y-8">
                        <div class="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                            <h2 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                                Hikayemiz
                            </h2>
                            <p class="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                                <strong>2017 yılında</strong> tesettür giyim sektöründe fark yaratma amacıyla yola
                                çıktık. Bu süre içerisinde sahih tesettür anlayışını korumaya ve bu doğrultuda kaliteli
                                modeller üretmeye odaklandık.
                            </p>
                            <p class="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                                Bizzat kendi kullandığımız modeller olması sebebiyle, müşterilerimizin ne istediğini,
                                nasıl rahat ettiklerini bilerek ve anlayarak modellerimizi her geçen gün geliştirdik. Bu
                                yaklaşımımız sayesinde bugünkü <strong>yüksek müşteri memnuniyeti</strong> oranlarına
                                ulaştık.
                            </p>
                            <p class="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                Günümüzde <strong>binlerce mutlu müşterimiz</strong> ile tesettür giyim sektöründe
                                güvenilir bir marka olmayı başardık. Kalite, konfor ve estetik anlayışımızı hiç
                                değiştirmeden büyümeye devam ediyoruz.
                            </p>
                        </div>
                    </div>

                    <!-- Sağ Taraf - Görsel/İstatistik -->
                    <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="text-center">
                                <div class="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">2017
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">Kuruluş Yılı</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">8+</div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">Yıllık Deneyim</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">1000+
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">Mutlu Müşteri</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">2</div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">Şube Sayısı</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Değerlerimiz -->
                <div class="mb-20">
                    <h2 class="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
                        Değerlerimiz
                    </h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div
                            class="text-center bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                            <div
                                class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="heroicons:heart"
                                    class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Kalite</h3>
                            <p class="text-neutral-600 dark:text-neutral-400">En yüksek kalitede kumaş ve işçilik ile
                                üretim yapıyoruz.</p>
                        </div>
                        <div
                            class="text-center bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                            <div
                                class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="heroicons:shield-check"
                                    class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Güven</h3>
                            <p class="text-neutral-600 dark:text-neutral-400">Müşteri memnuniyeti odaklı güvenilir
                                hizmet anlayışı.</p>
                        </div>
                        <div
                            class="text-center bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                            <div
                                class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="heroicons:sparkles"
                                    class="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Yenilik</h3>
                            <p class="text-neutral-600 dark:text-neutral-400">Sürekli gelişen modeller ve trend-öncü
                                tasarımlar.</p>
                        </div>
                    </div>
                </div>

                <!-- Şubelerimiz -->
                <div class="mb-20">
                    <h2 class="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
                        Şubelerimiz
                    </h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Online Mağaza -->
                        <div
                            class="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 rounded-xl p-8 transition-colors duration-300">
                            <div class="flex items-center mb-6">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:globe-alt" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Online
                                        Mağaza</h3>
                                    <p class="text-secondary-600 dark:text-secondary-400">www.beyraha.com</p>
                                </div>
                            </div>
                            <p class="text-neutral-700 dark:text-neutral-300 mb-4">
                                Türkiye'nin dört bir yanına özel dikim ve hazır ürünlerimizi güvenle gönderiyoruz.
                            </p>
                            <div class="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                                <Icon name="heroicons:truck" class="w-4 h-4 mr-2" />
                                <span>Ücretsiz Kargo</span>
                            </div>
                        </div>

                        <!-- Fiziki Mağaza -->
                        <div
                            class="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-8 transition-colors duration-300">
                            <div class="flex items-center mb-6">
                                <div
                                    class="w-12 h-12 bg-neutral-600 dark:bg-neutral-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:map-pin" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Konya
                                        Şubesi</h3>
                                    <p class="text-neutral-600 dark:text-neutral-400">2025'te açıldı</p>
                                </div>
                            </div>
                            <p class="text-neutral-700 dark:text-neutral-300 mb-4">
                                Konya Suriçi Çarşısı'nda bulunan şubemizde tüm modellerimiz ve daha fazlası mevcut.
                            </p>
                            <div class="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                <Icon name="heroicons:clock" class="w-4 h-4 mr-2" />
                                <span>Hafta içi 09:00 - 19:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vizyon Misyon -->
                <div class="grid lg:grid-cols-2 gap-12">
                    <!-- Misyon -->
                    <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                        <div class="flex items-center mb-6">
                            <div
                                class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                <Icon name="heroicons:flag" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Misyonumuz</h3>
                        </div>
                        <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            Sahih tesettür anlayışını koruyarak, kaliteli ve şık ürünler üretmek. Müşterilerimizin
                            ihtiyaçlarını anlayıp, rahat ve güvenli alışveriş deneyimi sunmak.
                        </p>
                    </div>

                    <!-- Vizyon -->
                    <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                        <div class="flex items-center mb-6">
                            <div
                                class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                <Icon name="heroicons:eye" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Vizyonumuz</h3>
                        </div>
                        <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            Tesettür giyim sektöründe öncü ve güvenilir marka olmaya devam ederek, Türkiye genelinde
                            daha fazla müşteriye ulaşmak ve kaliteli hizmet standardımızı sürdürmek.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { settings } = useSettings()

const breadcrumbLinks = computed(() => [
    {
        label: 'Ana Sayfa',
        to: '/'
    },
    {
        label: 'Hakkımızda'
    }
])

useHead({
    title: computed(() => `Hakkımızda - ${settings.value.siteName}`),
    meta: [
        {
            name: 'description',
            content: `2017'den beri sahih tesettür anlayışı ile hizmet veren ${settings.value.siteName} hakkında bilgi alın. Kaliteli tesettür giyim, müşteri memnuniyeti ve güvenilir hizmet.`
        },
        {
            name: 'keywords',
            content: 'hakkımızda, tesettür giyim, kalite, müşteri memnuniyeti, sahih tesettür, beyraha'
        },
        {
            property: 'og:title',
            content: 'Hakkımızda - Beyraha'
        },
        {
            property: 'og:description',
            content: `2017'den beri sahih tesettür anlayışı ile hizmet veren ${settings.value.siteName}. Kaliteli ürünler, binlerce mutlu müşteri.`
        },
        {
            property: 'og:type',
            content: 'website'
        }
    ]
})
</script>

<style scoped>
.prose h2 {
    @apply text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6;
}

.prose p {
    @apply text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6;
}

.prose strong {
    @apply text-neutral-900 dark:text-neutral-100 font-semibold;
}
</style>