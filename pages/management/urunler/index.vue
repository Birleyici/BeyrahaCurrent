<template>
  <div>
    <div class="flex justify-end">
      <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="Yeni Ekle"
        to="/management/urunler/yeni" :trailing="false" />
    </div>

    <UTable sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid" :sort-button="{
      icon: 'i-heroicons-sparkles-20-solid',
      color: 'primary',
      variant: 'outline',
      size: '2xs',
      square: false,
      ui: { rounded: 'rounded-full' },
    }" class="w-full" :columns="columns" :rows="rows" v-model="selected">
      <template #name-data="{ row }">
        <NuxtLink :href="'/management/urunler/' + row.id" class="text-blue-500 font-bold" :class="{'!text-red-500 !font-medium' : !row.name}">{{ row.name ||  `Taslak ürün #${row.id}`  }}</NuxtLink>
      </template>
      <template #delete-data="{ row }">
        <UButton @click="openDeleteModal(row.id)" icon="i-heroicons-trash" size="2xs" color="red" variant="solid"
          :trailing="false" />
        <UModal v-model="isOpenDeleteModal" :transition="true" :overlay="false">
          <div class="p-4 grid gap-4">
            <p>Ürünü silmek istediğinizden emin misiniz?</p>
            <div class="flex space-x-3">
              <UButton @click="confirmDelete" size="sm" color="red" variant="solid" label="Onayla" :trailing="false" />
              <UButton @click="isOpenDeleteModal = false" size="sm" color="gray" variant="solid" label="Vazgeç"
                :trailing="false" />
            </div>
          </div>
        </UModal>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="productState.vendorProducts.length" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
const { productState, getVendorProducts, deleteProduct, columns } = useProductList()
await getVendorProducts();
const isOpenDeleteModal = ref(false);
const deleteProductId = ref(null);


const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return productState.vendorProducts.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const openDeleteModal = (productId) => {
  deleteProductId.value = productId;
  isOpenDeleteModal.value = true;
};

const confirmDelete = () => {
  if (deleteProductId.value) {
    deleteProduct(deleteProductId.value);
    isOpenDeleteModal.value = false;
  }
};



</script>
