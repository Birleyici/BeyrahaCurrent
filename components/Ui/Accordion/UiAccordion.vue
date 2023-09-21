<template>
  <div class="flex flex-col-reverse">
    <transition
      name="slide-fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-show="isOpen" class="overflow-hidden ">
       <slot></slot>
      </div>
    </transition>
    <div @click="isOpen = !isOpen" class="cursor-pointer p-2 text-center" :class="headerClass">
      {{ header }}
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
const { open, header, headerClass } = defineProps(["open", "header", "headerClass"]);
const isOpen = ref(open);

// Geçiş fonksiyonları
const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el, done) => {
  el.style.height = el.scrollHeight + "px";
  el.addEventListener("transitionend", done);
};

const leave = (el, done) => {
  el.style.height = el.scrollHeight + "px";
  window.getComputedStyle(el).height; // Reflow tetikleniyor
  el.style.height = "0";
  el.addEventListener("transitionend", done);
};
</script>

<style>
/* Geçiş efekti için CSS */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: height 0.3s ease-in-out;
}
</style>
