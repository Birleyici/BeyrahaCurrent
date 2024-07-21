<template>
  <div class="py-minimal relative inline-block" v-if="!$device.isMobile">
    <div class="flex items-center">
      <div class="!font-semibold" @click="status = true">
        <a href="#" class="pr-4 font-primary !font-medium text-heading-4">GİYİM</a>
        <a href="#" class="px-4 font-primary text-heading-4 !font-medium">TAKI & AKSESUAR</a>
      </div>

      <USlideover v-model="status">
        <PartialsMenuNestedSlideMenu></PartialsMenuNestedSlideMenu>
      </USlideover>
    </div>
  </div>
</template>

<script setup>
const status = ref(false)
</script>
