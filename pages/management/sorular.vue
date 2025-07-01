<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Soru & Cevap Yönetimi"
            description="Müşteri sorularını ve cevaplarını inceleyin, onaylayın veya reddedin"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton @click="refreshData" :loading="loading" color="gray" variant="outline"
                    icon="i-heroicons-arrow-path">
                    Yenile
                </UButton>
            </template>
        </AdminCommonPageHeader>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Soru</p>
                        <p class="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1 sm:mt-2">{{
                            statistics.total_questions }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-accent-50 dark:bg-accent-900/20 rounded-full">
                        <UIcon name="i-heroicons-question-mark-circle"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-accent-600 dark:text-accent-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Bekleyen Soru
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-warning-600 dark:text-warning-400 mt-1 sm:mt-2">{{
                            statistics.pending_questions }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-warning-50 dark:bg-warning-900/20 rounded-full">
                        <UIcon name="i-heroicons-clock"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-warning-600 dark:text-warning-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Cevap
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-success-600 dark:text-success-400 mt-1 sm:mt-2">{{
                            statistics.total_answers }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-success-50 dark:bg-success-900/20 rounded-full">
                        <UIcon name="i-heroicons-chat-bubble-left"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-success-600 dark:text-success-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Bekleyen Cevap
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-error-600 dark:text-error-400 mt-1 sm:mt-2">{{
                            statistics.pending_answers }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-error-50 dark:bg-error-900/20 rounded-full">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-error-600 dark:text-error-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Type Filter -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Tür</label>
                    <USelect v-model="filters.type" :options="typeOptions" placeholder="Tümü" />
                </div>

                <!-- Status Filter -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Durum</label>
                    <USelect v-model="filters.status" :options="statusOptions" placeholder="Tüm Durumlar" />
                </div>

                <!-- Sort Filter -->
                <div>
                    <label
                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Sıralama</label>
                    <USelect v-model="filters.sort" :options="sortOptions" />
                </div>

                <!-- Search -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Arama</label>
                    <UInput v-model="filters.search" placeholder="Kullanıcı, ürün veya içerik ara..."
                        icon="i-heroicons-magnifying-glass" />
                </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ pagination.total }} öğe bulundu
                </div>
                <UButton @click="resetFilters" variant="outline" color="gray" size="sm" class="w-full sm:w-auto">
                    Filtreleri Temizle
                </UButton>
            </div>
        </div>

        <!-- Questions & Answers List -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div class="p-4 lg:p-6">
                <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Sorular ve Cevaplar</h2>

                <!-- Loading -->
                <div v-if="loading && !hasData" class="space-y-4">
                    <div v-for="i in 5" :key="i" class="animate-pulse">
                        <div class="flex space-x-4 p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg">
                            <div
                                class="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-200 dark:bg-neutral-600 rounded-full flex-shrink-0">
                            </div>
                            <div class="flex-1 space-y-2">
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-1/4"></div>
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-3/4"></div>
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Questions & Answers -->
                <div v-else-if="hasData" class="space-y-6">
                    <div v-for="item in items" :key="`${item.type}-${item.id}`"
                        class="border border-neutral-200 dark:border-neutral-600 rounded-lg p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">

                        <!-- Item Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-3 min-w-0 flex-1">
                                <!-- User Avatar -->
                                <div
                                    class="w-10 min-w-10 h-10 min-h-10 sm:w-12 sm:min-w-12 sm:h-12 sm:min-h-12 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                                    {{ getInitials(item.user_display_name) }}
                                </div>

                                <!-- User & Product Info -->
                                <div class="min-w-0 flex-1">
                                    <div class="mb-1">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <h3
                                                class="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base truncate">
                                                {{ item.user_display_name }}
                                            </h3>
                                            <UBadge :color="item.type === 'question' ? 'blue' : 'green'" variant="soft"
                                                size="xs">
                                                {{ item.type === 'question' ? 'Soru' : 'Cevap' }}
                                            </UBadge>
                                            <UBadge v-if="item.is_vendor_answer" color="purple" variant="soft"
                                                size="xs">
                                                Satıcı Cevabı
                                            </UBadge>
                                            <UBadge :color="getStatusColor(item.status)" variant="soft" size="xs">
                                                {{ getStatusLabel(item.status) }}
                                            </UBadge>
                                        </div>
                                    </div>
                                    <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                                        {{ item.product_name }}
                                    </p>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                        {{ formatDate(item.created_at) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Actions Menu -->
                            <UDropdown :items="getActionItems(item)" class="flex-shrink-0">
                                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal"
                                    size="sm" />
                            </UDropdown>
                        </div>

                        <!-- Content -->
                        <div class="mb-4">
                            <p class="text-neutral-900 dark:text-white text-sm sm:text-base leading-relaxed">
                                {{ item.type === 'question' ? item.question : item.answer }}
                            </p>
                        </div>

                        <!-- Question additional info -->
                        <div v-if="item.type === 'question'"
                            class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <div class="flex items-center space-x-4">
                                <span>{{ item.helpful_count || 0 }} yararlı</span>
                                <span>{{ item.answer_count || 0 }} cevap</span>
                            </div>
                        </div>

                        <!-- Answer additional info -->
                        <div v-else
                            class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <div class="flex items-center space-x-4">
                                <span>{{ item.helpful_count || 0 }} yararlı</span>
                                <span>{{ item.not_helpful_count || 0 }} yararlı değil</span>
                            </div>
                            <span v-if="item.question_text" class="text-xs text-neutral-400 italic">
                                Soru: {{ item.question_text.substring(0, 50) }}...
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-12">
                    <UIcon name="i-heroicons-question-mark-circle" class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        Henüz soru veya cevap yok
                    </h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        Müşteriler soru sormaya başladığında burada görünecekler.
                    </p>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="pagination.last_page > 1"
                class="px-4 lg:px-6 py-3 border-t border-neutral-200 dark:border-neutral-600">
                <UPagination v-model="currentPage" :page-count="pagination.per_page" :total="pagination.total" />
            </div>
        </div>
    </div>
</template>

<script setup>
// Layout
definePageMeta({
    layout: 'admin',
})

const toast = useToast()

// Breadcrumb
const breadcrumbLinks = [
    { label: 'Yönetim', to: '/management' },
    { label: 'Soru & Cevap Yönetimi', to: '/management/sorular' }
]

// State
const loading = ref(false)
const currentPage = ref(1)
const items = ref([])
const statistics = ref({
    total_questions: 0,
    pending_questions: 0,
    total_answers: 0,
    pending_answers: 0
})
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
})

