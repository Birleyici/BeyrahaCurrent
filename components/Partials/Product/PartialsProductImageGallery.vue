<template>
  <div class="max-w-[800px] mx-auto">
    <!-- Büyük Resim Gösterimi -->
    <div class="relative overflow-hidden" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
      @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp">
      <!-- Masaüstü için Sol Ok -->
      <button v-if="!isMobile"
        class="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-[30px] p-[10px] cursor-pointer z-10 left-[10px]"
        @click="prevImage">
        ❮
      </button>
      <!-- Geçiş Efektiyle Resim -->
      <transition name="image-fade" mode="out-in">
        <NuxtImg :key="currentImage.path" :src="'cl/' + currentImage.path" :alt="currentImage.alt"
          class="w-full h-auto cursor-pointer object-cover mx-auto max-w-[380px] md:max-w-full md:rounded-md"
          @click="openFullscreen" format="webp" quality="90" :width="600" :height="900" fit="cover" />
      </transition>

      <!-- Masaüstü için Sağ Ok -->
      <button v-if="!isMobile"
        class="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-[30px] p-[10px] cursor-pointer z-10 right-[10px]"
        @click="nextImage">
        ❯
      </button>
    </div>

    <!-- Mobil Nokta İndikatörleri -->
    <div v-if="isMobile" class="text-center mt-[10px]">
      <span v-for="(image, index) in images" :key="index" class="inline-block w-[10px] h-[10px] rounded-full mx-[5px]"
        :class="index === currentIndex ? 'bg-orange-500 !w-4' : 'bg-gray-400'"></span>
    </div>

    <!-- Masaüstü Küçük Resimler -->
    <div v-else class="flex items-center justify-center mt-[10px]">
      <button v-if="showThumbnailNav" class="cursor-pointer text-[30px] text-black px-[10px]"
        @click="prevThumbnailPage">
        ❮
      </button>
      <div class="flex flex-nowrap overflow-hidden w-full" ref="thumbnailsContainer">
        <NuxtImg v-for="(image, index) in images" :key="index" :src="'cl/' + image.path" :alt="image.alt"
          class="flex-shrink-0 w-[60px] h-[90px] object-cover mr-[10px] cursor-pointer border-2 rounded-md"
          :class="index === currentIndex ? 'border-orange-500' : 'border-transparent'" @click="goToImage(index)"
          format="webp" quality="50" :width="60" :height="90" fit="cover" />
      </div>
      <button v-if="showThumbnailNav" class="cursor-pointer text-[30px] text-black px-[10px]"
        @click="nextThumbnailPage">
        ❯
      </button>
    </div>

    <!-- Tam Ekran Modal -->
    <transition name="fade">
      <div v-if="isFullscreen" class="fixed inset-0 w-full h-full bg-black bg-opacity-90 z-[1000] touch-action-none">
        <UButton @click="closeFullscreen" color="gray" variant="soft" class="absolute right-4 top-4 z-10"
          icon="i-heroicons-x-mark" />
        <div class="flex items-center justify-center h-full overflow-hidden" @touchstart="onFullscreenTouchStart"
          @touchmove="onFullscreenTouchMove" @touchend="onFullscreenTouchEnd" @mousedown="onFullscreenMouseDown"
          @mousemove="onFullscreenMouseMove" @mouseup="onFullscreenMouseUp" @mouseleave="onFullscreenMouseLeave">
          <NuxtImg :src="'cl/' + currentImage.path" :alt="currentImage.alt" ref="fullscreenImage"
            :style="fullscreenImageStyle" @click="toggleZoom" format="webp" quality="90" fit="contain"
            class="w-auto h-full max-w-none max-h-none object-contain" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['images', 'alt']);

