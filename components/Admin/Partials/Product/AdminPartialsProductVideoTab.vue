<template>
    <div class="space-y-4 sm:space-y-6">
        <!-- Video Yönetimi Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Video Yönetimi
                </h3>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                    {{ hasColorAttribute ? 'Renk bazlı video yönetimi' : 'Genel ürün video yönetimi' }}
                </p>
            </div>
            <UButton v-if="!showForm && (!hasVideo || hasColorAttribute)" @click="showForm = true"
                icon="i-heroicons-plus" size="sm" color="primary" class="w-full sm:w-auto">
                Video Ekle
            </UButton>
        </div>

        <!-- Renk Seçimi (Eğer renk niteliği varsa) -->
        <div v-if="hasColorAttribute"
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6">
            <div class="space-y-4">
                <h4 class="text-base font-medium text-neutral-900 dark:text-neutral-100">Renk Seçimi</h4>
                <div class="flex flex-wrap gap-2">
                    <button v-for="color in colorTerms" :key="color.product_attribute_term_id"
                        @click="selectColor(color)" :class="{
                            'bg-primary-500 text-white border-primary-500': selectedColorTermId === color.product_attribute_term_id,
                            'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-primary-300': selectedColorTermId !== color.product_attribute_term_id
                        }"
                        class="relative px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">

                        <!-- Renk Adı -->
                        <span class="text-sm font-medium">{{ color.term_name }}</span>

                        <!-- Video Var İndikatorü -->
                        <UIcon v-if="hasColorVideo(color.product_attribute_term_id)" name="i-heroicons-play"
                            class="w-4 h-4 ml-2 inline-block"
                            :class="selectedColorTermId === color.product_attribute_term_id ? 'text-white' : 'text-green-500'" />
                    </button>
                </div>

                <!-- Seçili Renk Bilgisi -->
                <div v-if="selectedColor" class="flex items-center gap-2 text-sm">
                    <UIcon name="i-heroicons-swatch" class="w-4 h-4 text-primary-500" />
                    <span class="font-medium text-neutral-700 dark:text-neutral-300">Seçili Renk:</span>
                    <span class="text-primary-600 dark:text-primary-400">{{ selectedColor.term_name }}</span>
                </div>
            </div>
        </div>

        <!-- Mevcut Video Önizleme -->
        <div v-if="hasVideo && !showForm"
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6">
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div class="flex flex-wrap items-center gap-2">
                        <UIcon name="i-heroicons-play-circle" class="w-5 h-5 text-green-600" />
                        <span class="font-medium text-neutral-900 dark:text-neutral-100">
                            {{ hasColorAttribute ? `${selectedColor?.term_name} Video` : 'Ürün Video' }}
                        </span>
                        <UBadge :color="getVideoTypeBadgeColor(videoData.type)" variant="soft" size="sm">
                            {{ getVideoTypeLabel(videoData.type) }}
                        </UBadge>
                        <UBadge v-if="videoData.is_featured" color="yellow" variant="soft" size="sm">
                            Öne Çıkan
                        </UBadge>
                    </div>
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <UButton @click="showForm = true" icon="i-heroicons-pencil" size="sm" color="gray"
                            variant="soft" class="flex-1 sm:flex-none">
                            Düzenle
                        </UButton>
                        <UButton @click="confirmDeleteVideo" icon="i-heroicons-trash" size="sm" color="red"
                            variant="soft" class="flex-1 sm:flex-none">
                            Sil
                        </UButton>
                    </div>
                </div>

                <!-- Video Önizleme -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div class="aspect-video bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                        <!-- YouTube Önizleme -->
                        <iframe
                            v-if="videoData.type === 'youtube' && getVideoEmbedUrl(videoData.url, videoData.type) && getVideoEmbedUrl(videoData.url, videoData.type).includes('/embed/')"
                            :src="getVideoEmbedUrl(videoData.url, videoData.type)" class="w-full h-full" frameborder="0"
                            allow="autoplay; encrypted-media" allowfullscreen></iframe>

                        <!-- Vimeo Önizleme -->
                        <iframe
                            v-else-if="videoData.type === 'vimeo' && getVideoEmbedUrl(videoData.url, videoData.type)"
                            :src="getVideoEmbedUrl(videoData.url, videoData.type)" class="w-full h-full" frameborder="0"
                            allow="autoplay; encrypted-media" allowfullscreen></iframe>

                        <!-- Local/External Video Önizleme -->
                        <video v-else-if="videoData.type === 'local' || videoData.type === 'external'"
                            :src="videoData.url" class="w-full h-full object-cover" controls
                            :poster="videoData.thumbnail">
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>

                        <!-- Hata durumu -->
                        <div v-else class="w-full h-full flex items-center justify-center text-center p-4">
                            <div>
                                <UIcon name="i-heroicons-exclamation-triangle"
                                    class="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                <p class="text-sm text-neutral-600 dark:text-neutral-400">Video yüklenemedi</p>
                                <p class="text-xs text-neutral-500 dark:text-neutral-500 mt-1">URL geçerli değil</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div>
                            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Video URL</label>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400 break-all">{{ videoData.url }}</p>
                        </div>
                        <div v-if="videoData.description">
                            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Açıklama</label>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ videoData.description }}</p>
                        </div>
                        <div v-if="videoData.thumbnail">
                            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Thumbnail
                                URL</label>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400 break-all">{{ videoData.thumbnail
                                }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video Ekleme/Düzenleme Formu -->
        <div v-if="showForm"
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6">

            <!-- Renk Seçimi Uyarısı -->
            <div v-if="hasColorAttribute && !selectedColorTermId"
                class="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-600" />
                    <p class="text-sm text-amber-700 dark:text-amber-400">
                        Video eklemek için önce bir renk seçin.
                    </p>
                </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-4"
                :class="{ 'opacity-50 pointer-events-none': hasColorAttribute && !selectedColorTermId }">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
                    <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                        {{ hasVideo ? 'Video Düzenle' : 'Video Ekle' }}
                        <span v-if="hasColorAttribute && selectedColor" class="text-primary-600 dark:text-primary-400">
                            - {{ selectedColor.term_name }}
                        </span>
                    </h4>
                    <UButton @click="cancelForm" icon="i-heroicons-x-mark" size="sm" color="gray" variant="ghost" />
                </div>

                <!-- Video URL -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Video URL <span class="text-red-500">*</span>
                    </label>
                    <UInput v-model="form.video_url"
                        placeholder="https://www.youtube.com/watch?v=... veya https://vimeo.com/..." class="w-full"
                        :error="errors.video_url" />
                    <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        YouTube, Vimeo veya doğrudan video dosya URL'si desteklenir
                    </p>
                </div>

                <!-- Video Türü ve Thumbnail URL - Mobilde dikey -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Video Türü -->
                    <div>
                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Video Türü
                        </label>
                        <USelect v-model="form.video_type" :options="videoTypeOptions" class="w-full" />
                    </div>

                    <!-- Thumbnail URL -->
                    <div>
                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Thumbnail URL (Opsiyonel)
                        </label>
                        <UInput v-model="form.video_thumbnail" placeholder="https://example.com/thumbnail.jpg"
                            class="w-full" />
                    </div>
                </div>

                <!-- Thumbnail açıklama -->
                <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 -mt-2">
                    Boş bırakılırsa otomatik olarak oluşturulur (YouTube için)
                </p>

                <!-- Video Açıklaması -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Video Açıklaması (Opsiyonel)
                    </label>
                    <UTextarea v-model="form.video_description" placeholder="Video hakkında açıklama..." :rows="3"
                        class="w-full" />
                </div>

                <!-- Öne Çıkan Video -->
                <div class="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <UCheckbox v-model="form.is_video_featured" id="is_video_featured" class="mt-0.5" />
                    <div class="flex-1">
                        <label for="is_video_featured"
                            class="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                            Bu videoyu ürün sayfasında öne çıkar
                        </label>
                        <p class="text-xs text-gray-500 mt-1">
                            Öne çıkan videolar ürün galerilerinde öncelikli olarak gösterilir
                        </p>
                    </div>
                </div>

                <!-- Form Butonları -->
                <div
                    class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <UButton @click="cancelForm" color="gray" variant="soft"
                        class="w-full sm:w-auto order-2 sm:order-1">
                        İptal
                    </UButton>
                    <UButton type="submit" :loading="isSubmitting"
                        :disabled="!form.video_url || (hasColorAttribute && !selectedColorTermId)"
                        class="w-full sm:w-auto order-1 sm:order-2">
                        {{ hasVideo ? 'Güncelle' : 'Ekle' }}
                    </UButton>
                </div>
            </form>
        </div>

        <!-- Video Önizleme (Form açıkken) -->
        <div v-if="showForm && form.video_url && detectedVideoType"
            class="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4">
            <h5 class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Önizleme</h5>
            <div class="aspect-video bg-neutral-100 dark:bg-neutral-600 rounded-lg overflow-hidden">
                <iframe
                    v-if="(detectedVideoType === 'youtube' || detectedVideoType === 'vimeo') && getVideoEmbedUrl(form.video_url, detectedVideoType)"
                    :src="getVideoEmbedUrl(form.video_url, detectedVideoType)" class="w-full h-full" frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <video v-else-if="detectedVideoType === 'local' || detectedVideoType === 'external'"
                    :src="form.video_url" class="w-full h-full object-cover" controls>
                    Tarayıcınız video oynatmayı desteklemiyor.
                </video>
                <div v-else class="w-full h-full flex items-center justify-center text-center p-4">
                    <div>
                        <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Video önizlenemedi</p>
                        <p class="text-xs text-neutral-500 dark:text-neutral-500 mt-1">URL formatı kontrol edin</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    productId: {
        type: [Number, String],
        required: true
    },
    initialVideoData: {
        type: Object,
        default: () => null
    },
    productAttributes: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['videoUpdated', 'videoDeleted']);

