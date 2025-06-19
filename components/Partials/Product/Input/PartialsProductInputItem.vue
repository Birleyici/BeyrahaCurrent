<template>
  <div class="grid gap-4 md:grid-cols-2 mb-4" v-if="props.product.selectedInput">
    <div class="grid gap-1 ">
      <div class="flex items-center">
        <label class="text-sm" for="input">{{ props.product.selectedInput.label || 'Label' }}</label>
        <span v-if="props.product.selectedInput.isRequired" class=" text-red-500"> *</span>
      </div>
      <div class="grid gap-1">
        <UInput id="input" :placeholder="props.product.selectedInput.placeholder" v-model="props.product.inputValue"
          size="md" />
        <p class="text-xs text-gray-400">*{{ props.product.selectedInput.description || 'Açıklama' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product'])
</script>