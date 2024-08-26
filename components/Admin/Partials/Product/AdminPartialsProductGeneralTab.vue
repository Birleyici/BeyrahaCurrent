<template>
  
  <div class="grid grid-cols-2 gap-4">
    <UiFormInput v-model="productState.product.price" placeholder="Normal fiyat"></UiFormInput>
    <UiFormInput
      v-model="productState.product.sale_price"
      placeholder="İndirimli fiyat"
    ></UiFormInput>
    <div class="grid gap-4">
      <UiFormInput v-model="productState.product.sku" placeholder="Stok kodu"></UiFormInput>
      <UiFormCheckbox
        v-model="productState.product.stock_management"
        id="stock"
        name="stock"
        :value="true"
        >Stok yönetimini etkinleştir</UiFormCheckbox
      >

      <div v-if="productState.product.stock_management != 0">
        <UiFormInput
          v-model="productState.product.stock"
          placeholder="Stok miktarı"
        ></UiFormInput>
      </div>
    </div>
  </div>
</template>

<script setup>
const productState  = useProductState();

const isStockManagement = ref(false);
</script>
