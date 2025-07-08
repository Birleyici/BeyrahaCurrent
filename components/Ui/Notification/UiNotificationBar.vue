<template>
  <div :class="bgColor" class=" items-stretch rounded-md flex items-center">
    <div :class="iconBgColor" class=" rounded-l-md flex items-center p-2">
      <Icon :name="icon" class="w-8 h-8 mx-auto" :class="iconColor"></Icon>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const { type } = defineProps(["type"]);
const bgColor = computed(() => {
  if (type == 'info') return 'bg-tertiary-100'
  if (type == 'success') return 'bg-secondary-100'
  if (type == 'error') return 'bg-red-100'
  return ''; // Varsayılan değer

})
const iconBgColor = computed(() => {
  if (type == 'info') return 'bg-tertiary-200'
  if (type == 'success') return 'bg-secondary-200'
  if (type == 'error') return 'bg-red-200'
  return ''; // Varsayılan değer


})
const icon = computed(() => {

  if (type == 'info') return 'ph:info'
  if (type == 'success') return 'material-symbols:fitbit-check-small-rounded'
  if (type == 'error') return 'mdi:alert-outline'
  return ''; // Varsayılan değer

})

const iconColor = computed(() => {

  if (type == 'info') return 'text-dark-800'
  if (type == 'success') return '!text-secondary-500'
  return ''; // Varsayılan değer

})
</script>
