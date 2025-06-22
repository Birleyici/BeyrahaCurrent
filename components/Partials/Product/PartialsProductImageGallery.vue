<template>
  <div class="w-full md:max-w-2xl md:mx-auto">
    <!-- Ana Resim Alanı -->
    <div class="relative group">
      <!-- Ana Resim -->
      <div class="relative aspect-[3/4] bg-neutral-100 md:rounded-2xl overflow-hidden"
        @touchstart="handleMainTouchStart" @touchmove="handleMainTouchMove" @touchend="handleMainTouchEnd">
        <div class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="w-full h-full flex-shrink-0">
            <NuxtImg :src="'cl/' + image.path" :alt="image.alt"
              class="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
              @click="openFullscreen" format="webp" quality="90" :width="600" :height="800" fit="inside"
              :background="backgroundColor" />
          </div>
        </div>

        <!-- Zoom İkonu -->
        <div
          class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          @click="openFullscreen">
          <div class="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200">
            <UIcon name="i-heroicons-magnifying-glass-plus" class="w-5 h-5 text-white" />
          </div>
        </div>

        <!-- Navigasyon Okları (Sadece birden fazla resim varsa) -->
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
            <span class="text-white text-sm font-medium">{{ currentIndex + 1 }} / {{ images.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Thumbnail Grid (Sadece masaüstünde görünür) -->
    <div v-if="images.length > 1" class="mt-4 hidden md:block">
      <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        <button v-for="(image, index) in images" :key="index" @click="goToImage(index)" :class="{
          'ring-2 ring-secondary-500 ring-offset-2': index === currentIndex,
          'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1': index !== currentIndex
        }"
          class="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 transition-all duration-300 hover:scale-105">
          <NuxtImg :src="'cl/' + image.path" :alt="image.alt" class="w-full h-full object-cover" format="webp"
            quality="60" :width="120" :height="120" fit="cover" />
        </button>
      </div>
    </div>

    <!-- Navigate Dots (Sadece mobilde görünür) -->
    <div v-if="images.length > 1" class="mt-4 flex justify-center md:hidden px-4">
      <div class="flex space-x-2">
        <button v-for="(image, index) in images" :key="index" @click="goToImage(index)" :class="{
          'bg-secondary-500 scale-110': index === currentIndex,
          'bg-neutral-300 hover:bg-neutral-400': index !== currentIndex
        }" class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-105" />
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isFullscreen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm" @click="closeFullscreen">
          <!-- Modal Header -->
          <div class="absolute top-0 left-0 right-0 z-10 p-4">
            <div class="flex items-center justify-between">
              <div class="text-white">
                <span class="text-sm font-medium">{{ currentIndex + 1 }} / {{ images.length }}</span>
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
              style="touch-action: none;" @wheel="handleWheel" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
              @mouseup="handleMouseUp" @mouseleave="handleMouseUp" @touchstart="handleTouchStart"
              @touchmove="handleTouchMove" @touchend="handleTouchEnd">
              <NuxtImg ref="zoomImage" :src="'cl/' + currentImage.path" :alt="currentImage.alt" :style="imageStyle"
                class="w-full h-full object-contain rounded-lg cursor-grab touch-none" :class="{
                  'cursor-grabbing': isDragging,
                  'transition-transform duration-200': !isDragging && zoomLevel === 1,
                  'transition-none': isDragging || zoomLevel > 1
                }" format="webp" quality="95" @click.stop="handleImageClick" @dragstart.prevent />

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
                  <span class="text-white text-sm font-medium">{{ Math.round(zoomLevel * 100) }}%</span>
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

          <!-- Modal Thumbnails -->
          <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div class="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full p-2">
              <button v-for="(image, index) in images" :key="index" @click.stop="goToImage(index)" :class="{
                'ring-2 ring-white': index === currentIndex,
                'opacity-60 hover:opacity-100': index !== currentIndex
              }" class="w-12 h-12 rounded-lg overflow-hidden transition-all duration-200">
                <NuxtImg :src="'cl/' + image.path" :alt="image.alt" class="w-full h-full object-cover" format="webp"
                  quality="50" :width="48" :height="48" fit="cover" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['images', 'alt']);

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

  // Theme değişikliklerini izle
  const observer = new MutationObserver(() => {
    checkDarkMode();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});

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

