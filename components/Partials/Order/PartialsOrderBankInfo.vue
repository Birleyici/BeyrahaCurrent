<template>
  <div class="bg-white dark:bg-neutral-800">

    <!-- Banka Bilgileri -->
    <div class="space-y-4">

      <!-- IBAN Bilgisi -->
      <div class="bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">IBAN</span>
            </div>
            <p class="text-neutral-900 dark:text-neutral-100 font-mono text-base tracking-wide">
              TR71 0001 0000 9565 6417 9850 01
            </p>
          </div>
          <button @click="copyIbanCode"
            class="ml-4 p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 rounded-lg transition-all duration-200"
            :class="{ 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500': copyIban }">
            <UIcon v-if="!copyIban" name="i-heroicons-clipboard-document"
              class="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            <UIcon v-else name="i-heroicons-check" class="w-4 h-4 text-white" />
          </button>
        </div>
        <div v-if="copyIban" class="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
          ✓ IBAN kopyalandı
        </div>
      </div>

      <!-- Hesap Sahibi Bilgisi -->
      <div class="bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Hesap Sahibi</span>
            </div>
            <p class="text-neutral-900 dark:text-neutral-100 font-semibold text-base">
              Sevgi Yılmaz
            </p>
          </div>
          <button @click="copyAccountName"
            class="ml-4 p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 rounded-lg transition-all duration-200"
            :class="{ 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500': copyName }">
            <UIcon v-if="!copyName" name="i-heroicons-clipboard-document"
              class="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            <UIcon v-else name="i-heroicons-check" class="w-4 h-4 text-white" />
          </button>
        </div>
        <div v-if="copyName" class="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
          ✓ Hesap sahibi adı kopyalandı
        </div>
      </div>

      <!-- Banka Logosu -->
      <div class="flex items-center justify-center py-4">
        <div
          class="bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-3 shadow-sm dark:shadow-neutral-900/20">
          <img class="h-6 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/2560px-Ziraat_Bankas%C4%B1_logo.svg.png"
            alt="Ziraat Bankası" />
        </div>
      </div>

      <!-- Önemli Bilgi -->
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5" />
          </div>
          <div>
            <h4 class="font-medium text-amber-800 dark:text-amber-300 text-sm mb-1">Önemli Uyarı</h4>
            <p class="text-amber-700 dark:text-amber-200 text-sm leading-relaxed">
              Havale/EFT yaparken açıklama kısmına mutlaka <strong>sipariş numaranızı</strong> yazınız.
              Bu sayede ödemeniz hızlıca eşleştirilebilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const copyIban = ref(false)
const copyName = ref(false)

// IBAN kopyalama işlemi
const copyIbanCode = () => {
  navigator.clipboard.writeText('TR71 0001 0000 9565 6417 9850 01')
  copyIban.value = true
}

// Hesap adı kopyalama işlemi
const copyAccountName = () => {
  navigator.clipboard.writeText('Sevgi Yılmaz')
  copyName.value = true
}

watch(copyIban, () => {
  if (copyIban.value) {
    setTimeout(() => {
      copyIban.value = false
    }, 2000)
  }
})

watch(copyName, () => {
  if (copyName.value) {
    setTimeout(() => {
      copyName.value = false
    }, 2000)
  }
})
</script>
