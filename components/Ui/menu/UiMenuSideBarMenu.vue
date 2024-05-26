<template>
  <div>
    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <slot></slot>
      </div>
    </USlideover>
  </div>
</template>

<script setup>
const { status, position } = defineProps(["status", "position"]);
const isOpen = ref(status);
console.log(isOpen)
</script>