const currentIndex = ref(0);
const currentImage = computed(() => images.value[currentIndex.value]);

const isFullscreen = ref(false);

const zoomLevel = ref(1);
const panX = ref(0);
const panY = ref(0);
const isDragging = ref(false);
const lastPanX = ref(0);
const lastPanY = ref(0);
const dragStartX = ref(0);
const dragStartY = ref(0);

const lastTouchDistance = ref(0);
const initialTouchDistance = ref(0);

const imageContainer = ref<HTMLElement | null>(null);
const zoomImage = ref<HTMLElement | null>(null);

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const goToImage = (index: number) => {
  currentIndex.value = index;
};

const openFullscreen = () => {
  isFullscreen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
  isFullscreen.value = false;
  document.body.style.overflow = '';
  resetZoom();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!isFullscreen.value) return;

  switch (event.key) {
    case 'Escape':
      closeFullscreen();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});

watch(
  () => props.images,
  () => {
    currentIndex.value = 0;
  }
);

// Computed properties
const imageStyle = computed(() => ({
  transform: `scale(${zoomLevel.value}) translate(${panX.value}px, ${panY.value}px)`,
  transformOrigin: 'center center'
}));

// Zoom functions
const zoomIn = (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  zoomLevel.value = Math.min(zoomLevel.value * 1.5, 5)
  limitPan()
}

const zoomOut = (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  zoomLevel.value = Math.max(zoomLevel.value / 1.5, 1)
  if (zoomLevel.value === 1) {
    panX.value = 0
    panY.value = 0
  } else {
    limitPan()
  }
}

const resetZoom = (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
}

// Mouse events
const handleMouseDown = (event: MouseEvent) => {
  if (zoomLevel.value > 1) {
    isDragging.value = true;
    dragStartX.value = event.clientX - panX.value;
    dragStartY.value = event.clientY - panY.value;
    event.preventDefault();
  }
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value && zoomLevel.value > 1) {
    panX.value = event.clientX - dragStartX.value;
    panY.value = event.clientY - dragStartY.value;
    limitPan();
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const handleImageClick = (event: MouseEvent) => {
  if (zoomLevel.value === 1) {
    // Tıklanan noktaya zoom yap
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    zoomLevel.value = 2;
    panX.value = -x * 0.5;
    panY.value = -y * 0.5;
    limitPan();
  }
};

// Wheel zoom
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? 0.9 : 1.1;
  const newZoom = Math.min(Math.max(zoomLevel.value * delta, 1), 5);

  if (newZoom !== zoomLevel.value) {
    const rect = imageContainer.value?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      const zoomRatio = newZoom / zoomLevel.value;
      panX.value = panX.value * zoomRatio - x * (zoomRatio - 1);
      panY.value = panY.value * zoomRatio - y * (zoomRatio - 1);

      zoomLevel.value = newZoom;

      if (zoomLevel.value === 1) {
        panX.value = 0;
        panY.value = 0;
      } else {
        limitPan();
      }
    }
  }
};

// Touch events for mobile
const getTouchDistance = (touches: TouchList) => {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

const handleTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 2) {
    // Pinch zoom başlangıcı
    initialTouchDistance.value = getTouchDistance(event.touches);
    lastTouchDistance.value = initialTouchDistance.value;
    isDragging.value = false; // Pinch sırasında drag'i devre dışı bırak
  } else if (event.touches.length === 1 && zoomLevel.value > 1) {
    // Single touch drag başlangıcı
    isDragging.value = true;
    dragStartX.value = event.touches[0].clientX - panX.value;
    dragStartY.value = event.touches[0].clientY - panY.value;
    event.preventDefault();
  }
};

