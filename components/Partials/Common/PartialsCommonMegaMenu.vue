<template>
  <div>
    <!-- Mobile Mega Menu -->
    <div v-if="isMobile" class="lg:hidden">
      <!-- Mobile specific mega menu content -->
      <!-- ... diğer mobile menu içeriği ... -->
    </div>

    <!-- Desktop Mega Menu -->
    <div v-else class="hidden lg:block">
      <!-- Desktop specific mega menu content -->
      <!-- ... diğer desktop menu içeriği ... -->
    </div>
  </div>
</template>

<script setup>
// Device detection
const { isMobile } = useDevice()

const status = ref(false);
</script>
