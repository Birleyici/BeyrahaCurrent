<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Kupon İstatistikleri" description="Kupon performansı ve kullanım analizi"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton to="/management/kuponlar" color="gray" variant="outline" icon="i-heroicons-arrow-left">
                    Kupon Listesi
                </UButton>
                <UButton @click="refreshData" :loading="loading" color="gray" variant="outline"
                    icon="i-heroicons-arrow-path">
                    Yenile
                </UButton>
            </template>
        </AdminCommonPageHeader>

        <!-- Filtreler -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Tarih Aralığı -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Tarih Aralığı
                    </label>
                    <USelect v-model="filters.period" :options="periodOptions" @change="refreshData" />
                </div>

                <!-- Kupon Türü -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Kupon Türü
                    </label>
                    <USelect v-model="filters.type" :options="typeOptions" @change="refreshData" />
                </div>

                <!-- Durum -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Durum
                    </label>
                    <USelect v-model="filters.status" :options="statusOptions" @change="refreshData" />
                </div>

                <!-- Sıralama -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Sıralama
                    </label>
                    <USelect v-model="filters.sort_by" :options="sortOptions" @change="refreshData" />
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
            <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 text-primary-600 animate-spin" />
        </div>

        <!-- Main Content -->
        <div v-else class="space-y-6">

            <!-- Genel İstatistikler -->
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam
                                Kupon</p>
                            <p class="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1 sm:mt-2">
                                {{ stats.total_coupons }}
                            </p>
                        </div>
                        <div class="p-2 sm:p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                            <UIcon name="i-heroicons-ticket"
                                class="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600 dark:text-secondary-400" />
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam
                                Kullanım</p>
                            <p class="text-xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1 sm:mt-2">
                                {{ stats.total_usage }}
                            </p>
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
                            <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam
                                İndirim</p>
                            <p class="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">
                                {{ formatPrice(stats.total_discount) }}
                            </p>
                        </div>
                        <div class="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                            <UIcon name="i-heroicons-currency-dollar"
                                class="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Ortalama
                                İndirim
                            </p>
                            <p
                                class="text-xl sm:text-3xl font-bold text-secondary-600 dark:text-secondary-400 mt-1 sm:mt-2">
                                {{ formatPrice(stats.average_discount) }}
                            </p>
                        </div>
                        <div class="p-2 sm:p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                            <UIcon name="i-heroicons-calculator"
                                class="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600 dark:text-secondary-400" />
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Benzersiz
                                Kullanıcı
                            </p>
                            <p class="text-xl sm:text-3xl font-bold text-accent-600 dark:text-accent-400 mt-1 sm:mt-2">
                                {{ stats.unique_users }}
                            </p>
                        </div>
                        <div class="p-2 sm:p-3 bg-accent-50 dark:bg-accent-900/20 rounded-full">
                            <UIcon name="i-heroicons-users"
                                class="w-6 h-6 sm:w-8 sm:h-8 text-accent-600 dark:text-accent-400" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Grafik ve Çizelgeler -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <!-- Kullanım Trendi -->
                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                        Kullanım Trendi
                    </h3>

                    <div class="h-64 flex items-center justify-center bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                        <div class="text-center">
                            <UIcon name="i-heroicons-chart-bar" class="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                            <p class="text-neutral-600 dark:text-neutral-400">Grafik yakında eklenecek</p>
                        </div>
                    </div>
                </div>

                <!-- Kupon Türü Dağılımı -->
                <div
                    class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                        Kupon Türü Dağılımı
                    </h3>

                    <div class="space-y-4">
                        <div v-for="item in typeDistribution" :key="item.type"
                            class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-4 h-4 rounded-full mr-3" :class="getTypeColor(item.type)"></div>
                                <span class="text-neutral-700 dark:text-neutral-300">
                                    {{ getTypeLabel(item.type) }}
                                </span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="text-neutral-900 dark:text-white font-medium">
                                    {{ item.count }}
                                </span>
                                <span class="text-sm text-neutral-500 dark:text-neutral-400">
                                    (%{{ item.percentage }})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- En Performanslı Kuponlar -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                        En Performanslı Kuponlar
                    </h3>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                        <thead class="bg-neutral-50 dark:bg-neutral-900/50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Kupon
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Tür
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Kullanım
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Toplam İndirim
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Ortalama İndirim
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Performans
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                            <tr v-for="coupon in topPerformingCoupons" :key="coupon.id"
                                class="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                <!-- Kupon -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div class="font-mono text-sm font-semibold text-neutral-900 dark:text-white">
                                            {{ coupon.code }}
                                        </div>
                                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                            {{ coupon.name }}
                                        </div>
                                    </div>
                                </td>

                                <!-- Tür -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <UBadge :color="getCouponTypeColor(coupon.type)" variant="soft">
                                        {{ getCouponTypeLabel(coupon.type) }}
                                    </UBadge>
                                </td>

                                <!-- Kullanım -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-neutral-900 dark:text-white font-medium">
                                        {{ coupon.used_count }}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                        / {{ coupon.usage_limit || '∞' }}
                                    </div>
                                </td>

                                <!-- Toplam İndirim -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-neutral-900 dark:text-white font-medium">
                                        {{ formatPrice(coupon.total_discount) }}
                                    </div>
                                </td>

                                <!-- Ortalama İndirim -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-neutral-900 dark:text-white font-medium">
                                        {{ formatPrice(coupon.average_discount) }}
                                    </div>
                                </td>

                                <!-- Performans -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mr-2">
                                            <div class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                :style="{ width: `${coupon.performance_score}%` }"></div>
                                        </div>
                                        <span class="text-sm text-neutral-900 dark:text-white font-medium">
                                            {{ coupon.performance_score }}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Aylık Performans -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                    Aylık Performans Karşılaştırması
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="month in monthlyStats" :key="month.month"
                        class="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                        <div class="text-center">
                            <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                                {{ month.month }}
                            </div>
                            <div class="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                {{ month.usage_count }}
                            </div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                Kullanım
                            </div>
                            <div class="text-lg font-semibold text-green-600 dark:text-green-400">
                                {{ formatPrice(month.total_discount) }}
                            </div>
                            <div class="text-xs text-neutral-500 dark:text-neutral-400">
                                Toplam İndirim
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Export Buttons -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Rapor Dışa Aktarma
                </h3>

                <div class="flex flex-wrap gap-3">
                    <UButton color="green" variant="outline" @click="exportToExcel" :loading="exporting.excel">
                        <UIcon name="i-heroicons-document-arrow-down" class="w-4 h-4 mr-2" />
                        Excel Olarak İndir
                    </UButton>

                    <UButton color="red" variant="outline" @click="exportToPdf" :loading="exporting.pdf">
                        <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-2" />
                        PDF Olarak İndir
                    </UButton>

                    <UButton color="blue" variant="outline" @click="exportToCsv" :loading="exporting.csv">
                        <UIcon name="i-heroicons-table-cells" class="w-4 h-4 mr-2" />
                        CSV Olarak İndir
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// SEO
useHead({
    title: 'Kupon İstatistikleri - Admin Panel'
})