// State
const showForm = ref(false);
const isSubmitting = ref(false);
const videoData = ref(props.initialVideoData || {});
const errors = ref({});
const selectedColorTermId = ref(null);
const selectedColor = ref(null);
const colorVideos = ref(new Map()); // ColorTermId -> VideoData

// Form data
const form = ref({
    video_url: '',
    video_type: 'youtube',
    video_thumbnail: '',
    video_description: '',
    is_video_featured: false
});

// Video türü seçenekleri
const videoTypeOptions = [
    { label: 'YouTube', value: 'youtube' },
    { label: 'Vimeo', value: 'vimeo' },
    { label: 'Doğrudan Video', value: 'local' },
    { label: 'Harici URL', value: 'external' }
];

// Computed
const hasColorAttribute = computed(() => {
    return colorTerms.value.length > 0;
});

const colorTerms = computed(() => {
    const colorAttribute = props.productAttributes.find(attr => attr.attribute_name === 'Renk');
    return colorAttribute?.product_attribute_terms || [];
});

const hasVideo = computed(() => {
    if (hasColorAttribute.value) {
        return selectedColorTermId.value && colorVideos.value.has(selectedColorTermId.value);
    }
    return videoData.value && videoData.value.url;
});

const detectedVideoType = computed(() => {
    if (!form.value.video_url) return null;
    return detectVideoType(form.value.video_url);
});

