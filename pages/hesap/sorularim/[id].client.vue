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
                    <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Soru detayı yükleniyor...</p>
                </div>
            </div>

            <!-- Ana İçerik -->
            <div v-else>
                <div v-if="question" class="space-y-6">
                    <!-- Soru Detayı -->
                    <div
                        class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 lg:p-8 transition-colors duration-300">
                        <!-- Başlık ve Durum -->
                        <div
                            class="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 mb-6">
                            <div class="flex-1">
                                <h1
                                    class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 transition-colors duration-300 leading-tight">
                                    {{ question.question }}
                                </h1>

                                <!-- Ürün Bilgisi -->
                                <div
                                    class="flex flex-col space-y-1 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2 text-neutral-600 dark:text-neutral-400 mb-4 transition-colors duration-300">
                                    <div class="flex items-center space-x-2">
                                        <UIcon name="i-heroicons-cube" class="w-5 h-5" />
                                        <span class="text-sm">Soru sorduğunuz ürün:</span>
                                    </div>
                                    <NuxtLink :to="`/urun/${question.product.slug}--p${question.product.id}`"
                                        class="text-secondary-600 hover:text-secondary-700 font-medium transition-colors break-words">
                                        {{ question.product.name }}
                                    </NuxtLink>
                                </div>
                            </div>

                            <!-- Durum Badge -->
                            <div class="flex justify-start lg:justify-end">
                                <UBadge :color="getStatusColor(question.status)"
                                    :variant="getStatusVariant(question.status)" size="lg">
                                    {{ getStatusText(question.status) }}
                                </UBadge>
                            </div>
                        </div>

                        <!-- Soru Meta Bilgileri -->
                        <div
                            class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg transition-colors duration-300">
                            <div class="text-center">
                                <div class="text-sm text-neutral-500 dark:text-neutral-400">Soru Tarihi</div>
                                <div
                                    class="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                                    {{ question.formatted_date }}
                                </div>
                                <div
                                    class="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                    {{ question.time_ago }}
                                </div>
                            </div>

                            <div class="text-center">
                                <div class="text-sm text-neutral-500 dark:text-neutral-400">Yararlı Oy</div>
                                <div
                                    class="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                                    {{ question.helpful_count || 0 }}
                                </div>
                            </div>

                            <div class="text-center">
                                <div class="text-sm text-neutral-500 dark:text-neutral-400">Cevap Sayısı</div>
                                <div
                                    class="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                                    {{ question.answers?.length || 0 }}
                                </div>
                            </div>
                        </div>

                        <!-- Moderasyon Bilgisi -->
                        <div v-if="question.status === 'rejected' || question.moderated_at"
                            class="p-4 rounded-lg mb-6 transition-colors duration-300" :class="question.status === 'rejected'
                                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'">

                            <div class="flex items-start space-x-3">
                                <UIcon :name="question.status === 'rejected'
                                    ? 'i-heroicons-x-circle'
                                    : 'i-heroicons-check-circle'" class="w-5 h-5 mt-0.5 flex-shrink-0" :class="question.status === 'rejected'
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-green-600 dark:text-green-400'" />

                                <div class="flex-1 min-w-0">
                                    <h3 class="font-medium mb-2" :class="question.status === 'rejected'
                                        ? 'text-red-900 dark:text-red-100'
                                        : 'text-green-900 dark:text-green-100'">
                                        {{ question.status === 'rejected' ? 'Soru Reddedildi' : 'Soru Onaylandı'
                                        }}
                                    </h3>

                                    <div class="text-sm space-y-1" :class="question.status === 'rejected'
                                        ? 'text-red-700 dark:text-red-300'
                                        : 'text-green-700 dark:text-green-300'">

                                        <div v-if="question.moderated_at">
                                            <strong>Moderasyon Tarihi:</strong> {{
                                                formatDate(question.moderated_at) }}
                                        </div>

                                        <div v-if="question.moderated_by">
                                            <strong>Moderatör:</strong> {{ question.moderated_by.name }}
                                        </div>

                                        <div v-if="question.rejection_reason" class="mt-2 break-words">
                                            <strong>Red Nedeni:</strong> {{ question.rejection_reason }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bekleme Durumu -->
                        <div v-if="question.status === 'pending'"
                            class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg mb-6 transition-colors duration-300">
                            <div class="flex items-start space-x-3">
                                <UIcon name="i-heroicons-clock"
                                    class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div class="min-w-0">
                                    <h3 class="font-medium text-amber-900 dark:text-amber-100 mb-1">
                                        Moderasyon Bekleniyor
                                    </h3>
                                    <p class="text-sm text-amber-700 dark:text-amber-300">
                                        Sorunuz moderasyon sürecindedir. Onaylandıktan sonra yayınlanacaktır.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Cevaplar -->
                    <div v-if="question.answers?.length" class="space-y-4">
                        <h2
                            class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2 transition-colors duration-300">
                            <UIcon name="i-heroicons-chat-bubble-left" class="w-5 h-5" />
                            <span>Cevaplar ({{ question.answers.length }})</span>
                        </h2>

                        <div v-for="answer in question.answers" :key="answer.id"
                            class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 transition-colors duration-300">

                            <!-- Cevap Header -->
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-start space-x-3 min-w-0 flex-1">
                                    <UIcon name="i-heroicons-user-circle"
                                        class="w-6 h-6 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
                                    <div class="min-w-0 flex-1">
                                        <div
                                            class="flex flex-col space-y-1 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
                                            <span
                                                class="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300 break-words">
                                                {{ answer.user_display_name }}
                                            </span>
                                            <div>
                                                <UBadge v-if="answer.is_vendor_answer" color="blue" variant="soft"
                                                    size="xs">
                                                    Satıcı
                                                </UBadge>
                                            </div>
                                        </div>
                                        <span
                                            class="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                            {{ answer.time_ago }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Cevap İçeriği -->
                            <div
                                class="text-neutral-900 dark:text-neutral-100 leading-relaxed ml-9 transition-colors duration-300 break-words">
                                {{ answer.answer }}
                            </div>
                        </div>
                    </div>

                    <!-- Cevap Yok -->
                    <div v-else-if="question.status === 'approved'"
                        class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8 text-center transition-colors duration-300">
                        <UIcon name="i-heroicons-chat-bubble-left" class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                        <h3
                            class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                            Henüz cevap verilmemiş
                        </h3>
                        <p class="text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                            Sorunuza henüz cevap verilmemiş. Cevap geldiğinde bilgilendirileceksiniz.
                        </p>
                    </div>
                </div>

                <!-- Hata Durumu -->
                <div v-else class="text-center py-12 px-4">
                    <div
                        class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="w-12 h-12 text-red-400 dark:text-red-500" />
                    </div>
                    <h3
                        class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                        Soru bulunamadı
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400 mb-6 transition-colors duration-300">
                        Aradığınız soru mevcut değil veya erişim yetkiniz bulunmuyor.
                    </p>
                    <UButton to="/hesap/sorularim" color="secondary" size="lg" label="Sorularıma Dön"
                        icon="i-heroicons-arrow-left" />
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
    title: computed(() => `Soru Detayı - ${siteName.value}`)
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Reactive state
const question = ref(null)
const pending = ref(false)

const questionId = route.params.id

// Methods
const fetchQuestionDetail = async () => {
    pending.value = true
    try {
        const data = await useBaseOFetchWithAuth(`my-questions/${questionId}`)

        if (data.success) {
            question.value = data.data
        }
    } catch (error) {
        console.error('Soru detayı yüklenirken hata:', error)
        toast.add({
            title: 'Hata',
            description: 'Soru detayı yüklenirken bir hata oluştu.',
            color: 'red'
        })

        // 404 ise sorularım sayfasına yönlendir
        if (error.response?.status === 404) {
            router.push('/hesap/sorularim')
        }
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

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// İlk yükleme - useAsyncData kullanarak
useAsyncData('soruDetayInit', async () => {
    if (questionId) {
        await fetchQuestionDetail()
    } else {
        router.push('/hesap/sorularim')
    }
})
</script>