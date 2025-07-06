<template>
  <div class="space-y-6">
    <!-- Page Header -->

    <AdminCommonPageHeader title="Ürün Yönetimi"
      :description="`Toplam ${Array.isArray(productState.vendorProducts) ? productState.vendorProducts.length : 0} ürün bulunuyor`"
      :breadcrumb-links="breadcrumbLinks">
      <template #actions>
        <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
          @click="refreshProducts" :loading="isLoading" class="touch-manipulation" />
        <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Ürün Ekle"
          to="/management/urunler/yeni" class="touch-manipulation" />
      </template>
    </AdminCommonPageHeader>

    <!-- Products Grid/List Toggle -->
    <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
      <!-- View Toggle Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 space-y-3 sm:space-y-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
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
          <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            Henüz ürün yok
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-6">
            İlk ürününüzü ekleyerek başlayın
          </p>
          <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Ürün Ekle"
            to="/management/urunler/yeni" class="touch-manipulation" />
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          <div v-for="product in paginatedProducts" :key="product.id"
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">

            <!-- Product Image -->
            <div class="relative aspect-square bg-neutral-100 dark:bg-neutral-700">
              <!-- Renk niteliği olan ürünlerde basit slider göster -->
              <div v-if="product.has_color_attribute && product.colorImages?.length > 0" class="relative w-full h-full">
                <NuxtImg :src="'cl/' + getCurrentColorImage(product).image_path"
                  :alt="`${product.name} - ${getCurrentColorImage(product).color_name}`"
                  class="w-full h-full object-cover" format="webp" quality="90" :width="300" :height="400"
                  fit="inside" />

                <!-- Navigation buttons - sadece birden fazla renk varsa göster -->
                <div v-if="product.colorImages.length > 1"
                  class="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <button @click="previousColorImage(product.id)"
                    class="w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    :disabled="getColorImageIndex(product.id) === 0">
                    <Icon name="heroicons:chevron-left" class="w-3 h-3" />
                  </button>
                  <button @click="nextColorImage(product.id)"
                    class="w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    :disabled="getColorImageIndex(product.id) === product.colorImages.length - 1">
                    <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                  </button>
                </div>

                <!-- Dots indicator - sadece birden fazla renk varsa göster -->
                <div v-if="product.colorImages.length > 1"
                  class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <button v-for="(colorImage, index) in product.colorImages" :key="index"
                    @click="setColorImageIndex(product.id, index)" class="w-2 h-2 rounded-full transition-colors"
                    :class="getColorImageIndex(product.id) === index ? 'bg-white' : 'bg-white/50'">
                  </button>
                </div>
              </div>
              <!-- Normal ürün görseli -->
              <div v-else>
                <NuxtImg v-if="getProductImagePath(product)" :src="'cl/' + getProductImagePath(product)"
                  :alt="product.name" class="w-full h-full object-cover" format="webp" quality="90" :width="300"
                  :height="400" fit="inside" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <NuxtImg :src="'cl/' + 'edb26c39-166b-465f-780d-e930fa903900/public'"
                    class="w-full h-full object-cover" format="webp" quality="90" :width="300" :height="400"
                    fit="inside" background="#CCCCCC" />
                </div>
              </div>

              <!-- Status Badge -->
              <div class="absolute top-2 right-2">
                <UBadge :color="getStatusColor(product)" variant="solid" size="xs">
                  {{ getStatusLabel(product) }}
                </UBadge>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <div class="mb-3">
                <NuxtLink :to="`/management/urunler/${product.id}`"
                  class="text-base lg:text-lg font-semibold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 touch-manipulation">
                  {{ product.name || `Taslak ürün #${product.id}` }}
                </NuxtLink>
                <p v-if="product.description" class="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {{ product.description }}
                </p>
              </div>

              <!-- Price and Actions -->
              <div class="flex items-center justify-between">
                <div>
                  <div v-if="product.is_variation_product">
                    <!-- Varyasyonlı ürün fiyat gösterimi -->
                    <div v-if="product.display_price" class="flex flex-col">
                      <span v-if="product.has_price_range" class="font-semibold text-green-600 dark:text-green-400">
                        {{ formatPrice(product.display_price) }}+
                      </span>
                      <span v-else class="font-semibold text-green-600 dark:text-green-400">
                        {{ formatPrice(product.display_price) }}
                      </span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">
                        Varyasyonlara göre
                      </span>
                    </div>
                    <div v-else>
                      <span class="text-sm text-orange-500 dark:text-orange-400">
                        Varyasyon fiyatı belirlenmemiş
                      </span>
                    </div>
                  </div>
                  <div v-else>
                    <!-- Normal ürün fiyat gösterimi -->
                    <div v-if="product.sale_price">
                      <!-- İndirimli fiyat varsa onu göster -->
                      <span class="font-semibold text-orange-600 dark:text-orange-400">
                        {{ formatPrice(product.sale_price) }}
                      </span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400 line-through ml-2">
                        {{ formatPrice(product.price) }}
                      </span>
                    </div>
                    <div v-else-if="product.price">
                      <!-- Normal fiyat -->
                      <span class="font-semibold text-green-600 dark:text-green-400">
                        {{ formatPrice(product.price) }}
                      </span>
                    </div>
                    <div v-else>
                      <span class="text-sm text-neutral-500 dark:text-neutral-400">
                        Fiyat belirtilmemiş
                      </span>
                    </div>
                  </div>
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
            <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">
              Henüz ürün yok
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400 mb-6">
              İlk ürününüzü ekleyerek başlayın
            </p>
            <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Ürün Ekle"
              to="/management/urunler/yeni" class="touch-manipulation" />
          </div>

          <div v-else class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <div v-for="product in paginatedProducts" :key="product.id"
              class="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
              <div class="flex items-start space-x-4">
                <!-- Product Image -->
                <div
                  class="w-16 h-16 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <!-- Renk niteliği olan ürünlerde mini renk görselleri -->
                  <div v-if="product.has_color_attribute && product.colorImages?.length > 0"
                    class="relative w-full h-full">
                    <div class="grid grid-cols-2 gap-0.5 w-full h-full p-1">
                      <div v-for="(colorImage, index) in product.colorImages.slice(0, 4)" :key="index"
                        class="relative rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-600" :class="{
                          'col-span-2': product.colorImages.length === 1,
                          'w-full h-full': product.colorImages.length <= 4
                        }">
                        <NuxtImg :src="'cl/' + colorImage.image_path" :alt="colorImage.color_name"
                          class="w-full h-full object-cover" />
                      </div>
                      <!-- Fazla renk göstergesi -->
                      <div v-if="product.colorImages.length > 4"
                        class="absolute bottom-0 right-0 w-4 h-4 bg-neutral-800/80 text-white text-[8px] flex items-center justify-center rounded-full">
                        +{{ product.colorImages.length - 4 }}
                      </div>
                    </div>
                  </div>
                  <!-- Normal ürün görseli -->
                  <div v-else class="w-full h-full">
                    <NuxtImg v-if="getProductImagePath(product)" :src="'cl/' + getProductImagePath(product)"
                      :alt="product.name" class="w-full h-full object-cover" />
                    <Icon v-else name="mdi:image-outline" class="w-6 h-6 text-neutral-400" />
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <NuxtLink :to="`/management/urunler/${product.id}`"
                        class="font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-manipulation"
                        :class="{ '!text-red-500': !product.name }">
                        <span class="line-clamp-1">{{ product.name || `Taslak ürün #${product.id}` }}</span>
                      </NuxtLink>

                      <div class="mt-1 flex items-center space-x-2">
                        <UBadge :color="getStatusColor(product)" variant="soft" size="xs">
                          {{ getStatusLabel(product) }}
                        </UBadge>
                        <span v-if="product.sku" class="text-xs text-neutral-500 dark:text-neutral-400">
                          SKU: {{ product.sku }}
                        </span>
                      </div>

                      <div class="mt-1 flex items-center space-x-4">
                        <div v-if="product.is_variation_product">
                          <!-- Varyasyonlı ürün fiyat gösterimi -->
                          <div v-if="product.display_price" class="flex flex-col">
                            <span v-if="product.has_price_range"
                              class="font-semibold text-green-600 dark:text-green-400">
                              {{ formatPrice(product.display_price) }}+
                            </span>
                            <span v-else class="font-semibold text-green-600 dark:text-green-400">
                              {{ formatPrice(product.display_price) }}
                            </span>
                            <span class="text-xs text-neutral-500 dark:text-neutral-400">
                              Varyasyonlara göre
                            </span>
                          </div>
                          <div v-else>
                            <span class="text-sm text-orange-500 dark:text-orange-400">
                              Varyasyon fiyatı belirlenmemiş
                            </span>
                          </div>
                        </div>
                        <div v-else>
                          <!-- Normal ürün fiyat gösterimi -->
                          <div v-if="product.sale_price">
                            <!-- İndirimli fiyat varsa onu göster -->
                            <span class="font-semibold text-orange-600 dark:text-orange-400">
                              {{ formatPrice(product.sale_price) }}
                            </span>
                            <span class="text-xs text-neutral-500 dark:text-neutral-400 line-through ml-2">
                              {{ formatPrice(product.price) }}
                            </span>
                          </div>
                          <div v-else-if="product.price">
                            <!-- Normal fiyat -->
                            <span class="font-semibold text-green-600 dark:text-green-400">
                              {{ formatPrice(product.price) }}
                            </span>
                          </div>
                        </div>
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
              <span class="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                #{{ row.id }}
              </span>
            </template>

            <template #name-data="{ row }">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden relative">
                  <!-- Renk niteliği olan ürünlerde mini renk görselleri -->
                  <div v-if="row.has_color_attribute && row.colorImages?.length > 0" class="w-full h-full">
                    <div class="flex flex-wrap gap-0.5 w-full h-full p-0.5">
                      <div v-for="(colorImage, index) in row.colorImages.slice(0, 3)" :key="index"
                        class="rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-600" :class="{
                          'w-8 h-8': row.colorImages.length === 1,
                          'w-3 h-3': row.colorImages.length > 1
                        }">
                        <NuxtImg :src="'cl/' + colorImage.image_path" :alt="colorImage.color_name"
                          class="w-full h-full object-cover" />
                      </div>
                      <!-- Fazla renk göstergesi -->
                      <div v-if="row.colorImages.length > 3"
                        class="absolute bottom-0 right-0 w-3 h-3 bg-neutral-800/80 text-white text-[6px] flex items-center justify-center rounded-full">
                        +{{ row.colorImages.length - 3 }}
                      </div>
                    </div>
                  </div>
                  <!-- Normal ürün görseli -->
                  <div v-else class="w-full h-full">
                    <NuxtImg v-if="getProductImagePath(row)" :src="'cl/' + getProductImagePath(row)" :alt="row.name"
                      class="w-full h-full object-cover" />
                    <Icon v-else name="mdi:image-outline" class="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <NuxtLink :to="`/management/urunler/${row.id}`"
                    class="font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    :class="{ '!text-red-500': !row.name }">
                    {{ row.name || `Taslak ürün #${row.id}` }}
                  </NuxtLink>
                  <p v-if="row.description" class="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {{ row.description }}
                  </p>
                </div>
              </div>
            </template>

            <template #price-data="{ row }">
              <div v-if="row.is_variation_product">
                <!-- Varyasyonlı ürün fiyat gösterimi -->
                <div v-if="row.display_price">
                  <span v-if="row.has_price_range" class="font-semibold text-green-600 dark:text-green-400">
                    {{ formatPrice(row.display_price) }}+
                  </span>
                  <span v-else class="font-semibold text-green-600 dark:text-green-400">
                    {{ formatPrice(row.display_price) }}
                  </span>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    Varyasyonlara göre
                  </p>
                </div>
                <div v-else>
                  <span class="text-orange-500 dark:text-orange-400 text-sm">
                    Varyasyon fiyatı belirlenmemiş
                  </span>
                </div>
              </div>
              <div v-else>
                <!-- Normal ürün fiyat gösterimi -->
                <div v-if="row.sale_price">
                  <!-- İndirimli fiyat varsa onu göster -->
                  <span class="font-semibold text-orange-600 dark:text-orange-400">
                    {{ formatPrice(row.sale_price) }}
                  </span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 line-through ml-2">
                    {{ formatPrice(row.price) }}
                  </span>
                </div>
                <div v-else-if="row.price">
                  <!-- Normal fiyat -->
                  <span class="font-semibold text-green-600 dark:text-green-400">
                    {{ formatPrice(row.price) }}
                  </span>
                </div>
                <div v-else>
                  <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                    Belirtilmemiş
                  </span>
                </div>
              </div>
            </template>

            <template #sale_price-data="{ row }">
              <div v-if="row.is_variation_product">
                <!-- Varyasyonlı ürünlerde sale_price ayrı gösterilmez -->
                <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                  Varyasyonlarda
                </span>
              </div>
              <div v-else>
                <!-- Normal ürün sale_price gösterimi - sadece indirim oranı -->
                <div v-if="row.sale_price && row.price">
                  <span class="text-red-600 dark:text-red-400 font-medium text-sm">
                    %{{ Math.round(((row.price - row.sale_price) / row.price) * 100) }} İndirim
                  </span>
                </div>
                <div v-else>
                  <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                    -
                  </span>
                </div>
              </div>
            </template>

            <template #sku-data="{ row }">
              <span v-if="row.sku" class="text-neutral-900 dark:text-white">
                {{ row.sku }}
              </span>
              <span v-else class="text-neutral-500 dark:text-neutral-400 text-sm">
                -
              </span>
            </template>

            <template #status-data="{ row }">
              <UBadge :color="getStatusColor(row)" variant="soft" size="xs">
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
        class="flex flex-col sm:flex-row justify-between items-center px-4 lg:px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3 sm:space-y-0">
        <div class="text-sm text-neutral-700 dark:text-neutral-300 text-center sm:text-left">
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
const colorImageIndexes = ref({}); // Her ürün için aktif renk görseli index'i

