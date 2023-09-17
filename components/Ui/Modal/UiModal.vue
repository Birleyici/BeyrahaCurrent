<template>
    <div v-if="isOpen">
      <div
      :class="className"
        class="p-minimal rounded-md fixed right-0 left-0 top-1/2 transform -translate-y-1/2 h-auto  w-full max-w-[90%] lg:max-w-[500px] mx-auto bg-white z-10 max-w-[500px] overflow-y-auto"
      >
        <button @click="$emit('status-change', false)">
          <Icon name="mdi:close" class="w-5 h-5 absolute right-2 top-2"></Icon>
        </button>
        <slot></slot>
      </div>
  
      <div
        @click="$emit('status-change', false)"
        class="fixed left-0 right-0 bottom-0 left-0 bg-black w-full h-full z-[4] opacity-30"
      ></div>
    </div>
  </template>
  
  <script setup>
  const {isOpen, className}= defineProps(['isOpen','className'])
  </script>
  