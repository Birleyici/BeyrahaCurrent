<template>
  <div>
    <img
      @click="isOpen = true"
      src="/default-product.jpg"
      class="cursor-pointer w-16 rounded-md"
      alt=""
    />
    <div v-if="isOpen">
      <div class="fixed top-0 bottom-0 right-0 left-0 z-10">
        <UCarousel
          v-slot="{ item }"
          :items="items"
          :ui="{ item: 'basis-full' }"
          :prev-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-left-20-solid',
            class: 'absolute',
          }"
          :next-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-right-20-solid',
            class: 'absolute',
          }"
          class="rounded-lg h-full"
          arrows
        >
          <img src="/default-product.jpg" class="mx-auto max-h-screen" draggable="false" />
        </UCarousel>
      </div>
      <button class="fixed right-0 top-0 z-[10]" @click="isOpen = false">
        <Icon name="mdi:close" class="text-tertiary-50 w-20 h-20"></Icon>
      </button>
      <div
      @click="isOpen = false"
        class="fixed left-0 right-0 bottom-0 top-0 bg-black z-[4] opacity-30"
      ></div>
    </div>
  </div>
</template>

<script setup>
const thumbsSwiper = ref(null);
const isOpen = ref(false);

const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
];
</script>
