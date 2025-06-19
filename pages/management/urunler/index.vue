<template>
  <div class="space-y-4 lg:space-y-6 p-4 lg:p-6">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
      <div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Ürün Yönetimi</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm lg:text-base">
            Toplam {{ Array.isArray(productState.vendorProducts) ? productState.vendorProducts.length : 0 }} ürün
            bulunuyor
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
            @click="refreshProducts" :loading="isLoading" class="touch-manipulation" />
          <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Ürün Ekle"
            to="/management/urunler/yeni" class="touch-manipulation" />
        </div>
      </div>
    </div>

    <!-- Products Grid/List Toggle -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- View Toggle Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ Array.isArray(productState.vendorProducts) ? productState.vendorProducts.length : 0 }} ürün gösteriliyor
          </span>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <UButtonGroup size="sm" orientation="horizontal" class="flex-1 sm:flex-none">
            <UButton :color="viewMode === 'grid' ? 'primary' : 'gray'"
              :variant="viewMode === 'grid' ? 'solid' : 'outline'" icon="i-heroicons-squares-2x2"
              @click="viewMode = 'grid'" class="flex-1 sm:flex-none touch-manipulation" />
            <UButton :color="viewMode === 'table' ? 'primary' : 'gray'"
              :variant="viewMode === 'table' ? 'solid' : 'outline'" icon="i-heroicons-list-bullet"
              @click="viewMode = 'table'" class="flex-1 sm:flex-none touch-manipulation" />
          </UButtonGroup>
        </div>
      </div>

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="p-4 lg:p-6">
        <!-- Empty State -->
        <div v-if="paginatedProducts.length === 0" class="text-center py-12">
          <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Henüz ürün yok
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            İlk ürününüzü ekleyerek başlayın
          </p>
          <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Ürün Ekle"
            to="/management/urunler/yeni" class="touch-manipulation" />
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          <div v-for="product in paginatedProducts" :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">

            <!-- Product Image -->
            <div class="relative aspect-square bg-gray-100 dark:bg-gray-700">
              <NuxtImg v-if="getProductImagePath(product)" :src="'cl/' + getProductImagePath(product)"
                :alt="product.name" class="w-full h-full object-cover" format="webp" quality="90" :width="300"
                :height="400" fit="inside" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <NuxtImg :src="'cl/' + 'edb26c39-166b-465f-780d-e930fa903900/public'" class="w-full h-full object-cover"
                  format="webp" quality="90" :width="300" :height="400" fit="inside" background="#CCCCCC" />
              </div>

              <!-- Status Badge -->
              <div class="absolute top-2 right-2">
                <UBadge :color="product.is_active === 1 ? 'green' : 'yellow'" variant="solid" size="xs">
                  {{ getStatusLabel(product) }}
                </UBadge>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <div class="mb-3">
                <NuxtLink :to="`/management/urunler/${product.id}`"
                  class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 touch-manipulation">
                  {{ product.name || `Taslak ürün #${product.id}` }}
                </NuxtLink>
                <p v-if="product.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {{ product.description }}
                </p>
              </div>

              <!-- Price and Actions -->
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="product.price" class="text-base lg:text-lg font-bold text-green-600 dark:text-green-400">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span v-else class="text-sm text-gray-500 dark:text-gray-400">
                    Fiyat belirtilmemiş
                  </span>
                </div>

                <UDropdown :items="getProductActions(product)" :popper="{ placement: 'bottom-end' }">
                  <UButton icon="i-heroicons-ellipsis-vertical" size="xs" color="gray" variant="ghost"
                    class="touch-manipulation p-2" />
                </UDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View - Mobile optimized -->
      <div v-else class="overflow-hidden">
        <!-- Mobile Card View -->
        <div class="lg:hidden">
          <div v-if="paginatedProducts.length === 0" class="text-center py-12 px-4">
            <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Henüz ürün yok
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              İlk ürününüzü ekleyerek başlayın
            </p>
            <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Ürün Ekle"
              to="/management/urunler/yeni" class="touch-manipulation" />
          </div>

          <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="product in paginatedProducts" :key="product.id"
              class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="flex items-start space-x-4">
                <!-- Product Image -->
                <div
                  class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <NuxtImg v-if="getProductImagePath(product)" :src="'cl/' + getProductImagePath(product)"
                    :alt="product.name" class="w-full h-full object-cover" />
                  <Icon v-else name="mdi:image-outline" class="w-6 h-6 text-gray-400" />
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <NuxtLink :to="`/management/urunler/${product.id}`"
                        class="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
                        :class="{ '!text-red-500': !product.name }">
                        <span class="line-clamp-1">{{ product.name || `Taslak ürün #${product.id}` }}</span>
                      </NuxtLink>

                      <div class="mt-1 flex items-center space-x-2">
                        <UBadge :color="product.is_active === 1 ? 'green' : 'yellow'" variant="soft" size="xs">
                          {{ getStatusLabel(product) }}
                        </UBadge>
                        <span v-if="product.sku" class="text-xs text-gray-500 dark:text-gray-400">
                          SKU: {{ product.sku }}
                        </span>
                      </div>

                      <div class="mt-1 flex items-center space-x-4">
                        <span v-if="product.price" class="font-semibold text-green-600 dark:text-green-400">
                          {{ formatPrice(product.price) }}
                        </span>
                        <span v-if="product.sale_price" class="font-semibold text-orange-600 dark:text-orange-400">
                          {{ formatPrice(product.sale_price) }}
                        </span>
                      </div>
                    </div>

                    <!-- Actions -->
                    <UDropdown :items="getProductActions(product)" :popper="{ placement: 'bottom-end' }">
                      <UButton icon="i-heroicons-ellipsis-horizontal" size="xs" color="gray" variant="ghost"
                        class="touch-manipulation p-2" />
                    </UDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block">
          <UTable :columns="columns" :rows="paginatedProducts" :loading="isLoading" :empty-state="{
            icon: 'i-heroicons-circle-stack',
            label: 'Henüz ürün yok',
            description: 'İlk ürününüzü ekleyerek başlayın'
          }" class="w-full" :ui="{
            td: { base: 'max-w-[0] truncate', padding: 'px-4 py-4' },
            th: { padding: 'px-4 py-3' }
          }">
            <template #id-data="{ row }">
              <span class="text-sm font-mono text-gray-600 dark:text-gray-400">
                #{{ row.id }}
              </span>
            </template>

            <template #name-data="{ row }">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <NuxtImg v-if="getProductImagePath(row)" :src="'cl/' + getProductImagePath(row)" :alt="row.name"
                    class="w-full h-full object-cover" />
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

            <template #sale_price-data="{ row }">
              <span v-if="row.sale_price" class="font-semibold text-orange-600 dark:text-orange-400">
                {{ formatPrice(row.sale_price) }}
              </span>
              <span v-else class="text-gray-500 dark:text-gray-400 text-sm">
                -
              </span>
            </template>

            <template #sku-data="{ row }">
              <span v-if="row.sku" class="text-gray-900 dark:text-white">
                {{ row.sku }}
              </span>
              <span v-else class="text-gray-500 dark:text-gray-400 text-sm">
                -
              </span>
            </template>

            <template #status-data="{ row }">
              <UBadge :color="row.is_active === 1 ? 'green' : 'yellow'" variant="soft" size="xs">
                {{ getStatusLabel(row) }}
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
      </div>

      <!-- Pagination -->
      <div v-if="Array.isArray(productState.vendorProducts) && productState.vendorProducts.length > pageCount"
        class="flex flex-col sm:flex-row justify-between items-center px-4 lg:px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
        <div class="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          {{ (page - 1) * pageCount + 1 }}-{{ Math.min(page * pageCount, Array.isArray(productState.vendorProducts) ?
            productState.vendorProducts.length : 0) }} / {{
            Array.isArray(productState.vendorProducts) ? productState.vendorProducts.length : 0 }} ürün
        </div>
        <UPagination v-model="page" :page-count="pageCount"
          :total="Array.isArray(productState.vendorProducts) ? productState.vendorProducts.length : 0" :max="5" :ui="{
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
  // vendorProducts'ın array olduğundan emin ol
  const products = Array.isArray(productState.vendorProducts) ? productState.vendorProducts : [];
  const start = (page.value - 1) * pageCount;
  const end = start + pageCount;
  return products.slice(start, end);
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

const getStatusLabel = (product) => {
  // is_active alanına göre durum belirle
  if (product.is_active === 1) {
    return 'Yayında';
  } else if (product.is_active === 0) {
    return 'Taslak';
  }

  // Eski status sistemi için fallback
  const labels = {
    active: 'Aktif',
    draft: 'Taslak',
    inactive: 'Pasif'
  };
  return labels[product.status] || 'Bilinmiyor';
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

const getProductImagePath = (product) => {
  if (product.coverImage?.path || product.cover_image?.path) {
    return (product.coverImage?.path || product.cover_image?.path);
  } else if (product.oldestImage?.image?.path || product.oldest_image?.image?.path) {
    return (product.oldestImage?.image?.path || product.oldest_image?.image?.path);
  }
  return null;
};

// Initialize data
await refreshProducts();
</script>
