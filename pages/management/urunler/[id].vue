<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <UBreadcrumb :links="links" class="mb-2" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ isNewProduct ? 'Yeni Ürün Oluştur' : 'Ürün Düzenle' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            {{ isNewProduct ? 'Yeni bir ürün oluşturun ve detaylarını ekleyin' : 'Ürün bilgilerini güncelleyin' }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <UButton icon="i-heroicons-arrow-left" size="sm" color="gray" variant="outline" label="Geri Dön"
            to="/management/urunler" />
          <UButton icon="i-heroicons-eye" size="sm" color="gray" variant="outline" label="Önizle"
            :disabled="isNewProduct" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500" />
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Temel Bilgiler</h2>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ürün Adı *
              </label>
              <UInput v-model="productState.product.name" placeholder="Ürün adını girin..." size="lg"
                :ui="{ base: 'disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input' }" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kısa Açıklama
              </label>
              <UTextarea v-model="productState.product.description"
                placeholder="Ürün hakkında kısa bir açıklama yazın..." :rows="3" resize />
            </div>
          </div>
        </div>

        <!-- Detailed Description -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-document-text" class="w-5 h-5 text-green-500" />
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Detaylı Açıklama</h2>
          </div>

          <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <TiptapEditor :inital-data="productState.product.additional_info"
              @updated-content="e => productState.product.additional_info = e" />
          </div>
        </div>

        <!-- Product Data Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 mb-4">
              <Icon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-purple-500" />
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Ürün Detayları</h2>
            </div>

            <!-- Tab Navigation -->
            <div class="flex flex-wrap gap-1">
              <UButton v-for="tab in tabList" :key="tab.key" :color="currentTab === tab.key ? 'primary' : 'gray'"
                :variant="currentTab === tab.key ? 'solid' : 'ghost'" size="sm" :icon="tab.icon" :label="tab.label"
                @click="currentTab = tab.key" class="flex-shrink-0" />
            </div>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <KeepAlive>
              <component :is="tabs[currentTab]" />
            </KeepAlive>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">İşlemler</h3>

          <div class="space-y-3">
            <UButton :loading="productState.product.loading" @click="saveProduct(productState.product.id, true)"
              color="primary" size="lg" icon="i-heroicons-check" block class="justify-center">
              {{ isNewProduct ? 'Ürünü Oluştur' : 'Değişiklikleri Kaydet' }}
            </UButton>

            <UButton :loading="productState.product.loading" @click="saveProduct(productState.product.id, false)"
              color="gray" variant="outline" size="lg" icon="i-heroicons-document" block class="justify-center">
              Taslak Olarak Kaydet
            </UButton>

            <UButton v-if="!isNewProduct" color="red" variant="outline" size="lg" icon="i-heroicons-trash" block
              class="justify-center" @click="showDeleteModal = true">
              Ürünü Sil
            </UButton>
          </div>
        </div>

        <!-- Product Images -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Icon name="i-heroicons-photo" class="w-5 h-5 text-purple-500" />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ürün Görselleri</h3>
            </div>
            <UButton icon="i-heroicons-plus" size="xs" color="primary" variant="outline" label="Galeri"
              @click="isOpenMediaModal = true" />
          </div>

          <AdminPartialsMediaSelectBox v-model:is-open-modal="isOpenMediaModal"
            :selected-images="productState.product.selectedImages"
            v-model:cover-image-id="productState.product.coverImageId"
            @update:selected-images="productState.product.selectedImages = $event" />
        </div>

        <!-- Categories -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-tag" class="w-5 h-5 text-orange-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Kategoriler</h3>
          </div>

          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 max-h-64 overflow-y-auto">
            <UCommandPalette :emptyState="{ queryLabel: 'Kategori bulunamadı...' }" placeholder="Kategorilerde ara..."
              v-model="productState.product.selectedCategories" multiple nullable :autoselect="false"
              :groups="[{ key: 'label', commands: categoryState?.sortedCategories }]" :fuse="{ resultLimit: 30 }" />
          </div>

          <!-- Selected Categories Display -->
          <div v-if="productState.product.selectedCategories?.length" class="mt-4">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seçili Kategoriler:</p>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="category in productState.product.selectedCategories" :key="category.id" color="blue"
                variant="soft" size="sm">
                {{ category.label }}
              </UBadge>
            </div>
          </div>
        </div>

        <!-- Product Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-signal" class="w-5 h-5 text-green-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Durum</h3>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700 dark:text-gray-300">Ürün Durumu:</span>
              <UBadge :color="getStatusColor(productState.product.status)" variant="soft">
                {{ getStatusLabel(productState.product.status) }}
              </UBadge>
            </div>

            <div v-if="productState.product.created_at" class="flex items-center justify-between">
              <span class="text-sm text-gray-700 dark:text-gray-300">Oluşturulma:</span>
              <span class="text-sm text-gray-900 dark:text-white">
                {{ formatDate(productState.product.created_at) }}
              </span>
            </div>

            <div v-if="productState.product.updated_at" class="flex items-center justify-between">
              <span class="text-sm text-gray-700 dark:text-gray-300">Son Güncelleme:</span>
              <span class="text-sm text-gray-900 dark:text-white">
                {{ formatDate(productState.product.updated_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Modal -->
    <UModal v-model="isOpenMediaModal" fullscreen>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Medya Galerisi
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenMediaModal = false" />
          </div>
        </template>
        <AdminPartialsMedia v-model="productState.product.selectedImages" />
      </UCard>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <PartialsUiModalConfirmation v-model:is-open="showDeleteModal"
      :message="`'${productState.product.name || 'Bu ürün'}' ürünü kalıcı olarak silmek istediğinizden emin misiniz?`"
      confirm-text="Evet, Sil" cancel-text="İptal" @is-confirm="handleDeleteConfirm" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const productState = useProductState();
const categoryState = useCategoryState();
const route = useRoute();

const { tabs, saveProduct, getProduct, deleteProduct } = useProductCreate();

// Reactive data
const isOpenMediaModal = ref(false);
const currentTab = ref("GeneralTab");
const showDeleteModal = ref(false);

// Computed
const isNewProduct = computed(() => route.params.id === "yeni");

// Tab configuration
const tabList = [
  {
    key: 'GeneralTab',
    label: 'Genel',
    icon: 'i-heroicons-cog-6-tooth'
  },
  {
    key: 'AttributeTab',
    label: 'Nitelikler',
    icon: 'i-heroicons-list-bullet'
  },
  {
    key: 'VariationTab',
    label: 'Varyasyonlar',
    icon: 'i-heroicons-squares-2x2'
  },
  {
    key: 'FeaturedTab',
    label: 'Öne Çıkanlar',
    icon: 'i-heroicons-star'
  },
  {
    key: 'ExstrasTab',
    label: 'Özel Alanlar',
    icon: 'i-heroicons-squares-plus'
  }
];

// Breadcrumb links
const links = computed(() => [
  {
    label: 'Ürünler',
    icon: 'i-heroicons-squares-2x2',
    to: '/management/urunler'
  },
  {
    label: isNewProduct.value ? 'Yeni Ürün' : 'Ürün Düzenle',
    icon: isNewProduct.value ? 'i-heroicons-plus' : 'i-heroicons-pencil-square'
  }
]);

// Methods
const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktif',
    draft: 'Taslak',
    inactive: 'Pasif'
  };
  return labels[status] || 'Bilinmiyor';
};

const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    draft: 'yellow',
    inactive: 'red'
  };
  return colors[status] || 'gray';
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

const handleDeleteConfirm = async (confirmed) => {
  if (confirmed && !isNewProduct.value) {
    try {
      await deleteProduct(productState.product.id);
      await navigateTo('/management/urunler');
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error);
    }
  }
  showDeleteModal.value = false;
};

// Initialize
if (isNewProduct.value) {
  productState.product = {};
  await saveProduct(productState.product.id, true);
} else {
  await getProduct(route.params.id);
}

await categoryState.getCategories();
</script>
