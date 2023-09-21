<template>
  <div class="grid gap-4">
    <UiFormInput placeholder="Stok kodu"></UiFormInput>
    <UiFormCheckbox
      v-model="isStockManagement"
      id="stock"
      name="stock"
      value="myStringValue"
      >Stok yönetimini etkinleştir</UiFormCheckbox
    >

    <div v-if="isStockManagement">
      <UiFormInput placeholder="Stok miktarı"></UiFormInput>
    </div>
  </div>
</template>

<script setup>
const isStockManagement = ref(false);
</script>
