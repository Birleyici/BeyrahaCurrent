<template>
    <div>
        <!-- Video İzleme Butonu -->
        <div v-if="hasVideo" class="mt-4">
            <button @click="openVideoModal"
                class="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <UIcon name="i-heroicons-play" class="w-5 h-5" />
                <span>Ürünün Videosunu İzle</span>
            </button>
        </div>

        <!-- Video Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isVideoModalOpen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
                    @click="closeVideoModal">

                    <!-- Modal Header -->
                    <div class="flex-shrink-0 p-4 z-10">
                        <div class="flex items-center justify-between">
                            <div class="text-white">
                                <h3 class="text-lg font-medium">{{ title || 'Ürün Videosu' }}</h3>
                                <p v-if="currentVideo?.description" class="text-sm text-white/80 mt-1">{{
                                    currentVideo.description }}</p>
                            </div>
                            <button @click="closeVideoModal"
                                class="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors duration-200">
                                <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <!-- Video Container -->
                    <div class="flex-1 flex items-center justify-center p-4">
                        <div class="w-full h-full max-w-7xl max-h-full bg-black rounded-xl overflow-hidden" @click.stop>

                            <!-- YouTube Video -->
                            <iframe v-if="currentVideo?.type === 'youtube'" :src="currentVideo.embedUrl"
                                class="w-full h-full" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>

                            <!-- Vimeo Video -->
                            <iframe v-else-if="currentVideo?.type === 'vimeo'" :src="currentVideo.embedUrl"
                                class="w-full h-full" frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
                                allowfullscreen>
                            </iframe>

                            <!-- Local/External Video -->
                            <video v-else-if="currentVideo?.url" :src="currentVideo.url"
                                class="w-full h-full object-cover" controls autoplay :poster="currentVideo.thumbnail">
                                Tarayıcınız video oynatmayı desteklemiyor.
                            </video>

                            <!-- Fallback -->
                            <div v-else class="w-full h-full flex items-center justify-center text-white">
                                <div class="text-center">
                                    <UIcon name="i-heroicons-exclamation-triangle"
                                        class="w-16 h-16 mx-auto mb-4 text-red-500" />
                                    <p class="text-lg">Video yüklenemedi</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    video: Object,
    colorVideo: Object,
    title: String
});

const isVideoModalOpen = ref(false);

// Video verilerini hazırla
const currentVideo = computed(() => {
    // Önce renk-spesifik video, sonra genel video
    const video = props.colorVideo || props.video;
    if (!video || !video.url) return null;

    let embedUrl = '';
    if (video.type === 'youtube') {
        const videoId = extractYouTubeId(video.url);
        embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';
    } else if (video.type === 'vimeo') {
        const videoId = extractVimeoId(video.url);
        embedUrl = videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : '';
    }

    return {
        ...video,
        embedUrl
    };
});

const hasVideo = computed(() => !!currentVideo.value);

// Video ID çıkarma fonksiyonları
const extractYouTubeId = (url) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

const extractVimeoId = (url) => {
    const patterns = [
        /vimeo\.com\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

// Modal işlemleri
const openVideoModal = () => {
    isVideoModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeVideoModal = () => {
    isVideoModalOpen.value = false;
    document.body.style.overflow = '';
};

// Klavye işlemleri
const handleKeydown = (e) => {
    if (isVideoModalOpen.value && e.key === 'Escape') {
        closeVideoModal();
    }
};

// Event listener'ları ekle
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