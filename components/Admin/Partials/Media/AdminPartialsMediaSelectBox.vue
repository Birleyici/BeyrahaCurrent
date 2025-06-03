<template>
    <div class="space-y-4">
        <!-- Selected Images Display -->
        <div v-if="props.selectedImages && props.selectedImages.length > 0">
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                    Seçili Görseller ({{ props.selectedImages.length }})
                </h4>
                <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-x-mark" label="Tümünü Kaldır"
                    @click="clearAllImages" />
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="(item, index) in props.selectedImages" :key="index"
                    class="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200"
                    :class="{
                        'border-primary-500 ring-2 ring-primary-500/20': item.id === coverImageId,
                        'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': item.id !== coverImageId
                    }">
                    <!-- Image -->
                    <NuxtImg :src="'cl/' + item.path" :alt="`Seçili görsel ${index + 1}`"
                        class="w-full h-full object-cover cursor-pointer" @click="setCoverImage(item.id)" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

                    <!-- Cover Badge -->
                    <div v-if="item.id === coverImageId"
                        class="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                        <Icon name="i-heroicons-star" class="w-3 h-3 inline mr-1" />
                        Kapak
                    </div>

                    <!-- Actions -->
                    <div
                        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div class="flex gap-1">
                            <UButton v-if="item.id !== coverImageId" icon="i-heroicons-star" size="xs" color="yellow"
                                variant="solid" @click="setCoverImage(item.id)" class="backdrop-blur-sm"
                                :ui="{ rounded: 'rounded-md' }" />
                            <UButton icon="i-heroicons-trash" size="xs" color="red" variant="solid"
                                @click="removeImage(index)" class="backdrop-blur-sm" :ui="{ rounded: 'rounded-md' }" />
                        </div>
                    </div>

                    <!-- Image Info -->
                    <div
                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p class="text-white text-xs truncate">
                            {{ getImageName(item.path) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Images Button -->
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer"
            @click="openMediaModal">
            <div class="space-y-3">
                <div class="relative">
                    <Icon name="i-heroicons-photo" class="w-12 h-12 mx-auto text-gray-400" />
                    <div class="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                        <Icon name="i-heroicons-plus" class="w-3 h-3 text-white" />
                    </div>
                </div>

                <div>
                    <p class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ getButtonText() }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Medya galerisinden görsel seçin veya yeni görseller yükleyin
                    </p>
                </div>

                <UButton icon="i-heroicons-photo" color="primary" variant="outline" size="sm" label="Galeriyi Aç" />
            </div>
        </div>
    </div>
</template>

<script setup>
// Models
const isOpenModal = defineModel('isOpenModal');
const coverImageId = defineModel('coverImageId');

// Props
const props = defineProps({
    selectedImages: {
        type: Array,
        default: () => []
    }
});

// Emits
const emit = defineEmits(['update:selectedImages']);

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

// Auto-set cover image when first image is added
watch(() => props.selectedImages, (newImages) => {
    if (newImages.length > 0 && !coverImageId.value) {
        coverImageId.value = newImages[0].id;
    }
}, { immediate: true });
</script>