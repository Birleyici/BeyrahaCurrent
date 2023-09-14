<template>
  <div class="border rounded-xl">
    <div
      @click="isOpen = !isOpen"
      :class="isOpen ? '' : 'rounded-xl'"
      class="cursor-pointer bg-tertiary-100 p-minimal w-full rounded-t-xl flex justify-between"
    >
      <b>{{ title }}</b>
      <Icon
        v-if="isOpen"
        name="material-symbols:keyboard-arrow-down"
        class="w-6 h-6"
      ></Icon>
      <Icon v-else name="material-symbols:keyboard-arrow-right" class="w-6 h-6"></Icon>
    </div>
    <div :class="isOpen ? 'max-h-auto p-minimal' : 'max-h-[0px]'" class="overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(true);
const { title } = defineProps(["title"]);
</script>
