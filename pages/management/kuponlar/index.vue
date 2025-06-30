<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Kupon Yönetimi" :description="`Toplam ${pagination.total || 0} kupon bulunuyor`"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton icon="i-heroicons-chart-bar" size="sm" color="gray" variant="outline" label="İstatistikler"
                    to="/management/kuponlar/istatistikler" class="touch-manipulation" />
                <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
                    @click="fetchCoupons" :loading="loading" class="touch-manipulation" />
                <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Kupon"
                    to="/management/kuponlar/yeni" class="touch-manipulation" />
            </template>
        </AdminCommonPageHeader>

        <!-- İstatistik Kartları -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Kupon
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1 sm:mt-2">{{
                            statistics.total_coupons || 0 }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <UIcon name="i-heroicons-ticket"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Aktif Kupon</p>
                        <p class="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{{
                            statistics.active_coupons || 0 }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <UIcon name="i-heroicons-check-circle"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Kullanım
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1 sm:mt-2">{{
                            statistics.total_usage || 0 }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                        <UIcon name="i-heroicons-chart-bar"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam İndirim
                        </p>
                        <p
                            class="text-xl sm:text-3xl font-bold text-secondary-600 dark:text-secondary-400 mt-1 sm:mt-2">
                            {{ formatPrice(statistics.total_discount || 0) }}
                        </p>
                    </div>
                    <div class="p-2 sm:p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                        <UIcon name="i-heroicons-currency-dollar"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600 dark:text-secondary-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtreler -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Arama -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Arama</label>
                    <UInput v-model="filters.search" placeholder="Kupon kodu veya adı..."
                        icon="i-heroicons-magnifying-glass" @input="debouncedSearch" />
                </div>

                <!-- Durum Filtresi -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Durum</label>
                    <USelect v-model="filters.status" :options="statusOptions" @change="fetchCoupons" />
                </div>

                <!-- Tür Filtresi -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Tür</label>
                    <USelect v-model="filters.type" :options="typeOptions" @change="fetchCoupons" />
                </div>

                <!-- Geçerlilik Filtresi -->
                <div>
                    <label
                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Geçerlilik</label>
                    <USelect v-model="filters.validity" :options="validityOptions" @change="fetchCoupons" />
                </div>
            </div>

            <!-- Filtre Temizleme -->
            <div class="flex justify-end mt-4">
                <UButton size="sm" color="gray" variant="outline" @click="resetFilters" icon="i-heroicons-x-mark">
                    Filtreleri Temizle
                </UButton>
            </div>
        </div>

        <!-- Kupon Listesi -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            <!-- Başlık -->
            <div class="px-4 lg:px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Kupon Listesi</h3>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-12">
                <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 text-primary-600 animate-spin" />
            </div>

            <!-- Empty State -->
            <div v-else-if="!coupons.length" class="text-center py-12">
                <UIcon name="i-heroicons-ticket" class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p class="text-neutral-600 dark:text-neutral-400">Henüz kupon oluşturulmamış</p>
                <UButton to="/management/kuponlar/yeni" color="primary" size="sm" class="mt-4">
                    İlk Kuponu Oluştur
                </UButton>
            </div>

            <!-- Kupon Tablosu -->
            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead class="bg-neutral-50 dark:bg-neutral-900/50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Kupon
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Tür & Değer
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Kullanım
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Geçerlilik
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Durum
                            </th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                        <tr v-for="coupon in coupons" :key="coupon.id"
                            class="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                            <!-- Kupon Bilgisi -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div class="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
                                        {{ coupon.code }}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400 truncate max-w-48">
                                        {{ coupon.name }}
                                    </div>
                                </div>
                            </td>

                            <!-- Tür & Değer -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <UBadge :color="getCouponTypeColor(coupon.type)" variant="soft" class="mr-2">
                                        {{ getCouponTypeLabel(coupon.type) }}
                                    </UBadge>
                                    <span class="text-sm font-medium text-neutral-900 dark:text-white">
                                        {{ getCouponValueDisplay(coupon) }}
                                    </span>
                                </div>
                            </td>

                            <!-- Kullanım -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-neutral-900 dark:text-white">
                                    {{ coupon.used_count }} / {{ coupon.usage_limit || '∞' }}
                                </div>
                                <div v-if="coupon.usage_limit"
                                    class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-1">
                                    <div class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: `${Math.min((coupon.used_count / coupon.usage_limit) * 100, 100)}%` }">
                                    </div>
                                </div>
                            </td>

                            <!-- Geçerlilik -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-neutral-900 dark:text-white">
                                    {{ formatDate(coupon.valid_from) }}
                                </div>
                                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                    {{ formatDate(coupon.valid_until) }}
                                </div>
                                <UBadge :color="getValidityColor(coupon)" variant="soft" size="sm" class="mt-1">
                                    {{ getValidityStatus(coupon) }}
                                </UBadge>
                            </td>

                            <!-- Durum -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <UBadge :color="coupon.is_active ? 'green' : 'red'" variant="soft">
                                    {{ coupon.is_active ? 'Aktif' : 'Pasif' }}
                                </UBadge>
                            </td>

                            <!-- İşlemler -->
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex items-center justify-end space-x-2">
                                    <UButton size="sm" color="gray" variant="outline"
                                        :to="`/management/kuponlar/${coupon.id}`" icon="i-heroicons-eye">
                                        Görüntüle
                                    </UButton>
                                    <UButton size="sm" :color="coupon.is_active ? 'red' : 'green'" variant="outline"
                                        @click="toggleCouponStatus(coupon)" :loading="coupon.updating">
                                        {{ coupon.is_active ? 'Pasifleştir' : 'Aktifleştir' }}
                                    </UButton>
                                    <UDropdown :items="getDropdownItems(coupon)">
                                        <UButton size="sm" color="gray" variant="outline"
                                            icon="i-heroicons-ellipsis-vertical" />
                                    </UDropdown>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div v-if="pagination.total > pagination.per_page"
                class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                        {{ pagination.from }}-{{ pagination.to }} arası, toplam {{ pagination.total }} kupon
                    </div>
                    <div class="flex items-center space-x-2">
                        <UButton size="sm" :disabled="!pagination.prev_page_url"
                            @click="changePage(pagination.current_page - 1)" icon="i-heroicons-chevron-left" />
                        <span class="text-sm font-medium text-neutral-900 dark:text-white">
                            {{ pagination.current_page }} / {{ pagination.last_page }}
                        </span>
                        <UButton size="sm" :disabled="!pagination.next_page_url"
                            @click="changePage(pagination.current_page + 1)" icon="i-heroicons-chevron-right" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Kupon Silme Modalı -->
        <UModal v-model="showDeleteModal" :ui="{ width: 'sm:max-w-md' }">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
                <template #header>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                        Kupon Silme Onayı
                    </h3>
                </template>

                <div class="space-y-4">
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        <strong>{{ selectedCoupon?.code }}</strong> kodlu kuponu silmek istediğinizden emin misiniz?
                        Bu işlem geri alınamaz.
                    </p>

                    <div v-if="selectedCoupon?.used_count > 0" class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <p class="text-sm text-amber-800 dark:text-amber-200">
                            ⚠️ Bu kupon {{ selectedCoupon.used_count }} kez kullanılmış. Silme işlemi kullanım geçmişini
                            de
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
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// SEO
useHead({
    title: 'Kupon Yönetimi - Admin Panel'
})

