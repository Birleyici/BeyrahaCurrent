<template>
  <div>
    <swiper
      :breakpoints="breakpoints"
      :pagination="{
        clickable: true,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="item in 12">
        <div class="border rounded-md" :key="item">
          <div class="relative overflow-hidden cursor-pointer">
            <img
              src="https://www.beyraha.com/wp-content/uploads/2023/08/1677065829_EB3579-600x900.jpg"
              alt=""
              class="rounded-t-sm object-contain sm:object-cover duration-200 h-[250px] w-full hover:scale-110"
            />
          </div>
          <div class="text-center py-4">
            <p class="text-sm px-2 py-2 font-medium">
              <b>Beyraha</b> Bordo Renk Siyah İpli Deri Erkek Bileklik
            </p>
            <div class="flex justify-center space-x-2 items-center">
              <del class="text-sm text-slate-400">450.00 TL</del>
              <p class="text-secondary-500 font-medium">345.00 TL</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
const breakpoints = {
  // when window width is >= 320px
  220: {
    slidesPerView: 1,
    spaceBetween: 20,
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



