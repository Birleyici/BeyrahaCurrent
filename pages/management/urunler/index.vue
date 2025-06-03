<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Ürün Yönetimi</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Toplam {{ productState.vendorProducts.length }} ürün bulunuyor
          </p>
        </div>
        <div class="flex items-center gap-3">
          <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
            @click="refreshProducts" :loading="isLoading" />
          <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Ürün Ekle"
            to="/management/urunler/yeni" />
        </div>
      </div>
    </div>

    <!-- Products Grid/List Toggle -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- View Toggle Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ productState.vendorProducts.length }} ürün gösteriliyor
          </span>
        </div>

        <div class="flex items-center gap-2">
          <UButtonGroup size="sm" orientation="horizontal">
            <UButton :color="viewMode === 'grid' ? 'primary' : 'gray'"
              :variant="viewMode === 'grid' ? 'solid' : 'outline'" icon="i-heroicons-squares-2x2"
              @click="viewMode = 'grid'" />
            <UButton :color="viewMode === 'table' ? 'primary' : 'gray'"
              :variant="viewMode === 'table' ? 'solid' : 'outline'" icon="i-heroicons-list-bullet"
              @click="viewMode = 'table'" />
          </UButtonGroup>
        </div>
      </div>

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="p-6">
        <div v-if="paginatedProducts.length === 0" class="text-center py-12">
          <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Henüz ürün yok
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            İlk ürününüzü ekleyerek başlayın
          </p>
          <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Ürün Ekle"
            to="/management/urunler/yeni" />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="product in paginatedProducts" :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group overflow-hidden">
            <!-- Product Image -->
            <div class="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
              <img v-if="product.image" :src="product.image" :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
              <div v-else class="flex items-center justify-center h-full">
                <Icon name="mdi:image-outline" class="w-12 h-12 text-gray-400" />
              </div>

              <!-- Status Badge -->
              <div class="absolute top-2 right-2">
                <UBadge :color="product.status === 'active' ? 'green' : product.status === 'draft' ? 'yellow' : 'red'"
                  variant="solid" size="xs">
                  {{ getStatusLabel(product.status) }}
                </UBadge>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <div class="mb-3">
                <NuxtLink :to="`/management/urunler/${product.id}`"
                  class="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                  {{ product.name || `Taslak ürün #${product.id}` }}
                </NuxtLink>
                <p v-if="product.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {{ product.description }}
                </p>
              </div>

              <!-- Price and Actions -->
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="product.price" class="text-lg font-bold text-green-600 dark:text-green-400">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span v-else class="text-sm text-gray-500 dark:text-gray-400">
                    Fiyat belirtilmemiş
                  </span>
                </div>

                <UDropdown :items="getProductActions(product)" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-vertical" size="xs" color="gray" variant="ghost" />
                </UDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-hidden">
        <UTable :columns="columns" :rows="paginatedProducts" :loading="isLoading" :empty-state="{
          icon: 'i-heroicons-circle-stack',
          label: 'Henüz ürün yok',
          description: 'İlk ürününüzü ekleyerek başlayın'
        }" class="w-full" :ui="{
          td: { base: 'max-w-[0] truncate', padding: 'px-4 py-4' },
          th: { padding: 'px-4 py-3' }
        }">
          <template #name-data="{ row }">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img v-if="row.image" :src="row.image" :alt="row.name" class="w-full h-full object-cover" />
                <Icon v-else name="mdi:image-outline" class="w-5 h-5 text-gray-400" />
              </div>
              <div class="min-w-0 flex-1">
                <NuxtLink :to="`/management/urunler/${row.id}`"
                  class="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  :class="{ '!text-red-500': !row.name }">
                  {{ row.name || `Taslak ürün #${row.id}` }}
                </NuxtLink>
                <p v-if="row.description" class="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {{ row.description }}
                </p>
              </div>
            </div>
          </template>

          <template #price-data="{ row }">
            <span v-if="row.price" class="font-semibold text-green-600 dark:text-green-400">
              {{ formatPrice(row.price) }}
            </span>
            <span v-else class="text-gray-500 dark:text-gray-400 text-sm">
              Belirtilmemiş
            </span>
          </template>

          <template #status-data="{ row }">
            <UBadge :color="row.status === 'active' ? 'green' : row.status === 'draft' ? 'yellow' : 'red'"
              variant="soft" size="xs">
              {{ getStatusLabel(row.status) }}
            </UBadge>
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end">
              <UDropdown :items="getProductActions(row)" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-horizontal" size="xs" color="gray" variant="ghost" />
              </UDropdown>
            </div>
          </template>
        </UTable>
      </div>

      <!-- Pagination -->
      <div v-if="productState.vendorProducts.length > pageCount"
        class="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          {{ (page - 1) * pageCount + 1 }}-{{ Math.min(page * pageCount, productState.vendorProducts.length) }} / {{
            productState.vendorProducts.length }} ürün
        </div>
        <UPagination v-model="page" :page-count="pageCount" :total="productState.vendorProducts.length" :max="7" :ui="{
          wrapper: 'flex items-center gap-1',
          rounded: '!rounded-md',
          default: {
            size: 'sm'
          }
        }" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <PartialsUiModalConfirmation v-model:is-open="isOpenDeleteModal"
      :message="`'${productToDelete?.name || 'Bu ürün'}' ürünü kalıcı olarak silmek istediğinizden emin misiniz?`"
      confirm-text="Evet, Sil" cancel-text="İptal" @is-confirm="handleDeleteConfirm" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const productState = useProductState();
const { getVendorProducts, deleteProduct, columns } = useProductList();

// Reactive data
const isLoading = ref(false);
const isOpenDeleteModal = ref(false);
const productToDelete = ref(null);
const viewMode = ref('grid');
const page = ref(1);
const pageCount = 12;

// Computed properties
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageCount;
  const end = start + pageCount;
  return productState.vendorProducts.slice(start, end);
});

// Methods
const refreshProducts = async () => {
  isLoading.value = true;
  try {
    await getVendorProducts();
  } finally {
    isLoading.value = false;
  }
};

const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktif',
    draft: 'Taslak',
    inactive: 'Pasif'
  };
  return labels[status] || status;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price);
};

const getProductActions = (product) => {
  return [
    [{
      label: 'Düzenle',
      icon: 'i-heroicons-pencil-square',
      click: () => navigateTo(`/management/urunler/${product.id}`)
    }],

    [{
      label: 'Sil',
      icon: 'i-heroicons-trash',
      click: () => {
        productToDelete.value = product;
        isOpenDeleteModal.value = true;
      }
    }]
  ];
};

const handleDeleteConfirm = (confirmed) => {
  if (confirmed && productToDelete.value) {
    deleteProduct(productToDelete.value.id);
    productToDelete.value = null;
  }
  isOpenDeleteModal.value = false;
};

// Initialize data
await refreshProducts();
</script>
