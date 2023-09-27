<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="bg-slate-50 text-sm focus:bg-white duration-300 p-3 focus:!outline-0 focus:!ring-0 focus:border-secondary-500 w-full rounded-md border"
  >
    <slot></slot>
  </select>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
