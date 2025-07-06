<template>
    <div class="space-y-4">
        <!-- Selected Images Display -->
        <div v-if="props.selectedImages && props.selectedImages.length > 0">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                    Seçili Görseller ({{ props.selectedImages.length }})
                </h4>
                <div class="flex items-center gap-2">
                    <span v-if="props.selectedImages.length > 1" class="text-xs text-gray-500 dark:text-gray-400">
                        Sıralamak için sürükleyin
                    </span>
                    <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-x-mark" label="Tümünü Kaldır"
                        @click="clearAllImages" class="self-end sm:self-auto" />
                </div>
            </div>

            <div ref="sortableContainer"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 sortable-container"
                :class="{ 'cursor-grabbing': isDragging }">
                <div v-for="(item, index) in props.selectedImages" :key="item.id" :data-image-id="item.id"
                    class="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200 sortable-item cursor-move"
                    :class="{
                        'border-primary-500 ring-2 ring-primary-500/20': item.id === coverImageId,
                        'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': item.id !== coverImageId,
                        'opacity-50 scale-105 shadow-xl z-10': isDragging && draggedItem === item.id,
                        'transform transition-transform': !isDragging
                    }">

                    <!-- Drag Handle -->
                    <div
                        class="drag-handle absolute top-1 left-1 sm:top-2 sm:left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded p-1">
                            <Icon name="i-heroicons-bars-3" class="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>

                    <!-- Image -->
                    <NuxtImg :src="'cl/' + item.path" :alt="`Seçili görsel ${index + 1}`"
                        class="w-full h-full object-cover cursor-pointer" @click="setCoverImage(item.id)" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

                    <!-- Cover Badge -->
                    <div v-if="item.id === coverImageId"
                        class="absolute top-1 right-1 sm:top-2 sm:right-2 bg-primary-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md font-medium">
                        <Icon name="i-heroicons-star" class="w-3 h-3 inline mr-1" />
                        <span class="hidden sm:inline">Kapak</span>
                    </div>

                    <!-- Actions -->
                    <div
                        class="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div class="flex gap-1">
                            <UButton v-if="item.id !== coverImageId" icon="i-heroicons-star" size="2xs" color="yellow"
                                variant="solid" @click="setCoverImage(item.id)"
                                class="backdrop-blur-sm h-6 w-6 sm:h-auto sm:w-auto"
                                :ui="{ rounded: 'rounded-md', padding: { '2xs': 'p-1' } }" />
                            <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="solid"
                                @click="removeImage(index)" class="backdrop-blur-sm h-6 w-6 sm:h-auto sm:w-auto"
                                :ui="{ rounded: 'rounded-md', padding: { '2xs': 'p-1' } }" />
                        </div>
                    </div>

                    <!-- Image Info -->
                    <div
                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p class="text-white text-xs truncate">
                            {{ getImageName(item.path) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Images Button -->
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer"
            @click="openMediaModal">
            <div class="space-y-2 sm:space-y-3">
                <div class="relative">
                    <Icon name="i-heroicons-photo" class="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400" />
                    <div class="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                        <Icon name="i-heroicons-plus" class="w-3 h-3 text-white" />
                    </div>
                </div>

                <div>
                    <p class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                        {{ getButtonText() }}
                    </p>
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Medya galerisinden görsel seçin veya yeni görseller yükleyin
                    </p>
                </div>

                <UButton icon="i-heroicons-photo" color="primary" variant="outline" size="sm" label="Galeriyi Aç"
                    class="text-xs sm:text-sm" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Sortable from 'sortablejs'

// Models
const isOpenModal = defineModel('isOpenModal');
const coverImageId = defineModel('coverImageId');

// Props
const props = defineProps({
    selectedImages: {
        type: Array,
        default: () => []
    },
    productId: {
        type: [Number, String],
        default: null
    }
});

// Emits
const emit = defineEmits(['update:selectedImages']);

// Reactive state
const sortableContainer = ref(null)
const isDragging = ref(false)
const draggedItem = ref(null)
const isEmitting = ref(false)
const sortableInstance = ref(null)

// Initialize sortable when component mounts and when images change
const initializeSortable = () => {
    if (!sortableContainer.value) return

    // Destroy existing sortable if exists
    if (sortableInstance.value) {
        sortableInstance.value.destroy()
        sortableInstance.value = null
    }

    // Don't initialize if less than 2 images
    if (!props.selectedImages || props.selectedImages.length < 2) {
        return
    }

    // Create new sortable instance
    sortableInstance.value = new Sortable(sortableContainer.value, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        handle: '.sortable-item',
        disabled: isEmitting.value,
        onStart: (evt) => {
            isDragging.value = true
            draggedItem.value = props.selectedImages[evt.oldIndex]?.id
            console.log('Drag started for image:', draggedItem.value)
        },
        onEnd: (evt) => {
            isDragging.value = false
            draggedItem.value = null
            console.log('Drag ended, new order:', evt.newIndex, 'old:', evt.oldIndex)

            if (evt.oldIndex !== evt.newIndex) {
                handleImageReorder(evt.oldIndex, evt.newIndex)
            }
        }
    })

    console.log('Sortable initialized with', props.selectedImages.length, 'images')
}

// Handle image reordering
const handleImageReorder = (oldIndex, newIndex) => {
    try {
        // Create new array with reordered items
        const updatedImages = [...props.selectedImages]
        const movedItem = updatedImages.splice(oldIndex, 1)[0]
        updatedImages.splice(newIndex, 0, movedItem)

        console.log('Updated images order:', updatedImages.map(img => img.id))

        // Set emit flag
        isEmitting.value = true

        // Emit to parent
        emit('update:selectedImages', updatedImages)

        // Clear emit flag and save order
        nextTick(() => {
            isEmitting.value = false
            saveImageOrder(updatedImages)
        })

        // Show success message
        try {
            const toast = useNuxtApp().$toast
            if (toast) {
                toast.success('Görsel sırası güncellendi')
            }
        } catch (error) {
            console.log('Toast not available:', error)
        }
    } catch (error) {
        console.error('Error during drag operation:', error)

        try {
            const toast = useNuxtApp().$toast
            if (toast) {
                toast.error('Görsel sırası güncellenemedi')
            }
        } catch (toastError) {
            console.error('Toast error:', toastError)
        }
    }
}

// Watch for changes to reinitialize sortable
watch(() => props.selectedImages, () => {
    if (isEmitting.value) {
        console.log('Emit işlemi sırasında sortable reinit skip ediliyor')
        return
    }

    // Reinitialize sortable when images change
    nextTick(() => {
        initializeSortable()
    })
}, { immediate: false })

// Initialize sortable when component mounts
onMounted(() => {
    nextTick(() => {
        initializeSortable()
    })
})

// Cleanup sortable when component unmounts
onUnmounted(() => {
    if (sortableInstance.value) {
        sortableInstance.value.destroy()
        sortableInstance.value = null
    }
})

// Methods
const openMediaModal = () => {
    isOpenModal.value = true;
};

const setCoverImage = (imageId) => {
    coverImageId.value = imageId;
};

const removeImage = (index) => {
    const updatedImages = [...props.selectedImages];
    const removedImage = updatedImages.splice(index, 1)[0];

    // If removed image was cover, set first image as cover
    if (removedImage.id === coverImageId.value && updatedImages.length > 0) {
        coverImageId.value = updatedImages[0].id;
    } else if (updatedImages.length === 0) {
        coverImageId.value = null;
    }

    emit('update:selectedImages', updatedImages);
};

const clearAllImages = () => {
    emit('update:selectedImages', []);
    coverImageId.value = null;
};

const getImageName = (path) => {
    return path.split('/').pop() || path;
};

const getButtonText = () => {
    return props.selectedImages && props.selectedImages.length > 0
        ? 'Daha Fazla Görsel Ekle'
        : 'Ürün Görsellerini Seç';
};

// Debounce save operations
let saveTimeout = null

const saveImageOrder = async (images) => {
    // Clear existing timeout
    if (saveTimeout) {
        clearTimeout(saveTimeout)
    }

    if (!props.productId || !images.length) {
        console.log('Product ID yok veya görseller boş, sıralama kaydedilmiyor', {
            productId: props.productId,
            imagesLength: images.length
        })
        return
    }

    // Debounce API call
    saveTimeout = setTimeout(async () => {
        try {
            const imageOrder = images.map((image, index) => ({
                image_id: image.id,
                sort_order: index + 1
            }))

            console.log('Saving image order to backend:', {
                productId: props.productId,
                imageOrder,
                totalImages: imageOrder.length
            })

            await useBaseOFetchWithAuth(`admin/products/${props.productId}/images/reorder`, {
                method: 'POST',
                body: { images: imageOrder }
            })

            console.log('Image order saved successfully')

            // Product state'ini temizle ki ürün sayfasında güncel sıralama görünsün
            if (process.client) {
                const productState = useProductState()
                if (productState && productState.product && productState.product.id) {
                    console.log('Product state temizleniyor...')
                    productState.product.selectedImages = []

                    // Product'ı yeniden yükle (eğer mümkünse)
                    try {
                        const currentProduct = await useBaseOFetch(`product/${productState.product.slug}`)
                        if (currentProduct && currentProduct.selectedImages) {
                            productState.product.selectedImages = currentProduct.selectedImages
                            console.log('Product images güncellendi:', currentProduct.selectedImages.length)
                        }
                    } catch (error) {
                        console.log('Product reload hatası:', error)
                    }
                }
            }
        } catch (error) {
            console.error('Error saving image order:', error)

            try {
                const toast = useNuxtApp().$toast
                if (toast) {
                    toast.error('Görsel sırası kaydedilemedi')
                }
            } catch (toastError) {
                console.error('Toast error:', toastError)
            }
        }
    }, 300) // 300ms debounce
};

// Auto-set cover image when first image is added
watch(() => props.selectedImages, (newImages) => {
    if (newImages.length > 0 && !coverImageId.value) {
        coverImageId.value = newImages[0].id;
    }
}, { immediate: true });
</script>

<style scoped>
.sortable-ghost {
    opacity: 0.4;
    background: #e5e7eb;
    border: 2px dashed #9ca3af;
    border-radius: 0.5rem;
}

.sortable-chosen {
    transform: scale(1.05);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 999;
}

.sortable-drag {
    opacity: 0.8;
    transform: rotate(5deg);
}

.sortable-item {
    transition: all 0.3s ease;
}

.sortable-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sortable-container {
    position: relative;
}

.drag-handle {
    touch-action: none;
}

.sortable-item.sortable-chosen .drag-handle {
    opacity: 1 !important;
}

/* Dark mode support */
.dark .sortable-ghost {
    background: #374151;
    border-color: #6b7280;
}
</style>