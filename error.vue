<script setup lang="ts">
import { useErrorHandler } from '~/composables/useErrorHandler'

const { handleError: handleErrorCentral } = useErrorHandler()

const handleError = async () => {
  // Merkezi hata sistemi ile logla
  await handleErrorCentral(props.error, {
    context: 'error-page',
    showToast: false // Toast göstermeyelim, zaten error sayfasındayız
  })

  clearError({
    redirect: '/'
  })
}

const props = defineProps({
  error: Object
})
</script>

<template>
  <NuxtLayout name="error">
    <div class="px-x-mobil lg:px-x-desktop flex justify-center">
      <div v-if="props.error?.statusCode == 404"
        class="md:w-[500px] py-10 md:p-10 text-center relative grid gap-2 rounded-md">
        <!-- <span class=" text-sky-500 font-medium">{{ error.statusCode }}</span> -->
        <h1 class="font-bold text-4xl text-sky-500">Sayfa bulunamadı</h1>
        <NuxtLink class="text-sm" to="/">Aradığınız ürün yada sayfa şuanda mevcut değil.</NuxtLink>
        <div class="mt-2 z-10">
          <UButton @click="handleError" label="Ana sayfaya dön" color="sky" variant="outline" />
        </div>
        <!-- <UIcon class="text-[200px]   absolute opacity-5" name="i-heroicons-exclamation-triangle" /> -->
        <p class="text-[200px] absolute opacity-[0.03]">404</p>
      </div>
      <div v-else>
        <div class="md:w-[500px] py-10 md:p-10 text-center relative grid gap-2 rounded-md">
          <!-- <span class=" text-sky-500 font-medium">{{ error.statusCode }}</span> -->
          <h1 class="font-bold text-4xl text-sky-500">Bir hata oluştu</h1>
          <NuxtLink class="text-sm" to="/">Sorunu düzeltmeye çalışıyoruz, lütfen daha sonra tekrar
            deneyin.</NuxtLink>
          <div class="mt-2 z-10">
            <UButton @click="handleError" label="Sorunu bildir" color="sky" variant="outline" />
          </div>
          <div class="text-left text-sm text-gray-500 mt-4 p-4 bg-gray-50 rounded-md">
            <p><strong>Hata Kodu:</strong> {{ props.error?.statusCode }}</p>
            <p><strong>Hata Mesajı:</strong> {{ props.error?.message }}</p>
            <p><strong>Sayfa:</strong> {{ typeof window !== 'undefined' ? window?.location?.href : 'Unknown' }}</p>
            <p>
              <strong>Zaman:</strong> {{ new Date().toLocaleString('tr-TR') }}
            </p>
            <details class="mt-2">
              <summary class="cursor-pointer">Stack Trace</summary>
              <pre class="text-xs mt-2 whitespace-pre-wrap">{{
                props.error
              }}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
