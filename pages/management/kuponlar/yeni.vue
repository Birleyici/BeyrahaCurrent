<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Yeni Kupon Oluştur"
            description="Müşterileriniz için yeni bir indirim kuponu tanımlayın" :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton to="/management/kuponlar" color="gray" variant="outline" icon="i-heroicons-arrow-left">
                    Kupon Listesi
                </UButton>
            </template>
        </AdminCommonPageHeader>

        <form @submit.prevent="createCoupon" class="space-y-6">
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
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Kupon Adı <span class="text-red-500">*</span>
                                </label>
                                <UInput v-model="form.name" placeholder="Örn: Sonbahar İndirimi" :error="errors.name"
                                    size="lg" />
                                <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    Kuponun yönetim panelinde görüntülenecek adı
                                </p>
                            </div>

                            <!-- Kupon Kodu -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Kupon Kodu <span class="text-red-500">*</span>
                                </label>
                                <UInput v-model="form.code" placeholder="SONBAHAR20" :error="errors.code" size="lg"
                                    class="font-mono" />
                                <div class="flex justify-between mt-1">
                                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                        Müşterilerin gireceği kod
                                    </p>
                                    <UButton size="xs" color="gray" variant="outline" @click="generateCode"
                                        type="button">
                                        Otomatik Oluştur
                                    </UButton>
                                </div>
                            </div>

                            <!-- Kupon Türü -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    İndirim Türü <span class="text-red-500">*</span>
                                </label>
                                <USelect v-model="form.type" :options="typeOptions" size="lg" :error="errors.type" />
                            </div>

                            <!-- İndirim Değeri -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    İndirim Değeri <span class="text-red-500">*</span>
                                </label>
                                <UInput v-model="form.value" type="number" :min="0" :step="getValueStep()"
                                    :placeholder="getValuePlaceholder()" :error="errors.value" size="lg" />
                                <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    {{ getValueDescription() }}
                                </p>
                            </div>

                            <!-- Açıklama -->
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Açıklama
                                </label>
                                <UTextarea v-model="form.description" placeholder="Kupon hakkında detaylı açıklama..."
                                    :rows="3" />
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
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Başlangıç Tarihi <span class="text-red-500">*</span>
                                </label>
                                <UInput v-model="form.valid_from" type="datetime-local" :error="errors.valid_from"
                                    size="lg" />
                            </div>

                            <!-- Bitiş Tarihi -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
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

                                <UInput v-if="form.has_usage_limit" v-model="form.usage_limit" type="number" :min="1"
                                    placeholder="Örn: 100" size="lg" />

                                <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    {{ form.has_usage_limit ? 'Kupon bu kadar kez kullanılabilir' : 'Sınırsız kullanım'
                                    }}
                                </p>
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

                                <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    {{ form.has_user_limit ? `Her kullanıcı bu kadar kez kullanabilir` : `Kullanıcı
                                    başına sınır
                                    yok` }}
                                </p>
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

                                <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    {{ form.has_minimum_amount ? 'Sepet bu tutardan fazla olmalı' : 'Minimum tutar yok'
                                    }}
                                </p>
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
                                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                        Kupon sadece seçilen kategorilerdeki ürünler için geçerli olacak
                                    </p>
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
                                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                        Kupon sadece seçilen ürünler için geçerli olacak
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Önizleme -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Kupon Önizleme
                        </h3>

                        <div
                            class="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                            <div class="text-center">
                                <div class="font-mono text-lg font-bold text-primary-900 dark:text-primary-100 mb-2">
                                    {{ form.code || 'KUPON_KODU' }}
                                </div>
                                <div class="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                                    {{ form.name || 'Kupon Adı' }}
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
                            <!-- Durum -->
                            <div class="flex items-center justify-between">
                                <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Durum
                                </label>
                                <UToggle v-model="form.is_active" />
                            </div>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                {{ form.is_active ? 'Kupon aktif olarak oluşturulacak' : `Kupon pasif olarak
                                oluşturulacak` }}
                            </p>

                            <!-- Kaydet Butonu -->
                            <UButton type="submit" size="lg" block :loading="creating" :disabled="!isFormValid"
                                class="mt-6">
                                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                                Kupon Oluştur
                            </UButton>

                            <!-- Toplu Oluşturma -->
                            <UButton color="gray" variant="outline" size="lg" block @click="showBulkModal = true"
                                type="button">
                                <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4 mr-2" />
                                Toplu Oluştur
                            </UButton>
                        </div>
                    </div>

                    <!-- Hızlı Şablonlar -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Hızlı Şablonlar
                        </h3>

                        <div class="space-y-2">
                            <UButton v-for="template in templates" :key="template.name" size="sm" color="gray"
                                variant="outline" block @click="applyTemplate(template)" type="button">
                                {{ template.name }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <!-- Toplu Oluşturma Modalı -->
        <UModal v-model="showBulkModal" :ui="{ width: 'sm:max-w-2xl' }">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                        Toplu Kupon Oluşturma
                    </h3>
                </template>

                <div class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Kupon Sayısı
                            </label>
                            <UInput v-model="bulkForm.count" type="number" :min="1" :max="1000" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Kod Prefix
                            </label>
                            <UInput v-model="bulkForm.prefix" placeholder="KUPON" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Şablon Olarak Kullan
                        </label>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            Mevcut form bilgileri şablon olarak kullanılacak
                        </p>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-end gap-3">
                        <UButton color="gray" variant="outline" @click="showBulkModal = false">
                            İptal
                        </UButton>
                        <UButton @click="createBulkCoupons" :loading="creatingBulk">
                            {{ bulkForm.count }} Kupon Oluştur
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// SEO
useHead({
    title: 'Yeni Kupon Oluştur - Admin Panel'
})

// States
const creating = ref(false)
const creatingBulk = ref(false)
const showBulkModal = ref(false)

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

const bulkForm = ref({
    count: 10,
    prefix: 'KUPON'
})

const errors = ref({})

// Breadcrumb
const breadcrumbLinks = [
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
        label: 'Yeni Kupon',
        icon: 'i-heroicons-plus'
    }
]

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

