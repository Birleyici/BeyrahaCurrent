<template>
    <div class="space-y-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
            <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 text-primary-600 animate-spin" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
            <UIcon name="i-heroicons-exclamation-circle" class="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p class="text-red-600 dark:text-red-400">{{ error }}</p>
            <UButton to="/management/kuponlar" color="gray" class="mt-4">
                Kupon Listesine Dön
            </UButton>
        </div>

        <!-- Main Content -->
        <div v-else>
            <!-- Page Header -->
            <AdminCommonPageHeader :title="`Kupon: ${coupon.code}`" :description="coupon.name"
                :breadcrumb-links="breadcrumbLinks">
                <template #actions>
                    <UButton :to="`/management/kuponlar/${coupon.id}/duzenle`" color="primary"
                        icon="i-heroicons-pencil-square">
                        Düzenle
                    </UButton>
                    <UButton :color="coupon.is_active ? 'red' : 'green'" variant="outline" @click="toggleStatus"
                        :loading="toggling" :icon="coupon.is_active ? 'i-heroicons-pause' : 'i-heroicons-play'">
                        {{ coupon.is_active ? 'Pasifleştir' : 'Aktifleştir' }}
                    </UButton>
                    <UButton to="/management/kuponlar" color="gray" variant="outline" icon="i-heroicons-arrow-left">
                        Kupon Listesi
                    </UButton>
                </template>
            </AdminCommonPageHeader>

            <!-- Ana İçerik -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <!-- Sol Kolon -->
                <div class="xl:col-span-2 space-y-6">

                    <!-- Kupon Bilgileri -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
                                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-2" />
                                Kupon Bilgileri
                            </h3>
                            <UBadge :color="coupon.is_active ? 'green' : 'red'" variant="soft">
                                {{ coupon.is_active ? 'Aktif' : 'Pasif' }}
                            </UBadge>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Temel Bilgiler -->
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Kupon Kodu
                                    </label>
                                    <div class="flex items-center space-x-2">
                                        <code
                                            class="font-mono text-lg font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded">
                                {{ coupon.code }}
                            </code>
                                        <UButton size="xs" color="gray" variant="outline" @click="copyCode"
                                            icon="i-heroicons-clipboard">
                                            Kopyala
                                        </UButton>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Kupon Adı
                                    </label>
                                    <p class="text-neutral-900 dark:text-white font-medium">{{ coupon.name }}</p>
                                </div>

                                <div v-if="coupon.description">
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Açıklama
                                    </label>
                                    <p class="text-neutral-700 dark:text-neutral-300">{{ coupon.description }}</p>
                                </div>
                            </div>

                            <!-- İndirim Bilgileri -->
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        İndirim Türü
                                    </label>
                                    <UBadge :color="getCouponTypeColor(coupon.type)" variant="soft" size="lg">
                                        {{ getCouponTypeLabel(coupon.type) }}
                                    </UBadge>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        İndirim Değeri
                                    </label>
                                    <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                                        {{ getCouponValueDisplay(coupon) }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Geçerlilik Durumu
                                    </label>
                                    <UBadge :color="getValidityColor(coupon)" variant="soft">
                                        {{ getValidityStatus(coupon) }}
                                    </UBadge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Geçerlilik ve Koşullar -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                            <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 mr-2" />
                            Geçerlilik ve Koşullar
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Geçerlilik Tarihleri -->
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Başlangıç Tarihi
                                    </label>
                                    <p class="text-neutral-900 dark:text-white">{{ formatDateTime(coupon.valid_from) }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Bitiş Tarihi
                                    </label>
                                    <p class="text-neutral-900 dark:text-white">{{ formatDateTime(coupon.valid_until) }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Kalan Süre
                                    </label>
                                    <p class="text-neutral-900 dark:text-white font-medium">
                                        {{ getRemainingTime() }}
                                    </p>
                                </div>
                            </div>

                            <!-- Kullanım Koşulları -->
                            <div class="space-y-4">
                                <div v-if="coupon.minimum_amount">
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Minimum Sepet Tutarı
                                    </label>
                                    <p class="text-neutral-900 dark:text-white font-medium">
                                        {{ formatPrice(coupon.minimum_amount) }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        İlk Sipariş Koşulu
                                    </label>
                                    <UBadge :color="coupon.first_order_only ? 'blue' : 'gray'" variant="soft">
                                        {{ coupon.first_order_only ? 'Sadece İlk Sipariş' : 'Tüm Siparişler' }}
                                    </UBadge>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Değerlendirme Koşulu
                                    </label>
                                    <UBadge :color="coupon.requires_review ? 'purple' : 'gray'" variant="soft">
                                        {{ coupon.requires_review ? 'Değerlendirme Gerekli' : 'Değerlendirme Gerekmez'
                                        }}
                                    </UBadge>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Oluşturulma Tarihi
                                    </label>
                                    <p class="text-neutral-900 dark:text-white">{{ formatDateTime(coupon.created_at) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Kullanım Limitleri -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                            <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5 mr-2" />
                            Kullanım Limitleri ve İstatistikler
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Toplam Kullanım -->
                            <div class="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {{ coupon.used_count }}
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                    Toplam Kullanım
                                </div>
                                <div v-if="coupon.usage_limit"
                                    class="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2 mt-2">
                                    <div class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: `${Math.min((coupon.used_count / coupon.usage_limit) * 100, 100)}%` }">
                                    </div>
                                </div>
                            </div>

                            <!-- Kullanım Limiti -->
                            <div class="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {{ coupon.usage_limit || '∞' }}
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                    Kullanım Limiti
                                </div>
                            </div>

                            <!-- Kullanıcı Limiti -->
                            <div class="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {{ coupon.user_limit || '∞' }}
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                    Kullanıcı Başına Limit
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Kısıtlamalar -->
                    <div v-if="coupon.category_ids?.length || coupon.product_ids?.length"
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                            <UIcon name="i-heroicons-funnel" class="w-5 h-5 mr-2" />
                            Kısıtlamalar
                        </h3>

                        <div class="space-y-6">
                            <!-- Kategori Kısıtlaması -->
                            <div v-if="coupon.category_ids?.length">
                                <label class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                                    Geçerli Kategoriler
                                </label>
                                <div class="flex flex-wrap gap-2">
                                    <UBadge v-for="categoryId in coupon.category_ids" :key="categoryId" color="blue"
                                        variant="soft">
                                        Kategori #{{ categoryId }}
                                    </UBadge>
                                </div>
                            </div>

                            <!-- Ürün Kısıtlaması -->
                            <div v-if="coupon.product_ids?.length">
                                <label class="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                                    Geçerli Ürünler
                                </label>
                                <div class="flex flex-wrap gap-2">
                                    <UBadge v-for="productId in coupon.product_ids" :key="productId" color="green"
                                        variant="soft">
                                        Ürün #{{ productId }}
                                    </UBadge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Son Kullanımlar -->
                    <div v-if="recentUsages.length"
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
                                <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-2" />
                                Son Kullanımlar
                            </h3>
                            <UButton :to="`/management/kuponlar/${coupon.id}/kullanim-gecmisi`" size="sm" color="gray"
                                variant="outline">
                                Tümünü Görüntüle →
                            </UButton>
                        </div>

                        <div class="space-y-3">
                            <div v-for="usage in recentUsages" :key="usage.id"
                                class="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div
                                        class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                        <UIcon name="i-heroicons-user"
                                            class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <div class="font-medium text-neutral-900 dark:text-white">
                                            {{ usage.user?.name || 'Anonim Kullanıcı' }}
                                        </div>
                                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                            {{ formatDateTime(usage.created_at) }}
                                        </div>
                                        <div v-if="usage.order_id"
                                            class="text-xs text-neutral-500 dark:text-neutral-400">
                                            Sipariş #{{ usage.order_id }}
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="font-medium text-green-600 dark:text-green-400">
                                        {{ formatPrice(usage.discount_amount) }}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                        İndirim
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sağ Kolon -->
                <div class="space-y-6">
                    <!-- Kupon Önizleme -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Kupon Görünümü
                        </h3>

                        <div
                            class="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
                            <div class="text-center">
                                <div
                                    class="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-2">
                                    İndirim Kuponu
                                </div>
                                <div class="font-mono text-2xl font-bold text-primary-900 dark:text-primary-100 mb-3">
                                    {{ coupon.code }}
                                </div>
                                <div class="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
                                    {{ coupon.name }}
                                </div>
                                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                                    {{ getCouponValueDisplay(coupon) }}
                                </div>
                                <div
                                    class="text-xs text-neutral-600 dark:text-neutral-400 border-t border-primary-200 dark:border-primary-800 pt-3">
                                    {{ formatDate(coupon.valid_from) }} - {{ formatDate(coupon.valid_until) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Hızlı İstatistikler -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Hızlı İstatistikler
                        </h3>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">Toplam İndirim</span>
                                <span class="font-medium text-neutral-900 dark:text-white">
                                    {{ formatPrice(statistics.total_discount) }}
                                </span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">Ortalama İndirim</span>
                                <span class="font-medium text-neutral-900 dark:text-white">
                                    {{ formatPrice(statistics.average_discount) }}
                                </span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">En Yüksek İndirim</span>
                                <span class="font-medium text-neutral-900 dark:text-white">
                                    {{ formatPrice(statistics.max_discount) }}
                                </span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="text-sm text-neutral-600 dark:text-neutral-400">Benzersiz Kullanıcı</span>
                                <span class="font-medium text-neutral-900 dark:text-white">
                                    {{ statistics.unique_users }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- İşlemler -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Hızlı İşlemler
                        </h3>

                        <div class="space-y-3">
                            <UButton :to="`/management/kuponlar/${coupon.id}/duzenle`" size="lg" block>
                                <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 mr-2" />
                                Kuponu Düzenle
                            </UButton>

                            <UButton :color="coupon.is_active ? 'red' : 'green'" variant="outline" size="lg" block
                                @click="toggleStatus" :loading="toggling">
                                <UIcon :name="coupon.is_active ? 'i-heroicons-pause' : 'i-heroicons-play'"
                                    class="w-4 h-4 mr-2" />
                                {{ coupon.is_active ? 'Pasifleştir' : 'Aktifleştir' }}
                            </UButton>

                            <UButton color="blue" variant="outline" size="lg" block @click="copyCode">
                                <UIcon name="i-heroicons-clipboard" class="w-4 h-4 mr-2" />
                                Kodu Kopyala
                            </UButton>

                            <UButton :to="`/management/kuponlar/${coupon.id}/kullanim-gecmisi`" color="gray"
                                variant="outline" size="lg" block>
                                <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2" />
                                Kullanım Geçmişi
                            </UButton>

                            <UButton color="red" variant="outline" size="lg" block @click="showDeleteModal = true">
                                <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
                                Kuponu Sil
                            </UButton>
                        </div>
                    </div>

                    <!-- QR Kod -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            QR Kod
                        </h3>
                        <div class="text-center">
                            <div
                                class="w-32 h-32 bg-neutral-100 dark:bg-neutral-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                <UIcon name="i-heroicons-qr-code" class="w-16 h-16 text-neutral-400" />
                            </div>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                Kupon kodu için QR kod
                            </p>
                            <UButton size="sm" color="gray" variant="outline" class="mt-2">
                                QR Kod İndir
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Silme Onay Modalı -->
            <UModal v-model="showDeleteModal" :ui="{ width: 'sm:max-w-md' }">
                <UCard>
                    <template #header>
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                            Kupon Silme Onayı
                        </h3>
                    </template>

                    <div class="space-y-4">
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">
                            <strong>{{ coupon.code }}</strong> kodlu kuponu silmek istediğinizden emin misiniz?
                            Bu işlem geri alınamaz.
                        </p>

                        <div v-if="coupon.used_count > 0" class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p class="text-sm text-amber-800 dark:text-amber-200">
                                ⚠️ Bu kupon {{ coupon.used_count }} kez kullanılmış. Silme işlemi kullanım geçmişini de
                                silecektir.
                            </p>
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex justify-end gap-3">
                            <UButton color="gray" variant="outline" @click="showDeleteModal = false">
                                İptal
                            </UButton>
                            <UButton color="red" @click="deleteCoupon" :loading="deleting">
                                Sil
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </UModal>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// SEO
useHead({
    title: 'Kupon Detayı - Admin Panel'
})

// Route params
const route = useRoute()
const couponId = route.params.id

// States
const loading = ref(true)
const toggling = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const error = ref('')

const coupon = ref({})
const recentUsages = ref([])
const statistics = ref({
    total_discount: 0,
    average_discount: 0,
    max_discount: 0,
    unique_users: 0
})

// Breadcrumb
const breadcrumbLinks = computed(() => [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/management'
    },
    {
        label: 'Kupon Yönetimi',
        icon: 'i-heroicons-ticket',
        to: '/management/kuponlar'
    },
    {
        label: coupon.value.code || 'Kupon Detayı',
        icon: 'i-heroicons-eye'
    }
])

// Methods
const fetchCoupon = async () => {
    try {
        loading.value = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${couponId}`)

        if (response.success) {
            coupon.value = response.coupon
            recentUsages.value = response.recent_usages || []
            statistics.value = response.statistics || statistics.value
        }
    } catch (error) {
        console.error('Kupon yüklenemedi:', error)
        if (error.response?.status === 404) {
            error.value = 'Kupon bulunamadı'
        } else {
            error.value = 'Kupon yüklenirken hata oluştu'
        }
    } finally {
        loading.value = false
    }
}

const toggleStatus = async () => {
    try {
        toggling.value = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${couponId}/toggle-status`, {
            method: 'POST'
        })

        if (response.success) {
            coupon.value.is_active = response.coupon.is_active

            useToast().add({
                title: 'Başarılı',
                description: `Kupon ${coupon.value.is_active ? 'aktifleştirildi' : 'pasifleştirildi'}`,
                color: 'green'
            })
        }
    } catch (error) {
        console.error('Kupon durumu güncellenemedi:', error)
        useToast().add({
            title: 'Hata',
            description: 'Kupon durumu güncellenemedi',
            color: 'red'
        })
    } finally {
        toggling.value = false
    }
}

const deleteCoupon = async () => {
    try {
        deleting.value = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${couponId}`, {
            method: 'DELETE'
        })

        if (response.success) {
            useToast().add({
                title: 'Başarılı',
                description: 'Kupon silindi',
                color: 'green'
            })

            await navigateTo('/management/kuponlar')
        }
    } catch (error) {
        console.error('Kupon silinemedi:', error)
        useToast().add({
            title: 'Hata',
            description: error.response?._data?.message || 'Kupon silinemedi',
            color: 'red'
        })
    } finally {
        deleting.value = false
    }
}

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(coupon.value.code)
        useToast().add({
            title: 'Başarılı',
            description: 'Kupon kodu kopyalandı',
            color: 'green'
        })
    } catch (error) {
        console.error('Kopyalama hatası:', error)
        useToast().add({
            title: 'Hata',
            description: 'Kupon kodu kopyalanamadı',
            color: 'red'
        })
    }
}

// Utility Functions
const getCouponTypeColor = (type) => {
    const colors = {
        fixed: 'blue',
        percentage: 'green',
        free_shipping: 'purple'
    }
    return colors[type] || 'gray'
}

const getCouponTypeLabel = (type) => {
    const labels = {
        fixed: 'Sabit İndirim',
        percentage: 'Yüzde İndirim',
        free_shipping: 'Ücretsiz Kargo'
    }
    return labels[type] || type
}

const getCouponValueDisplay = (coupon) => {
    switch (coupon.type) {
        case 'percentage':
            return `%${coupon.value}`
        case 'fixed':
            return formatPrice(coupon.value)
        case 'free_shipping':
            return 'Ücretsiz Kargo'
        default:
            return '-'
    }
}

const getValidityColor = (coupon) => {
    const now = new Date()
    const validFrom = new Date(coupon.valid_from)
    const validUntil = new Date(coupon.valid_until)

    if (now < validFrom) return 'yellow'
    if (now > validUntil) return 'red'
    return 'green'
}

const getValidityStatus = (coupon) => {
    const now = new Date()
    const validFrom = new Date(coupon.valid_from)
    const validUntil = new Date(coupon.valid_until)

    if (now < validFrom) return 'Henüz Başlamadı'
    if (now > validUntil) return 'Süresi Doldu'
    return 'Geçerli'
}

const getRemainingTime = () => {
    const now = new Date()
    const validUntil = new Date(coupon.value.valid_until)

    if (now > validUntil) return 'Süresi dolmuş'

    const diff = validUntil - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days} gün ${hours} saat`
    if (hours > 0) return `${hours} saat`
    return 'Bugün sona eriyor'
}

const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR')
}

// Initialize
onMounted(() => {
    fetchCoupon()
})
</script>