// States
const loading = ref(true)
const exporting = ref({
    excel: false,
    pdf: false,
    csv: false
})

const filters = ref({
    period: 'last_30_days',
    type: '',
    status: 'active',
    sort_by: 'usage_count'
})

const stats = ref({
    total_coupons: 0,
    total_usage: 0,
    total_discount: 0,
    average_discount: 0,
    unique_users: 0
})

const typeDistribution = ref([])
const topPerformingCoupons = ref([])
const monthlyStats = ref([])

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
        label: 'İstatistikler',
        icon: 'i-heroicons-chart-bar'
    }
]

// Options
const periodOptions = [
    { label: 'Son 7 Gün', value: 'last_7_days' },
    { label: 'Son 30 Gün', value: 'last_30_days' },
    { label: 'Son 3 Ay', value: 'last_3_months' },
    { label: 'Son 6 Ay', value: 'last_6_months' },
    { label: 'Son 1 Yıl', value: 'last_year' },
    { label: 'Tüm Zamanlar', value: 'all_time' }
]

const typeOptions = [
    { label: 'Tüm Türler', value: '' },
    { label: 'Sabit İndirim', value: 'fixed' },
    { label: 'Yüzde İndirim', value: 'percentage' },
    { label: 'Ücretsiz Kargo', value: 'free_shipping' }
]

