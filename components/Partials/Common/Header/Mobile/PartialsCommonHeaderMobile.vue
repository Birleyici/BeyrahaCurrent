<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">

    <PartialsCommonHeaderSlideNestedMenu v-model="$uiStore.state.menuSlide" :menu="props.categories" />

    <LazyPartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />

    <LazyPartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <Icon @click="$uiStore.state.menuSlide = true" name="ph:list" class="w-8 h-8 cursor-pointer" />

        <Icon @click="$changeMainState({ isOpenSearch: true })" name="ph:magnifying-glass" class="w-7 h-7" />
      </p>

      <NuxtLink href="/">
        <img :src="logoSrc" class="mx-auto " width="102" height="45" />
      </NuxtLink>

      <LazyPartialsCommonSearchInput></LazyPartialsCommonSearchInput>
      <div>
        <div class="flex items-center space-x-4 font-medium">

          <UIcon @click="$uiStore.state.accountSlide = true" name="i-heroicons-user-circle" class="w-8 h-8" />

          <div class="relative" @click="$uiStore.state.cartSlide = true">
            <ClientOnly>
              <div class="relative">
                <UChip :text="props.cart.cartQyt" size="2xl" position="top-right">
                  <UButton variant="ghost" color="gray" class="p-0 cursor-pointer select-none">
                    <template #trailing>
                      <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8" />
                    </template>
                  </UButton>
                </UChip>
                <span
                  class="text-[10px] absolute left-1/2 -translate-x-1/2 -bottom-3 text-red-500 bg-slate-50 p-[2px] rounded-md">
                  {{ formatPrice(props.cart.cartTotalAmount) }}</span>
              </div>
            </ClientOnly>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["categories", "cart"]);
const logoSrc = "/logo.jpg";
</script>
