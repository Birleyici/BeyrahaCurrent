<template>
    <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Ürün Hakkında Soru Sor
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal" />
                </div>
            </template>

            <div class="space-y-4">
                <!-- Ürün Bilgisi -->
                <div class="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <img v-if="product.coverImage?.path" :src="product.coverImage.path" :alt="product.name"
                        class="w-12 h-12 object-cover rounded-lg">
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {{ product.name }}
                        </h4>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Bu ürün hakkında soru soruyorsunuz
                        </p>
                    </div>
                </div>

                <!-- Form -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sorunuz
                        </label>
                        <UTextarea v-model="state.question" placeholder="Ürün hakkında merak ettiğiniz soruyu yazın..."
                            :rows="4" :maxlength="1000" autofocus />
                        <div class="flex justify-between items-center mt-1">
                            <span class="text-xs text-neutral-500">
                                En az 10, en fazla 1000 karakter olmalıdır.
                            </span>
                            <span class="text-xs text-neutral-400">
                                {{ state.question.length }}/1000
                            </span>
                        </div>
                    </div>

                    <!-- Uyarı -->
                    <div
                        class="p-3 bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded-lg">
                        <div class="flex items-start space-x-2">
                            <UIcon name="i-heroicons-information-circle"
                                class="w-5 h-5 text-secondary-600 dark:text-secondary-400 mt-0.5" />
                            <div class="text-sm text-secondary-800 dark:text-secondary-200">
                                <p class="font-medium mb-1">Dikkat edilmesi gerekenler:</p>
                                <ul class="text-xs space-y-1 ml-2">
                                    <li>• Sorunuz moderasyon sonrası yayınlanacaktır</li>
                                    <li>• Ürünle ilgili teknik sorular sorun</li>
                                    <li>• Kişisel bilgi paylaşmayın</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-end space-x-3">
                    <UButton color="white" variant="solid" @click="closeModal" :disabled="loading">
                        İptal
                    </UButton>
                    <UButton color="primary" variant="solid" @click="submitQuestion" :loading="loading"
                        :disabled="!state.question || state.question.length < 10">
                        Soru Gönder
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close', 'question-submitted'])

const toast = useToast()

// Reactive state
const isOpen = ref(true)
const loading = ref(false)

const state = reactive({
    question: ''
})

// Validasyon fonksiyonu
const validateQuestion = () => {
    const question = state.question.trim()

    if (!question) {
        return 'Soru alanı zorunludur.'
    }

    if (question.length < 10) {
        return 'Soru en az 10 karakter olmalıdır.'
    }

    if (question.length > 1000) {
        return 'Soru en fazla 1000 karakter olabilir.'
    }

    return null
}

// Methods
const closeModal = () => {
    isOpen.value = false
    emit('close')
}

const submitQuestion = async () => {
    try {
        // Validasyon
        const validationError = validateQuestion()
        if (validationError) {
            toast.add({
                title: 'Hata',
                description: validationError,
                color: 'red'
            })
            return
        }

        loading.value = true

        const data = await useBaseOFetchWithAuth(`products/${props.product.id}/questions`, {
            method: 'POST',
            body: {
                question: state.question.trim()
            }
        })

        if (data.success) {
            toast.add({
                title: 'Başarılı',
                description: 'Sorunuz başarıyla gönderildi. Moderasyon sonrası yayınlanacaktır.',
                color: 'green'
            })

            emit('question-submitted')
            closeModal()
        } else {
            throw new Error(data.message || 'Bir hata oluştu')
        }
    } catch (error) {
        console.error('Soru gönderilirken hata:', error)

        let errorMessage = 'Soru gönderilirken bir hata oluştu'

        if (error.response?.status === 429) {
            errorMessage = 'Son 1 saat içinde çok fazla soru sordunuz. Lütfen bekleyin.'
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message
        } else if (error.response?.data?.errors?.question) {
            errorMessage = error.response.data.errors.question[0]
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

const onSubmit = () => {
    submitQuestion()
}

// Modal kapatılınca emit et
watch(isOpen, (newValue) => {
    if (!newValue) {
        emit('close')
    }
})
</script>