const handleTouchMove = (event: TouchEvent) => {
  if (event.touches.length === 2) {
    // Pinch zoom
    event.preventDefault();
    const currentDistance = getTouchDistance(event.touches);
    const scale = currentDistance / lastTouchDistance.value;
    const newZoom = Math.min(Math.max(zoomLevel.value * scale, 1), 5);

    if (Math.abs(newZoom - zoomLevel.value) > 0.01) { // Minimum değişim eşiği
      zoomLevel.value = newZoom;
      lastTouchDistance.value = currentDistance;

      if (zoomLevel.value === 1) {
        panX.value = 0;
        panY.value = 0;
      } else {
        limitPan();
      }
    }
  } else if (event.touches.length === 1 && isDragging.value && zoomLevel.value > 1) {
    // Single touch drag
    event.preventDefault();
    const newPanX = event.touches[0].clientX - dragStartX.value;
    const newPanY = event.touches[0].clientY - dragStartY.value;

    // Sadece belirli bir mesafe hareket edildiğinde güncelle
    const deltaX = Math.abs(newPanX - panX.value);
    const deltaY = Math.abs(newPanY - panY.value);

    if (deltaX > 2 || deltaY > 2) { // Minimum hareket eşiği
      panX.value = newPanX;
      panY.value = newPanY;
      limitPan();
    }
  }
};

const handleTouchEnd = (event: TouchEvent) => {
  if (event.touches.length === 0) {
    isDragging.value = false;
  } else if (event.touches.length === 1 && !isDragging.value) {
    // Pinch'ten single touch'a geçiş
    if (zoomLevel.value > 1) {
      isDragging.value = true;
      dragStartX.value = event.touches[0].clientX - panX.value;
      dragStartY.value = event.touches[0].clientY - panY.value;
    }
  }
};

// Pan limiting
const limitPan = () => {
  if (!imageContainer.value) return;

  const containerRect = imageContainer.value.getBoundingClientRect();
  const maxPanX = (containerRect.width * (zoomLevel.value - 1)) / 2;
  const maxPanY = (containerRect.height * (zoomLevel.value - 1)) / 2;

  panX.value = Math.min(maxPanX, Math.max(-maxPanX, panX.value));
  panY.value = Math.min(maxPanY, Math.max(-maxPanY, panY.value));
};

// Ana resim alanı için swipe fonksiyonları
const mainTouchStartX = ref(0);
const mainTouchStartY = ref(0);
const mainTouchEndX = ref(0);
const mainTouchEndY = ref(0);
const isMainSwiping = ref(false);

const handleMainTouchStart = (event: TouchEvent) => {
  if (images.value.length <= 1) return;

  mainTouchStartX.value = event.touches[0].clientX;
  mainTouchStartY.value = event.touches[0].clientY;
  isMainSwiping.value = true;
};

const handleMainTouchMove = (event: TouchEvent) => {
  if (!isMainSwiping.value || images.value.length <= 1) return;

  // Dikey scroll'u engellememek için yatay hareket kontrolü
  const deltaX = event.touches[0].clientX - mainTouchStartX.value;
  const deltaY = event.touches[0].clientY - mainTouchStartY.value;

  // Eğer yatay hareket dikey hareketten fazlaysa scroll'u engelle
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    event.preventDefault();
  }
};

const handleMainTouchEnd = (event: TouchEvent) => {
  if (!isMainSwiping.value || images.value.length <= 1) return;

  mainTouchEndX.value = event.changedTouches[0].clientX;
  mainTouchEndY.value = event.changedTouches[0].clientY;

  const deltaX = mainTouchEndX.value - mainTouchStartX.value;
  const deltaY = mainTouchEndY.value - mainTouchStartY.value;

  // Minimum swipe mesafesi (50px)
  const minSwipeDistance = 50;

  // Yatay hareket dikey hareketten fazla olmalı
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      // Sağa swipe - önceki resim
      prevImage();
    } else {
      // Sola swipe - sonraki resim  
      nextImage();
    }
  }

  isMainSwiping.value = false;
};
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
