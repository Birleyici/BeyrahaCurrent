<template>
  <div class="px-6 lg:px-0 mt-pad-2 lg:mt-pad-3">
    <!-- Modern yorum sistemi için ProductReviewsSection kullanılıyor -->
    <ProductReviewsSection :product="product" />
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
