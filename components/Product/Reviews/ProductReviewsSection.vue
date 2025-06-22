<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div class="container mx-auto px-4 py-8 lg:py-12">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Müşteri Yorumları
                </h2>

                <ClientOnly>
                    <UButton v-if="canWriteReview" @click="showReviewForm = true" color="secondary" variant="solid"
                        size="lg" class="hidden lg:flex">
                        <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 mr-2" />
                        Yorum Yaz
                    </UButton>
                </ClientOnly>
            </div>

            <!-- Review Summary -->
            <ProductReviewsSummary :stats="reviewStats" :loading="loading" class="mb-8" />

            <!-- Filters -->
            <ProductReviewsFilters v-if="reviewStats.total_reviews > 2" v-model:filters="filters"
                @update="handleFiltersUpdate" class="mb-6" />

            <!-- Reviews List -->
            <div class="space-y-6">
                <ProductReviewsItem v-for="review in reviews" :key="review.id" :review="review"
                    :can-vote="canVoteReview(review)" :can-reply="canReplyToReview(review)" @vote="handleVote"
                    @reply="handleVendorReply" />

                <!-- Empty State -->
                <div v-if="!loading && !hasReviews" class="text-center py-12">
                    <div class="w-24 h-24 mx-auto mb-4 text-neutral-300 dark:text-neutral-600">
                        <UIcon name="i-heroicons-star" class="w-full h-full" />
                    </div>
                    <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        Henüz yorum yok
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400 mb-6">
                        Bu ürün için ilk yorumu siz yazın!
                    </p>

                    <!-- Client-side only content to prevent hydration mismatch -->
                    <ClientOnly>
                        <!-- Authenticated User -->
                        <UButton v-if="canWriteReview" @click="showReviewForm = true" color="secondary" variant="solid">
                            İlk Yorumu Yaz
                        </UButton>

                        <!-- Unauthenticated User -->
                        <div v-else-if="!isAuthenticated" class="space-y-4">
                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                Yorum yazabilmek için giriş yapmanız gerekiyor
                            </p>
                            <div class="flex items-center justify-center gap-4">
                                <UButton @click="showAuthModal = true" color="secondary" variant="solid">
                                    <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
                                    Giriş Yap
                                </UButton>
                            </div>
                        </div>

                        <!-- Authenticated but can't review -->
                        <div v-else class="space-y-2">
                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                Bu ürüne yorum yapamazsınız
                            </p>
                            <p class="text-xs text-neutral-400 dark:text-neutral-500">
                                Sadece satın aldığınız ürünlere yorum yapabilirsiniz
                            </p>
                        </div>

                        <template #fallback>
                            <!-- Loading placeholder for hydration -->
                            <div class="animate-pulse">
                                <div class="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-32 mx-auto"></div>
                            </div>
                        </template>
                    </ClientOnly>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="space-y-6">
                    <ProductReviewsSkeleton v-for="i in 3" :key="i" />
                </div>

                <!-- Load More -->
                <div v-if="canLoadMore" class="text-center pt-6">
                    <UButton @click="handleLoadMore" variant="outline" color="gray" size="lg" :loading="loading">
                        Daha Fazla Yorum Yükle
                    </UButton>
                </div>
            </div>

            <!-- Mobile Write Review Button -->
            <ClientOnly>
                <div class="fixed bottom-6 right-6 lg:hidden">
                    <UButton v-if="canWriteReview" @click="showReviewForm = true" color="secondary" variant="solid"
                        size="xl" class="rounded-full shadow-lg">
                        <UIcon name="i-heroicons-pencil-square" class="w-6 h-6" />
                    </UButton>
                </div>
            </ClientOnly>
        </div>

        <!-- Review Form Modal -->
        <ProductReviewsForm v-model:show="showReviewForm" :product="product" @submitted="handleReviewSubmitted" />

        <!-- Auth Modal -->
        <PartialsModalAuthModal v-model:show="showAuthModal" @auth-success="handleAuthSuccess" />
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

