<script setup lang="ts">
import type { NuxtError } from '#app'
const handleError = () => {
  clearError({
    redirect: '/',
  });
};
const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout name="error">
    <div class="px-x-mobil lg:px-x-desktop flex justify-center">
      <div class=" md:w-[500px] py-10 md:p-10 text-center relative grid gap-2  rounded-md">
        <!-- <span class=" text-sky-500 font-medium">{{ error.statusCode }}</span> -->
        <h1 class="font-bold text-4xl text-sky-500">Sayfa bulunamadı</h1>
        <NuxtLink class="text-sm" to="/">Aradığınız ürün yada sayfa şuanda mevcut değil.</NuxtLink>
        <div class="mt-2 z-10" >
          <UButton @click="handleError"  label="Ana sayfaya dön" color="sky" variant="outline" />
        </div>
        <!-- <UIcon class="text-[200px]   absolute opacity-5" name="i-heroicons-exclamation-triangle" /> -->
<p  class="text-[200px]   absolute opacity-5">404</p>
      </div>
    </div>
  </NuxtLayout>
</template>