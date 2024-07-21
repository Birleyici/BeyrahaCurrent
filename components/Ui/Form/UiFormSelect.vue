<template>
  <select
 @change="model"
    class="bg-slate-50 text-sm focus:bg-white duration-300 p-3 focus:!outline-0 focus:!ring-0 focus:border-secondary-500 w-full rounded-md border"
  >
    <slot></slot>
  </select>
</template>

<script setup>
const model = defineModel()
</script>
