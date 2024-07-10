<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="relative">
      <img src="https://placehold.co/1400x200/#F8FAFC/f97316" class="hidden md:block rounded-sm" alt="" />
      <img src="https://placehold.co/800x300/#F8FAFC/f97316" class="md:hidden rounded-sm" alt="" />

      <div class="absolute bottom-0 flex justify-end md:justify-between w-full">
        <div class="md:flex hidden">
          <button class="bg-white p-2 mx-2 rounded-t-md text-sm hover:text-secondary-500 duration-300">
            Çok Satanlar
          </button>
          <button class="bg-white p-2 mx-2 rounded-t-md text-sm hover:text-secondary-500 duration-300">
            Yeniler
          </button>
          <button class="bg-white p-2 mx-2 rounded-t-md text-sm hover:text-secondary-500 duration-300">
            İndirimdekiler
          </button>
        </div>
        <button class="bg-white p-2 mx-2 rounded-t-md text-sm hover:text-secondary-500 duration-300">
          Tümünü Gör
        </button>
      </div>
    </div>
    <div class="my-minimal">
      <UiSlidesProductSlide :products="products"></UiSlidesProductSlide>
    </div>
  </div>
</template>

<script setup>
const { getProducts, products } = useProduct()
getProducts(5)

</script>
