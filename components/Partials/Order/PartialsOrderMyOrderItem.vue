<template>
    <div class="border rounded-md ">
      <div
        class="lg:flex items-center justify-between lg:space-x-8 bg-tertiary-100 rounded-t-md p-minimal"
      >
        <div class="flex justify-between space-x-8">
          <div class="flex">
            <img
              v-for="index in 4"
              :key="index"
              src="/default-product.jpg"
              :class="index !== 1 ? 'ml-[-30px]' : ''"
              class="w-12 h-12 object-cover border border-white drop-shadow-sm rounded-full"
              alt=""
            />
          </div>

          <div>
            <p class="text-sm">Sipariş tarihi</p>
            <p class="font-medium text-sm">13 Eylül 2023 - 13:59</p>
          </div>
        </div>
        <div class="flex justify-between my-minimal lg:my-0 lg:space-x-24 items-center">
          <div>
            <p class="text-sm">Toplam tutar</p>
            <p class="font-medium text-secondary-500">8,450.00 TL</p>
          </div>
          <div>
            <div
              class="flex items-center space-x-2 rounded-full px-3 py-2 bg-secondary-500 text-white"
            >
              <p class="text-xs">Devam ediyor</p>
              <span class="w-2 h-2 bg-secondary-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-show="isOpen" class="p-minimal overflow-hidden">
            <PartialsOrderSummary></PartialsOrderSummary>
        </div>
    </transition>
      <div @click="isOpen = !isOpen" class="cursor-pointer p-2 text-center">
        Sipariş detayları
        <Icon
          v-if="isOpen"
          name="material-symbols:keyboard-arrow-up"
          class="w-5 h-5"
        ></Icon>
        <Icon v-else name="material-symbols:keyboard-arrow-down" class="w-5 h-5"></Icon>
      </div>
    </div>

</template>

<script setup>
const {open} = defineProps(['open'])
const isOpen = ref(open);

// Geçiş fonksiyonları
const beforeEnter = (el) => {
    el.style.height = '0';
}

const enter = (el, done) => {
    el.style.height = el.scrollHeight + 'px';
    el.addEventListener('transitionend', done);
}

const leave = (el, done) => {
    el.style.height = el.scrollHeight + 'px';
    window.getComputedStyle(el).height; // Reflow tetikleniyor
    el.style.height = '0';
    el.addEventListener('transitionend', done);
}

onBeforeUnmount(() => {
    el.removeEventListener('transitionend', done);
});


</script>

<style>
/* Geçiş efekti için CSS */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: height 0.3s ease-in-out;
}
</style>