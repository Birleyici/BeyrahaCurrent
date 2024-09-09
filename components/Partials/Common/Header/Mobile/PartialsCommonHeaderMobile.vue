<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
    
    <PartialsCommonHeaderSlideNestedMenu v-model="$uiStore.state.menuSlide" :menu="props.categories" />

    <PartialsCommonHeaderSlideAccount v-model="$uiStore.state.accountSlide" />

    <PartialsCommonHeaderSlideCart v-model="$uiStore.state.cartSlide" />

    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <Icon @click="$uiStore.state.menuSlide = true" name="ph:list" class="w-8 h-8 cursor-pointer" />

        <Icon @click="$changeMainState({ isOpenSearch: true })" name="ph:magnifying-glass" class="w-7 h-7" />
      </p>

      <NuxtLink href="/">
        <img :src="logoSrc" class="mx-auto " width="102" height="45" />
      </NuxtLink>

      <PartialsCommonSearchInput></PartialsCommonSearchInput>
      <div>
        <div class="flex items-center space-x-4 font-medium">

          <UIcon @click="$uiStore.state.accountSlide = true" name="i-heroicons-user-circle" class="w-8 h-8" />

          <div class="relative" @click="$uiStore.state.cartSlide = true">
            <ClientOnly>
              <UChip :text="props.cart.cartQyt" size="2xl" position="bottom-right">
                <UButton variant="ghost" color="gray" class="p-0 cursor-pointer select-none">
                  <template #trailing>
                    <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8" />
                  </template>
                </UButton>
              </UChip>
            </ClientOnly>
          </div>
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
