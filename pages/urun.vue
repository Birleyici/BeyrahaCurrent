<template>
  <div class="lg:px-x-desktop max-w-full">
    <div class="lg:grid lg:grid-cols-8 lg:gap-4 xl:gap-16">
      <!-- useMain().isLoaded -->
      <!-- <div class="col-span-3 lg:rounded-md border p-2" v-if="useMain().isLoaded">
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :pagination="useMain().isMobile ? true : false"
          :loop="true"
          :spaceBetween="10"
          :navigation="true"
          :zoom="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="mySwiper2 max-w-[500px]"
        >
          <swiper-slide v-for="thumb in product.selectedImages">
            <div class="swiper-zoom-container max-w-[500px]">
              <NuxtImg format="webp" quality="90" loading="lazy" :src="'aws' + thumb.path" sizes="100vw sm:50vw md:1600px" />
              <img
                src="/default-product.jpg"
                class="!object-cover !h-[550px] lg:!rounded-md"
              /> -->
      <!-- </div>
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
            <swiper-slide v-for="thumb in product.selectedImages" class="border rounded-md overflow-hidden"
              ><NuxtImg :src="'aws' + thumb.path" format="webp" quality="90" sizes="150px"
            /></swiper-slide>
          </swiper>
        </div> -->
      <!-- </div> -->
      -->
      <!-- <SkeletonProductGallery v-else></SkeletonProductGallery> -->

      <div class="col-span-5 my-minimal lg:my-0 px-x-mobil">
        <h1 class="text-xl font-semibold border-b border-dotted pb-2">
          {{ product.name }}
        </h1>

        <div class="my-minimal">
          <p class="font-medium text-sm">Renk</p>
          <swiper
            v-if="useMain().isLoaded"
            :breakpoints="breakpoints"
            :spaceBetween="5"
            :freeMode="true"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="item in 5"
              ><NuxtImg
                src="aws/products/1/1-1701881316795.jpg"
                format="webp"
                quality="90"
                loading="lazy"
                height="300"
                class="object-cover rounded-md border border-transparent hover:border-secondary-500"
            /></swiper-slide>
          </swiper>
          <div class="flex space-x-2" v-else>
            <SkeletonUiThumb v-for="item in 4"></SkeletonUiThumb>
          </div>
        </div>

        <LazyPartialsProductVariations></LazyPartialsProductVariations>

        <div class="flex space-x-4 lg:space-x-8">
          <div class="inline-block">
            <LazyUiFormCounter></LazyUiFormCounter>
          </div>
          <UiButtonsBaseButton
            color="secondary"
            class="!rounded-full font-bold !flex text-sm px-12"
          >
            <Icon name="material-symbols:shopping-bag" class="w-5 h-5"></Icon>
            <p>SEPETE EKLE</p>
          </UiButtonsBaseButton>
        </div>
        <div class="my-minimal lg:my-maximal bg-tertiary-50 border rounded-md p-4">
          <p class="font-medium">Öne çıkan bilgiler</p>
          <ul class="list-disc p-4 !pl-5 text-sm">
            <li>15 gün içerisinde ücretsiz iade</li>
            <li v-html="product.description"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="my-minimal lg:my-maximal px-x-mobil lg:px-0">
      <LazyUiCardsSectionCard title="Ürün açıklaması ve özellikleri">
        <div v-html="product.additional_info"></div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4 mt-minimal"
        >
          <div
            class="flex lg:block items-center space-x-4 lg:space-x-0 bg-tertiary-100 p-3 lg:p-4 w-full rounded-sm"
            v-for="item in 8"
          >
            <p class="text-xs">Materyal</p>
            <p class="font-medium">Timsah derisi</p>
          </div>
        </div>
      </LazyUiCardsSectionCard>
    </div>
    <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
      <p class="mb-2 font-bold">Benzer ürünler</p>
      <LazyUiSlidesProductSlide></LazyUiSlidesProductSlide>
    </div>

    <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
      <p class="mb-2 font-bold">Yorum yap</p>

      <LazyUiNotificationBar type="info"
        >Ürüne yalnızca ürünü satın alan oturum açmış kullanıcılar yorum yapabilir.
      </LazyUiNotificationBar>

      <UiFormTextarea
        class="h-60 my-minimal border-quaternary-300"
        placeholder="Yorumunuz"
      ></UiFormTextarea>

      <div
        class="mb-minimal space-y-minimal lg:space-y-0 lg:flex items-center justify-between"
      >
        <UiFormFileInput></UiFormFileInput>
        <UiFormSelect class="!w-full lg:!w-72">
          <option value="">Ürüne puanınız</option>
          <option class="text-secondary-500" value="">★</option>
          <option class="text-secondary-500" value="">★★</option>
          <option class="text-secondary-500" value="">★★★</option>
          <option class="text-secondary-500" value="">★★★★</option>
          <option class="text-secondary-500" value="">★★★★★</option>
        </UiFormSelect>
      </div>
      <UiButtonsBaseButton color="secondary">Yorumu gönder</UiButtonsBaseButton>
    </div>

    <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
      <div class="mb-2 font-bold flex items-end space-x-2">
        <p>Yorumlar</p>
      </div>
      <div class="text-xl my-minimal font-medium flex space-x-2">
        <p class="text-secondary-500">3.8</p>
        <p>(253 değerlendirme)</p>
      </div>

      <div class="grid gap-4 border-b border-dotted pb-3">
        <LazyPartialsCommentItem></LazyPartialsCommentItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pagination, Zoom, FreeMode, Navigation, Thumbs } from "swiper/modules";

import { useNewProductStore } from "~/stores/newProduct.js";
useNewProductStore().getProduct(58);
const product = useNewProductStore().$state;

// import "swiper/css/zoom";
const modules = [Pagination, Zoom, FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const breakpoints = {
  // when window width is >= 320px
  220: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  // when window width is >= 420px (200px + 20px + 200px)
  420: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  // when window width is >= 640px (3 kart için)
  640: {
    slidesPerView: 8,
    spaceBetween: 20,
  },
  // when window width is >= 860px (4 kart için)

  1024: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  1300: {
    slidesPerView: 10,
    spaceBetween: 20,
  },
  // Daha fazla breakpoint ekleyebilirsiniz...
};
</script>

<style scoped>
.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.6;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
