<template>
  <div class="flex items-center space-x-6 border rounded-full p-1 h-12">
    <div
      @click="count != 0 && count--"
      class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10"
    >
      <Icon name="ph:minus-thin" class="w-4 h-4"></Icon>
    </div>
    <div>{{ count }}</div>
    <div
      @click="count++"
      class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10"
    >
      <Icon name="ph:plus-thin" class="w-4 h-4"></Icon>
    </div>
  </div>
</template>
<script setup>
const count = defineModel()
</script>