const images = computed(() => {
  return props.images && props.images.length > 0
    ? props.images.map((i) => ({
      ...i,
      path: i.path || '/img-placeholder.jpg',
      alt: props.alt || 'Image',
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

const currentIndex = ref(0);
const currentImage = computed(() => images.value[currentIndex.value]);

// Cihaz algılama
const { isMobile } = useDevice();

// Swipe fonksiyonelliği
let startX = 0;
let isSwiping = false;

const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    startX = event.touches[0].clientX;
    isSwiping = true;
  }
};

const onTouchMove = (event) => {
  if (isSwiping) {
    const deltaX = event.touches[0].clientX - startX;
    if (deltaX > 50) {
      // Sağa kaydırma
      prevImage();
      isSwiping = false;
    } else if (deltaX < -50) {
      // Sola kaydırma
      nextImage();
      isSwiping = false;
    }
  }
};

const onTouchEnd = () => {
  isSwiping = false;
};

const onMouseDown = (event) => {
  startX = event.clientX;
  isSwiping = true;
};

const onMouseMove = (event) => {
  if (isSwiping) {
    const deltaX = event.clientX - startX;
    if (deltaX > 50) {
      // Sağa kaydırma
      prevImage();
      isSwiping = false;
    } else if (deltaX < -50) {
      // Sola kaydırma
      nextImage();
      isSwiping = false;
    }
  }
};

const onMouseUp = () => {
  isSwiping = false;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const goToImage = (index) => {
  currentIndex.value = index;
};

// Tam ekran fonksiyonelliği
const isFullscreen = ref(false);
const isZoomed = ref(false);
const zoomScale = ref(1);
const panX = ref(0);
const panY = ref(0);
let isPanning = false;
let panStartX = 0;
let panStartY = 0;

const openFullscreen = () => {
  isFullscreen.value = true;
  isZoomed.value = false;
  zoomScale.value = 1;
  panX.value = 0;
  panY.value = 0;
};

const closeFullscreen = () => {
  isFullscreen.value = false;
  isZoomed.value = false;
  zoomScale.value = 1;
  panX.value = 0;
  panY.value = 0;
};

const toggleZoom = (clientX = null, clientY = null) => {
  if (isZoomed.value) {
    // Zoom'u sıfırla
    zoomScale.value = 1;
    panX.value = 0;
    panY.value = 0;
    isZoomed.value = false;
  } else {
    // Yakınlaştır
    zoomScale.value = 2;
    isZoomed.value = true;
    if (clientX !== null && clientY !== null) {
      // Dokunma noktasına göre pan değerlerini ayarla
      const img = fullscreenImage.value?.$el || fullscreenImage.value?.$img;
      if (img) {
        const rect = img.getBoundingClientRect();
        const offsetX = clientX - rect.left - rect.width / 2;
        const offsetY = clientY - rect.top - rect.height / 2;

        panX.value = -offsetX * (zoomScale.value - 1);
        panY.value = -offsetY * (zoomScale.value - 1);

        limitPan();
      }
    } else {
      panX.value = 0;
      panY.value = 0;
    }
  }
};

const fullscreenImageStyle = computed(() => ({
  transform: `scale(${zoomScale.value}) translate(${panX.value / zoomScale.value}px, ${panY.value / zoomScale.value
    }px)`,
  cursor: isPanning ? 'grabbing' : isZoomed.value ? 'grab' : 'auto',
  transition: 'none', // Transition'ı kaldırdık
  willChange: 'transform', // Donanım hızlandırma için
}));

const onFullscreenMouseDown = (event) => {
  if (!isZoomed.value) return;
  isPanning = true;
  panStartX = event.clientX - panX.value;
  panStartY = event.clientY - panY.value;
};

const onFullscreenMouseMove = (event) => {
  if (isMobile.value) return; // Mobil cihazlarda işlem yapma
  if (!isFullscreen.value) return;

  // Her fare hareketinde yakınlaştırmayı etkinleştir
  isZoomed.value = true;
  zoomScale.value = 2; // Yakınlaştırma seviyesi

  const rect = event.currentTarget.getBoundingClientRect();
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  panX.value = -offsetX * (zoomScale.value - 1);
  panY.value = -offsetY * (zoomScale.value - 1);

  limitPan();
};


const onFullscreenMouseLeave = () => {
  if (isMobile.value) return;

  // Yakınlaştırmayı sıfırla
  isZoomed.value = false;
  zoomScale.value = 1;
  panX.value = 0;
  panY.value = 0;
};

const onFullscreenMouseUp = () => {
  isPanning = false;
};

const onFullscreenTouchStart = (event) => {
  if (event.touches.length === 1) {
    if (!isZoomed.value) {
      // Yakınlaştırmayı başlat ve pan değerlerini ayarla
      toggleZoom(event.touches[0].clientX, event.touches[0].clientY);
    }
    isPanning = true;
    panStartX = event.touches[0].clientX - panX.value;
    panStartY = event.touches[0].clientY - panY.value;
  }
};

const onFullscreenTouchMove = (event) => {
  if (!isPanning) return;
  panX.value = event.touches[0].clientX - panStartX;
  panY.value = event.touches[0].clientY - panStartY;
  limitPan();
};

const onFullscreenTouchEnd = () => {
  isPanning = false;
};

const limitPan = () => {
  const img = fullscreenImage.value?.$el || fullscreenImage.value?.$img;
  if (!img) return;

  const rect = img.getBoundingClientRect();
  const maxPanX = ((zoomScale.value - 1) * rect.width) / 2;
  const maxPanY = ((zoomScale.value - 1) * rect.height) / 2;

  panX.value = Math.min(maxPanX, Math.max(-maxPanX, panX.value));
  panY.value = Math.min(maxPanY, Math.max(-maxPanY, panY.value));
};

const fullscreenImage = ref(null);

onMounted(() => {
  watch(isFullscreen, (newVal) => {
    if (newVal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  });
});

// Thumbnail navigasyonu
const thumbnailsContainer = ref(null);
const showThumbnailNav = computed(() => {
  if (!thumbnailsContainer.value) return false;
  const container = thumbnailsContainer.value;
  return container.scrollWidth > container.clientWidth;
});

const prevThumbnailPage = () => {
  if (!thumbnailsContainer.value) return;
  const container = thumbnailsContainer.value;
  const scrollAmount = container.clientWidth;
  container.scrollLeft -= scrollAmount;
};

const nextThumbnailPage = () => {
  if (!thumbnailsContainer.value) return;
  const container = thumbnailsContainer.value;
  const scrollAmount = container.clientWidth;
  container.scrollLeft += scrollAmount;
};

onBeforeUnmount(() => {
  // Bileşen kaldırıldığında sınıfı temizleyin
  document.body.classList.remove('no-scroll');
});


watch(
  () => props.images,
  (newImages, oldImages) => {
    currentIndex.value = 0;
  }
);
</script>

<style scoped>
/* Geçiş efektleri için özel CSS */
.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.1s;
}

.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* touch-action özelliği için özel CSS */
.touch-action-none {
  touch-action: none;
}

/* Scroll'u engellemek için */
.no-scroll {
  overflow: hidden;
}
</style>
