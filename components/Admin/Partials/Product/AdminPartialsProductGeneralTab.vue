<template>
  <div class="grid grid-cols-2 gap-4">
    <UiFormInput v-model="product.price" placeholder="Normal fiyat"></UiFormInput>
    <UiFormInput
      v-model="product.sale_price"
      placeholder="İndirimli fiyat"
    ></UiFormInput>
    <div class="grid gap-4">
      <UiFormInput v-model="product.sku" placeholder="Stok kodu"></UiFormInput>
      <UiFormCheckbox
        v-model="product.stock_management"
        id="stock"
        name="stock"
        :value="true"
        >Stok yönetimini etkinleştir</UiFormCheckbox
      >

      <div v-if="product.stock_management != 0">
        <UiFormInput
          v-model="product.stock"
          placeholder="Stok miktarı"
        ></UiFormInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNewProductStore } from "~/stores/newProduct.js";
const product = useNewProductStore();
const isStockManagement = ref(false);
</script>
