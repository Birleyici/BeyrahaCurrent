<template>
    <div
        class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 md:p-6 bg-neutral-50 dark:bg-neutral-900/50 transition-colors duration-300">
        <!-- Soru -->
        <div class="mb-4">
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                    <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {{ question.user_display_name }}
                    </span>
                    <span class="text-xs text-neutral-500 dark:text-neutral-400">
                        {{ question.time_ago }}
                    </span>
                </div>

                <!-- Yararlı Butonları -->
                <div class="flex items-center space-x-2">
                    <UButton @click="markQuestionHelpful" :color="question.user_voted ? 'green' : 'gray'"
                        :variant="question.user_voted ? 'solid' : 'ghost'" size="xs"
                        :disabled="!authStore.token || !authStore.currentUser || isVoting" :loading="isVoting"
                        class="transition-all duration-200" :class="question.user_voted
                            ? 'text-white'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400'">
                        <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4 mr-1" />
                        {{ question.helpful_count || 0 }}
                    </UButton>
                </div>
            </div>

            <div class="text-neutral-900 dark:text-neutral-100 leading-relaxed">
                {{ question.question }}
            </div>
        </div>

        <!-- Cevaplar -->
        <div v-if="question.answers?.length" class="space-y-4 ml-4 md:ml-6">
            <ProductQAAnswerItem v-for="answer in question.answers" :key="answer.id" :answer="answer" />
        </div>

        <!-- Cevap Yok -->
        <div v-else
            class="ml-4 md:ml-6 text-sm text-neutral-500 dark:text-neutral-400 py-3 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
            <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4 inline mr-2" />
            Henüz cevap verilmemiş
        </div>

        <!-- Cevap Ver Formu -->
        <div class="mt-4 ml-4 md:ml-6">


            <div v-if="!showAnswerForm && authStore.token && authStore.currentUser && authStore.currentUser?.user.role === 'admin'"
                class="border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
                <UButton @click="showAnswerForm = true" color="secondary" variant="ghost" size="sm"
                    icon="i-heroicons-chat-bubble-left">
                    Cevap Ver
                </UButton>
            </div>

            <!-- Cevap Formu -->
            <ProductQAAnswerForm v-if="showAnswerForm" :question="question" @close="showAnswerForm = false"
                @answer-submitted="handleAnswerSubmitted" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['answer-submitted'])

const authStore = useAuthStore()
const toast = useToast()

// Reactive state
const showAnswerForm = ref(false)
const isVoting = ref(false)

// Methods
const markQuestionHelpful = async () => {
    if (isVoting.value) return

    if (!authStore.token || !authStore.currentUser) {
        toast.add({
            title: 'Uyarı',
            description: 'Oy vermek için giriş yapmanız gerekiyor.',
            color: 'amber'
        })
        return
    }

    isVoting.value = true
    try {
        const data = await useBaseOFetchWithAuth(`questions/${props.question.id}/helpful`, {
            method: 'POST'
        })

        if (data.success) {
            // Lokal olarak güncelle
            props.question.helpful_count = data.helpful_count
            props.question.user_voted = data.voted

            const message = data.voted ? 'Oyunuz kaydedildi.' : 'Oyunuz kaldırıldı.'
            toast.add({
                title: data.voted ? 'Teşekkürler!' : 'Bilgi',
                description: message,
                color: data.voted ? 'green' : 'blue'
            })
        }
    } catch (error) {
        console.error('Oy verme hatası:', error)
        toast.add({
            title: 'Hata',
            description: 'Oy verirken bir hata oluştu.',
            color: 'red'
        })
    } finally {
        isVoting.value = false
    }
}

const handleAnswerSubmitted = () => {
    showAnswerForm.value = false
    emit('answer-submitted')
}
</script>
