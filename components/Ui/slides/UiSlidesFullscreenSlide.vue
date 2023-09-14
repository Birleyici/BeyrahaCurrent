<template>
  <div>
    <img
      @click="isOpen = true"
      src="/default-product.jpg"
      class="cursor-pointer w-16 rounded-md"
      alt=""
    />
    <div v-if="isOpen">
      <div
        class="fixed top-0 bottom-0 right-0 left-0 h-full w-full mx-auto my-auto bg-[#00000045] z-10"
      >
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :pagination="useMain().isMobile ? true : false"
          :loop="true"
          :navigation="true"
          :zoom="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="mySwiper2 h-full"
        >
          <swiper-slide v-for="item in 8">
            <div class="swiper-zoom-container mx-auto my-auto max-w-[500px]">
              <img
                src="/default-product.jpg"
                class="!object-cover !h-full lg:!rounded-md"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <button class="fixed right-0 top-0 z-[10]" @click="isOpen = false">
        <Icon name="mdi:close" class="text-tertiary-50 w-20 h-20"></Icon>
      </button>
      <div
        class="fixed left-0 right-0 bottom-0 left-0 bg-black w-full h-full z-[4] opacity-30"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { Pagination, Zoom, FreeMode, Navigation, Thumbs } from "swiper/modules";
const modules = [Pagination, Zoom, FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const isOpen = ref(false);
</script>
