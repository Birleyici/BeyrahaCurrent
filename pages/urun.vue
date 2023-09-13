<template>
  <div class=" lg:px-x-desktop max-w-full">
    <div class="lg:grid lg:grid-cols-8 gap-16">
      <div class="col-span-3">
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :pagination="true"
          :loop="true"
          :spaceBetween="10"
          :navigation="true"
          :zoom="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="mySwiper2 max-w-[500px]"
        >
          <swiper-slide v-for="item in 8">
            <div class="swiper-zoom-container !rounded-md max-h-[500px]">
              <img src="/default-product.jpg" class="object-fit" />
            </div>
          </swiper-slide>
        </swiper>
        <div v-if="!useMain().isMobile" class="mt-2">
          <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :spaceBetween="10"
            :slidesPerView="7"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="item in 8"
              ><img src="/default-product.jpg" class="h-32 rounded-md"
            /></swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="col-span-3 responsive-space px-x-mobil">
        <h1 class="text-xl font-bold border-b ">
          Bordo Renk Siyah İpli Deri Erkek Bileklik
        </h1>

        <div class="my-minimal">
          <p class="font-medium text-sm">Renk</p>
          <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :spaceBetween="10"
            :slidesPerView="8"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="item in 16"
              ><img
                src="/default-product.jpg"
                class="object-cover rounded-md border border-transparent hover:border-secondary-500"
            /></swiper-slide>
          </swiper>
        </div>

        <div class="my-medium">
          <p class="font-medium text-sm">Beden</p>
          <div class="flex space-x-2">
            <button
              class="bg-slate-50 border rounded-md p-2 min-w-[40px] focus:bg-secondary-500 focus:text-white duration-300"
            >
              M
            </button>
            <button
              class="bg-slate-50 border rounded-md p-2 min-w-[40px] focus:bg-secondary-500 focus:text-white duration-300"
            >
              L
            </button>
            <button
              class="bg-slate-50 border rounded-md p-2 min-w-[40px] focus:bg-secondary-500 focus:text-white duration-300"
            >
              XL
            </button>
          </div>
        </div>

        <div class="my-minimal">
          <p class="text-secondary-500 text-3xl font-bold">129.00 TL</p>
        </div>

        <div class="flex space-x-4 lg:space-x-8">
          <div class="inline-block">
            <div class="flex items-center space-x-6 border rounded-full p-1 h-12">
              <div
                class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10"
              >
                <Icon name="ph:minus-thin" class="w-4 h-4"></Icon>
              </div>
              <div>1</div>
              <div
                class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10"
              >
                <Icon name="ph:plus-thin" class="w-4 h-4"></Icon>
              </div>
            </div>
          </div>
          <UiButtonsBaseButton
            color="secondary"
            class="!rounded-full text-sm font-bold !h-12 px-8 h-full items-center flex md:space-x-4"
          >
            <Icon name="material-symbols:shopping-bag" class="w-5 h-5"></Icon>
            <p>SEPETE EKLE</p>
          </UiButtonsBaseButton>
        </div>
      </div>
      <div class="bg-slate-50 rounded-md col-span-2"></div>
    </div>
  </div>
</template>

<script setup>
import {Pagination, Zoom, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css/zoom";

const modules = [Pagination, Zoom, FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>

<style>
.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  /* opacity: 0.4; */
}

/* .mySwiper .swiper-slide-thumb-active {
   opacity: 1; 
} */

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
