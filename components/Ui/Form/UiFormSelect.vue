<template>
  <select v-model="model"
    class="bg-slate-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 duration-300 p-3 focus:!outline-0 focus:!ring-0 focus:border-secondary-500 dark:focus:border-secondary-400 w-full rounded-md border border-gray-300 dark:border-gray-600">
    <slot></slot>
  </select>
</template>

<script setup>
const model = defineModel()
</script>
