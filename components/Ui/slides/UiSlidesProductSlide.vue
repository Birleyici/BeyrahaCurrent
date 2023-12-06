<template>
  <div v-if="useMain().isLoaded">dfgdf
    <swiper
      :breakpoints="breakpoints"
      :pagination="{
        clickable: true,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="item in 12">
        <PartialsProductCard :key="item"></PartialsProductCard>
      </swiper-slide>
    </swiper>
  </div>
  <div v-else class="flex max-w-full overflow-hidden space-x-4">
    <div v-for="item in 5">
      <SkeletonProductCard></SkeletonProductCard>
    </div>
  </div>
</template>

<script setup>
const breakpoints = {
  // when window width is >= 320px
  220: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  350: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  // when window width is >= 420px (200px + 20px + 200px)
  420: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  // when window width is >= 640px (3 kart için)
  640: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  // when window width is >= 860px (4 kart için)
  860: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1080: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  1300: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  // Daha fazla breakpoint ekleyebilirsiniz...
};
</script>
