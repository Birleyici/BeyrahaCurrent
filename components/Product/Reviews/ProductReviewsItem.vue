<template>
    <article
        class="bg-white dark:bg-neutral-800 rounded-none md:rounded-xl border-0 md:border border-neutral-200 dark:border-neutral-700 p-6 shadow-none md:shadow-soft hover:shadow-none md:hover:shadow-medium transition-all duration-300">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-4">
                <!-- User Avatar -->
                <div
                    class="w-12 min-w-12 h-12 min-h-12 bg-gradient-to-br from-secondary-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {{ getInitials(review.user_name) }}
                </div>

                <!-- User Info -->
                <div>
                    <div class="flex items-center space-x-2">
                        <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">
                            {{ maskedUserName }}
                        </h4>
                        <UBadge v-if="review.is_verified_purchase" color="success" variant="soft" size="xs">
                            <UIcon name="i-heroicons-check-circle" class="w-3 h-3 mr-1" />
                            Doğrulanmış Alım
                        </UBadge>
                    </div>

                    <!-- Rating & Date -->
                    <div class="flex items-center space-x-3 mt-1">
                        <div class="flex items-center space-x-1">
                            <UIcon v-for="star in 5" :key="star" name="i-heroicons-star-solid" :class="[
                                'w-4 h-4',
                                star <= review.rating
                                    ? 'text-warning-400'
                                    : 'text-neutral-300 dark:text-neutral-600'
                            ]" />
                        </div>
                        <span class="text-sm text-neutral-500 dark:text-neutral-400">
                            {{ formatDate(review.created_at) }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Options Menu -->
            <UDropdown v-if="showOptions" :items="optionsItems">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" size="sm" />
            </UDropdown>
        </div>

        <!-- Review Content -->
        <div class="space-y-4">
            <!-- Comment -->
            <div class="prose prose-sm dark:prose-invert max-w-none">
                <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {{ review.comment }}
                </p>
            </div>

            <!-- Images -->
            <div v-if="review.images && review.images.length > 0"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="(image, index) in review.images" :key="index" class="relative group cursor-pointer"
                    @click="openImageGallery(index)">
                    <NuxtImg :src="`cl/${image.path}`" :alt="`Review image ${index + 1}`"
                        class="w-full h-24 object-cover rounded-lg border border-neutral-200 dark:border-neutral-600 transition-transform duration-200 group-hover:scale-105"
                        width="120" height="96" />
                    <div
                        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200" />
                    <UIcon name="i-heroicons-magnifying-glass-plus"
                        class="absolute top-2 right-2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <!-- Helpful Votes -->
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-neutral-600 dark:text-neutral-400">Bu yorum yararlı mı?</span>

                    <div class="flex items-center space-x-1">
                        <UButton v-if="canVote" @click="handleVote(true)"
                            :color="review.user_vote === true ? 'success' : 'gray'"
                            :variant="review.user_vote === true ? 'solid' : 'ghost'" size="xs" :disabled="voteLoading">
                            <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4 mr-1" />
                            {{ review.helpful_count || 0 }}
                        </UButton>

                        <UButton v-if="canVote" @click="handleVote(false)"
                            :color="review.user_vote === false ? 'error' : 'gray'"
                            :variant="review.user_vote === false ? 'solid' : 'ghost'" size="xs" :disabled="voteLoading">
                            <UIcon name="i-heroicons-hand-thumb-down" class="w-4 h-4 mr-1" />
                            {{ review.not_helpful_count || 0 }}
                        </UButton>

                        <div v-if="!canVote && (review.helpful_count > 0 || review.not_helpful_count > 0)"
                            class="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <div class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4" />
                                <span>{{ review.helpful_count || 0 }}</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <UIcon name="i-heroicons-hand-thumb-down" class="w-4 h-4" />
                                <span>{{ review.not_helpful_count || 0 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reply Button -->
            <UButton v-if="canReply && !review.vendor_reply" @click="showReplyForm = true" color="secondary"
                variant="outline" size="xs">
                <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4 mr-1" />
                Yanıtla
            </UButton>
        </div>

        <!-- Vendor Reply -->
        <div v-if="review.vendor_reply"
            class="mt-4 p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg border-l-4 border-secondary-400">
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-heroicons-building-storefront" class="w-4 h-4 text-white" />
                </div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="font-semibold text-secondary-700 dark:text-secondary-300">Satıcı Yanıtı</span>
                        <span class="text-xs text-neutral-500 dark:text-neutral-400">
                            {{ formatDate(review.vendor_replied_at) }}
                        </span>
                    </div>
                    <p class="text-sm text-neutral-700 dark:text-neutral-300">
                        {{ review.vendor_reply }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Reply Form -->
        <div v-if="showReplyForm" class="mt-4 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <form @submit.prevent="handleReplySubmit" class="space-y-3">
                <UTextarea v-model="replyText" placeholder="Yoruma yanıtınızı yazın..." :rows="3" :maxlength="500" />
                <div class="flex justify-between items-center">
                    <span class="text-xs text-neutral-500 dark:text-neutral-400">
                        {{ replyText.length }}/500
                    </span>
                    <div class="flex space-x-2">
                        <UButton type="button" @click="cancelReply" color="gray" variant="outline" size="xs">
                            İptal
                        </UButton>
                        <UButton type="submit" color="secondary" size="xs" :loading="replyLoading"
                            :disabled="replyText.trim().length < 10">
                            Yanıtla
                        </UButton>
                    </div>
                </div>
            </form>
        </div>

        <!-- Image Gallery Modal -->
        <UModal v-model="showImageGallery" :ui="{ width: 'w-full sm:max-w-4xl' }">
            <div class="p-4">
                <div class="relative">
                    <NuxtImg v-if="currentImageIndex !== null && review.images[currentImageIndex]"
                        :src="`cl/${review.images[currentImageIndex].path}`"
                        :alt="`Review image ${currentImageIndex + 1}`"
                        class="w-full max-h-96 object-contain rounded-lg" />

                    <!-- Navigation -->
                    <div v-if="review.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                        <UButton @click="previousImage" color="white" variant="solid" icon="i-heroicons-chevron-left"
                            size="sm" class="ml-2" />
                    </div>

                    <div v-if="review.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                        <UButton @click="nextImage" color="white" variant="solid" icon="i-heroicons-chevron-right"
                            size="sm" class="mr-2" />
                    </div>
                </div>

                <!-- Image Counter -->
                <div v-if="review.images.length > 1" class="text-center mt-4">
                    <span class="text-sm text-neutral-600 dark:text-neutral-400">
                        {{ currentImageIndex + 1 }} / {{ review.images.length }}
                    </span>
                </div>
            </div>
        </UModal>
    </article>
</template>

<script setup>
const props = defineProps({
    review: {
        type: Object,
        required: true
    },
    canVote: {
        type: Boolean,
        default: false
    },
    canReply: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['vote', 'reply'])

// Local state
const voteLoading = ref(false)
const replyLoading = ref(false)
const showReplyForm = ref(false)
const replyText = ref('')
const showImageGallery = ref(false)
const currentImageIndex = ref(null)

// Computed
const maskedUserName = computed(() => {
    // review.user?.name verisini kullan, yoksa user_name'i kullan
    const name = props.review.user?.name || props.review.user_name

    if (!name) return 'Anonim Kullanıcı'

    const words = name.trim().split(' ').filter(word => word.length > 0)

    if (words.length === 0) return 'Anonim Kullanıcı'

    if (words.length === 1) {
        // Tek kelime ise: "Mehmet" -> "M****"
        const word = words[0]
        return word.length <= 2 ? word : word[0] + '*'.repeat(word.length - 1)
    } else {
        // Çok kelime ise: "Mehmet Çelik" -> "M**** Ç***"
        return words.map(word => {
            return word.length <= 2 ? word : word[0] + '*'.repeat(word.length - 1)
        }).join(' ')
    }
})

const showOptions = computed(() => {
    // Admin veya moderatör için seçenekler göster
    return false // Şimdilik kapalı
})

const optionsItems = computed(() => [
    [{
        label: 'Yorumu Bildir',
        icon: 'i-heroicons-flag',
        click: () => reportReview()
    }]
])

// Methods
const getInitials = (name) => {
    // review.user?.name verisini kullan, yoksa user_name'i kullan
    const fullName = props.review.user?.name || props.review.user_name

    if (!fullName) return '?'

    const words = fullName.trim().split(' ').filter(word => word.length > 0)

    if (words.length === 0) return '?'

    if (words.length === 1) {
        return words[0][0].toUpperCase()
    }

    // İlk ve son kelimenin baş harfleri
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

const formatDate = (dateString) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
        return 'Bugün'
    } else if (diffInDays === 1) {
        return 'Dün'
    } else if (diffInDays < 7) {
        return `${diffInDays} gün önce`
    } else {
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
}

const handleVote = async (isHelpful) => {
    if (voteLoading.value) return

    voteLoading.value = true

    try {
        emit('vote', props.review.id, isHelpful)
    } finally {
        voteLoading.value = false
    }
}

const handleReplySubmit = async () => {
    if (replyText.value.trim().length < 10) return

    replyLoading.value = true

    try {
        emit('reply', props.review.id, replyText.value.trim())
        showReplyForm.value = false
        replyText.value = ''
    } finally {
        replyLoading.value = false
    }
}

const cancelReply = () => {
    showReplyForm.value = false
    replyText.value = ''
}

const openImageGallery = (index) => {
    currentImageIndex.value = index
    showImageGallery.value = true
}

const previousImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    } else {
        currentImageIndex.value = props.review.images.length - 1
    }
}

const nextImage = () => {
    if (currentImageIndex.value < props.review.images.length - 1) {
        currentImageIndex.value++
    } else {
        currentImageIndex.value = 0
    }
}

const reportReview = () => {
    // Yorum bildirme işlevi
    console.log('Review reported:', props.review.id)
}
</script>