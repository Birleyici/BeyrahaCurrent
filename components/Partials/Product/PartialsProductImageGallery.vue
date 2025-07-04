<template>
    <div class="w-full md:max-w-2xl md:mx-auto">
        <!-- Ana Resim Alanı -->
        <div class="relative group">
            <!-- Ana Resim -->
            <div class="relative aspect-[3/4] bg-neutral-100 md:rounded-2xl overflow-hidden"
                @touchstart="handleMainTouchStart" @touchmove="handleMainTouchMove" @touchend="handleMainTouchEnd">

                <!-- Resim Görünümü -->
                <div class="flex transition-transform duration-500 ease-in-out h-full"
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

                <!-- Zoom İkonu -->
                <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    @click="openFullscreen">
                    <div
                        class="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200">
                        <UIcon name="i-heroicons-magnifying-glass-plus" class="w-5 h-5 text-white" />
                    </div>
                </div>

                <!-- Navigasyon Okları -->
                <template v-if="images.length > 1">
                    <!-- Sol Ok -->
                    <button @click="prevImage"
                        class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                    </button>

                    <!-- Sağ Ok -->
                    <button @click="nextImage"
                        class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                    </button>
                </template>

                <!-- Resim Sayacı -->
                <div v-if="images.length > 1" class="absolute bottom-4 right-4">
                    <div class="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <span class="text-white text-sm font-medium">{{ currentImageIndex + 1 }} / {{ images.length
                        }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Thumbnail Grid (Sadece masaüstünde görünür) -->
        <div v-if="images.length > 1" class="mt-4 hidden md:block">
            <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                <button v-for="(image, index) in images" :key="'img-' + index" @click="goToImage(index)" :class="{
                    'ring-2 ring-secondary-500 ring-offset-2': index === currentImageIndex,
                    'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1': index !== currentImageIndex
                }"
                    class="h-24 relative aspect-square rounded-lg overflow-hidden bg-neutral-100 transition-all duration-300 hover:scale-105">
                    <NuxtImg v-if="!image.placeholder && image.path !== '/img-placeholder.jpg'"
                        :src="'cl/' + image.path" :alt="image.alt" class="w-full h-full object-cover" format="webp"
                        quality="60" :width="120" :height="120" fit="contain" />
                    <img v-else src="/img-placeholder.jpg" alt="Ürün Resmi" class="w-full h-full object-cover" />
                </button>
            </div>
        </div>

        <!-- Video Butonu (Sadece masaüstünde görünür) -->
        <div v-if="hasVideo" class="mt-4 hidden md:flex justify-center">
            <button @click="openVideoModal"
                class="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg px-6 py-3 flex items-center space-x-3 transition-all duration-300 hover:from-red-600 hover:to-pink-600 shadow-lg hover:scale-105 group">
                <UIcon name="i-heroicons-play-circle-solid"
                    class="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                <span class="text-sm font-medium text-white">Ürün Videosunu İzle</span>
            </button>
        </div>

        <!-- Navigate Dots ve Video Butonu (Sadece mobilde görünür) -->
        <div v-if="images.length > 1 || hasVideo" class="mt-4 flex flex-col items-center space-y-3 md:hidden px-4">
            <!-- Navigate Dots -->
            <div v-if="images.length > 1" class="flex space-x-2">
                <button v-for="(image, index) in images" :key="'dot-' + index" @click="goToImage(index)" :class="{
                    'bg-secondary-500 scale-110': index === currentImageIndex,
                    'bg-neutral-300 hover:bg-neutral-400': index !== currentImageIndex
                }" class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-105" />
            </div>

            <!-- Video Butonu -->
            <div v-if="hasVideo">
                <button @click="openVideoModal"
                    class="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg px-4 py-2 flex items-center space-x-2 transition-all duration-300 hover:from-red-600 hover:to-pink-600 shadow-lg hover:scale-105">
                    <UIcon name="i-heroicons-play-circle-solid" class="w-5 h-5 text-white" />
                    <span class="text-sm font-medium text-white">Videoyu İzle</span>
                </button>
            </div>
        </div>

        <!-- Fullscreen Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isFullscreen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                    @click="closeFullscreen">
                    <!-- Modal Header -->
                    <div class="absolute top-0 left-0 right-0 z-10 p-4">
                        <div class="flex items-center justify-between">
                            <div class="text-white">
                                <span class="text-sm font-medium">{{ currentImageIndex + 1 }} / {{ images.length
                                }}</span>
                            </div>
                            <button @click="closeFullscreen"
                                class="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors duration-200">
                                <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <!-- Modal Content -->
                    <div class="flex items-center justify-center h-full p-4 pt-16 pb-16">
                        <div ref="imageContainer" class="relative w-full h-full max-w-none overflow-hidden touch-none"
                            style="touch-action: none;" @wheel="handleWheel" @mousedown="handleMouseDown"
                            @mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"
                            @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                            <NuxtImg v-if="!currentImage.placeholder && currentImage.path !== '/img-placeholder.jpg'"
                                ref="zoomImage" :src="'cl/' + currentImage.path" :alt="currentImage.alt"
                                :style="imageStyle"
                                class="w-full h-full object-contain rounded-lg cursor-grab touch-none" :class="{
                                    'cursor-grabbing': isDragging,
                                    'transition-transform duration-200': !isDragging && zoomLevel === 1,
                                    'transition-none': isDragging || zoomLevel > 1
                                }" format="webp" quality="95" @click.stop="handleImageClick"
                                @dblclick.stop="handleImageDoubleClick" @dragstart.prevent fit="cover" />
                            <img v-else ref="zoomImage" src="/img-placeholder.jpg" :alt="currentImage.alt"
                                :style="imageStyle"
                                class="w-full h-full object-contain rounded-lg cursor-grab touch-none" :class="{
                                    'cursor-grabbing': isDragging,
                                    'transition-transform duration-200': !isDragging && zoomLevel === 1,
                                    'transition-none': isDragging || zoomLevel > 1
                                }" @click.stop="handleImageClick" @dblclick.stop="handleImageDoubleClick"
                                @dragstart.prevent />

                            <!-- Zoom Kontrolleri -->
                            <div class="absolute bottom-4 right-4 flex flex-col space-y-3">
                                <button @click.stop="zoomIn" @touchend.stop="zoomIn"
                                    class="bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors duration-200 touch-none min-w-[48px] min-h-[48px] flex items-center justify-center"
                                    style="touch-action: manipulation;">
                                    <UIcon name="i-heroicons-plus" class="w-6 h-6 text-white" />
                                </button>
                                <button @click.stop="zoomOut" @touchend.stop="zoomOut"
                                    class="bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors duration-200 touch-none min-w-[48px] min-h-[48px] flex items-center justify-center"
                                    style="touch-action: manipulation;">
                                    <UIcon name="i-heroicons-minus" class="w-6 h-6 text-white" />
                                </button>
                                <button @click.stop="resetZoom" @touchend.stop="resetZoom"
                                    class="bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors duration-200 touch-none min-w-[48px] min-h-[48px] flex items-center justify-center"
                                    style="touch-action: manipulation;">
                                    <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-white" />
                                </button>
                            </div>

                            <!-- Zoom Seviyesi Göstergesi -->
                            <div v-if="zoomLevel > 1" class="absolute top-4 left-4">
                                <div class="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                    <span class="text-white text-sm font-medium">{{ Math.round(zoomLevel * 100)
                                    }}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Navigation -->
                    <template v-if="images.length > 1">
                        <button @click.stop="prevImage"
                            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-200">
                            <UIcon name="i-heroicons-chevron-left" class="w-6 h-6 text-white" />
                        </button>
                        <button @click.stop="nextImage"
                            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-200">
                            <UIcon name="i-heroicons-chevron-right" class="w-6 h-6 text-white" />
                        </button>
                    </template>
                </div>
            </Transition>
        </Teleport>

        <!-- Video Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isVideoModalOpen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                    @click="closeVideoModal">
                    <!-- Modal Header -->
                    <div class="absolute top-0 left-0 right-0 z-10 p-4">
                        <div class="flex items-center justify-between">
                            <div class="text-white">
                                <span class="text-lg font-medium">{{ videoTitle }}</span>
                            </div>
                            <button @click="closeVideoModal"
                                class="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors duration-200">
                                <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <!-- Modal Content -->
                    <div class="flex items-center justify-center h-full p-4 pt-16 pb-16">
                        <div class="w-full h-full max-w-5xl">
                            <div v-if="currentVideoData" class="w-full h-full">
                                <!-- YouTube Video -->
                                <iframe v-if="currentVideoData.type === 'youtube'"
                                    :src="`https://www.youtube.com/embed/${getYouTubeId(currentVideoData.url)}?autoplay=1&rel=0`"
                                    class="w-full h-full rounded-lg" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                                </iframe>

                                <!-- Vimeo Video -->
                                <iframe v-else-if="currentVideoData.type === 'vimeo'"
                                    :src="`https://player.vimeo.com/video/${getVimeoId(currentVideoData.url)}?autoplay=1`"
                                    class="w-full h-full rounded-lg" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                                </iframe>

                                <!-- Local Video -->
                                <video v-else-if="currentVideoData.type === 'local'" :src="currentVideoData.url"
                                    class="w-full h-full rounded-lg" controls autoplay>
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
    images: Array,
    alt: String,
    currentIndex: Number,
    video: Object,
    colorVideo: Object,
    title: String
});