// Auth store'u kullan
const authStore = useAuthStore()
const toast = useToast()

// Hydration-safe auth state
const isAuthenticated = ref(false)
const isClient = ref(false)

// Composables
const {
    reviews,
    reviewStats,
    loading,
    pagination,
    filters,
    hasReviews,
    fetchReviews,
    voteReview,
    addVendorReply,
    updateFilters,
    loadMore,
    checkCanUserReview
} = useProductReviews()

// Local state
const showReviewForm = ref(false)
const showAuthModal = ref(false)
const canUserReview = ref(false)

// Computed
const canWriteReview = computed(() => {
    return isAuthenticated.value && canUserReview.value
})

const canLoadMore = computed(() => {
    return pagination.value.current_page < pagination.value.last_page
})

const canReplyToReview = (review) => {
    if (!isAuthenticated.value || !authStore.currentUser) return false

    // Vendor can reply to reviews of their products
    const isVendor = authStore.currentUser.vendor && authStore.currentUser.vendor.id === props.product.vendor_id
    return isVendor && review.can_reply
}

const canVoteReview = (review) => {
    if (!isAuthenticated.value || !authStore.currentUser) return false

    // Kullanıcı kendi yorumuna oy veremez
    return review.user_id !== authStore.currentUser.id
}

// Methods
const handleFiltersUpdate = async () => {
    await fetchReviews(props.product.id, { page: 1 })
}

const handleVote = async (reviewId, isHelpful) => {
    try {
        await voteReview(reviewId, isHelpful)
        toast.add({
            title: 'Oyunuz kaydedildi',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })
    } catch (error) {
        let errorMessage = 'Oy verilemedi'

        // 403 hatası için özel mesaj
        if (error.response?.status === 403) {
            errorMessage = 'Kendi yorumunuza oy veremezsiniz'
        } else if (error.message) {
            errorMessage = error.message
        }

        toast.add({
            title: 'Bir hata oluştu',
            description: errorMessage,
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
}

const handleVendorReply = async (reviewId, reply) => {
    try {
        await addVendorReply(reviewId, reply)
        toast.add({
            title: 'Yanıtınız eklendi',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: error.message || 'Yanıt eklenemedi',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
}

const handleLoadMore = async () => {
    try {
        await loadMore(props.product.id)
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: 'Yorumlar yüklenemedi',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
}

const handleReviewSubmitted = async () => {
    showReviewForm.value = false
    await fetchReviews(props.product.id, { page: 1 })

    toast.add({
        title: 'Yorumunuz gönderildi',
        description: 'Moderasyon sonrası yayınlanacaktır',
        color: 'green',
        icon: 'i-heroicons-check-circle'
    })
}

const handleAuthSuccess = async () => {
    // Auth başarılı olduktan sonra can review check yap
    canUserReview.value = await checkCanUserReview(props.product.id)

    toast.add({
        title: 'Giriş başarılı!',
        description: 'Artık yorum yazabilirsiniz',
        color: 'green',
        icon: 'i-heroicons-check-circle'
    })
}

// Watch auth changes
watch(isAuthenticated, async (newValue) => {
    if (newValue) {
        canUserReview.value = await checkCanUserReview(props.product.id)
    } else {
        canUserReview.value = false
    }
})

// Initialize
onMounted(async () => {
    try {
        // Client-side flag'ini set et
        isClient.value = true

        // Auth durumunu kontrol et
        isAuthenticated.value = !!authStore.token

        // Token varsa ama user bilgisi yoksa, user bilgisini getir
        if (authStore.token && !authStore.currentUser) {
            await authStore.fetchUser()
        }

        // Kullanıcı giriş yapmışsa can review check yap
        if (isAuthenticated.value) {
            canUserReview.value = await checkCanUserReview(props.product.id)
        }

        await fetchReviews(props.product.id)
    } catch (error) {
        console.error('ProductReviewsSection mount error:', error)
        toast.add({
            title: 'Yorumlar yüklenemedi',
            description: error.message || 'Bir hata oluştu',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
})
</script>