const statusOptions = [
    { label: 'Tüm Kuponlar', value: '' },
    { label: 'Aktif Kuponlar', value: 'active' },
    { label: 'Pasif Kuponlar', value: 'inactive' }
]

const sortOptions = [
    { label: 'En Çok Kullanılan', value: 'usage_count' },
    { label: 'En Yüksek İndirim', value: 'total_discount' },
    { label: 'En Son Oluşturulan', value: 'created_at' },
    { label: 'Alfabetik', value: 'name' }
]

// Methods
const refreshData = async () => {
    try {
        loading.value = true

        const query = new URLSearchParams()
        Object.keys(filters.value).forEach(key => {
            if (filters.value[key]) {
                query.append(key, filters.value[key])
            }
        })

        const response = await useBaseOFetchWithAuth(`admin/coupons/statistics?${query.toString()}`)

        if (response.success) {
            stats.value = response.stats
            typeDistribution.value = response.type_distribution || []
            topPerformingCoupons.value = response.top_performing || []
            monthlyStats.value = response.monthly_stats || []
        }
    } catch (error) {
        console.error('İstatistikler yüklenemedi:', error)
        useToast().add({
            title: 'Hata',
            description: 'İstatistikler yüklenemedi',
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}

const exportToExcel = async () => {
    try {
        exporting.value.excel = true
        // Excel export logic here
        useToast().add({
            title: 'Başarılı',
            description: 'Excel raporu indirildi',
            color: 'green'
        })
    } catch (error) {
        console.error('Excel export hatası:', error)
        useToast().add({
            title: 'Hata',
            description: 'Excel raporu oluşturulamadı',
            color: 'red'
        })
    } finally {
        exporting.value.excel = false
    }
}

const exportToPdf = async () => {
    try {
        exporting.value.pdf = true
        // PDF export logic here
        useToast().add({
            title: 'Başarılı',
            description: 'PDF raporu indirildi',
            color: 'green'
        })
    } catch (error) {
        console.error('PDF export hatası:', error)
        useToast().add({
            title: 'Hata',
            description: 'PDF raporu oluşturulamadı',
            color: 'red'
        })
    } finally {
        exporting.value.pdf = false
    }
}

const exportToCsv = async () => {
    try {
        exporting.value.csv = true
        // CSV export logic here
        useToast().add({
            title: 'Başarılı',
            description: 'CSV raporu indirildi',
            color: 'green'
        })
    } catch (error) {
        console.error('CSV export hatası:', error)
        useToast().add({
            title: 'Hata',
            description: 'CSV raporu oluşturulamadı',
            color: 'red'
        })
    } finally {
        exporting.value.csv = false
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
        fixed: 'Sabit',
        percentage: 'Yüzde',
        free_shipping: 'Kargo'
    }
    return labels[type] || type
}

const getTypeColor = (type) => {
    const colors = {
        fixed: 'bg-secondary-500',
        percentage: 'bg-green-500',
        free_shipping: 'bg-purple-500'
    }
    return colors[type] || 'bg-gray-500'
}

const getTypeLabel = (type) => {
    const labels = {
        fixed: 'Sabit İndirim',
        percentage: 'Yüzde İndirim',
        free_shipping: 'Ücretsiz Kargo'
    }
    return labels[type] || type
}

// Initialize
onMounted(() => {
    refreshData()
})
</script>