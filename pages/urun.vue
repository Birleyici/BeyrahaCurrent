<template>
  <div class="lg:px-x-desktop max-w-full">
    <div class="lg:grid lg:grid-cols-8 lg:gap-4 xl:gap-16">
      <div class="col-span-3" v-if="useMain().isLoaded">
        <PartialsProductImageGallery :images="product.selectedImages" />
      </div>

      <SkeletonProductGallery v-else></SkeletonProductGallery>

      <div class="col-span-5 my-minimal lg:my-0 px-x-mobil">
        <h1 class="text-2xl font-semibold pb-2">
          {{ product.name }}
        </h1>
        <UDivider class="my-2" type="dashed" />

        <div class="my-minimal">
          <p class="font-medium text-sm">Renk</p>
          <UCarousel
            v-if="useMain().isLoaded"
            v-slot="{ item }"
            :items="product.selectedImages"
            :ui="{ item: 'snap-end' }"
          >
            <NuxtImg
              :src="'aws' + item.path"
              width="60"
              class="m-1 rounded-full p-[2px] border w-16 h-16 object-cover object-top"
            />
          </UCarousel>
          <div class="flex space-x-2" v-else>
            <SkeletonUiThumb v-for="item in 4" :key="item"></SkeletonUiThumb>
          </div>
        </div>

        <PartialsProductVariations></PartialsProductVariations>

        <div
          class="flex justify-between lg:justify-start space-x-4 lg:space-x-8"
        >
          <div class="inline-block">
            <LazyUiFormCounter></LazyUiFormCounter>
          </div>
          <UiButtonsBaseButton
            color="secondary"
            class="!rounded-full font-bold !flex relative text-sm lg:!px-12 px-6 overflow-hidden"
          >
            <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30"></Icon>
            <p>SEPETE EKLE</p>
          </UiButtonsBaseButton>
        </div>
        <div
          class="my-minimal lg:my-maximal bg-tertiary-50 border rounded-md p-4"
        >
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
            :key="item"
          >
            <p class="text-xs">Materyal</p>
            <p class="font-medium">Timsah derisi</p>
          </div>
        </div>
      </LazyUiCardsSectionCard>
    </div>
    <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
      <p class="mb-2 font-bold">Benzer ürünler</p>
      <UiSlidesProductSlide></UiSlidesProductSlide>
    </div>

    <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
      <p class="mb-2 font-bold">Yorum yap</p>

      <LazyUiNotificationBar type="info"
        >Ürüne yalnızca ürünü satın alan oturum açmış kullanıcılar yorum
        yapabilir.
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
import { useNewProductStore } from "~/stores/newProduct.js";
useNewProductStore().getProduct(58);
const product = useNewProductStore().$state;
</script>

