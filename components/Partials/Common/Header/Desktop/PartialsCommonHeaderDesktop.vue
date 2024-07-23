<template>
  <div class="px-x-mobil lg:px-x-desktop pt-minimal pb-minimal">
    
   

    <USlideover v-model="accountStatus">
      <div class="p-8">
        <PartialsFormLoginRegisterForm />
      </div>
    </USlideover>

    <USlideover v-model="cartStatus">
      <PartialsCartList></PartialsCartList>
    </USlideover>

    <div class="flex justify-between items-center">
      <p class="font-primary text-heading-1 flex items-center space-x-3">
        <NuxtLink href="/">
          <img :src="logoSrc" class="mx-auto min-w-[100px] max-w-[100px]" />
        </NuxtLink>
      </p>
      <PartialsCommonSearchInput></PartialsCommonSearchInput>
      <div>
        <div class="flex items-center font-medium">
          <p
            @click="accountStatus = true"
            class="cursor-pointer font-primary text-heading-4 pr-4"
          >
            HESAP
          </p>
          <p
            @click="cartStatus = true"
            class="cursor-pointer font-primary text-heading-4 px-4"
          >
            SEPET
            <span class="text-secondary-500">2</span>
          </p>
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
