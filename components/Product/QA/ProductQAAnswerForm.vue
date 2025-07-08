<template>
    <div class="border-l-2 border-secondary-200 dark:border-secondary-700 pl-4 pt-3">
        <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3 flex items-center space-x-2">
                <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4 text-secondary-600" />
                <span>Cevap Yazın</span>
            </h4>

            <div class="space-y-3">
                <div>
                    <UTextarea v-model="state.answer" placeholder="Bu soruya cevabınızı yazın..." :rows="3"
                        :maxlength="1000" autofocus class="text-sm" />
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-xs text-neutral-500">
                            En az 5, en fazla 1000 karakter olmalıdır.
                        </span>
                        <span class="text-xs text-neutral-400">
                            {{ state.answer.length }}/1000
                        </span>
                    </div>
                </div>

                <div class="flex justify-end space-x-2">
                    <UButton color="gray" variant="ghost" size="sm" @click="closeForm" :disabled="loading">
                        İptal
                    </UButton>
                    <UButton color="secondary" variant="solid" size="sm" @click="submitAnswer" :loading="loading"
                        :disabled="!state.answer || state.answer.length < 5">
                        Cevap Gönder
                    </UButton>
                </div>
            </div>

            <!-- Uyarı -->
            <div
                class="mt-3 p-2 bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded text-xs">
                <div class="flex items-start space-x-2 text-secondary-700 dark:text-secondary-300">
                    <UIcon name="i-heroicons-information-circle" class="w-3 h-3 mt-0.5" />
                    <span>Cevabınız moderasyon sonrası yayınlanacaktır.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close', 'answer-submitted'])

const toast = useToast()

// Reactive state
const loading = ref(false)

const state = reactive({
    answer: ''
})

// Validasyon fonksiyonu
const validateAnswer = () => {
    const answer = state.answer.trim()

    if (!answer) {
        return 'Cevap alanı zorunludur.'
    }

    if (answer.length < 5) {
        return 'Cevap en az 5 karakter olmalıdır.'
    }

    if (answer.length > 1000) {
        return 'Cevap en fazla 1000 karakter olabilir.'
    }

    return null
}

// Methods
const closeForm = () => {
    emit('close')
}

const submitAnswer = async () => {
    try {
        // Validasyon
        const validationError = validateAnswer()
        if (validationError) {
            toast.add({
                title: 'Hata',
                description: validationError,
                color: 'red'
            })
            return
        }

        loading.value = true

        const data = await useBaseOFetchWithAuth(`questions/${props.question.id}/answer`, {
            method: 'POST',
            body: {
                answer: state.answer.trim()
            }
        })

        if (data.success) {
            toast.add({
                title: 'Başarılı',
                description: 'Cevabınız başarıyla gönderildi. Moderasyon sonrası yayınlanacaktır.',
                color: 'green'
            })

            emit('answer-submitted')
            closeForm()
        } else {
            throw new Error(data.message || 'Bir hata oluştu')
        }
    } catch (error) {
        console.error('Cevap gönderilirken hata:', error)

        let errorMessage = 'Cevap gönderilirken bir hata oluştu'

        if (error.response?.status === 409) {
            errorMessage = 'Bu soruya zaten cevap verdiniz.'
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message
        } else if (error.response?.data?.errors?.answer) {
            errorMessage = error.response.data.errors.answer[0]
        }

        toast.add({
            title: 'Hata',
            description: errorMessage,
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}
</script>