// Methods
const hasColorVideo = (colorTermId) => {
    return colorVideos.value.has(colorTermId);
};

const selectColor = async (color) => {
    selectedColorTermId.value = color.product_attribute_term_id;
    selectedColor.value = color;

    // Seçili rengin videosunu yükle
    await loadColorVideo(color.product_attribute_term_id);

    // Form'u kapat
    showForm.value = false;
    resetForm();
};

const loadColorVideo = async (colorTermId) => {
    try {
        const response = await useBaseOFetchWithAuth(`product-attribute-terms/${colorTermId}/video`);
        if (response.has_video) {
            colorVideos.value.set(colorTermId, {
                id: response.video_data.id,
                url: response.video_data.video_url,
                type: response.video_data.video_type,
                thumbnail: response.video_data.video_thumbnail,
                description: response.video_data.video_description,
                is_featured: response.video_data.is_video_featured
            });
            videoData.value = colorVideos.value.get(colorTermId);
        } else {
            colorVideos.value.delete(colorTermId);
            videoData.value = {};
        }
    } catch (error) {
        // 404 hatası normaldir, video yoksa
        if (error.status !== 404) {
            console.error('Renk videosu yüklenirken hata:', error);
        }
        colorVideos.value.delete(colorTermId);
        videoData.value = {};
    }
};

