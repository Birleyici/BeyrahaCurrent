<template>
    <div class="w-full md:max-w-2xl md:mx-auto">
        <!-- Ana Video/Resim Alanı -->
        <div class="relative group">
            <div class="relative aspect-[3/4] bg-neutral-100 md:rounded-2xl overflow-hidden">
                <!-- Video Görünümü -->
                <div v-if="currentMediaType === 'video' && currentVideo" class="w-full h-full">
                    <!-- YouTube Video -->
                    <iframe v-if="currentVideo.type === 'youtube'" :src="currentVideo.embedUrl || ''"
                        class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media"
                        allowfullscreen></iframe>

                    <!-- Vimeo Video -->
                    <iframe v-else-if="currentVideo.type === 'vimeo'" :src="currentVideo.embedUrl || ''"
                        class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media"
                        allowfullscreen></iframe>

                    <!-- Local/External Video -->
                    <video v-else :src="currentVideo.url" class="w-full h-full object-cover" controls
                        :poster="currentVideo.thumbnail">
                        Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                </div>

                <!-- Resim Görünümü -->
                <div v-else class="flex transition-transform duration-500 ease-in-out h-full"
                    :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
                    <div v-for="(image, index) in images" :key="index" class="w-full h-full flex-shrink-0">
                        <NuxtImg v-if="!image.placeholder && image.path !== '/img-placeholder.jpg'"
                            :src="'cl/' + image.path" :alt="image.alt"
                            class="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                            @click="openFullscreen" format="webp" quality="90" :width="600" :height="800" fit="inside"
                            :background="backgroundColor" />
                        <img v-else src="/img-placeholder.jpg" alt="Ürün Resmi"
                            class="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                            @click="openFullscreen" />
                    </div>
                </div>

                <!-- Zoom İkonu (sadece resim modunda) -->
                <div v-if="currentMediaType === 'image'"
                    class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    @click="openFullscreen">
                    <div
                        class="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200">
                        <UIcon name="i-heroicons-magnifying-glass-plus" class="w-5 h-5 text-white" />
                    </div>
                </div>

                <!-- Video Açıklama Overlay (eğer varsa) -->
                <div v-if="currentMediaType === 'video' && currentVideo && currentVideo.description"
                    class="absolute bottom-4 left-4 right-4">
                    <div class="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <p class="text-white text-sm">{{ currentVideo.description }}</p>
                    </div>
                </div>

                <!-- Navigasyon Okları -->
                <template v-if="totalMediaCount > 1">
                    <!-- Sol Ok -->
                    <button @click="prevMedia"
                        class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                    </button>

                    <!-- Sağ Ok -->
                    <button @click="nextMedia"
                        class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                    </button>
                </template>

                <!-- Medya Sayacı -->
                <div v-if="totalMediaCount > 1" class="absolute bottom-4 right-4">
                    <div class="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <span class="text-white text-sm font-medium">{{ currentIndex + 1 }} / {{ totalMediaCount
                        }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Thumbnail Grid -->
        <div v-if="totalMediaCount > 1" class="mt-4 hidden md:block">
            <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                <!-- Video Thumbnail -->
                <button v-if="hasVideo" @click="goToVideo" :class="{
                    'ring-2 ring-secondary-500 ring-offset-2': currentMediaType === 'video',
                    'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1': currentMediaType !== 'video'
                }"
                    class="h-24 relative aspect-square rounded-lg overflow-hidden bg-neutral-100 transition-all duration-300 hover:scale-105">
                    <img :src="videoThumbnailUrl" alt="Video" class="w-full h-full object-cover" />
                    <!-- Video Play İkonu -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <UIcon name="i-heroicons-play" class="w-4 h-4 text-white ml-0.5" />
                        </div>
                    </div>
                </button>

                <!-- Resim Thumbnails -->
                <button v-for="(image, index) in images" :key="'img-' + index" @click="goToImage(index)" :class="{
                    'ring-2 ring-secondary-500 ring-offset-2': currentMediaType === 'image' && index === currentImageIndex,
                    'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1': !(currentMediaType === 'image' && index === currentImageIndex)
                }"
                    class="h-24 relative aspect-square rounded-lg overflow-hidden bg-neutral-100 transition-all duration-300 hover:scale-105">
                    <NuxtImg v-if="!image.placeholder && image.path !== '/img-placeholder.jpg'"
                        :src="'cl/' + image.path" :alt="image.alt" class="w-full h-full object-cover" format="webp"
                        quality="60" :width="120" :height="120" fit="contain" />
                    <img v-else src="/img-placeholder.jpg" alt="Ürün Resmi" class="w-full h-full object-cover" />
                </button>
            </div>
        </div>

        <!-- Navigate Dots (Mobil) -->
        <div v-if="totalMediaCount > 1" class="mt-4 flex justify-center md:hidden px-4">
            <div class="flex space-x-2">
                <button v-if="hasVideo" @click="goToVideo" :class="{
                    'bg-secondary-500 scale-110': currentMediaType === 'video',
                    'bg-neutral-300 hover:bg-neutral-400': currentMediaType !== 'video'
                }" class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-105" />

                <button v-for="(image, index) in images" :key="'dot-' + index" @click="goToImage(index)" :class="{
                    'bg-secondary-500 scale-110': currentMediaType === 'image' && index === currentImageIndex,
                    'bg-neutral-300 hover:bg-neutral-400': !(currentMediaType === 'image' && index === currentImageIndex)
                }" class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-105" />
            </div>
        </div>

        <!-- Fullscreen Modal (sadece resimler için) -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isFullscreen && currentMediaType === 'image'"
                    class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm" @click="closeFullscreen">
                    <!-- Modal Content - bu kısmı aynı bırakıyoruz -->
                    <div class="flex items-center justify-center h-full p-4 pt-16 pb-16">
                        <div ref="imageContainer" class="relative w-full h-full max-w-none overflow-hidden touch-none"
                            style="touch-action: none;">
                            <NuxtImg
                                v-if="currentImage && !currentImage.placeholder && currentImage.path !== '/img-placeholder.jpg'"
                                ref="zoomImage" :src="'cl/' + currentImage.path" :alt="currentImage.alt"
                                class="w-full h-full object-contain rounded-lg cursor-grab touch-none" format="webp"
                                quality="95" @click.stop="closeFullscreen" fit="cover" />
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { getVideoEmbedUrl as getEmbedUrl } from '~/utils/videoHelpers.js';

