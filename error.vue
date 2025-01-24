<script setup lang="ts">
const handleError = () => {
  // Hata detaylarını logla
  console.error('Hata Detayları:', {
    statusCode: props.error?.statusCode,
    message: props.error?.message,
    stack: props.error?.stack,
    url: window?.location?.href,
    timestamp: new Date().toISOString()
  })

  clearError({
    redirect: '/'
  })
}
const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout name="error">
    <div class="px-x-mobil lg:px-x-desktop flex justify-center">
      <div
        v-if="props.error?.statusCode == 404"
        class="md:w-[500px] py-10 md:p-10 text-center relative grid gap-2 rounded-md"
      >
        <!-- <span class=" text-sky-500 font-medium">{{ error.statusCode }}</span> -->
        <h1 class="font-bold text-4xl text-sky-500">Sayfa bulunamadı</h1>
        <NuxtLink class="text-sm" to="/"
          >Aradığınız ürün yada sayfa şuanda mevcut değil.</NuxtLink
        >
        <div class="mt-2 z-10">
          <UButton
            @click="handleError"
            label="Ana sayfaya dön"
            color="sky"
            variant="outline"
          />
        </div>
        <!-- <UIcon class="text-[200px]   absolute opacity-5" name="i-heroicons-exclamation-triangle" /> -->
        <p class="text-[200px] absolute opacity-[0.03]">404</p>
      </div>
      <div v-else>
        <div
          class="md:w-[500px] py-10 md:p-10 text-center relative grid gap-2 rounded-md"
        >
          <!-- <span class=" text-sky-500 font-medium">{{ error.statusCode }}</span> -->
          <h1 class="font-bold text-4xl text-sky-500">Bir hata oluştu</h1>
          <NuxtLink class="text-sm" to="/"
            >Sorunu düzeltmeye çalışıyoruz, lütfen daha sonra tekrar
            deneyin.</NuxtLink
          >
          <div class="mt-2 z-10">
            <UButton
              @click="handleError"
              label="Sorunu bildir"
              color="sky"
              variant="outline"
            />
          </div>
          <!-- <UIcon class="text-[200px]   absolute opacity-5" name="i-heroicons-exclamation-triangle" /> -->
          <p class="text-sm text-gray-500">
            Hata Kodu: {{ props.error?.statusCode }}
            <br />
            {{ props.error?.message }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
