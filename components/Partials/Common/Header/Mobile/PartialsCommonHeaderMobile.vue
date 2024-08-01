<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">

    <PartialsCommonHeaderSlideNestedMenu v-model="menuStatus" :menu="props.categories" />

    <PartialsCommonHeaderSlideAccount v-model="accountStatus" />

    <PartialsCommonHeaderSlideCart v-model="cartStatus" />

    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <Icon @click="menuStatus = true" name="ph:list" class="w-8 h-8 cursor-pointer" />

        <Icon @click="$changeMainState({ isOpenSearch: true })" name="ph:magnifying-glass" class="w-7 h-7" />
      </p>

      <NuxtLink href="/">
        <img :src="logoSrc" class="mx-auto min-w-[100px] max-w-[100px]" />
      </NuxtLink>

      <PartialsCommonSearchInput></PartialsCommonSearchInput>
      <div>
        <div class="flex items-center space-x-4 font-medium">

          <UIcon @click="accountStatus = true" name="i-heroicons-user-circle" class="w-8 h-8" />

          <div class="relative" @click="cartStatus = true">
            <ClientOnly>
              <UChip  :text="props.cart.cartQyt" size="2xl" position="bottom-right">
                <UButton  variant="ghost" color="gray" class="p-0 cursor-pointer select-none">
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
const menuStatus = ref(false);
const accountStatus = ref(false);
const cartStatus = ref(false);
const logoSrc = "/logo.jpg";
</script>
