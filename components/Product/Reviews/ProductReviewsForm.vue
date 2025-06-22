<template>
    <UModal v-model="isOpen" :ui="{ width: 'w-full sm:max-w-2xl' }">
        <div class="p-6 bg-white dark:bg-neutral-900 rounded-lg">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    Ürün Yorumu Yaz
                </h3>
                <UButton @click="closeModal" color="neutral" variant="ghost" icon="i-heroicons-x-mark" size="sm" />
            </div>

            <!-- Product Info -->
            <div
                class="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg mb-6 border border-neutral-200 dark:border-neutral-700">
                <div class="w-16 h-16 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex-shrink-0">
                    <NuxtImg v-if="productImage && productImage.path" :src="`cl/${productImage.path}`"
                        :alt="product.name" class="w-full h-full object-cover object-top" width="64" height="64"
                        fit="cover" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <UIcon name="i-heroicons-photo" class="w-6 h-6 text-neutral-400" />
                    </div>
                </div>
                <div>
                    <h4 class="font-medium text-neutral-900 dark:text-neutral-100">{{ product.name }}</h4>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Bu ürün hakkında yorumunuzu paylaşın</p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Rating -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                        Puanınız *
                    </label>
                    <div class="flex items-center space-x-2">
                        <button v-for="star in 5" :key="star" type="button" @click="form.rating = star"
                            @mouseover="hoverRating = star" @mouseleave="hoverRating = 0"
                            class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warning-400 rounded">
                            <UIcon name="i-heroicons-star-solid" :class="[
                                'w-8 h-8',
                                (hoverRating || form.rating) >= star
                                    ? 'text-warning-400'
                                    : 'text-neutral-300 dark:text-neutral-600'
                            ]" />
                        </button>
                        <span v-if="form.rating" class="ml-3 text-sm text-neutral-600 dark:text-neutral-400">
                            {{ getRatingText(form.rating) }}
                        </span>
                    </div>
                    <p v-if="errors.rating" class="mt-1 text-sm text-error-600 dark:text-error-400">
                        {{ errors.rating }}
                    </p>
                </div>

                <!-- Comment -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Yorumunuz *
                    </label>
                    <UTextarea v-model="form.comment" placeholder="Ürün hakkındaki deneyiminizi paylaşın..." :rows="5"
                        :maxlength="1000" class="w-full" :ui="{
                            base: 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100',
                            placeholder: 'placeholder-neutral-500 dark:placeholder-neutral-400'
                        }" />
                    <div class="flex justify-between items-center mt-1">
                        <p v-if="errors.comment" class="text-sm text-error-600 dark:text-error-400">
                            {{ errors.comment }}
                        </p>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 ml-auto">
                            {{ form.comment.length }}/1000
                        </p>
                    </div>
                </div>

                <!-- Images -->
                <!-- <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Fotoğraflar (İsteğe bağlı)
                    </label>
                    <div class="space-y-4">
                        <!-- File Input -->
                <!-- <div class="flex items-center justify-center w-full">
                            <label
                                class="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors duration-200">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UIcon name="i-heroicons-camera" class="w-8 h-8 mb-2 text-neutral-400 dark:text-neutral-500" />
                                    <p class="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        <span class="font-semibold">Fotoğraf eklemek için tıklayın</span>
                                    </p>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-400">PNG, JPG (MAX. 5MB)</p>
                                </div>
                                <input ref="fileInput" type="file" multiple accept="image/*" @change="handleFileSelect"
                                    class="hidden" />
                            </label>
                        </div> -->

                <!-- Image Previews -->
                <!-- <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div v-for="(preview, index) in imagePreviews" :key="index" class="relative group">
                                <img :src="preview.url" :alt="`Preview ${index + 1}`"
                                    class="w-full h-24 object-cover rounded-lg border border-neutral-200 dark:border-neutral-600" />
                                <button type="button" @click="removeImage(index)"
                                    class="absolute -top-2 -right-2 bg-error-500 hover:bg-error-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                                </button>
                            </div>
                        </div> -->
                <!-- </div>
                </div> -->

                <!-- Actions -->
                <div class="flex justify-end space-x-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <UButton type="button" @click="closeModal" color="neutral" variant="outline" :disabled="loading">
                        İptal
                    </UButton>
                    <UButton type="submit" color="secondary" :loading="loading" :disabled="!isFormValid">
                        Yorumu Gönder
                    </UButton>
                </div>
            </form>
        </div>
    </UModal>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:show', 'submitted'])