// Video türü otomatik tespiti
const detectVideoType = (url) => {
    if (!url) return null;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return 'youtube';
    }
    if (url.includes('vimeo.com')) {
        return 'vimeo';
    }

    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension)) {
        return 'local';
    }

    return 'external';
};

// Video embed URL oluşturma
const getVideoEmbedUrl = (url, type) => {
    if (!url) {
        return null;
    }

    switch (type) {
        case 'youtube':
            // YouTube video ID'sini çıkar
            let videoId = null;

            // youtube.com/watch?v=VIDEO_ID formatı
            if (url.includes('youtube.com/watch')) {
                const match = url.match(/[?&]v=([^&]+)/);
                if (match) {
                    videoId = match[1];
                }
            }
            // youtube.com/shorts/VIDEO_ID formatı (YouTube Shorts)
            else if (url.includes('youtube.com/shorts/')) {
                const match = url.match(/youtube\.com\/shorts\/([^?&]+)/);
                if (match) {
                    videoId = match[1];
                }
            }
            // youtu.be/VIDEO_ID formatı
            else if (url.includes('youtu.be/')) {
                const match = url.match(/youtu\.be\/([^?&]+)/);
                if (match) {
                    videoId = match[1];
                }
            }
            // youtube.com/embed/VIDEO_ID formatı (zaten embed)
            else if (url.includes('youtube.com/embed/')) {
                const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
                if (match) {
                    videoId = match[1];
                }
            }

            if (videoId) {
                // Video ID'yi temizle (11 karakter olmalı)
                videoId = videoId.substring(0, 11);
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                return embedUrl;
            }

            return url; // Orijinal URL döndür, null değil

        case 'vimeo':
            const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
            return vimeoMatch ? `https://player.vimeo.com/video/${vimeoMatch[1]}` : url;
        default:
            return url;
    }
};

// Video türü badge rengi
const getVideoTypeBadgeColor = (type) => {
    switch (type) {
        case 'youtube': return 'red';
        case 'vimeo': return 'blue';
        case 'local': return 'green';
        default: return 'gray';
    }
};

// Video türü etiketi
const getVideoTypeLabel = (type) => {
    switch (type) {
        case 'youtube': return 'YouTube';
        case 'vimeo': return 'Vimeo';
        case 'local': return 'Yerel Video';
        case 'external': return 'Harici URL';
        default: return 'Bilinmeyen';
    }
};

// URL değiştiğinde türü otomatik ayarla
watch(() => form.value.video_url, (newUrl) => {
    if (newUrl) {
        const detected = detectVideoType(newUrl);
        if (detected) {
            form.value.video_type = detected;
        }
    }
});

// Form metodları
const resetForm = () => {
    form.value = {
        video_url: '',
        video_type: 'youtube',
        video_thumbnail: '',
        video_description: '',
        is_video_featured: false
    };
    errors.value = {};
};

const loadFormData = () => {
    if (hasVideo.value) {
        const currentVideo = hasColorAttribute.value
            ? colorVideos.value.get(selectedColorTermId.value)
            : videoData.value;

        form.value = {
            video_url: currentVideo.url || '',
            video_type: currentVideo.type || 'youtube',
            video_thumbnail: currentVideo.thumbnail || '',
            video_description: currentVideo.description || '',
            is_video_featured: Boolean(currentVideo.is_featured)
        };
    }
};

const cancelForm = () => {
    showForm.value = false;
    resetForm();
};

