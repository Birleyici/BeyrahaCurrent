<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Yorum Yönetimi</h1>
                <p class="text-neutral-600 dark:text-neutral-400 mt-1">
                    Müşteri yorumlarını inceleyin, onaylayın veya reddedin
                </p>
            </div>

            <!-- Refresh Button -->
            <UButton @click="refreshData" :loading="loading" color="gray" variant="outline"
                icon="i-heroicons-arrow-path">
                Yenile
            </UButton>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Yorum</p>
                        <p class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{{ statistics.total }}</p>
                    </div>
                    <div class="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-full">
                        <UIcon name="i-heroicons-chat-bubble-left-right"
                            class="w-8 h-8 text-accent-600 dark:text-accent-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bekleyen</p>
                        <p class="text-3xl font-bold text-warning-600 dark:text-warning-400 mt-2">{{ statistics.pending
                            }}</p>
                    </div>
                    <div class="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-full">
                        <UIcon name="i-heroicons-clock" class="w-8 h-8 text-warning-600 dark:text-warning-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Onaylanan</p>
                        <p class="text-3xl font-bold text-success-600 dark:text-success-400 mt-2">{{ statistics.approved
                            }}</p>
                    </div>
                    <div class="p-3 bg-success-50 dark:bg-success-900/20 rounded-full">
                        <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-success-600 dark:text-success-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Reddedilen</p>
                        <p class="text-3xl font-bold text-error-600 dark:text-error-400 mt-2">{{ statistics.rejected }}
                        </p>
                    </div>
                    <div class="p-3 bg-error-50 dark:bg-error-900/20 rounded-full">
                        <UIcon name="i-heroicons-x-circle" class="w-8 h-8 text-error-600 dark:text-error-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Status Filter -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Durum</label>
                    <USelectMenu v-model="filters.status" :options="statusOptions" option-attribute="label"
                        value-attribute="value" placeholder="Tüm Durumlar" />
                </div>

                <!-- Rating Filter -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Puan</label>
                    <USelectMenu v-model="filters.rating" :options="ratingOptions" option-attribute="label"
                        value-attribute="value" placeholder="Tüm Puanlar" />
                </div>

                <!-- Sort Filter -->
                <div>
                    <label
                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Sıralama</label>
                    <USelectMenu v-model="filters.sort" :options="sortOptions" option-attribute="label"
                        value-attribute="value" />
                </div>

                <!-- Search -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Arama</label>
                    <UInput v-model="filters.search" placeholder="Kullanıcı, ürün veya yorum ara..."
                        icon="i-heroicons-magnifying-glass" />
                </div>
            </div>

            <div class="flex justify-between items-center mt-4">
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ pagination.total }} yorum bulundu
                </div>
                <UButton @click="resetFilters" variant="outline" color="gray" size="sm">
                    Filtreleri Temizle
                </UButton>
            </div>
        </div>

        <!-- Reviews List -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div class="p-6">
                <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Yorumlar</h2>

                <!-- Loading -->
                <div v-if="loading && !hasReviews" class="space-y-4">
                    <div v-for="i in 5" :key="i" class="animate-pulse">
                        <div class="flex space-x-4 p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg">
                            <div class="w-12 h-12 bg-neutral-200 dark:bg-neutral-600 rounded-full"></div>
                            <div class="flex-1 space-y-2">
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-1/4"></div>
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-3/4"></div>
                                <div class="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Reviews -->
                <div v-else-if="hasReviews" class="space-y-4">
                    <div v-for="review in reviews" :key="review.id"
                        class="border border-neutral-200 dark:border-neutral-600 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">

                        <!-- Review Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-4">
                                <!-- User Avatar -->
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {{ getInitials(review.user?.name || 'A') }}
                                </div>

                                <!-- User & Product Info -->
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h3 class="font-semibold text-neutral-900 dark:text-white">
                                            {{ review.user?.name || 'Anonim Kullanıcı' }}
                                        </h3>
                                        <UBadge v-if="review.is_verified_purchase" color="success" variant="soft"
                                            size="xs">
                                            Doğrulanmış
                                        </UBadge>
                                        <UBadge :color="getStatusColor(review.status)" variant="soft" size="xs">
                                            {{ getStatusLabel(review.status) }}
                                        </UBadge>
                                    </div>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                        {{ review.product?.name }} • {{ formatDate(review.created_at) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Actions Menu -->
                            <UDropdown :items="getActionItems(review)">
                                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal"
                                    size="sm" />
                            </UDropdown>
                        </div>

                        <!-- Rating -->
                        <div class="flex items-center space-x-1 mb-3">
                            <UIcon v-for="star in 5" :key="star" name="i-heroicons-star-solid"
                                :class="star <= review.rating ? 'text-warning-400' : 'text-neutral-300 dark:text-neutral-600'"
                                class="w-4 h-4" />
                        </div>

                        <!-- Comment -->
                        <div class="prose prose-sm dark:prose-invert max-w-none mb-4">
                            <p class="text-neutral-700 dark:text-neutral-300">{{ review.comment }}</p>
                        </div>

                        <!-- Images -->
                        <div v-if="review.images && review.images.length > 0" class="grid grid-cols-4 gap-2 mb-4">
                            <div v-for="image in review.images" :key="image.id" class="relative">
                                <NuxtImg :src="`cl/${image.path}`" :alt="'Review image'"
                                    class="w-full h-20 object-cover rounded-lg border border-neutral-200 dark:border-neutral-600"
                                    width="80" height="80" />
                            </div>
                        </div>

                        <!-- Vendor Reply -->
                        <div v-if="review.vendor_reply"
                            class="mt-4 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg border-l-4 border-accent-400">
                            <div class="flex items-start space-x-3">
                                <UIcon name="i-heroicons-building-storefront" class="w-5 h-5 text-accent-600 mt-0.5" />
                                <div>
                                    <p class="font-semibold text-accent-700 dark:text-accent-300 text-sm">Satıcı Yanıtı
                                    </p>
                                    <p class="text-neutral-700 dark:text-neutral-300 text-sm mt-1">{{
                                        review.vendor_reply }}
                                    </p>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                        {{ formatDate(review.vendor_replied_at) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Helpful Votes -->
                        <div
                            class="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-600">
                            <div class="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <div class="flex items-center space-x-1">
                                    <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4" />
                                    <span>{{ review.helpful_count || 0 }}</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <UIcon name="i-heroicons-hand-thumb-down" class="w-4 h-4" />
                                    <span>{{ review.not_helpful_count || 0 }}</span>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-2">
                                <UButton v-if="review.status === 'pending'" @click="approveReview(review.id)"
                                    color="success" variant="outline" size="xs">
                                    <UIcon name="i-heroicons-check" class="w-4 h-4 mr-1" />
                                    Onayla
                                </UButton>
                                <UButton v-if="review.status === 'pending'" @click="showRejectModal(review)"
                                    color="error" variant="outline" size="xs">
                                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
                                    Reddet
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-12">
                    <UIcon name="i-heroicons-chat-bubble-left-right" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">Yorum bulunamadı</h3>
                    <p class="text-neutral-600 dark:text-neutral-400">Arama kriterlerinizi değiştirmeyi deneyin</p>
                </div>

                <!-- Load More -->
                <div v-if="canLoadMore"
                    class="text-center pt-6 border-t border-neutral-200 dark:border-neutral-600 mt-6">
                    <UButton @click="loadMore" variant="outline" color="gray" :loading="loading">
                        Daha Fazla Yükle
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Reject Modal -->
        <UModal v-model="showRejectModalState">
            <div class="p-6">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Yorumu Reddet</h3>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Reddetme Sebebi (İsteğe bağlı)
                    </label>
                    <UTextarea v-model="rejectReason" placeholder="Yorumun neden reddedildiğini açıklayın..." :rows="4"
                        :maxlength="500" />
                </div>

                <div class="flex justify-end space-x-3">
                    <UButton @click="showRejectModalState = false" variant="outline" color="gray">
                        İptal
                    </UButton>
                    <UButton @click="confirmReject" color="error" :loading="rejectLoading">
                        Reddet
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup>
// Layout
definePageMeta({
    layout: 'admin'
})

// Composables
const {
    reviews,
    loading,
    pagination,
    statistics,
    filters,
    hasReviews,
    canLoadMore,
    fetchReviews,
    approveReview: approveReviewApi,
    rejectReview,
    deleteReview,
    updateFilters,
    loadMore,
    resetFilters,
    getStatusLabel,
    getStatusColor
} = useAdminReviews()

const toast = useToast()

// Local state
const showRejectModalState = ref(false)
const rejectReason = ref('')
const rejectLoading = ref(false)
const selectedReview = ref(null)

// Filter options
const statusOptions = [
    { label: 'Tüm Durumlar', value: '' },
    { label: 'Beklemede', value: 'pending' },
    { label: 'Onaylandı', value: 'approved' },
    { label: 'Reddedildi', value: 'rejected' }
]

const ratingOptions = [
    { label: 'Tüm Puanlar', value: null },
    { label: '5 Yıldız', value: 5 },
    { label: '4 Yıldız', value: 4 },
    { label: '3 Yıldız', value: 3 },
    { label: '2 Yıldız', value: 2 },
    { label: '1 Yıldız', value: 1 }
]

const sortOptions = [
    { label: 'En Yeni', value: 'recent' },
    { label: 'En Yüksek Puan', value: 'rating_high' },
    { label: 'En Düşük Puan', value: 'rating_low' },
    { label: 'En Yararlı', value: 'helpful' }
]

// Methods
const refreshData = async () => {
    await fetchReviews(1)
}

const approveReview = async (reviewId) => {
    try {
        await approveReviewApi(reviewId)
        toast.add({
            title: 'Yorum onaylandı',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: error.message || 'Yorum onaylanamadı',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
}

const showRejectModal = (review) => {
    selectedReview.value = review
    rejectReason.value = ''
    showRejectModalState.value = true
}

const confirmReject = async () => {
    if (!selectedReview.value) return

    rejectLoading.value = true

    try {
        await rejectReview(selectedReview.value.id, rejectReason.value.trim() || null)

        toast.add({
            title: 'Yorum reddedildi',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })

        showRejectModalState.value = false
        selectedReview.value = null
        rejectReason.value = ''
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: error.message || 'Yorum reddedilemedi',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    } finally {
        rejectLoading.value = false
    }
}

const deleteReviewConfirm = async (reviewId) => {
    if (!confirm('Bu yorumu kalıcı olarak silmek istediğinize emin misiniz?')) return

    try {
        await deleteReview(reviewId)
        toast.add({
            title: 'Yorum silindi',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: error.message || 'Yorum silinemedi',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
}

const getActionItems = (review) => {
    const items = []

    if (review.status === 'pending') {
        items.push([
            {
                label: 'Onayla',
                icon: 'i-heroicons-check',
                click: () => approveReview(review.id)
            },
            {
                label: 'Reddet',
                icon: 'i-heroicons-x-mark',
                click: () => showRejectModal(review)
            }
        ])
    }

    items.push([
        {
            label: 'Sil',
            icon: 'i-heroicons-trash',
            click: () => deleteReviewConfirm(review.id)
        }
    ])

    return items
}

const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Watch filters
watch(filters, () => {
    fetchReviews(1)
}, { deep: true })

// Initialize
onMounted(async () => {
    try {
        await fetchReviews(1)
    } catch (error) {
        console.error('Failed to load reviews:', error)
        toast.add({
            title: 'Yorumlar yüklenemedi',
            description: 'Lütfen sayfayı yenileyin',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
})
</script>