<template>
  <div class="flex items-center space-x-2 border rounded-full p-1 h-12">
    <div @click="count != 1 && count--"
      class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10">
      <Icon name="ph:minus-thin" class="w-4 h-4"></Icon>
    </div>
    <UInput type="number" class="w-12 text-center" :ui="{base:'text-center'}" variant="none" v-model="count" :padded="false" />
    <div @click="count++"
      class="cursor-pointer bg-quaternary-100 flex items-center justify-center rounded-full w-10 h-10">
      <Icon name="ph:plus-thin" class="w-4 h-4"></Icon>
    </div>
  </div>
</template>
<script setup>
const count = defineModel()
</script>