// API çağrıları
const submitForm = async () => {
    if (!form.value.video_url) {
        errors.value.video_url = 'Video URL gereklidir';
        return;
    }

    if (hasColorAttribute.value && !selectedColorTermId.value) {
        useToast().add({
            title: 'Hata',
            description: 'Lütfen önce bir renk seçin',
            color: 'red'
        });
        return;
    }

    isSubmitting.value = true;
    errors.value = {};

    try {
        let response;

        if (hasColorAttribute.value) {
            // Renk bazlı video
            response = await useBaseOFetchWithAuth(`product-attribute-terms/${selectedColorTermId.value}/video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    video_url: form.value.video_url,
                    video_type: form.value.video_type,
                    video_thumbnail: form.value.video_thumbnail || null,
                    video_description: form.value.video_description || null,
                    is_video_featured: form.value.is_video_featured
                })
            });

            // Renk videosunu cache'e ekle
            const newVideoData = {
                id: response.video_data.id,
                url: response.video_data.video_url,
                type: response.video_data.video_type,
                thumbnail: response.video_data.video_thumbnail,
                description: response.video_data.video_description,
                is_featured: Boolean(response.video_data.is_video_featured)
            };

            colorVideos.value.set(selectedColorTermId.value, newVideoData);
            videoData.value = newVideoData;

        } else {
            // Genel ürün videosu
            response = await useBaseOFetchWithAuth(`products/${props.productId}/video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    video_url: form.value.video_url,
                    video_type: form.value.video_type,
                    video_thumbnail: form.value.video_thumbnail || null,
                    video_description: form.value.video_description || null,
                    is_video_featured: form.value.is_video_featured
                })
            });

            const newVideoData = {
                url: response.video_data.video_url,
                type: response.video_data.video_type,
                thumbnail: response.video_data.video_thumbnail,
                description: response.video_data.video_description,
                is_featured: Boolean(response.video_data.is_video_featured)
            };

            videoData.value = newVideoData;
        }

        showForm.value = false;
        resetForm();

        emit('videoUpdated', videoData.value);

        useToast().add({
            title: 'Başarılı',
            description: response.message,
            color: 'green'
        });

    } catch (error) {
        if (error.data?.errors) {
            errors.value = error.data.errors;
        }

        useToast().add({
            title: 'Hata',
            description: error.data?.message || 'Video güncellenirken bir hata oluştu',
            color: 'red'
        });
    } finally {
        isSubmitting.value = false;
    }
};

const confirmDeleteVideo = () => {
    if (confirm('Bu videoyu silmek istediğinizden emin misiniz?')) {
        deleteVideo();
    }
};

const deleteVideo = async () => {
    try {
        if (hasColorAttribute.value && selectedColorTermId.value) {
            // Renk bazlı video silme
            await useBaseOFetchWithAuth(`product-attribute-terms/${selectedColorTermId.value}/video`, {
                method: 'DELETE'
            });

            colorVideos.value.delete(selectedColorTermId.value);
        } else {
            // Genel ürün videosu silme
            await useBaseOFetchWithAuth(`products/${props.productId}/video`, {
                method: 'DELETE'
            });
        }

        videoData.value = {};
        showForm.value = false;
        resetForm();

        emit('videoDeleted');

        useToast().add({
            title: 'Başarılı',
            description: 'Video başarıyla silindi',
            color: 'green'
        });

    } catch (error) {
        useToast().add({
            title: 'Hata',
            description: error.data?.message || 'Video silinirken bir hata oluştu',
            color: 'red'
        });
    }
};

// Props değişikliklerini izle
watch(() => props.initialVideoData, (newData) => {
    if (newData && !hasColorAttribute.value) {
        videoData.value = {
            ...newData,
            is_featured: Boolean(newData.is_featured)
        };
    } else {
        videoData.value = {};
    }
}, { immediate: true });

// Renk terme video verilerini yükle
watch(() => props.productAttributes, async (newAttributes) => {
    if (newAttributes && hasColorAttribute.value) {
        // Tüm renklerin video verilerini yükle
        for (const color of colorTerms.value) {
            if (color.term_videos && color.term_videos.length > 0) {
                const videoData = color.term_videos[0];
                colorVideos.value.set(color.product_attribute_term_id, {
                    id: videoData.id,
                    url: videoData.video_url,
                    type: videoData.video_type,
                    thumbnail: videoData.video_thumbnail,
                    description: videoData.video_description,
                    is_featured: Boolean(videoData.is_video_featured)
                });
            }
        }
    }
}, { immediate: true, deep: true });

// Form açıldığında data yükle
watch(showForm, (isShown) => {
    if (isShown && hasVideo.value) {
        loadFormData();
    }
});
</script>