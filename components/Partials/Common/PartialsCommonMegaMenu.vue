<template>
  <div class="py-minimal relative inline-block" v-if="!useMain().isMobile">
    <div class="flex items-center">
      <Icon name="material-symbols:home-rounded" class="w-6 h-6 !text-secondary" />

      <div
        @mouseover="changeStatusFewSecond()"
        class="!font-semibold"
        @mouseout="mouseOut = true"
      >
        <a href="#" class="border-r px-minimal font-primary !font-medium text-heading-4"
          >GİYİM</a
        >
        <a href="#" class="px-minimal font-primary text-heading-4 !font-medium"
          >TAKI & AKSESUAR</a
        >
      </div>
      <UiMenuSideBarMenu :status="status" @change-status="(e) => (status = e)">
        <PartialsMenuNestedSlideMenu></PartialsMenuNestedSlideMenu>
      </UiMenuSideBarMenu>
    </div>
  </div>
</template>

<script setup>
const status = ref(false);
const mouseOut = ref(true);

const changeStatusFewSecond = () => {
  mouseOut.value = false;

  setTimeout(() => {
    if (mouseOut.value == false) {
      status.value = true;
    }
  }, 300);
};
</script>