const props = defineProps({
    images: Array,
    video: Object,
    colorVideo: Object, // Renk-spesifik video
    alt: String,
    currentIndex: Number
});

// Dark mode reactive tracking
const isDarkMode = ref(false);

// Dynamic background color based on theme
const backgroundColor = computed(() => {
    return isDarkMode.value ? '#262626' : '#f5f5f5';
});

// Dark mode durumunu kontrol et
const checkDarkMode = () => {
    if (process.client) {
        isDarkMode.value = document.documentElement.classList.contains('dark');
    }
};

// Component mount edildiğinde ve theme değiştiğinde kontrol et
onMounted(() => {
    checkDarkMode();

    const observer = new MutationObserver(() => {
        checkDarkMode();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    onUnmounted(() => {
        observer.disconnect();
    });
});

// Video ve resim verilerini hazırla
const images = computed(() => {
    return props.images && props.images.length > 0
        ? props.images.map((i: any) => ({
            ...i,
            path: i.path || '/img-placeholder.jpg',
            alt: props.alt || 'Ürün Resmi',
        }))
        : [
            {
                id: 0,
                path: '/img-placeholder.jpg',
                alt: 'Placeholder Image',
                placeholder: true,
            },
        ];
});

// Öncelikli olarak renk videosunu, yoksa genel ürün videosunu kullan
const activeVideo = computed(() => {
    return props.colorVideo || props.video;
});

const hasVideo = computed(() => {
    return activeVideo.value && activeVideo.value.url;
});

const currentVideo = computed(() => {
    if (!hasVideo.value || !activeVideo.value) return null;

    return {
        url: activeVideo.value.url,
        type: activeVideo.value.type,
        thumbnail: activeVideo.value.thumbnail,
        description: activeVideo.value.description,
        is_featured: activeVideo.value.is_featured,
        embedUrl: getVideoEmbedUrl(activeVideo.value.url, activeVideo.value.type)
    };
});

const totalMediaCount = computed(() => {
    return images.value.length + (hasVideo.value ? 1 : 0);
});

// Medya kontrolü
const currentMediaType = ref('image'); // 'video' veya 'image'
const currentImageIndex = ref(0);
const currentIndex = computed(() => {
    if (currentMediaType.value === 'video') {
        return 0; // Video her zaman ilk sırada
    }
    return hasVideo.value ? currentImageIndex.value + 1 : currentImageIndex.value;
});

const currentImage = computed(() => {
    if (currentMediaType.value === 'image') {
        return images.value[currentImageIndex.value];
    }
    return null;
});

// Video helper fonksiyonları
const getVideoEmbedUrl = (url: string, type: string) => {
    if (!url) return null;
    return getEmbedUrl(url, type, false);
};

const videoThumbnailUrl = computed(() => {
    if (!hasVideo.value || !activeVideo.value) return null;

    // Manuel thumbnail varsa onu kullan
    if (activeVideo.value.thumbnail) {
        return activeVideo.value.thumbnail;
    }

    // Otomatik thumbnail oluştur
    switch (activeVideo.value.type) {
        case 'youtube':
            const youtubeMatch = activeVideo.value.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            return youtubeMatch ? `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg` : null;
        case 'vimeo':
            // Vimeo için API call gerekli, şimdilik default resim
            return '/video-placeholder.jpg';
        default:
            return '/video-placeholder.jpg';
    }
});

// Navigasyon fonksiyonları
const goToVideo = () => {
    currentMediaType.value = 'video';
};

const goToImage = (index: number) => {
    currentMediaType.value = 'image';
    currentImageIndex.value = index;
};

const prevMedia = () => {
    if (currentMediaType.value === 'video') {
        // Video'dan önceki son resme git
        if (images.value.length > 0) {
            currentMediaType.value = 'image';
            currentImageIndex.value = images.value.length - 1;
        }
    } else {
        // Resim modunda
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        } else {
            // İlk resimden video'ya git (eğer varsa)
            if (hasVideo.value) {
                currentMediaType.value = 'video';
            } else {
                // Video yoksa son resme git
                currentImageIndex.value = images.value.length - 1;
            }
        }
    }
};

const nextMedia = () => {
    if (currentMediaType.value === 'video') {
        // Video'dan sonraki ilk resme git
        if (images.value.length > 0) {
            currentMediaType.value = 'image';
            currentImageIndex.value = 0;
        }
    } else {
        // Resim modunda
        if (currentImageIndex.value < images.value.length - 1) {
            currentImageIndex.value++;
        } else {
            // Son resimden video'ya git (eğer varsa) veya ilk resme dön
            if (hasVideo.value) {
                currentMediaType.value = 'video';
            } else {
                currentImageIndex.value = 0;
            }
        }
    }
};

// Fullscreen modal
const isFullscreen = ref(false);

const openFullscreen = () => {
    if (currentMediaType.value === 'image') {
        isFullscreen.value = true;
        document.body.style.overflow = 'hidden';
    }
};

const closeFullscreen = () => {
    isFullscreen.value = false;
    document.body.style.overflow = '';
};

// Props'daki değişiklikleri izle
watch(
    () => props.currentIndex,
    (newIndex) => {
        if (newIndex !== undefined && newIndex !== null && newIndex >= 0) {
            if (hasVideo.value && newIndex === 0) {
                currentMediaType.value = 'video';
            } else {
                currentMediaType.value = 'image';
                currentImageIndex.value = hasVideo.value ? newIndex - 1 : newIndex;
            }
        }
    },
    { immediate: true }
);

// Renk videosu prop değişikliklerini izle
watch(
    () => [props.colorVideo, props.video],
    ([newColorVideo, newVideo]) => {
        // Sadece renk videosu durumunda kontrol et
        if (newColorVideo) {
            // Renk videosu varsa ve öne çıkan ise video göster
            if (newColorVideo.is_featured) {
                currentMediaType.value = 'video';
            } else {
                // Renk videosu var ama öne çıkan değilse resim göster
                currentMediaType.value = 'image';
                currentImageIndex.value = 0;
            }
        } else if (newVideo) {
            // Renk videosu yok, genel video var
            if (newVideo.is_featured) {
                currentMediaType.value = 'video';
            } else {
                currentMediaType.value = 'image';
                currentImageIndex.value = 0;
            }
        } else {
            // Hiç video yok
            currentMediaType.value = 'image';
            currentImageIndex.value = 0;
        }
    },
    { immediate: false }
);

// Başlangıç durumu ayarla
onMounted(() => {
    // Öncelik sırası: 1. Renk videosu, 2. Genel video, 3. Resim
    const shouldShowVideo =
        (props.colorVideo && props.colorVideo.is_featured) ||
        (!props.colorVideo && props.video && props.video.is_featured);

    if (shouldShowVideo) {
        currentMediaType.value = 'video';
    } else {
        currentMediaType.value = 'image';
        currentImageIndex.value = 0;
    }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>