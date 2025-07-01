<template>
    <div>
        <NuxtLayout name="account">
            <!-- Yükleniyor Durumu -->
            <div v-if="pending" class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <div
                        class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <UIcon name="i-heroicons-arrow-path"
                            class="w-8 h-8 text-secondary-600 dark:text-secondary-400 animate-spin" />
                    </div>
                    <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Sorularınız yükleniyor...</p>
                </div>
            </div>

            <!-- Ana İçerik -->
            <div v-else>
                <!-- Sayfa Başlığı -->
                <div class="mb-6">
                    <h1
                        class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                        Sorularım
                    </h1>
                    <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                        Sorduğunuz soruları ve aldığınız cevapları buradan takip edebilirsiniz.
                    </p>
                </div>

                <!-- Filtreleme -->
                <div
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 mb-6 transition-colors duration-300">
                    <div class="flex flex-col sm:flex-row gap-3">
                        <USelect v-model="filters.status" :options="statusOptions" size="sm" class="min-w-32"
                            by="value" />

                        <!-- İstatistikler -->
                        <div
                            class="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400 sm:ml-auto">
                            <span v-if="questionsData?.total">
                                {{ questionsData.total }} soru
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Sorular Listesi -->
                <div v-if="questionsData?.data?.length" class="space-y-4">
                    <div v-for="question in questionsData.data" :key="question.id"
                        class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all duration-300">

                        <!-- Soru Başlığı ve Durum -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h3
                                    class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                                    {{ question.question }}
                                </h3>

                                <!-- Ürün Bilgisi -->
                                <div
                                    class="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2 transition-colors duration-300">
                                    <UIcon name="i-heroicons-cube" class="w-4 h-4" />
                                    <NuxtLink :to="`/urun/${question.product.slug}--p${question.product.id}`"
                                        class="hover:text-secondary-600 transition-colors">
                                        {{ question.product.name }}
                                    </NuxtLink>
                                </div>

                                <!-- Tarih ve Oylama -->
                                <div
                                    class="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                    <span>{{ question.time_ago }}</span>
                                    <span v-if="question.helpful_count > 0" class="flex items-center space-x-1">
                                        <UIcon name="i-heroicons-hand-thumb-up" class="w-3 h-3" />
                                        <span>{{ question.helpful_count }} yararlı</span>
                                    </span>
                                </div>
                            </div>

                            <!-- Durum Badge -->
                            <UBadge :color="getStatusColor(question.status)"
                                :variant="getStatusVariant(question.status)" size="sm">
                                {{ getStatusText(question.status) }}
                            </UBadge>
                        </div>

                        <!-- Cevap Bilgisi -->
                        <div class="mb-4">
                            <div v-if="question.answers?.length"
                                class="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                                <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
                                <span>{{ question.answers.length }} cevap alındı</span>
                            </div>
                            <div v-else
                                class="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                                <span>Henüz cevap verilmemiş</span>
                            </div>
                        </div>

                        <!-- Aksiyonlar -->
                        <div
                            class="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700 transition-colors duration-300">
                            <div class="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                Soru #{{ question.id }}
                            </div>

                            <UButton @click="goToDetail(question.id)" color="secondary" variant="ghost" size="sm">
                                Detay Gör
                            </UButton>
                        </div>
                    </div>

                    <!-- Sayfalama -->
                    <div v-if="questionsData.last_page > 1" class="flex justify-center py-8">
                        <UPagination v-model="currentPage" :page-count="questionsData.per_page"
                            :total="questionsData.total" :max="5" show-last show-first />
                    </div>
                </div>

                <!-- Boş Durum -->
                <div v-else class="text-center py-12">
                    <div
                        class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <UIcon name="i-heroicons-question-mark-circle"
                            class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
                    </div>
                    <h3
                        class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                        Henüz soru sormadınız
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400 mb-6 transition-colors duration-300">
                        Ürünler hakkında merak ettiklerinizi sorabilirsiniz.
                    </p>
                    <UButton to="/" color="secondary" size="lg" label="Ürünlere Göz At" icon="i-heroicons-arrow-right"
                        trailing />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const { siteName } = useSettings()

definePageMeta({
    layout: 'default'
})

useHead({
    title: computed(() => `Sorularım - ${siteName.value}`)
})

const router = useRouter()
const toast = useToast()

// Reactive state
const currentPage = ref(1)
const questionsData = ref(null)
const pending = ref(false)

// Filtreleme
const filters = ref({
    status: 'all'
})

const statusOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Beklemede', value: 'pending' },
    { label: 'Onaylanmış', value: 'approved' },
    { label: 'Reddedilmiş', value: 'rejected' }
]

// Methods
const fetchQuestions = async () => {
    pending.value = true
    try {
        const data = await useBaseOFetchWithAuth('my-questions', {
            params: {
                page: currentPage.value,
                status: filters.value.status !== 'all' ? filters.value.status : undefined
            }
        })

        if (data.success) {
            questionsData.value = data.data
        }
    } catch (error) {
        console.error('Sorular yüklenirken hata:', error)
        toast.add({
            title: 'Hata',
            description: 'Sorular yüklenirken bir hata oluştu.',
            color: 'red'
        })
    } finally {
        pending.value = false
    }
}

const getStatusColor = (status) => {
    switch (status) {
        case 'approved': return 'green'
        case 'pending': return 'amber'
        case 'rejected': return 'red'
        default: return 'gray'
    }
}

const getStatusVariant = (status) => {
    return 'soft'
}

const getStatusText = (status) => {
    switch (status) {
        case 'approved': return 'Onaylandı'
        case 'pending': return 'Beklemede'
        case 'rejected': return 'Reddedildi'
        default: return 'Bilinmiyor'
    }
}

const goToDetail = (questionId) => {
    router.push(`/hesap/sorularim/${questionId}`)
}

// Watchers
watch(() => filters.value, () => {
    currentPage.value = 1
    fetchQuestions()
}, { deep: true })

watch(() => currentPage.value, fetchQuestions)

// İlk yükleme - useAsyncData kullanarak
useAsyncData('sorularimInit', async () => {
    await fetchQuestions()
})
</script>