// States
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const selectedCoupon = ref(null)

const coupons = ref([])
const statistics = ref({})
const pagination = ref({})

const filters = ref({
    search: '',
    status: '',
    type: '',
    validity: '',
    per_page: 15
})

// Breadcrumb
const breadcrumbLinks = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/management'
    },
    {
        label: 'Kupon Yönetimi',
        icon: 'i-heroicons-ticket'
    }
]

// Options
const statusOptions = [
    { label: 'Tüm Durumlar', value: '' },
    { label: 'Aktif', value: 'active' },
    { label: 'Pasif', value: 'inactive' }
]

const typeOptions = [
    { label: 'Tüm Türler', value: '' },
    { label: 'Sabit İndirim', value: 'fixed' },
    { label: 'Yüzde İndirim', value: 'percentage' },
    { label: 'Ücretsiz Kargo', value: 'free_shipping' }
]

const validityOptions = [
    { label: 'Tüm Kuponlar', value: '' },
    { label: 'Geçerli', value: 'valid' },
    { label: 'Süresi Dolmuş', value: 'expired' },
    { label: 'Henüz Başlamamış', value: 'upcoming' }
]

// Methods
const fetchCoupons = async () => {
    try {
        loading.value = true
        const query = new URLSearchParams()

        Object.keys(filters.value).forEach(key => {
            if (filters.value[key]) {
                query.append(key, filters.value[key])
            }
        })

        const response = await useBaseOFetchWithAuth(`admin/coupons?${query.toString()}`)

        if (response.success) {
            coupons.value = response.coupons.data
            pagination.value = {
                current_page: response.coupons.current_page,
                last_page: response.coupons.last_page,
                per_page: response.coupons.per_page,
                total: response.coupons.total,
                from: response.coupons.from,
                to: response.coupons.to,
                prev_page_url: response.coupons.prev_page_url,
                next_page_url: response.coupons.next_page_url
            }
        }
    } catch (error) {
        console.error('Kuponlar yüklenemedi:', error)
    } finally {
        loading.value = false
    }
}

