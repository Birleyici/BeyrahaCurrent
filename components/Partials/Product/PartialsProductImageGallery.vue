<template>
  <!-- Ana carousel -->
  <UCarousel ref="carouselRef" :items="images" :ui="{
    item: 'basis-full',
    container: 'rounded-none lg:rounded-lg',
    indicators: $device.isMobile ? {
      wrapper: 'absolute duration-300 bottom-2 mt-4 flex justify-center space-x-2',  // Indicator wrapper
      item: 'rounded-full cursor-pointer',  // Common style for all indicators
      active: 'w-5 bg-orange-500',  // Active indicator color (Orange)
      inactive: 'bg-white'   // Inactive indicator color (Gray)
    } : false
  }" :prev-button="{
    color: 'gray',
    icon: 'i-heroicons-arrow-left-20-solid',
    class: images.length > 1 ? 'absolute' : 'hidden',
  }" :next-button="{
    color: 'gray',
    icon: 'i-heroicons-arrow-right-20-solid',
    class: images.length > 1 ? 'absolute' : 'hidden',
  }" indicators arrows class="w-full mx-auto">
    <template #default="{ item }">
      <NuxtImg :src="'aws' + item.path" :alt="props.alt"
        class="w-full min-h-[300px] zoomable transition-transform duration-300 border lg:rounded-lg" draggable="false"
        width="600" height="900" fit="cover" alt="" loading="lazy" quality="90" format="webp" />
    </template>
  </UCarousel>

  <!-- Küçük resimler için carousel -->
  <div class="mt-4" v-if="!$device.isMobile">
    <UCarousel :items="images" :ui="{
      item: 'basis-[60px] px-2',
      container: 'overflow-x-auto whitespace-nowrap scrollbar-hide flex justify-start',
    }" :arrows="true" :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
      class: 'absolute -left-2',
    }" :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
      class: 'absolute -right-2',
    }">
      <template #default="{ item, index }">
        <NuxtImg :src="'aws' + item.path" class="border-2 rounded-md cursor-pointer min-w-16" width="60" height="90"
          :class="currentImageIndex === index ? 'border-orange-500' : ''" @click="goToImage(index)" size="2xs" />
      </template>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["images", "alt"]);
const currentImageIndex = ref(0);

const placeholderImage = "/img-placeholder.jpg";

const images = computed(() => {
  return props.images && props.images.length > 0
    ? props.images.map((i) => ({
      ...i,
      path: i.path || placeholderImage,
      alt: props.alt
    }))
    : [{ id: 0, path: placeholderImage, alt: "Placeholder Image", placeholder: true }];
});

const goToImage = (index: number) => {
  currentImageIndex.value = index;
  carouselRef.value?.select(index);
};

const clicked = ref(false);
const carouselRef = ref();

const toggleZoom = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target) {
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (clicked.value) {
      target.style.transform = "scale(1)";
      clicked.value = false;
    } else {
      target.style.transformOrigin = `${x}% ${y}%`;
      target.style.transform = "scale(1.5)";
      clicked.value = true;
    }
  }
};

const addZoomListeners = (img: HTMLElement) => {
  img.addEventListener("click", toggleZoom);
};

const removeZoomListeners = (img: HTMLElement) => {
  img.removeEventListener("click", toggleZoom);
};

onMounted(() => {
  const imgs = document.querySelectorAll(".zoomable");
  imgs.forEach((img) => addZoomListeners(img as HTMLElement));
});

onUnmounted(() => {
  const imgs = document.querySelectorAll(".zoomable");
  imgs.forEach((img) => removeZoomListeners(img as HTMLElement));
});

watch(() => props.images, (newVal) => {
  carouselRef.value?.select(0);
});
</script>
