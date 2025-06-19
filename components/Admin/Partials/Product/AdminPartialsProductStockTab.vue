<template>
  <div class="grid gap-4">
    <UInput placeholder="Stok kodu" size="md" />
    <UCheckbox v-model="isStockManagement" :value="true" label="Stok yönetimini etkinleştir" />

    <div v-if="isStockManagement">
      <UInput placeholder="Stok miktarı" size="md" />
    </div>
  </div>
</template>

<script setup>
const isStockManagement = ref(false);
</script>