const images = computed(() => {
    return props.images && props.images.length > 0
        ? props.images.map((i) => ({
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

// Resim galerisi için temel değişkenler
const currentImageIndex = ref(props.currentIndex || 0);
const isFullscreen = ref(false);

// Zoom değişkenleri
const zoomLevel = ref(1);
const panX = ref(0);
const panY = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const lastPanX = ref(0);
const lastPanY = ref(0);

// Touch değişkenleri
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchStartTime = ref(0);
const isTouching = ref(false);

// Mobil swipe değişkenleri
const mainTouchStartX = ref(0);
const mainTouchStartY = ref(0);
const mainTouchStartTime = ref(0);
const mainIsTouching = ref(false);

// Pinch zoom değişkenleri
const lastTouchDistance = ref(0);
const initialTouchDistance = ref(0);

// Refs
const imageContainer = ref(null);
const zoomImage = ref(null);

// Renk değişkenleri
const backgroundColor = '#f5f5f5';

// Video değişkenleri
const isVideoModalOpen = ref(false);

// Computed properties
const currentImage = computed(() => images.value[currentImageIndex.value] || images.value[0]);

const imageStyle = computed(() => ({
    transform: `translate(${panX.value}px, ${panY.value}px) scale(${zoomLevel.value})`,
    transformOrigin: 'center center',
}));

// Video kontrolü
const hasVideo = computed(() => {
    return (props.video && props.video.url) || (props.colorVideo && props.colorVideo.url);
});

// Aktif video verisi
const currentVideoData = computed(() => {
    // Önce renk videosunu kontrol et
    if (props.colorVideo && props.colorVideo.url) {
        return props.colorVideo;
    }
    // Sonra genel video
    if (props.video && props.video.url) {
        return props.video;
    }
    return null;
});

// Video başlığı
const videoTitle = computed(() => {
    if (props.title) {
        return props.title;
    }
    return 'Video';
});

// Resim navigasyonu
const nextImage = () => {
    if (images.value.length > 1) {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    }
};

const prevImage = () => {
    if (images.value.length > 1) {
        currentImageIndex.value = currentImageIndex.value === 0 ? images.value.length - 1 : currentImageIndex.value - 1;
    }
};

const goToImage = (index) => {
    currentImageIndex.value = index;
};

// Fullscreen işlemleri
const openFullscreen = () => {
    isFullscreen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
    isFullscreen.value = false;
    document.body.style.overflow = '';
    resetZoom();
};

// Video modal işlemleri
const openVideoModal = () => {
    isVideoModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeVideoModal = () => {
    isVideoModalOpen.value = false;
    document.body.style.overflow = '';
};

// YouTube ID çıkarma
const getYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Vimeo ID çıkarma
const getVimeoId = (url) => {
    const regex = /(?:vimeo\.com\/)([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Zoom işlemleri
const zoomIn = () => {
    if (zoomLevel.value < 3) {
        zoomLevel.value = Math.min(zoomLevel.value * 1.5, 3);
        limitPan();
    }
};

const zoomOut = () => {
    if (zoomLevel.value > 1) {
        zoomLevel.value = Math.max(zoomLevel.value / 1.5, 1);
        if (zoomLevel.value === 1) {
            panX.value = 0;
            panY.value = 0;
        } else {
            limitPan();
        }
    }
};

const resetZoom = () => {
    zoomLevel.value = 1;
    panX.value = 0;
    panY.value = 0;
};

// Mouse işlemleri
const handleMouseDown = (e) => {
    if (zoomLevel.value > 1) {
        isDragging.value = true;
        dragStartX.value = e.clientX - panX.value;
        dragStartY.value = e.clientY - panY.value;
        lastPanX.value = panX.value;
        lastPanY.value = panY.value;
    }
};

const handleMouseMove = (e) => {
    if (isDragging.value && zoomLevel.value > 1) {
        panX.value = e.clientX - dragStartX.value;
        panY.value = e.clientY - dragStartY.value;
        limitPan();
    }
};

const handleMouseUp = () => {
    isDragging.value = false;
};

const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoomLevel.value * delta, 1), 3);

    if (newZoom !== zoomLevel.value) {
        const rect = imageContainer.value?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const mouseX = e.clientX - rect.left - centerX;
            const mouseY = e.clientY - rect.top - centerY;

            const zoomRatio = newZoom / zoomLevel.value;

            panX.value = mouseX - (mouseX - panX.value) * zoomRatio;
            panY.value = mouseY - (mouseY - panY.value) * zoomRatio;

            zoomLevel.value = newZoom;
            limitPan();
        }
    }
};

const handleImageClick = (e) => {
    // Resme tıklandığında hiçbir şey yapma - sadece çift tıklama için hazır bekle
};

const handleImageDoubleClick = (e) => {
    if (zoomLevel.value === 1) {
        // Çift tıklama - zoom yap
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        zoomLevel.value = 2;
        panX.value = -x * 0.5;
        panY.value = -y * 0.5;
        limitPan();
    }
};

// Touch işlemleri
const getTouchDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
};

const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
        // Tek parmak - pan veya çift dokunma
        isTouching.value = true;
        touchStartX.value = e.touches[0].clientX - panX.value;
        touchStartY.value = e.touches[0].clientY - panY.value;
        touchStartTime.value = Date.now();
    } else if (e.touches.length === 2) {
        // İki parmak - pinch zoom
        isTouching.value = false;
        initialTouchDistance.value = getTouchDistance(e.touches);
        lastTouchDistance.value = initialTouchDistance.value;
    }
};

const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isTouching.value && zoomLevel.value > 1) {
        // Tek parmak - pan (sadece zoom yapılmışsa)
        e.preventDefault();
        panX.value = e.touches[0].clientX - touchStartX.value;
        panY.value = e.touches[0].clientY - touchStartY.value;
        limitPan();
    } else if (e.touches.length === 2) {
        // İki parmak - pinch zoom
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches);
        const distanceRatio = currentDistance / lastTouchDistance.value;

        const newZoom = Math.min(Math.max(zoomLevel.value * distanceRatio, 1), 3);

        if (newZoom !== zoomLevel.value) {
            // Parmaklar arasındaki merkez noktayı al
            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            const rect = imageContainer.value?.getBoundingClientRect();
            if (rect) {
                const relativeX = centerX - rect.left - rect.width / 2;
                const relativeY = centerY - rect.top - rect.height / 2;

                const zoomRatio = newZoom / zoomLevel.value;

                panX.value = relativeX - (relativeX - panX.value) * zoomRatio;
                panY.value = relativeY - (relativeY - panY.value) * zoomRatio;

                zoomLevel.value = newZoom;
                limitPan();
            }
        }

        lastTouchDistance.value = currentDistance;
    }
};

