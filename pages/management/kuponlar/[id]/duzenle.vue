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
            <AdminCommonPageHeader :title="`Kupon Düzenle: ${coupon.code}`"
                :description="`${coupon.name} adlı kuponu düzenleyin`" :breadcrumb-links="breadcrumbLinks">
                <template #actions>
                    <UButton :to="`/management/kuponlar/${coupon.id}`" color="gray" variant="outline"
                        icon="i-heroicons-eye">
                        Görüntüle
                    </UButton>
                    <UButton to="/management/kuponlar" color="gray" variant="outline" icon="i-heroicons-arrow-left">
                        Kupon Listesi
                    </UButton>
                </template>
            </AdminCommonPageHeader>

            <form @submit.prevent="updateCoupon" class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Ana Form -->
                    <div class="lg:col-span-2 space-y-6">

                        <!-- Temel Bilgiler -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-2" />
                                Temel Bilgiler
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Kupon Adı -->
                                <div class="md:col-span-2">
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Kupon Adı <span class="text-red-500">*</span>
                                    </label>
                                    <UInput v-model="form.name" placeholder="Örn: Sonbahar İndirimi"
                                        :error="errors.name" size="lg" />
                                </div>

                                <!-- Kupon Kodu -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Kupon Kodu <span class="text-red-500">*</span>
                                    </label>
                                    <UInput v-model="form.code" placeholder="SONBAHAR20" :error="errors.code" size="lg"
                                        class="font-mono" />
                                    <p class="mt-1 text-sm text-amber-600 dark:text-amber-400">
                                        ⚠️ Kodu değiştirmek mevcut kullanımları etkileyebilir
                                    </p>
                                </div>

                                <!-- Kupon Türü -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        İndirim Türü <span class="text-red-500">*</span>
                                    </label>
                                    <USelect v-model="form.type" :options="typeOptions" size="lg"
                                        :error="errors.type" />
                                    <p class="mt-1 text-sm text-amber-600 dark:text-amber-400">
                                        ⚠️ Türü değiştirmek mevcut kullanımları etkileyebilir
                                    </p>
                                </div>

                                <!-- İndirim Değeri -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        İndirim Değeri <span class="text-red-500">*</span>
                                    </label>
                                    <UInput v-model="form.value" type="number" :min="0" :step="getValueStep()"
                                        :placeholder="getValuePlaceholder()" :error="errors.value" size="lg" />
                                </div>

                                <!-- Açıklama -->
                                <div class="md:col-span-2">
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Açıklama
                                    </label>
                                    <UTextarea v-model="form.description"
                                        placeholder="Kupon hakkında detaylı açıklama..." :rows="3" />
                                </div>
                            </div>
                        </div>

                        <!-- Geçerlilik Ayarları -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 mr-2" />
                                Geçerlilik Ayarları
                            </h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Başlangıç Tarihi -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Başlangıç Tarihi <span class="text-red-500">*</span>
                                    </label>
                                    <UInput v-model="form.valid_from" type="datetime-local" :error="errors.valid_from"
                                        size="lg" />
                                </div>

                                <!-- Bitiş Tarihi -->
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Bitiş Tarihi <span class="text-red-500">*</span>
                                    </label>
                                    <UInput v-model="form.valid_until" type="datetime-local" :error="errors.valid_until"
                                        size="lg" />
                                </div>
                            </div>
                        </div>

                        <!-- Kullanım Limitleri -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                                <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5 mr-2" />
                                Kullanım Limitleri
                            </h3>

                            <div class="space-y-6">
                                <!-- Toplam Kullanım Limiti -->
                                <div>
                                    <div class="flex items-center justify-between mb-3">
                                        <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Toplam Kullanım Limiti
                                        </label>
                                        <UToggle v-model="form.has_usage_limit" />
                                    </div>

                                    <UInput v-if="form.has_usage_limit" v-model="form.usage_limit" type="number"
                                        :min="1" placeholder="Örn: 100" size="lg" />

                                    <div v-if="coupon.used_count > 0"
                                        class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <p class="text-sm text-blue-800 dark:text-blue-200">
                                            📊 Şu ana kadar {{ coupon.used_count }} kez kullanılmış
                                        </p>
                                    </div>
                                </div>

                                <!-- Kullanıcı Başına Limit -->
                                <div>
                                    <div class="flex items-center justify-between mb-3">
                                        <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Kullanıcı Başına Limit
                                        </label>
                                        <UToggle v-model="form.has_user_limit" />
                                    </div>

                                    <UInput v-if="form.has_user_limit" v-model="form.user_limit" type="number" :min="1"
                                        placeholder="Örn: 1" size="lg" />
                                </div>
                            </div>
                        </div>

                        <!-- Koşullar -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                                <UIcon name="i-heroicons-adjustments-horizontal" class="w-5 h-5 mr-2" />
                                Kullanım Koşulları
                            </h3>

                            <div class="space-y-6">
                                <!-- Minimum Tutar -->
                                <div>
                                    <div class="flex items-center justify-between mb-3">
                                        <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Minimum Sepet Tutarı
                                        </label>
                                        <UToggle v-model="form.has_minimum_amount" />
                                    </div>

                                    <UInput v-if="form.has_minimum_amount" v-model="form.minimum_amount" type="number"
                                        :min="0" step="0.01" placeholder="Örn: 100.00" size="lg" />
                                </div>

                                <!-- İlk Sipariş -->
                                <div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Sadece İlk Sipariş
                                            </label>
                                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                                Kupon sadece ilk siparişlerde kullanılabilir
                                            </p>
                                        </div>
                                        <UToggle v-model="form.first_order_only" />
                                    </div>
                                </div>

                                <!-- Değerlendirme Koşulu -->
                                <div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Değerlendirme Yapmış Kullanıcı
                                            </label>
                                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                                Her onaylanmış değerlendirme için 1 kupon hakkı
                                            </p>
                                        </div>
                                        <UToggle v-model="form.requires_review" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Kategori ve Ürün Kısıtlamaları -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                                <UIcon name="i-heroicons-funnel" class="w-5 h-5 mr-2" />
                                Kategori ve Ürün Kısıtlamaları
                            </h3>

                            <div class="space-y-6">
                                <!-- Kategori Kısıtlaması -->
                                <div>
                                    <div class="flex items-center justify-between mb-3">
                                        <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Belirli Kategoriler
                                        </label>
                                        <UToggle v-model="form.has_category_restriction" />
                                    </div>

                                    <div v-if="form.has_category_restriction" class="space-y-3">
                                        <USelect v-model="form.category_ids" :options="categoryOptions" multiple
                                            placeholder="Kategoriler seçin..." size="lg" value-attribute="value" />
                                    </div>
                                </div>

                                <!-- Ürün Kısıtlaması -->
                                <div>
                                    <div class="flex items-center justify-between mb-3">
                                        <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Belirli Ürünler
                                        </label>
                                        <UToggle v-model="form.has_product_restriction" />
                                    </div>

                                    <div v-if="form.has_product_restriction" class="space-y-3">
                                        <USelect v-model="form.product_ids" :options="productOptions" multiple
                                            placeholder="Ürünler seçin..." size="lg" value-attribute="value" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="space-y-6">
                        <!-- Kupon Durumu -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                Kupon Durumu
                            </h3>

                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Aktif
                                    </span>
                                    <UToggle v-model="form.is_active" />
                                </div>

                                <div class="p-3 rounded-lg" :class="getStatusBgClass()">
                                    <div class="flex items-center">
                                        <UIcon :name="getStatusIcon()" class="w-4 h-4 mr-2"
                                            :class="getStatusIconClass()" />
                                        <span class="text-sm font-medium" :class="getStatusTextClass()">
                                            {{ getStatusText() }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Kullanım İstatistiği -->
                                <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <div class="flex items-center justify-between text-sm">
                                        <span class="text-neutral-600 dark:text-neutral-400">Kullanım</span>
                                        <span class="font-medium text-neutral-900 dark:text-white">
                                            {{ coupon.used_count }} / {{ coupon.usage_limit || '∞' }}
                                        </span>
                                    </div>

                                    <div v-if="coupon.usage_limit"
                                        class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                                        <div class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                            :style="{ width: `${Math.min((coupon.used_count / coupon.usage_limit) * 100, 100)}%` }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Önizleme -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                Kupon Önizleme
                            </h3>

                            <div
                                class="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                                <div class="text-center">
                                    <div
                                        class="font-mono text-lg font-bold text-primary-900 dark:text-primary-100 mb-2">
                                        {{ form.code }}
                                    </div>
                                    <div class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                                        {{ form.name }}
                                    </div>
                                    <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                        {{ getDiscountDisplay() }}
                                    </div>
                                    <div class="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                                        {{ getValidityDisplay() }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- İşlemler -->
                        <div
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                İşlemler
                            </h3>

                            <div class="space-y-3">
                                <!-- Güncelle Butonu -->
                                <UButton type="submit" size="lg" block :loading="updating" :disabled="!isFormValid">
                                    <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
                                    Değişiklikleri Kaydet
                                </UButton>

                                <!-- Durum Butonları -->
                                <UButton v-if="!form.is_active" color="green" variant="outline" size="lg" block
                                    @click="toggleStatus" :loading="toggling">
                                    <UIcon name="i-heroicons-play" class="w-4 h-4 mr-2" />
                                    Aktifleştir
                                </UButton>

                                <UButton v-else color="red" variant="outline" size="lg" block @click="toggleStatus"
                                    :loading="toggling">
                                    <UIcon name="i-heroicons-pause" class="w-4 h-4 mr-2" />
                                    Pasifleştir
                                </UButton>

                                <!-- Sil Butonu -->
                                <UButton color="red" variant="outline" size="lg" block @click="showDeleteModal = true">
                                    <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
                                    Kuponu Sil
                                </UButton>
                            </div>
                        </div>

                        <!-- Son Kullanımlar -->
                        <div v-if="recentUsages.length"
                            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                Son Kullanımlar
                            </h3>

                            <div class="space-y-3">
                                <div v-for="usage in recentUsages" :key="usage.id"
                                    class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                    <div>
                                        <div class="text-sm font-medium text-neutral-900 dark:text-white">
                                            {{ usage.user?.name || 'Anonim' }}
                                        </div>
                                        <div class="text-xs text-neutral-600 dark:text-neutral-400">
                                            {{ formatDate(usage.created_at) }}
                                        </div>
                                    </div>
                                    <div class="text-sm font-medium text-green-600 dark:text-green-400">
                                        {{ formatPrice(usage.discount_amount) }}
                                    </div>
                                </div>

                                <UButton :to="`/management/kuponlar/${coupon.id}/kullanim-gecmisi`" size="sm"
                                    color="gray" variant="outline" block>
                                    Tümünü Görüntüle
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

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
    title: 'Kupon Düzenle - Admin Panel'
})

