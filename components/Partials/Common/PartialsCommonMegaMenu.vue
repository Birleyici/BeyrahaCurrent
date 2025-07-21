<template>
  <div>
    <!-- Mobile Mega Menu -->
    <div v-if="isMobile" class="lg:hidden">
      <!-- Mobile specific mega menu content -->

    </div>

    <div v-else class="hidden lg:block">
    </div>
  </div>
</template>

<script setup>
// Device detection
const { isMobile } = useDevice()

const status = ref(false);
</script>