const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
        if (isTouching.value) {
            isTouching.value = false;
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime.value;

            if (touchDuration < 200 && zoomLevel.value === 1) {
                // Çift dokunma kontrolü
                const now = Date.now();
                const timeSinceLastTouch = now - (lastTouchTime.value || 0);

                if (timeSinceLastTouch < 300) {
                    // Çift dokunma - zoom yap
                    const rect = e.target.getBoundingClientRect();
                    const x = e.changedTouches[0].clientX - rect.left - rect.width / 2;
                    const y = e.changedTouches[0].clientY - rect.top - rect.height / 2;

                    zoomLevel.value = 2;
                    panX.value = -x * 0.5;
                    panY.value = -y * 0.5;
                    limitPan();

                    // Son dokunma zamanını sıfırla
                    lastTouchTime.value = 0;
                } else {
                    // İlk dokunma - hiçbir şey yapma, sadece zamanı kaydet
                    lastTouchTime.value = now;
                }
            }
        }
    }
};

// Çift dokunma kontrolü için
const lastTouchTime = ref(0);

// Ana resim alanı touch işlemleri
const handleMainTouchStart = (e) => {
    if (e.touches.length === 1) {
        mainIsTouching.value = true;
        mainTouchStartX.value = e.touches[0].clientX;
        mainTouchStartY.value = e.touches[0].clientY;
        mainTouchStartTime.value = Date.now();
    }
};

