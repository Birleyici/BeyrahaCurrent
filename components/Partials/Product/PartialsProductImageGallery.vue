<template>
  <UCarousel
    ref="carouselRef"
    :items="images"
    :ui="{
      item: 'basis-full',
      container: 'rounded-none lg:rounded-lg',
      indicators: {
        wrapper: 'relative bottom-0 mt-4',
      },
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
      class: images.length > 1 ? 'absolute' : 'hidden',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
      class: images.length > 1 ? 'absolute' : 'hidden',
    }"
    indicators
    arrows
    class="w-full mx-auto"
  >
    <template #default="{ item }">
      <img class="object-cover min-h-[500px]" :src="item.path" v-if="item.placeholder" />
      <NuxtImg
        else
        :src="'aws' + item.path"
        
        class="w-full zoomable transition-transform duration-300 border lg:rounded-lg"
        draggable="false"
        width="600"
        format="webp"
        loading="lazy"
        quality="80"
      />
    </template>

    <template #indicator="{ onClick, page, active }">
      <NuxtImg
        v-if="!$device.isMobile && !images[page - 1]?.placeholder"
        :src="'aws' + images[page - 1]?.path"
        class="w-12 border-2 rounded-md cursor-pointer"
        :class="active ? 'border-orange-500' : ''"
        @click="onClick(page)"
        size="2xs"
      />
      <UButton
        v-else
        variant="solid"
        :color="active ? 'orange' : 'gray'"
        size="2xs"
        class="rounded-full duration-200 w-[10px] h-[10px] justify-center -mt-20"
        :class="active && 'w-4'"
        @click="onClick(page)"
      />
    </template>
  </UCarousel>
</template>

<script setup lang="ts">
const props = defineProps(["images"]);

const placeholderImage = "/img-placeholder.jpg";

const images = computed(() => {
  return props.images && props.images.length > 0
    ? props.images.map((i) => ({
        ...i,
        path: i.path || placeholderImage,
      }))
    : [{ id: 0, path: placeholderImage, alt: "Placeholder Image", placeholder: true }];
});

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

watch(()=>props.images, (newVal) => {
    carouselRef.value?.select(0);
});
</script>