// Breadcrumb links
const breadcrumbLinks = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/management'
  },
  {
    label: 'Ürünler',
    icon: 'i-heroicons-cube'
  }
];

// Computed properties
const paginatedProducts = computed(() => {
  // vendorProducts'ın array olduğundan emin ol
  const products = Array.isArray(productState.vendorProducts) ? productState.vendorProducts : [];
  const start = (page.value - 1) * pageCount;
  const end = start + pageCount;
  return products.slice(start, end);
});

// Color image navigation methods
const getCurrentColorImage = (product) => {
  const index = colorImageIndexes.value[product.id] || 0;
  return product.colorImages[index] || product.colorImages[0];
};

const getColorImageIndex = (productId) => {
  return colorImageIndexes.value[productId] || 0;
};

const setColorImageIndex = (productId, index) => {
  colorImageIndexes.value[productId] = index;
};

const nextColorImage = (productId) => {
  const product = paginatedProducts.value.find(p => p.id === productId);
  if (product && product.colorImages) {
    const currentIndex = colorImageIndexes.value[productId] || 0;
    const nextIndex = (currentIndex + 1) % product.colorImages.length;
    colorImageIndexes.value[productId] = nextIndex;
  }
};

const previousColorImage = (productId) => {
  const product = paginatedProducts.value.find(p => p.id === productId);
  if (product && product.colorImages) {
    const currentIndex = colorImageIndexes.value[productId] || 0;
    const prevIndex = currentIndex === 0 ? product.colorImages.length - 1 : currentIndex - 1;
    colorImageIndexes.value[productId] = prevIndex;
  }
};

// Methods
const refreshProducts = async () => {
  isLoading.value = true;
  try {
    await getVendorProducts();
    // Yeni ürünler yüklendiğinde index'leri sıfırla
    colorImageIndexes.value = {};
  } finally {
    isLoading.value = false;
  }
};

const getStatusLabel = (product) => {
  // Stok durumu kontrolü
  if (product.stock_status === 'out_of_stock') {
    return 'Stok Dışı';
  } else if (product.stock_status === 'discontinued') {
    return 'Üretimi Durduruldu';
  }

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

const getStatusColor = (product) => {
  // Stok durumu kontrolü
  if (product.stock_status === 'out_of_stock') {
    return 'red';
  } else if (product.stock_status === 'discontinued') {
    return 'gray';
  }

  // is_active alanına göre renk belirle
  if (product.is_active === 1) {
    return 'green';
  } else if (product.is_active === 0) {
    return 'yellow';
  }

  // Eski status sistemi için fallback
  const colors = {
    active: 'green',
    draft: 'yellow',
    inactive: 'red'
  };
  return colors[product.status] || 'gray';
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

// Watch for page changes to reset indexes
watch(page, () => {
  colorImageIndexes.value = {};
});

// Initialize data
await refreshProducts();
</script>
