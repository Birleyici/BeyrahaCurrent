<template>
    <div
        class="bg-white dark:bg-neutral-800 rounded-none md:rounded-xl border-0 md:border border-neutral-200 dark:border-neutral-700 p-4 md:p-6 shadow-none md:shadow-sm transition-colors duration-300">
        <!-- Başlık -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <UIcon name="i-heroicons-question-mark-circle" class="w-6 h-6 text-secondary-600" />
                <span>Sorular ve Cevaplar</span>
                <span v-if="questionsData?.total" class="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                    ({{ questionsData.total }})
                </span>
            </h2>

            <!-- Soru Sor Butonu -->
            <ClientOnly>
                <UButton @click="showQuestionForm = true" color="secondary" variant="outline" size="sm"
                    icon="i-heroicons-plus" :disabled="!isAuthenticated" class="shrink-0">
                    Soru Sor
                </UButton>

                <template #fallback>
                    <div class="animate-pulse">
                        <div class="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
                    </div>
                </template>
            </ClientOnly>
        </div>

        <!-- Giriş Yapmadan Soru Sorma Uyarısı -->
        <ClientOnly>
            <div v-if="!isAuthenticated"
                class="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div class="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
                    <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                    <span class="text-sm">Soru sormak için giriş yapmanız gerekiyor.</span>
                </div>
            </div>
        </ClientOnly>

        <!-- Soru Formu Modal -->
        <ProductQAQuestionForm v-if="showQuestionForm" :product="product" @close="showQuestionForm = false"
            @question-submitted="handleQuestionSubmitted" />

        <!-- Filtreleme ve Sıralama -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <div class="flex gap-2">
                <USelect v-model="filters.filter" :options="filterOptions" size="sm" class="min-w-32" by="value" />
                <USelect v-model="filters.sort_by" :options="sortOptions" size="sm" class="min-w-32" by="value" />
            </div>

            <!-- İstatistikler -->
            <div class="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400 sm:ml-auto">
                <span v-if="questionsData?.total">
                    {{ questionsData.total }} soru
                </span>
                <span v-if="answeredCount">
                    {{ answeredCount }} cevaplanmış
                </span>
            </div>
        </div>

        <!-- Sorular Listesi -->
        <div class="space-y-6">
            <div v-if="pending" class="space-y-4">
                <!-- Skeleton Loader -->
                <div v-for="i in 3" :key="i" class="animate-pulse">
                    <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4"></div>
                    <div class="h-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
            </div>

            <div v-else-if="questionsData?.data?.length" class="space-y-6">
                <ProductQAQuestionItem v-for="question in questionsData.data" :key="question.id" :question="question"
                    :product="product" @answer-submitted="handleAnswerSubmitted" />

                <!-- Sayfalama -->
                <div v-if="questionsData.last_page > 1" class="mt-8 flex justify-center">
                    <UPagination v-model="currentPage" :page-count="questionsData.per_page" :total="questionsData.total"
                        :max="5" show-last show-first />
                </div>
            </div>

            <div v-else class="text-center py-12">
                <UIcon name="i-heroicons-question-mark-circle" class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Henüz soru sorulmamış
                </h4>
                <p class="text-neutral-500 dark:text-neutral-400 mb-4">
                    Bu ürün hakkında ilk soruyu siz sorun!
                </p>
                <ClientOnly>
                    <UButton @click="showQuestionForm = true" color="secondary" variant="solid"
                        :disabled="!isAuthenticated">
                        İlk Soruyu Sor
                    </UButton>

                    <template #fallback>
                        <div class="animate-pulse">
                            <div class="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mx-auto"></div>
                        </div>
                    </template>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const authStore = useAuthStore()

// Hydration-safe auth state
const isAuthenticated = ref(false)
const isClient = ref(false)

// Reactive state
const showQuestionForm = ref(false)
const currentPage = ref(1)
const questionsData = ref(null)
const pending = ref(false)

// Filtreleme ve sıralama
const filters = ref({
    filter: 'all',
    sort_by: 'helpful'
})

const filterOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Cevaplanmış', value: 'answered' },
    { label: 'Cevaplanmamış', value: 'unanswered' }
]

const sortOptions = [
    { label: 'En Yeni', value: 'recent' },
    { label: 'En Yararlı', value: 'helpful' }
]

// Computed
const answeredCount = computed(() => {
    if (!questionsData.value?.data) return 0
    return questionsData.value.data.filter(q => q.answer_count > 0).length
})

// Methods
const fetchQuestions = async () => {
    if (!props.product?.id) return

    pending.value = true
    try {
        const data = await useBaseOFetch(`products/${props.product.id}/questions`, {
            params: {
                page: currentPage.value,
                filter: filters.value.filter !== 'all' ? filters.value.filter : undefined,
                sort_by: filters.value.sort_by
            }
        })

        if (data.success) {
            questionsData.value = data.data
        }
    } catch (error) {
        console.error('Sorular yüklenirken hata:', error)
    } finally {
        pending.value = false
    }
}

const handleQuestionSubmitted = () => {
    showQuestionForm.value = false
    // İlk sayfaya dön ve soruları yenile
    currentPage.value = 1
    fetchQuestions()
}

const handleAnswerSubmitted = () => {
    // Soruları yenile
    fetchQuestions()
}

// Watchers
watch(() => filters.value, () => {
    currentPage.value = 1
    fetchQuestions()
}, { deep: true })

watch(() => currentPage.value, fetchQuestions)

// Auth watchers
watch(() => authStore.token, (newToken) => {
    isAuthenticated.value = !!newToken
})

watch(() => authStore.currentUser, (newUser) => {
    isAuthenticated.value = !!newUser && !!authStore.token
})

// İlk yükleme
onMounted(async () => {
    // Client-side flag'ini set et
    isClient.value = true

    // Auth durumunu kontrol et
    isAuthenticated.value = !!authStore.token

    // Token varsa ama user bilgisi yoksa, user bilgisini getir
    if (authStore.token && !authStore.currentUser) {
        await authStore.fetchUser()
    }

    // Auth durumunu tekrar kontrol et
    isAuthenticated.value = !!authStore.token && !!authStore.currentUser

    fetchQuestions()
})
</script>