// Composables
const { submitReview } = useProductReviews()
const toast = useToast()

// Local state
const loading = ref(false)
const hoverRating = ref(0)
const fileInput = ref(null)

const form = reactive({
    rating: 0,
    comment: '',
    images: []
})

const errors = reactive({
    rating: '',
    comment: ''
})

const imagePreviews = ref([])

// Computed
const isOpen = computed({
    get: () => props.show,
    set: (value) => emit('update:show', value)
})

const isFormValid = computed(() => {
    return form.rating > 0 && form.comment.trim().length >= 10
})

// Ürün görselini belirle: selectedImages varsa onu kullan, yoksa selectedColorTermImages'in ilkini al
const productImage = computed(() => {
    if (props.product.selectedImages && props.product.selectedImages.length > 0) {
        return props.product.selectedImages[0]
    }

    if (props.product.selectedColorTermImages && props.product.selectedColorTermImages.length > 0) {
        return props.product.selectedColorTermImages[0]
    }

    return null
})

// Methods
const getRatingText = (rating) => {
    const texts = {
        1: 'Çok Kötü',
        2: 'Kötü',
        3: 'Orta',
        4: 'İyi',
        5: 'Mükemmel'
    }
    return texts[rating] || ''
}

const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)

    if (files.length + form.images.length > 5) {
        toast.add({
            title: 'Çok fazla fotoğraf',
            description: 'En fazla 5 fotoğraf yükleyebilirsiniz',
            color: 'red'
        })
        return
    }

    files.forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            toast.add({
                title: 'Dosya çok büyük',
                description: `${file.name} dosyası 5MB'dan büyük`,
                color: 'red'
            })
            return
        }

        form.images.push(file)

        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreviews.value.push({
                url: e.target.result,
                file: file
            })
        }
        reader.readAsDataURL(file)
    })

    // Clear input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const removeImage = (index) => {
    form.images.splice(index, 1)
    imagePreviews.value.splice(index, 1)
}

const validateForm = () => {
    errors.rating = ''
    errors.comment = ''

    if (form.rating === 0) {
        errors.rating = 'Lütfen bir puan verin'
        return false
    }

    if (form.comment.trim().length < 10) {
        errors.comment = 'Yorumunuz en az 10 karakter olmalıdır'
        return false
    }

    if (form.comment.trim().length > 1000) {
        errors.comment = 'Yorumunuz en fazla 1000 karakter olabilir'
        return false
    }

    return true
}

const handleSubmit = async () => {
    if (!validateForm()) return

    loading.value = true

    try {
        await submitReview(props.product.id, {
            rating: form.rating,
            comment: form.comment.trim(),
            images: form.images
        })

        emit('submitted')
        resetForm()
    } catch (error) {
        toast.add({
            title: 'Bir hata oluştu',
            description: error.message || 'Yorum gönderilemedi',
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}

const resetForm = () => {
    form.rating = 0
    form.comment = ''
    form.images = []
    imagePreviews.value = []
    errors.rating = ''
    errors.comment = ''
    hoverRating.value = 0
}

const closeModal = () => {
    if (!loading.value) {
        isOpen.value = false
        resetForm()
    }
}

// Watch for modal close
watch(() => props.show, (newValue) => {
    if (!newValue) {
        resetForm()
    }
})
</script>