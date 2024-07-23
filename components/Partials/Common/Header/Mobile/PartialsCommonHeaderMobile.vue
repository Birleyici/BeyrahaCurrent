<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
    <PartialsCommonHeaderSlideNestedMenu v-model="menuStatus" :menu="props.categories">
    </PartialsCommonHeaderSlideNestedMenu>

    <PartialsCommonHeaderSlideAccount v-model="accountStatus" />


    <USlideover v-model="cartStatus">
      <PartialsCartList></PartialsCartList>
    </USlideover>

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
          <Icon @click="accountStatus = true" name="ph:user" class="w-8 h-8 cursor-pointer"></Icon>
          <Icon @click="cartStatus = true" name="ph:bag-simple" class="w-8 h-8 cursor-pointer"></Icon>
        </div>
      </div>
    </div>
    <PartialsCommonMegaMenu></PartialsCommonMegaMenu>
  </div>
</template>
<script setup>
const props = defineProps(["categories"]);
const menuStatus = ref(false);
const accountStatus = ref(false);
const cartStatus = ref(false);
const logoSrc = "/logo.jpg";
</script>
