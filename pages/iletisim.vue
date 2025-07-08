<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <!-- Breadcrumb -->
        <UiCommonBreadcrumb :links="breadcrumbLinks" />

        <div class="page-content-spacing">
            <div class="container">
                <!-- Hero Bölümü -->
                <div class="text-center mb-16">
                    <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                        İletişim
                    </h1>
                    <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                        Sorularınız için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk duyarız.
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 mb-16">
                    <!-- İletişim Bilgileri -->
                    <div class="space-y-8">
                        <!-- Telefon -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:phone" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Telefon
                                    </h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Hemen arayın</p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <a v-if="contactPhone" :href="`tel:${contactPhone}`"
                                    class="block text-neutral-700 dark:text-neutral-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors">
                                    {{ contactPhone }}
                                </a>
                                <span v-else class="block text-neutral-500 dark:text-neutral-500">
                                    Telefon bilgisi henüz eklenmemiş
                                </span>
                            </div>
                        </div>

                        <!-- WhatsApp -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="ri:whatsapp-fill" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">WhatsApp
                                    </h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Hızlı destek</p>
                                </div>
                            </div>
                            <a v-if="whatsappNumber" :href="`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`"
                                target="_blank"
                                class="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
                                <span class="mr-2">Mesaj Gönder</span>
                                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                            </a>
                            <span v-else class="text-neutral-500 dark:text-neutral-500">
                                WhatsApp bilgisi henüz eklenmemiş
                            </span>
                        </div>

                        <!-- E-posta -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:envelope" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">E-posta
                                    </h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">7/24 yanıtlıyoruz</p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <a v-if="contactEmail" :href="`mailto:${contactEmail}`"
                                    class="block text-neutral-700 dark:text-neutral-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors">
                                    {{ contactEmail }}
                                </a>
                                <span v-else class="block text-neutral-500 dark:text-neutral-500">
                                    E-posta bilgisi henüz eklenmemiş
                                </span>
                            </div>
                        </div>

                        <!-- Adres -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:map-pin" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Mağaza
                                        Adresi</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Konya Şubesi</p>
                                </div>
                            </div>
                            <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                Sahibiata mah. Hisar sk. No: 11F<br>
                                Suriçi Çarşısı, Meram/Konya
                            </p>
                            <a href="https://g.co/kgs/Xr5kvf3" target="_blank"
                                class="inline-flex items-center mt-4 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors">
                                <Icon name="heroicons:map" class="w-4 h-4 mr-2" />
                                <span>Yol Tarifi Al</span>
                                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1" />
                            </a>
                            <div class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <div class="flex items-center mb-1">
                                    <Icon name="heroicons:clock" class="w-4 h-4 mr-2" />
                                    <span>Hafta içi: 09:00 - 19:00</span>
                                </div>
                                <div class="flex items-center">
                                    <Icon name="heroicons:clock" class="w-4 h-4 mr-2" />
                                    <span>Hafta sonu: 10:00 - 18:00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Çalışma Saatleri ve Ekstra Bilgiler -->
                    <div class="space-y-8">
                        <!-- Çalışma Saatleri -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:clock" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Çalışma
                                        Saatleri</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Hizmetinizdeyiz</p>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-neutral-700 dark:text-neutral-300">Pazartesi - Cuma</span>
                                    <span class="text-neutral-600 dark:text-neutral-400">09:00 - 19:00</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-neutral-700 dark:text-neutral-300">Cumartesi</span>
                                    <span class="text-neutral-600 dark:text-neutral-400">10:00 - 18:00</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-neutral-700 dark:text-neutral-300">Pazar</span>
                                    <span class="text-neutral-600 dark:text-neutral-400">12:00 - 17:00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Hızlı İletişim -->
                        <div
                            class="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 rounded-xl p-6 transition-colors duration-300">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                                Hızlı İletişim
                            </h3>
                            <p class="text-neutral-700 dark:text-neutral-300 mb-4">
                                Acil sorularınız için WhatsApp'tan bize ulaşabilir, telefonla arayabilirsiniz.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-3">
                                <a v-if="whatsappNumber" :href="`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`"
                                    target="_blank"
                                    class="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                    <Icon name="ri:whatsapp-fill" class="w-4 h-4 mr-2" />
                                    WhatsApp
                                </a>
                                <a v-if="contactPhone" :href="`tel:${contactPhone}`"
                                    class="inline-flex items-center justify-center px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors">
                                    <Icon name="heroicons:phone" class="w-4 h-4 mr-2" />
                                    Ara
                                </a>
                            </div>
                        </div>

                        <!-- Kargo Bilgisi -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                            <div class="flex items-center mb-4">
                                <div
                                    class="w-12 h-12 bg-secondary-600 dark:bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name="heroicons:truck" class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Kargo
                                        Bilgisi</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Teslim süreleri</p>
                                </div>
                            </div>
                            <div class="space-y-2 text-sm">
                                <div class="flex items-center">
                                    <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-600 mr-2" />
                                    <span class="text-neutral-700 dark:text-neutral-300">{{ freeShippingLimit ?
                                        `${freeShippingLimit}₺ ve üzeri` : '500₺ ve üzeri' }} ücretsiz kargo</span>
                                </div>
                                <div class="flex items-center">
                                    <Icon name="heroicons:clock" class="w-4 h-4 text-blue-600 mr-2" />
                                    <span class="text-neutral-700 dark:text-neutral-300">1-3 iş günü içinde kargoya
                                        teslim</span>
                                </div>
                                <div class="flex items-center">
                                    <Icon name="heroicons:map-pin" class="w-4 h-4 text-purple-600 mr-2" />
                                    <span class="text-neutral-700 dark:text-neutral-300">Türkiye geneli teslimat</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sık Sorulan Sorular -->
                <div class="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg transition-colors duration-300">
                    <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center">
                        Sık Sorulan Sorular
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    Kargo sürem ne kadar?
                                </h3>
                                <p class="text-neutral-700 dark:text-neutral-300">
                                    Sipariş onayından sonra 1-3 iş günü içerisinde kargoya verilir. Teslimat süresi
                                    bölgeye göre 1-3 gün arası değişmektedir.
                                </p>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    İade işlemi nasıl yapılır?
                                </h3>
                                <p class="text-neutral-700 dark:text-neutral-300">
                                    İade ve değişim koşulları hakkında detaylı bilgi için
                                    <NuxtLink to="/menu/iade-ve-degisim"
                                        class="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 underline font-medium transition-colors">
                                        İade ve Değişim sayfamızı
                                    </NuxtLink>
                                    ziyaret edebilirsiniz.
                                </p>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    Özel dikim yapıyor musunuz?
                                </h3>
                                <p class="text-neutral-700 dark:text-neutral-300">
                                    Evet, özel dikim siparişlerinizi kabul ediyoruz. Detaylar için bizimle iletişime
                                    geçin.
                                </p>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    Kapıda ödeme var mı?
                                </h3>
                                <p class="text-neutral-700 dark:text-neutral-300">
                                    Şu an kapıda ödeme seçeneğimiz bulunmamaktadır. Havale/EFT
                                    yapabilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const {
    settings,
    siteName,
    contactPhone,
    contactEmail,
    whatsappNumber,
    freeShippingLimit
} = useSettings()

const breadcrumbLinks = computed(() => [
    {
        label: 'Ana Sayfa',
        to: '/'
    },
    {
        label: 'İletişim'
    }
])

useHead({
    title: computed(() => `İletişim - ${siteName.value}`),
    meta: [
        {
            name: 'description',
            content: computed(() => `${siteName.value} ile iletişime geçin. Sorularınız için telefon, e-posta ve WhatsApp ile ulaşabilirsiniz. Konya Suriçi Çarşısı şubemizi ziyaret edebilirsiniz.`)
        },
        {
            name: 'keywords',
            content: 'iletişim, telefon, e-posta, whatsapp, adres, müşteri hizmetleri, destek, konya, suriçi çarşısı'
        },
        {
            property: 'og:title',
            content: computed(() => `İletişim - ${siteName.value}`)
        },
        {
            property: 'og:description',
            content: computed(() => `${siteName.value} ile iletişime geçin. Müşteri hizmetleri ve destek için bizimle iletişime geçebilirsiniz.`)
        },
        {
            property: 'og:type',
            content: 'website'
        }
    ]
})
</script>

<style scoped>
/* Hover effects for contact cards */
.bg-white:hover,
.bg-gradient-to-br:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.transition-colors {
    transition: all 0.3s ease;
}
</style>