const handleMainTouchMove = (e) => {
    if (mainIsTouching.value && e.touches.length === 1) {
        // Sadece yatay hareket varsa preventDefault yap (swipe için)
        const deltaX = Math.abs(e.touches[0].clientX - mainTouchStartX.value);
        const deltaY = Math.abs(e.touches[0].clientY - mainTouchStartY.value);

        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault();
        }
    }
};

const handleMainTouchEnd = (e) => {
    if (mainIsTouching.value) {
        mainIsTouching.value = false;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - mainTouchStartTime.value;

        if (touchDuration < 300) {
            const deltaX = e.changedTouches[0].clientX - mainTouchStartX.value;
            const deltaY = Math.abs(e.changedTouches[0].clientY - mainTouchStartY.value);

            // Sadece swipe hareketi için navigasyon yap
            if (Math.abs(deltaX) > 50 && deltaY < 100) {
                if (deltaX > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }
            // Tek dokunma için hiçbir şey yapma - fullscreen açma
        }
    }
};

// Klavye işlemleri
const handleKeydown = (e) => {
    if (isFullscreen.value) {
        switch (e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case '+':
            case '=':
                zoomIn();
                break;
            case '-':
                zoomOut();
                break;
            case '0':
                resetZoom();
                break;
        }
    } else if (isVideoModalOpen.value) {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    }
};

// Pan sınırlarını kontrol et
const limitPan = () => {
    if (!imageContainer.value || !zoomImage.value) return;

    // DOM element olup olmadığını kontrol et
    if (typeof zoomImage.value.getBoundingClientRect !== 'function') return;

    try {
        const containerRect = imageContainer.value.getBoundingClientRect();
        const imageRect = zoomImage.value.getBoundingClientRect();

        const maxPanX = Math.max(0, (imageRect.width - containerRect.width) / 2);
        const maxPanY = Math.max(0, (imageRect.height - containerRect.height) / 2);

        panX.value = Math.min(Math.max(panX.value, -maxPanX), maxPanX);
        panY.value = Math.min(Math.max(panY.value, -maxPanY), maxPanY);
    } catch (error) {
        // Hata durumunda sessizce devam et
        console.warn('limitPan error:', error);
    }
};

// Props currentIndex değişikliklerini izle
watch(() => props.currentIndex, (newIndex) => {
    if (newIndex !== undefined && newIndex !== null && newIndex >= 0) {
        currentImageIndex.value = newIndex;
    }
}, { immediate: true });

// Resim değiştiğinde zoom'u sıfırla
watch(currentImageIndex, () => {
    resetZoom();
});

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
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

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
}
</style>