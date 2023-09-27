<template>
  <div class="flex flex-col-reverse">
    <transition
      name="slide-fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <slot></slot>
      </div>
    </transition>
    <div
      @click="$emit('change-status', !isOpen)"
      class="cursor-pointer p-2 text-center"
      :class="headerClass"
    >
      {{ header }}
      <slot name="header"></slot>

      <div class="space-x-4 flex items-center">
        <Icon
          @click.stop="$emit('isDelete', true)"
          name="mdi:delete-outline"
          class="w-8 h-8 text-red-500 duration-300 active:bg-slate-100 hover:bg-slate-200 rounded-full p-1"
        ></Icon>

        <Icon
          v-if="isOpen"
          name="material-symbols:keyboard-arrow-up"
          class="w-6 h-6"
        ></Icon>
        <Icon v-else name="material-symbols:keyboard-arrow-down" class="w-6 h-6"></Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
const { isOpen, header, headerClass } = defineProps(["isOpen", "header", "headerClass"]);

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
