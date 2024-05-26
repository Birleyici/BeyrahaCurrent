<template>
  <div class="py-minimal relative inline-block" v-if="!useMain().isMobile">
    <div class="flex items-center">
      <div
        @mouseover="changeStatusFewSecond()"
        class="!font-semibold"
        @mouseout="mouseOut = true"
      >
        <a href="#" class="pr-4 font-primary !font-medium text-heading-4"
          >GİYİM</a
        >
        <a href="#" class="px-4 font-primary text-heading-4 !font-medium"
          >TAKI & AKSESUAR</a
        >
      </div>

      <USlideover v-model="status">
        <PartialsMenuNestedSlideMenu></PartialsMenuNestedSlideMenu>
      </USlideover>
    </div>
  </div>
</template>

<script setup>
const { status, mouseOut, changeStatusFewSecond } = useDelayedStatusChange();
</script>
