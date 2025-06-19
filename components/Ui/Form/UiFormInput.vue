<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text"
    class="bg-slate-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-600 duration-300 p-3 focus:!outline-0 focus:!ring-0 focus:border-secondary-500 dark:focus:border-blue-400 w-full rounded-md border border-gray-300 dark:border-gray-600" />
</template>
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>