// Templates
const templates = [
    {
        name: 'Hoş Geldin %10',
        data: {
            name: 'Hoş Geldin İndirimi',
            type: 'percentage',
            value: '10',
            first_order_only: true,
            has_minimum_amount: true,
            minimum_amount: '100'
        }
    },
    {
        name: 'Ücretsiz Kargo',
        data: {
            name: 'Ücretsiz Kargo',
            type: 'free_shipping',
            value: '0',
            has_minimum_amount: true,
            minimum_amount: '150'
        }
    },
    {
        name: '50₺ İndirim',
        data: {
            name: '50₺ Sabit İndirim',
            type: 'fixed',
            value: '50',
            has_minimum_amount: true,
            minimum_amount: '250'
        }
    }
]

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
const generateCode = () => {
    const prefix = form.value.name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    form.value.code = prefix + random
}

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

const getValueDescription = () => {
    switch (form.value.type) {
        case 'percentage': return 'Yüzde değeri (1-100 arası)'
        case 'fixed': return 'Türk Lirası cinsinden tutar'
        case 'free_shipping': return 'Ücretsiz kargo için değer gerekmez'
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

const applyTemplate = (template) => {
    Object.assign(form.value, template.data)
}

const createCoupon = async () => {
    try {
        creating.value = true
        errors.value = {}

        const payload = { ...form.value }

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

        const response = await useBaseOFetchWithAuth('admin/coupons', {
            method: 'POST',
            body: payload
        })

        if (response.success) {
            useToast().add({
                title: 'Başarılı',
                description: 'Kupon başarıyla oluşturuldu',
                color: 'green'
            })

            await navigateTo('/management/kuponlar')
        }
    } catch (error) {
        console.error('Kupon oluşturma hatası:', error)

        if (error.response?.status === 422) {
            errors.value = error.response._data.errors || {}
        }

        useToast().add({
            title: 'Hata',
            description: error.response?._data?.message || 'Kupon oluşturulamadı',
            color: 'red'
        })
    } finally {
        creating.value = false
    }
}

const createBulkCoupons = async () => {
    try {
        creatingBulk.value = true

        const payload = {
            template: { ...form.value },
            count: bulkForm.value.count,
            prefix: bulkForm.value.prefix
        }

        const response = await useBaseOFetchWithAuth('admin/coupons/bulk', {
            method: 'POST',
            body: payload
        })

        if (response.success) {
            useToast().add({
                title: 'Başarılı',
                description: `${response.created_count} kupon başarıyla oluşturuldu`,
                color: 'green'
            })

            showBulkModal.value = false
            await navigateTo('/management/kuponlar')
        }
    } catch (error) {
        console.error('Toplu kupon oluşturma hatası:', error)

        useToast().add({
            title: 'Hata',
            description: error.response?._data?.message || 'Kuponlar oluşturulamadı',
            color: 'red'
        })
    } finally {
        creatingBulk.value = false
    }
}

// Set default dates and fetch data
onMounted(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextMonth = new Date(now)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    form.value.valid_from = now.toISOString().slice(0, 16)
    form.value.valid_until = nextMonth.toISOString().slice(0, 16)

    // Kategori ve ürünleri yükle
    fetchCategoriesAndProducts()
})

// Watch type changes
watch(() => form.value.type, (newType) => {
    if (newType === 'free_shipping') {
        form.value.value = '0'
    }
})
</script>