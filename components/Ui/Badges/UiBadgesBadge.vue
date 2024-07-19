<template>
  <div class="inline-block">
    <div
    :class="classNames"
    class="bg-slate-100 rounded-full pl-2 pr-1 py-1 lg:!p-2 text-xs lg:text-sm flex items-center space-x-2"
  >
    <span><slot></slot></span>
    <button @click="$emit('is-click', true)" class="rounded-full bg-slate-300 w-5 h-5 flex items-center justify-center">
      <Icon name="mdi:close"></Icon>
    </button>
  </div>
  </div>
</template>

<script setup>
defineEmits(['is-click'])
const {classNames} = defineProps(['classNames'])
</script>

