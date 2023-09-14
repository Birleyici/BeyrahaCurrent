<template>
  <div :class="bgColor" class=" items-stretch rounded-md flex items-center">
    <div :class="iconBgColor" class=" rounded-l-md flex items-center p-2">
      <Icon :name="icon" class="w-8 h-8 mx-auto"></Icon>
    </div>
    <div class="p-4"><slot></slot></div>
  </div>
</template>

<script setup>
const { type } = defineProps(["type"]);
const bgColor = computed(()=>{
    return type == 'info' && 'bg-tertiary-100'
})
const iconBgColor = computed(()=>{
    return type == 'info' && 'bg-tertiary-200'
})
const icon = computed(()=>{
    return type == 'info' && 'ph:info'
})
</script>
