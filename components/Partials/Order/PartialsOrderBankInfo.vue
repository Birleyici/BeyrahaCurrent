<template>
  <div
    class="relative space-y-2 rounded-md bg-tertiary-0 border border-secondary-500 p-minimal text-white"
  >
    <img
      class="w-32 absolute top-0 -translate-y-[50%] bg-white px-2"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/2560px-Ziraat_Bankas%C4%B1_logo.svg.png"
      alt=""
    />
    <div class="bg-secondary-400 rounded-md p-2 lg:flex justify-between">
      <div class="lg:flex justify-between lg:space-x-4">
        <div class="flex items-center space-x-2">
          <Icon v-if="!copyIban" @click="copyIban = true" name="mdi:clipboard-multiple-outline" class="w-5 h-5 cursor-pointer"></Icon>
          <Icon v-else  name="material-symbols:fitbit-check-small-rounded" class="w-5 h-5 cursor-pointer"></Icon>
          <b>IBAN </b>
        </div>
        <p>TR76 0009 9012 3456 7800 1000 01</p>
      </div>
    </div>
    <div class="bg-secondary-400 rounded-md p-2 lg:flex justify-between">
      <div class="lg:flex justify-between lg:space-x-4">
        <div class="flex items-center space-x-2">
          <Icon v-if="!copyName" @click="copyName = true" name="mdi:clipboard-multiple-outline" class="w-5 h-5 cursor-pointer"></Icon>
          <Icon v-else  name="material-symbols:fitbit-check-small-rounded" class="w-5 h-5 cursor-pointer"></Icon>
         <b>HESAP ADI </b>
        </div>
        <p>Muhammet Çağrı Yılmaz</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const copyIban = ref(false)
const copyName = ref(false)

watch(copyIban, () => {

  setTimeout(() => {
    copyIban.value = false
  }, 2000);

})


watch(copyName, () => {

  setTimeout(() => {
    copyName.value = false
  }, 2000);

})
</script>