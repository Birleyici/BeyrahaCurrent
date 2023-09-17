<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Adreslerim</b>

    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 space-y-minimal">
      <div class="col-span-1">
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3">
       Ayarlar
      </div>
    </div>
  </div>
</template>

<script setup>
const onayla = ref(false);
const confirmDefaultModal = ref(false);
const newAddressModal = ref(false);
const isOpen = ref(false);
</script>
