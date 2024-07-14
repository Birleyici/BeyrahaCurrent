<template>
  
  <div class="grid grid-cols-2 gap-4">
    <UiFormInput v-model="productState.price" placeholder="Normal fiyat"></UiFormInput>
    <UiFormInput
      v-model="productState.sale_price"
      placeholder="İndirimli fiyat"
    ></UiFormInput>
    <div class="grid gap-4">
      <UiFormInput v-model="productState.sku" placeholder="Stok kodu"></UiFormInput>
      <UiFormCheckbox
        v-model="productState.stock_management"
        id="stock"
        name="stock"
        :value="true"
        >Stok yönetimini etkinleştir</UiFormCheckbox
      >

      <div v-if="productState.stock_management != 0">
        <UiFormInput
          v-model="productState.stock"
          placeholder="Stok miktarı"
        ></UiFormInput>
      </div>
    </div>
  </div>
</template>

<script setup>
const { useNewProductStore } = useStateIndex()
const productState  = useNewProductStore();

const isStockManagement = ref(false);
</script>
