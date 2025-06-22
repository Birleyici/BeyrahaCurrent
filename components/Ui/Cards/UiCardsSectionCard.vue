<template>
  <div class="border-0 md:border rounded-none md:rounded-xl -mx-4 md:mx-0">
    <div @click="isOpen = !isOpen" :class="isOpen ? '' : 'rounded-none md:rounded-xl'"
      class="cursor-pointer bg-tertiary-100 p-pad-2 w-full rounded-none md:rounded-t-xl flex justify-between">
      <span class="font-medium">{{ title }}</span>
      <Icon v-if="isOpen" name="material-symbols:keyboard-arrow-down" class="w-6 h-6"></Icon>
      <Icon v-else name="material-symbols:keyboard-arrow-right" class="w-6 h-6"></Icon>
    </div>
    <div :class="isOpen ? 'max-h-auto p-pad-2' : 'max-h-[0px]'" class="overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(true);
const { title } = defineProps(["title"]);
</script>