// Route params
const route = useRoute()
const couponId = route.params.id

// States
const loading = ref(true)
const updating = ref(false)
const toggling = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const error = ref('')

const coupon = ref({})
const recentUsages = ref([])

const form = ref({
    name: '',
    code: '',
    type: 'percentage',
    value: '',
    description: '',
    valid_from: '',
    valid_until: '',
    has_usage_limit: false,
    usage_limit: '',
    has_user_limit: false,
    user_limit: '',
    has_minimum_amount: false,
    minimum_amount: '',
    first_order_only: false,
    requires_review: false,
    has_category_restriction: false,
    category_ids: [],
    has_product_restriction: false,
    product_ids: [],
    is_active: true
})

const errors = ref({})

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
        label: coupon.value.code || 'Kupon',
        icon: 'i-heroicons-pencil'
    }
])

// Options
const typeOptions = [
    { label: 'Yüzde İndirim (%)', value: 'percentage' },
    { label: 'Sabit İndirim (₺)', value: 'fixed' },
    { label: 'Ücretsiz Kargo', value: 'free_shipping' }
]

const categoryOptions = ref([])
const productOptions = ref([])

// Fetch categories and products
const fetchCategoriesAndProducts = async () => {
    try {
        // Kategorileri çek
        const categoriesResponse = await useBaseOFetchWithAuth('categories')
        if (categoriesResponse && Array.isArray(categoriesResponse)) {
            categoryOptions.value = categoriesResponse.map(cat => ({
                label: cat.label || cat.name,
                value: cat.id
            }))
        }

        // Ürünleri çek (vendor products)
        const productsResponse = await useBaseOFetchWithAuth('vendor/products')
        if (productsResponse && productsResponse.products) {
            productOptions.value = productsResponse.products.map(product => ({
                label: product.name || `Ürün #${product.id}`,
                value: product.id
            }))
        }
    } catch (error) {
        console.error('Kategori ve ürünler yüklenemedi:', error)
    }
}