// Filters
const filters = ref({
    type: 'all',
    status: 'all',
    sort: 'recent',
    search: ''
})

const typeOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Sorular', value: 'questions' },
    { label: 'Cevaplar', value: 'answers' }
]

const statusOptions = [
    { label: 'Tüm Durumlar', value: 'all' },
    { label: 'Bekleyen', value: 'pending' },
    { label: 'Onaylanan', value: 'approved' },
    { label: 'Reddedilen', value: 'rejected' }
]

const sortOptions = [
    { label: 'En Yeni', value: 'recent' },
    { label: 'En Eski', value: 'oldest' },
    { label: 'En Yararlı', value: 'helpful' }
]

// Computed
const hasData = computed(() => items.value && items.value.length > 0)

// Methods
const fetchData = async () => {
    loading.value = true
    try {
        const params = {
            page: currentPage.value,
            type: filters.value.type !== 'all' ? filters.value.type : undefined,
            status: filters.value.status !== 'all' ? filters.value.status : undefined,
            sort: filters.value.sort,
            search: filters.value.search || undefined
        }

        const data = await useBaseOFetchWithAuth('admin/questions', { params })

        if (data.success) {
            items.value = data.data.data
            pagination.value = {
                current_page: data.data.current_page,
                last_page: data.data.last_page,
                per_page: data.data.per_page,
                total: data.data.total
            }
        }
    } catch (error) {
        console.error('Veriler yüklenirken hata:', error)
        toast.add({
            title: 'Hata',
            description: 'Veriler yüklenirken bir hata oluştu',
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}

const fetchStatistics = async () => {
    try {
        const data = await useBaseOFetchWithAuth('admin/questions/statistics')
        if (data.success) {
            statistics.value = data.data
        }
    } catch (error) {
        console.error('İstatistikler yüklenirken hata:', error)
    }
}

const refreshData = async () => {
    await Promise.all([fetchData(), fetchStatistics()])
}

const resetFilters = () => {
    filters.value = {
        type: 'all',
        status: 'all',
        sort: 'recent',
        search: ''
    }
    currentPage.value = 1
}

const approveItem = async (item) => {
    try {
        const endpoint = item.type === 'question'
            ? `admin/questions/${item.id}/approve`
            : `admin/answers/${item.id}/approve`

        const data = await useBaseOFetchWithAuth(endpoint, { method: 'POST' })

        if (data.success) {
            toast.add({
                title: 'Başarılı',
                description: `${item.type === 'question' ? 'Soru' : 'Cevap'} onaylandı`,
                color: 'green'
            })
            await refreshData()
        }
    } catch (error) {
        toast.add({
            title: 'Hata',
            description: 'İşlem gerçekleştirilemedi',
            color: 'red'
        })
    }
}

const rejectItem = async (item) => {
    try {
        const endpoint = item.type === 'question'
            ? `admin/questions/${item.id}/reject`
            : `admin/answers/${item.id}/reject`

        const data = await useBaseOFetchWithAuth(endpoint, { method: 'POST' })

        if (data.success) {
            toast.add({
                title: 'Başarılı',
                description: `${item.type === 'question' ? 'Soru' : 'Cevap'} reddedildi`,
                color: 'green'
            })
            await refreshData()
        }
    } catch (error) {
        toast.add({
            title: 'Hata',
            description: 'İşlem gerçekleştirilemedi',
            color: 'red'
        })
    }
}

// Helper functions
const getInitials = (name) => {
    if (!name) return 'A'
    return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

const getStatusColor = (status) => {
    switch (status) {
        case 'approved': return 'green'
        case 'rejected': return 'red'
        case 'pending': return 'yellow'
        default: return 'gray'
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case 'approved': return 'Onaylandı'
        case 'rejected': return 'Reddedildi'
        case 'pending': return 'Bekliyor'
        default: return 'Bilinmiyor'
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getActionItems = (item) => {
    const actions = []

    if (item.status === 'pending') {
        actions.push([
            {
                label: 'Onayla',
                icon: 'i-heroicons-check',
                color: 'green',
                click: () => approveItem(item)
            },
            {
                label: 'Reddet',
                icon: 'i-heroicons-x-mark',
                color: 'red',
                click: () => rejectItem(item)
            }
        ])
    }

    if (item.status === 'approved') {
        actions.push([
            {
                label: 'Reddet',
                icon: 'i-heroicons-x-mark',
                color: 'red',
                click: () => rejectItem(item)
            }
        ])
    }

    if (item.status === 'rejected') {
        actions.push([
            {
                label: 'Onayla',
                icon: 'i-heroicons-check',
                color: 'green',
                click: () => approveItem(item)
            }
        ])
    }

    return actions
}

// Watchers
watch(() => filters.value, () => {
    currentPage.value = 1
    fetchData()
}, { deep: true })

watch(() => currentPage.value, fetchData)

// Debounced search
let searchTimeout
const debouncedSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        currentPage.value = 1
        fetchData()
    }, 500)
}

watch(() => filters.value.search, debouncedSearch)

// Initialize
onMounted(async () => {
    await refreshData()
})
</script>