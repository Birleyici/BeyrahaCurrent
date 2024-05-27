<template>
  <div>
    <div class="flex justify-end">
      <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="primary"
        variant="solid"
        label="Yeni Ekle"
        to="/management/urunler/yeni"
        :trailing="false"
      />
    </div>

    <UTable
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :sort-button="{
        icon: 'i-heroicons-sparkles-20-solid',
        color: 'primary',
        variant: 'outline',
        size: '2xs',
        square: false,
        ui: { rounded: 'rounded-full' },
      }"
      class="w-full"
      :columns="columns"
      :rows="rows"
      v-model="selected"
    >
      <template #name-data="{ row }">
        <NuxtLink
          :href="'/management/urunler/' + row.id"
          class="text-blue-500 font-bold"
          >{{ row.name }}</NuxtLink
        >
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="people.length"
      />
    </div>
  </div>
</template>

<script setup>
import { useProduct } from "~/store/product/index.js";
const products = useProduct();
await products.getVendorProducts();

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Ürün adı", sortable: true },
  { key: "price", label: "Fiyat", sortable: true },
  { key: "sale_price", label: "İndirimli fiyat", sortable: true },
  { key: "sku", label: "SKU", sortable: true },
];

definePageMeta({
  layout: "admin",
});
const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return people.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const people = products.vendorProducts.data;

const selected = ref([people[1]]);
</script>