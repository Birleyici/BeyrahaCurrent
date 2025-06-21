<template>
  <div class="space-y-4">
    <!-- Bu bileşen artık ProductReviewsItem tarafından değiştirilmiştir -->
    <!-- Geriye dönük uyumluluk için basit bir görünüm -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div class="flex space-x-2 mb-3">
        <p class="font-medium">{{ userName || 'Muhammet Ç*** Y***' }}</p>
        <div class="flex">
          <Icon v-for="item in (rating || 5)" :key="item" name="material-symbols:star-rate-rounded" fill
            class="text-secondary-500" />
        </div>
      </div>

      <div v-if="images && images.length > 0" class="mb-3">
        <UiSlidesFullscreenSlide :images="images" />
      </div>

      <p class="text-gray-700 dark:text-gray-300 mb-3">
        {{ comment || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et odio neque, officia iste ratione
        veniam.Laboriosam possimus aut earum vero ducimus praesentium sed debitis, sapiente illo harum quidem magni
        voluptatum!' }}
      </p>

      <p class="text-sm italic text-gray-500 dark:text-gray-400">
        {{ purchaseDate || '23 Eylül 2023 tarihinde satın alındı' }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: String,
  rating: Number,
  comment: String,
  images: Array,
  purchaseDate: String
})
</script>