// Computed
const isFormValid = computed(() => {
    return form.value.name &&
        form.value.code &&
        form.value.type &&
        form.value.value &&
        form.value.valid_from &&
        form.value.valid_until
})

// Methods
const fetchCoupon = async () => {
    try {
        loading.value = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${couponId}`)

        if (response.success) {
            coupon.value = response.coupon
            recentUsages.value = response.recent_usages || []

            // Form'u doldur
            form.value = {
                name: coupon.value.name,
                code: coupon.value.code,
                type: coupon.value.type,
                value: coupon.value.value.toString(),
                description: coupon.value.description || '',
                valid_from: formatDateForInput(coupon.value.valid_from),
                valid_until: formatDateForInput(coupon.value.valid_until),
                has_usage_limit: !!coupon.value.usage_limit,
                usage_limit: coupon.value.usage_limit?.toString() || '',
                has_user_limit: !!coupon.value.usage_limit_per_user,
                user_limit: coupon.value.usage_limit_per_user?.toString() || '',
                has_minimum_amount: !!coupon.value.minimum_amount,
                minimum_amount: coupon.value.minimum_amount?.toString() || '',
                first_order_only: !!coupon.value.first_order_only,
                requires_review: !!coupon.value.requires_review,
                has_category_restriction: coupon.value.applicable_categories?.length > 0,
                category_ids: coupon.value.applicable_categories || [],
                has_product_restriction: coupon.value.applicable_products?.length > 0,
                product_ids: coupon.value.applicable_products || [],
                is_active: !!coupon.value.is_active
            }
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

const updateCoupon = async () => {
    try {
        updating.value = true
        errors.value = {}

        const payload = { ...form.value }

        // Convert minimum_amount to cents (backend'de mutator var, gerek yok)
        // if (payload.minimum_amount) {
        //     payload.minimum_amount = Math.round(parseFloat(payload.minimum_amount) * 100)
        // }

        // Backend field adlarına uygun hale getir
        payload.usage_limit_per_user = payload.user_limit

        // Array'leri doğru formata çevir
        if (typeof payload.category_ids === 'string') {
            payload.applicable_categories = payload.category_ids ? payload.category_ids.split(',').map(id => parseInt(id)) : []
        } else if (Array.isArray(payload.category_ids)) {
            payload.applicable_categories = payload.category_ids
        } else {
            payload.applicable_categories = []
        }

        if (typeof payload.product_ids === 'string') {
            payload.applicable_products = payload.product_ids ? payload.product_ids.split(',').map(id => parseInt(id)) : []
        } else if (Array.isArray(payload.product_ids)) {
            payload.applicable_products = payload.product_ids
        } else {
            payload.applicable_products = []
        }

        // Clean up conditional fields
        if (!payload.has_usage_limit) {
            delete payload.usage_limit
        }
        if (!payload.has_user_limit) {
            delete payload.usage_limit_per_user
        }
        if (!payload.has_minimum_amount) {
            delete payload.minimum_amount
        }
        if (!payload.has_category_restriction) {
            payload.applicable_categories = []
        }
        if (!payload.has_product_restriction) {
            payload.applicable_products = []
        }

        // Frontend-only fields'leri temizle
        delete payload.has_usage_limit
        delete payload.has_user_limit
        delete payload.has_minimum_amount
        delete payload.has_category_restriction
        delete payload.has_product_restriction
        delete payload.category_ids
        delete payload.product_ids
        delete payload.user_limit

        const response = await useBaseOFetchWithAuth(`admin/coupons/${couponId}`, {
            method: 'PUT',
            body: payload
        })

        if (response.success) {
            // Hem coupon hem form değerlerini güncelle
            coupon.value = response.coupon

            // Form değerlerini backend'den gelen data ile senkronize et
            form.value.name = response.coupon.name
            form.value.code = response.coupon.code
            form.value.type = response.coupon.type
            form.value.value = response.coupon.value.toString()
            form.value.description = response.coupon.description || ''
            form.value.valid_from = formatDateForInput(response.coupon.valid_from)
            form.value.valid_until = formatDateForInput(response.coupon.valid_until)
            form.value.usage_limit = response.coupon.usage_limit?.toString() || ''
            form.value.user_limit = response.coupon.usage_limit_per_user?.toString() || ''
            form.value.minimum_amount = response.coupon.minimum_amount?.toString() || ''
            form.value.first_order_only = !!response.coupon.first_order_only
            form.value.requires_review = !!response.coupon.requires_review
            form.value.category_ids = response.coupon.applicable_categories || []
            form.value.product_ids = response.coupon.applicable_products || []
            form.value.is_active = !!response.coupon.is_active

            // Conditional flags'leri yeniden ayarla
            form.value.has_usage_limit = !!response.coupon.usage_limit
            form.value.has_user_limit = !!response.coupon.usage_limit_per_user
            form.value.has_minimum_amount = !!response.coupon.minimum_amount
            form.value.has_category_restriction = response.coupon.applicable_categories?.length > 0
            form.value.has_product_restriction = response.coupon.applicable_products?.length > 0

            useToast().add({
                title: 'Başarılı',
                description: 'Kupon başarıyla güncellendi',
                color: 'green'
            })
        }
    } catch (error) {
        console.error('Kupon güncelleme hatası:', error)

        if (error.response?.status === 422) {
            errors.value = error.response._data.errors || {}
        }

        useToast().add({
            title: 'Hata',
            description: error.response?._data?.message || 'Kupon güncellenemedi',
            color: 'red'
        })
    } finally {
        updating.value = false
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
            form.value.is_active = response.coupon.is_active

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

// Utility Functions
const getValueStep = () => {
    return form.value.type === 'percentage' ? '1' : '0.01'
}

const getValuePlaceholder = () => {
    switch (form.value.type) {
        case 'percentage': return 'Örn: 20'
        case 'fixed': return 'Örn: 50.00'
        case 'free_shipping': return '0'
        default: return ''
    }
}

const getDiscountDisplay = () => {
    if (!form.value.value) return 'İndirim Miktarı'

    switch (form.value.type) {
        case 'percentage': return `%${form.value.value}`
        case 'fixed': return `${form.value.value}₺`
        case 'free_shipping': return 'Ücretsiz Kargo'
        default: return form.value.value
    }
}

const getValidityDisplay = () => {
    if (!form.value.valid_from || !form.value.valid_until) {
        return 'Geçerlilik tarihi belirtilmedi'
    }

    const from = new Date(form.value.valid_from).toLocaleDateString('tr-TR')
    const until = new Date(form.value.valid_until).toLocaleDateString('tr-TR')
    return `${from} - ${until}`
}

const getStatusText = () => {
    if (!form.value.is_active) return 'Pasif'

    const now = new Date()
    const validFrom = new Date(form.value.valid_from)
    const validUntil = new Date(form.value.valid_until)

    if (now < validFrom) return 'Henüz Başlamadı'
    if (now > validUntil) return 'Süresi Doldu'
    return 'Aktif'
}

const getStatusIcon = () => {
    if (!form.value.is_active) return 'i-heroicons-pause'

    const now = new Date()
    const validFrom = new Date(form.value.valid_from)
    const validUntil = new Date(form.value.valid_until)

    if (now < validFrom) return 'i-heroicons-clock'
    if (now > validUntil) return 'i-heroicons-x-circle'
    return 'i-heroicons-check-circle'
}

const getStatusBgClass = () => {
    if (!form.value.is_active) return 'bg-gray-50 dark:bg-gray-900/20'

    const now = new Date()
    const validFrom = new Date(form.value.valid_from)
    const validUntil = new Date(form.value.valid_until)

    if (now < validFrom) return 'bg-yellow-50 dark:bg-yellow-900/20'
    if (now > validUntil) return 'bg-red-50 dark:bg-red-900/20'
    return 'bg-green-50 dark:bg-green-900/20'
}

const getStatusIconClass = () => {
    if (!form.value.is_active) return 'text-gray-600 dark:text-gray-400'

    const now = new Date()
    const validFrom = new Date(form.value.valid_from)
    const validUntil = new Date(form.value.valid_until)

    if (now < validFrom) return 'text-yellow-600 dark:text-yellow-400'
    if (now > validUntil) return 'text-red-600 dark:text-red-400'
    return 'text-green-600 dark:text-green-400'
}

const getStatusTextClass = () => {
    if (!form.value.is_active) return 'text-gray-800 dark:text-gray-200'

    const now = new Date()
    const validFrom = new Date(form.value.valid_from)
    const validUntil = new Date(form.value.valid_until)

    if (now < validFrom) return 'text-yellow-800 dark:text-yellow-200'
    if (now > validUntil) return 'text-red-800 dark:text-red-200'
    return 'text-green-800 dark:text-green-200'
}

const formatDateForInput = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Initialize
onMounted(() => {
    fetchCoupon()
    fetchCategoriesAndProducts()
})

// Watch type changes
watch(() => form.value.type, (newType) => {
    if (newType === 'free_shipping') {
        form.value.value = '0'
    }
})
</script>
