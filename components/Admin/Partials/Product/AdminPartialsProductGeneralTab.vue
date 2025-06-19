<template>
  <div class="grid grid-cols-2 gap-4">
    <UInput v-model="productState.product.price" placeholder="Normal fiyat" size="md" />
    <UInput v-model="productState.product.sale_price" placeholder="İndirimli fiyat" size="md" />
    <div class="grid gap-4">
      <UInput v-model="productState.product.sku" placeholder="Stok kodu" size="md" />
      <UCheckbox v-model="stockManagementProxy" label="Stok yönetimini etkinleştir" />

      <div v-if="productState.product.stock_management != 0">
        <UInput v-model="productState.product.stock" placeholder="Stok miktarı" size="md" />
      </div>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();

// Stock management için boolean proxy
const stockManagementProxy = computed({
  get() {
    return productState.product.stock_management === 1;
  },
  set(value) {
    productState.product.stock_management = value ? 1 : 0;
  }
});
</script>
