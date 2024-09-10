<template>
  <div class="relative space-y-2 rounded-md bg-tertiary-0 border border-secondary-500 p-minimal text-white">
    <img class="w-32 absolute top-0 -translate-y-[50%] bg-white px-2"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/2560px-Ziraat_Bankas%C4%B1_logo.svg.png"
      alt="" />
    <div class="bg-secondary-400 rounded-md p-2 lg:flex justify-between">
      <div class="lg:flex justify-between lg:space-x-4">
        <div class="flex items-center space-x-2">
          <UIcon v-if="!copyIban" @click="copyIbanCode" name="i-heroicons-clipboard-document" class="w-6 h-6 cursor-pointer" />
          <UIcon v-else name="i-heroicons-clipboard-document-check" class="w-6 h-6" />
          <b>IBAN </b>
        </div>
        <p>TR67 0001 0003 9058 4674 5950 01</p>
      </div>
    </div>
    <div class="bg-secondary-400 rounded-md p-2 lg:flex justify-between">
      <div class="lg:flex justify-between lg:space-x-4">
        <div class="flex items-center space-x-2">
          <UIcon v-if="!copyName" @click="copyAccountName" name="i-heroicons-clipboard-document" class="w-6 h-6 cursor-pointer" />
          <UIcon v-else name="i-heroicons-clipboard-document-check" class="w-6 h-6" />
          <b>HESAP ADI </b>
        </div>
        <p>Muhammet Çağrı Yılmaz</p>
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
  navigator.clipboard.writeText('TR67 0001 0003 9058 4674 5950 01')
  copyIban.value = true
}

// Hesap adı kopyalama işlemi
const copyAccountName = () => {
  navigator.clipboard.writeText('Muhammet Çağrı Yılmaz')
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
