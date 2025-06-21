<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <!-- Page Header -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Ürün Yorumları Sistemi Demo
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400">
                        Modern, kullanıcı dostu yorum sistemi bileşenlerinin önizlemesi
                    </p>
                </div>

                <!-- Demo Product Card -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <div class="flex items-center space-x-4 mb-6">
                        <div
                            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <UIcon name="i-heroicons-device-phone-mobile" class="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">iPhone 15 Pro Max</h2>
                            <p class="text-gray-600 dark:text-gray-400">Demo ürün - Yorum sistemi testi</p>
                            <div class="flex items-center space-x-2 mt-2">
                                <div class="flex items-center">
                                    <UIcon v-for="star in 5" :key="star" name="i-heroicons-star-solid"
                                        :class="star <= 4 ? 'text-yellow-400' : 'text-gray-300'" class="w-4 h-4" />
                                </div>
                                <span class="text-sm text-gray-600 dark:text-gray-400">(4.2 - 156 değerlendirme)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Reviews Section with Mock Data -->
                <div class="space-y-8">
                    <!-- Summary Component -->
                    <ProductReviewsSummary :stats="mockStats" />

                    <!-- Filters Component -->
                    <ProductReviewsFilters v-model:filters="filters" @update="handleFiltersUpdate" />

                    <!-- Sample Reviews -->
                    <div class="space-y-6">
                        <ProductReviewsItem v-for="review in mockReviews" :key="review.id" :review="review"
                            :can-vote="true" :can-reply="false" @vote="handleVote" />
                    </div>

                    <!-- Load More Button -->
                    <div class="text-center">
                        <UButton color="primary" variant="outline" size="lg">
                            Daha Fazla Yorum Yükle
                        </UButton>
                    </div>
                </div>

                <!-- Form Demo Button -->
                <div class="text-center mt-12">
                    <UButton @click="showReviewForm = true" color="primary" size="xl">
                        <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 mr-2" />
                        Yorum Yazma Formunu Test Et
                    </UButton>
                </div>

                <!-- Review Form Modal -->
                <ProductReviewsForm v-model:show="showReviewForm" :product="mockProduct"
                    @submitted="handleReviewSubmitted" />
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

// Local state
const showReviewForm = ref(false)
const filters = ref({
    rating: null,
    sort: 'recent',
    verified_only: false,
    with_images: false
})

// Mock data
const mockProduct = {
    id: 1,
    name: 'iPhone 15 Pro Max',
    coverImage: 'demo-product.jpg',
    can_user_review: true
}

const mockStats = {
    average_rating: 4.2,
    total_reviews: 156,
    rating_distribution: {
        5: 78,
        4: 45,
        3: 23,
        2: 7,
        1: 3
    }
}

const mockReviews = [
    {
        id: 1,
        user_name: 'Ahmet Yılmaz',
        rating: 5,
        comment: 'Mükemmel bir telefon! Kamera kalitesi gerçekten çok iyi, performans hızı da beklentilerimi aştı. Kesinlikle tavsiye ederim.',
        created_at: '2024-01-15T10:30:00Z',
        is_verified_purchase: true,
        helpful_count: 12,
        not_helpful_count: 1,
        user_vote: null,
        images: [
            { path: 'review-image-1.jpg' },
            { path: 'review-image-2.jpg' }
        ],
        vendor_reply: null,
        vendor_replied_at: null
    },
    {
        id: 2,
        user_name: 'Fatma Özkan',
        rating: 4,
        comment: 'Genel olarak memnunum. Batarya ömrü beklediğimden biraz daha kısa ama diğer özellikleri çok başarılı.',
        created_at: '2024-01-10T14:20:00Z',
        is_verified_purchase: true,
        helpful_count: 8,
        not_helpful_count: 2,
        user_vote: true,
        images: [],
        vendor_reply: 'Değerli yorumunuz için teşekkürler. Batarya performansı konusunda yardımcı olabiliriz.',
        vendor_replied_at: '2024-01-11T09:15:00Z'
    },
    {
        id: 3,
        user_name: 'Mehmet Demir',
        rating: 3,
        comment: 'Fiyatına göre ortalama bir ürün. Beklentilerim daha yüksekti açıkçası.',
        created_at: '2024-01-05T16:45:00Z',
        is_verified_purchase: false,
        helpful_count: 3,
        not_helpful_count: 8,
        user_vote: false,
        images: [],
        vendor_reply: null,
        vendor_replied_at: null
    }
]

// Methods
const handleFiltersUpdate = () => {
    console.log('Filters updated:', filters.value)
}

const handleVote = (reviewId, isHelpful) => {
    console.log('Vote:', reviewId, isHelpful)
    // Mock vote update
    const review = mockReviews.find(r => r.id === reviewId)
    if (review) {
        if (isHelpful) {
            review.helpful_count++
            review.user_vote = true
        } else {
            review.not_helpful_count++
            review.user_vote = false
        }
    }
}

const handleReviewSubmitted = () => {
    console.log('Review submitted!')
    showReviewForm.value = false
}

// SEO
useHead({
    title: 'Ürün Yorumları Sistemi Demo - Beyraha',
    meta: [
        { name: 'description', content: 'Modern ürün yorumları sistemi demo sayfası' }
    ]
})
</script>