const fetchStatistics = async () => {
    try {
        const response = await useBaseOFetchWithAuth('admin/coupons/statistics')
        if (response.success) {
            statistics.value = response.statistics
        }
    } catch (error) {
        console.error('İstatistikler yüklenemedi:', error)
    }
}

const toggleCouponStatus = async (coupon) => {
    try {
        coupon.updating = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${coupon.id}/toggle-status`, {
            method: 'POST'
        })

        if (response.success) {
            coupon.is_active = response.coupon.is_active
            useToast().add({
                title: 'Başarılı',
                description: `Kupon ${coupon.is_active ? 'aktifleştirildi' : 'pasifleştirildi'}`,
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
        coupon.updating = false
    }
}

const openDeleteModal = (coupon) => {
    selectedCoupon.value = coupon
    showDeleteModal.value = true
}

const deleteCoupon = async () => {
    try {
        deleting.value = true
        const response = await useBaseOFetchWithAuth(`admin/coupons/${selectedCoupon.value.id}`, {
            method: 'DELETE'
        })

        if (response.success) {
            useToast().add({
                title: 'Başarılı',
                description: 'Kupon silindi',
                color: 'green'
            })
            showDeleteModal.value = false
            await fetchCoupons()
            await fetchStatistics()
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

const changePage = (page) => {
    filters.value.page = page
    fetchCoupons()
}

const resetFilters = () => {
    filters.value = {
        search: '',
        status: '',
        type: '',
        validity: '',
        per_page: 15
    }
    fetchCoupons()
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
        fixed: 'Sabit',
        percentage: 'Yüzde',
        free_shipping: 'Kargo'
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

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR')
}

const getDropdownItems = (coupon) => [
    [{
        label: 'Düzenle',
        icon: 'i-heroicons-pencil',
        click: () => navigateTo(`/management/kuponlar/${coupon.id}/duzenle`)
    }],
    [{
        label: 'Sil',
        icon: 'i-heroicons-trash',
        click: () => openDeleteModal(coupon)
    }]
]

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        fetchCoupons()
    }, 500)
}

// Initialize
onMounted(() => {
    fetchCoupons()
    fetchStatistics()
})
</script>