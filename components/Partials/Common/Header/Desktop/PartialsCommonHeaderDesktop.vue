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
    <div class="scroll-container my-8 w-full whitespace-nowrap bg-slate-100  rounded-sm p-2">
      <p
        v-for="cat in props.categories"
        :key="cat.id"
        class="font-medium border-r px-4 first:pl-0 last:border-r-0 cursor-pointer inline-block"
        @click="openMenu(cat)"
      >
        {{ cat.name }}
      </p>
    </div>
    

    <PartialsCommonHeaderSlideNestedMenu
      v-model="$uiStore.state.menuSlide"
      :menu="props.categories"
      :selected-category="selectedCategory"
    />
  </div>
</template>

<script setup>
const props = defineProps(["categories", "cart"]);
const logoSrc = "/logo.jpg";
const selectedCategory = ref(null); // selectedCategory ref olarak tanımlandı

const openMenu = (cat) => {
  selectedCategory.value = cat; // selectedCategory değeri burada ayarlandı
  useNuxtApp().$uiStore.state.menuSlide = true;
};
</script>

<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.scroll-container::-webkit-scrollbar { 
  display: none; /* Safari and Chrome */
}
</style>
