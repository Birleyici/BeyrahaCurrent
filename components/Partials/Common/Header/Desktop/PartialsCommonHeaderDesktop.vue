<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">

    <PartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />

    <PartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <NuxtLink href="/">
          <img :src="logoSrc" class="mx-auto min-w-[100px] max-w-[100px]" />
        </NuxtLink>
      </p>
      <PartialsCommonSearchInput></PartialsCommonSearchInput>
      <div>
        <div class="flex items-center font-medium">
          <p @click="$uiStore.state.accountSlide = true" class="cursor-pointer font-primary text-heading-4 pr-4">
            HESAP
          </p>
          <p @click="$uiStore.state.cartSlide = true" class="cursor-pointer font-primary text-heading-4 px-4">
            SEPET
            <ClientOnly>
              <span class="text-secondary-500">{{ props.cart.cartQyt }}</span>
            </ClientOnly>
          </p>
        </div>
      </div>
    </div>
    <PartialsCommonMegaMenu></PartialsCommonMegaMenu>
  </div>
</template>
<script setup>
const props = defineProps(["categories", "cart"]);
const logoSrc = "/logo.jpg";
</script>
