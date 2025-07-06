<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <AdminCommonPageHeader :title="isNewProduct ? 'Yeni Ürün Oluştur' : 'Ürün Düzenle'"
      :description="isNewProduct ? 'Yeni bir ürün oluşturun ve detaylarını ekleyin' : 'Ürün bilgilerini güncelleyin'"
      :breadcrumb-links="links">
      <template #actions>
        <UButton icon="i-heroicons-arrow-left" size="sm" color="gray" variant="outline" label="Geri Dön"
          to="/management/urunler" />
        <UButton v-if="!isNewProduct && productState.product.is_active === 1"
          icon="i-heroicons-arrow-top-right-on-square" size="sm" color="green" variant="outline" label="Ürüne Git"
          :to="getProductUrl()" target="_blank" />
      </template>
    </AdminCommonPageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500" />
            <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">Temel Bilgiler</h2>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Ürün Adı *
              </label>
              <UInput v-model="productState.product.name" placeholder="Ürün adını girin..." size="lg"
                :ui="{ base: 'disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input' }" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Kısa Açıklama
              </label>
              <UTextarea v-model="productState.product.description"
                placeholder="Ürün hakkında kısa bir açıklama yazın..." :rows="3" resize size="lg"
                :ui="{ base: 'disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-textarea' }" />
            </div>
          </div>
        </div>

        <!-- Detailed Description -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-document-text" class="w-5 h-5 text-green-500" />
            <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">Detaylı Açıklama</h2>
          </div>

          <TiptapEditor :inital-data="productState.product.additional_info"
            placeholder="Ürününüzün detaylı açıklamasını buraya yazın..."
            @updated-content="e => productState.product.additional_info = e" />
        </div>

        <!-- Product Data Tabs -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
          <div class="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center gap-2 mb-4">
              <Icon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-purple-500" />
              <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">Ürün Detayları</h2>
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
            <!-- Video Tab - special handling -->
            <AdminPartialsProductVideoTab v-if="currentTab === 'VideoTab'" :product-id="productState.product.id"
              :initial-video-data="productVideoData" :product-attributes="attributeState.attributes"
              @video-updated="handleVideoUpdated" />
            <!-- Other Tabs -->
            <component v-else :is="tabs[currentTab]" />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6 flex flex-col-reverse md:flex-col ">
        <!-- Actions -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white  mb-4">İşlemler</h3>

          <div class="space-y-3">
            <UButton :loading="productState.product.loading" @click="handleSaveProduct(true)" color="primary" size="lg"
              icon="i-heroicons-check" block class="justify-center">
              {{ isNewProduct ? 'Ürünü Oluştur' : 'Değişiklikleri Kaydet' }}
            </UButton>

            <UButton :loading="productState.product.loading" @click="handlePublishProduct()" color="orange"
              variant="solid" size="lg" icon="i-heroicons-globe-alt" block class="justify-center"
              v-if="productState.product.is_active !== 1" :disabled="!canPublishProduct"
              :title="canPublishProduct ? 'Ürünü yayınla' : 'Yayınlamak için: ürün adı, fiyat, kategori ve görsel gerekli'">
              Ürünü Yayınla
            </UButton>

            <!-- Yayınlama Gereklilikleri -->
            <div v-if="productState.product.is_active !== 1 && !canPublishProduct"
              class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 text-sm">
              <div class="flex items-center gap-2 mb-2">
                <Icon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span class="font-medium text-amber-800 dark:text-amber-200">Yayınlamak için eksik:</span>
              </div>
              <ul class="space-y-1 text-amber-700 dark:text-amber-300">
                <li v-if="!productState.product.name || productState.product.name.trim() === ''"
                  class="flex items-center gap-2">
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  Ürün adı
                </li>

                <!-- Fiyat kontrolü - varyasyonlu ve basit ürün için farklı mesajlar -->
                <li
                  v-if="(hasColorAttribute || (attributeState.attributes && attributeState.attributes.some(attr => attr.useForVariation))) &&
                    (!variationState.variations || variationState.variations.length === 0 ||
                      !variationState.variations.some(v => (v.price && parseFloat(v.price) > 0) || (v.sale_price && parseFloat(v.sale_price) > 0)))"
                  class="flex items-center gap-2">
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  <div>
                    <div>Varyasyon fiyatları</div>
                    <div class="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      {{ !variationState.variations || variationState.variations.length === 0
                        ? 'Önce varyasyonlar oluşturulmalı, sonra fiyatları girilmeli'
                        : 'En az bir varyasyonun fiyatı girilmeli' }}
                    </div>
                  </div>
                </li>

                <li v-else-if="!(hasColorAttribute || (attributeState.attributes && attributeState.attributes.some(attr => attr.useForVariation))) &&
                  (!productState.product.price || productState.product.price <= 0)" class="flex items-center gap-2">
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  Fiyat
                </li>

                <li
                  v-if="!productState.product.selectedCategories || productState.product.selectedCategories.length === 0"
                  class="flex items-center gap-2">
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  En az bir kategori
                </li>
                <li
                  v-if="!hasColorAttribute && (!productState.product.selectedImages || productState.product.selectedImages.length === 0)"
                  class="flex items-center gap-2">
                  <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
                  En az bir görsel
                </li>
                <li v-if="hasColorAttribute" class="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Icon name="i-heroicons-check" class="w-3 h-3" />
                  Görseller renk nitelikleri için atanacak
                </li>
              </ul>
            </div>

            <UButton :loading="productState.product.loading" @click="handleSaveDraft()" color="gray" variant="outline"
              size="lg" icon="i-heroicons-document" block class="justify-center">
              Taslak Olarak Kaydet
            </UButton>

            <UButton v-if="!isNewProduct" color="red" variant="outline" size="lg" icon="i-heroicons-trash" block
              class="justify-center" @click="showDeleteModal = true">
              Ürünü Sil
            </UButton>
          </div>
        </div>


        <!-- Product Status -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 !mb-6 md:!mb-0">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-signal" class="w-5 h-5 text-green-500" />
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Durum</h3>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-700 dark:text-neutral-300">Ürün Durumu:</span>
              <UBadge :color="getStatusColor(productState.product.status)" variant="soft">
                {{ getStatusLabel(productState.product.status) }}
              </UBadge>
            </div>

            <div v-if="productState.product.created_at" class="flex items-center justify-between">
              <span class="text-sm text-neutral-700 dark:text-neutral-300">Oluşturulma:</span>
              <span class="text-sm text-neutral-900 dark:text-white">
                {{ formatDate(productState.product.created_at) }}
              </span>
            </div>

            <div v-if="productState.product.updated_at" class="flex items-center justify-between">
              <span class="text-sm text-neutral-700 dark:text-neutral-300">Son Güncelleme:</span>
              <span class="text-sm text-neutral-900 dark:text-white">
                {{ formatDate(productState.product.updated_at) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Product Images -->
        <div v-if="!hasColorAttribute"
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Icon name="i-heroicons-photo" class="w-5 h-5 text-purple-500" />
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Ürün Görselleri</h3>
            </div>
            <UButton icon="i-heroicons-plus" size="xs" color="primary" variant="outline" label="Galeri"
              @click="isOpenMediaModal = true" />
          </div>

          <AdminPartialsMediaSelectBox v-model:is-open-modal="isOpenMediaModal"
            :selected-images="productState.product.selectedImages" :product-id="productState.product.id"
            v-model:cover-image-id="productState.product.coverImageId"
            @update:selected-images="productState.product.selectedImages = $event" />
        </div>

        <!-- Color Attribute Info -->
        <div v-if="hasColorAttribute"
          class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-6">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100">Renk Niteliği Bilgisi</h3>
          </div>
          <p class="text-sm text-amber-800 dark:text-amber-200 mb-2">
            Bu ürün renk niteliğine sahip olduğu için genel ürün görselleri kısmı gizlenmiştir.
          </p>
          <p class="text-xs text-amber-700 dark:text-amber-300">
            Her renk için özel görseller "Nitelikler" sekmesinden atanabilir.
          </p>
        </div>

        <!-- Categories -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <div class="flex items-center gap-2 mb-4">
            <Icon name="i-heroicons-tag" class="w-5 h-5 text-orange-500" />
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Kategoriler</h3>
          </div>

          <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 max-h-64 overflow-y-auto">
            <div v-if="!categoryState?.sortedCategories?.length" class="flex items-center justify-center py-8">
              <div class="text-center">
                <Icon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin mx-auto mb-2 text-neutral-400" />
                <p class="text-sm text-neutral-500">Kategoriler yükleniyor...</p>
              </div>
            </div>
            <UCommandPalette v-else :emptyState="{ queryLabel: 'Kategori bulunamadı...' }"
              placeholder="Kategorilerde ara..." v-model="selectedCategoriesProxy" multiple nullable :autoselect="false"
              :groups="[{ key: 'label', commands: categoryState.sortedCategories }]" :fuse="{ resultLimit: 30 }" />
          </div>

          <!-- Selected Categories Display -->
          <div v-if="selectedCategoriesProxy?.length" class="mt-4">
            <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Seçili Kategoriler:</p>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="category in selectedCategoriesProxy" :key="category.id" color="blue" variant="soft"
                size="sm">
                {{ category.label }}
              </UBadge>
            </div>
          </div>
        </div>


      </div>
    </div>

    <!-- Media Modal -->
    <UModal v-model="isOpenMediaModal" fullscreen>
      <div class="h-full bg-white dark:bg-neutral-900 flex flex-col">
        <!-- Modal Header -->
        <div
          class="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 sticky top-0 z-10">
          <h3 class="text-base sm:text-lg font-semibold leading-6 text-neutral-900 dark:text-white">
            Medya Galerisi
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpenMediaModal = false" />
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto">
          <AdminPartialsMedia v-model="productState.product.selectedImages" />
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <PartialsUiModalConfirmation v-model:is-open="showDeleteModal"
      :message="`'${productState.product.name || 'Bu ürün'}' ürünü kalıcı olarak silmek istediğinizden emin misiniz?`"
      confirm-text="Evet, Sil" cancel-text="İptal" @is-confirm="handleDeleteConfirm" />

    <!-- Exit Warning Modal for New Product -->
    <UModal v-model="showExitWarningModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-neutral-900 dark:text-white">
              Sayfadan Ayrılıyor Musunuz?
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ isAutoCreatedProduct && (!productState.product.name || productState.product.name.trim() === '')
              ? 'Otomatik olarak oluşturulan ürün var. Ne yapmak istersiniz?'
              : 'Kaydedilmemiş değişiklikleriniz var. Ne yapmak istersiniz?' }}
          </p>

          <div class="flex flex-col gap-3">
            <UButton color="red" variant="solid" size="lg" icon="i-heroicons-trash" block class="justify-center"
              :loading="isDeleting" @click="deleteAndExit">
              Ürünü Sil ve Çık
            </UButton>

            <UButton color="orange" variant="solid" size="lg" icon="i-heroicons-document" block class="justify-center"
              :loading="isSavingDraft" @click="saveDraftAndExit">
              Taslak Olarak Kaydet ve Çık
            </UButton>

            <UButton color="gray" variant="outline" size="lg" block class="justify-center" @click="cancelExit">
              Vazgeç
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const productState = useProductState();
const categoryState = useCategoryState();
const attributeState = useAttributeState();
const variationState = useVariationState();
const route = useRoute();

// Import the composable function
const { tabs, saveProduct, getProduct, deleteProduct } = useProductCreate();

// Reactive data
const isOpenMediaModal = ref(false);
const currentTab = ref("GeneralTab");
const showDeleteModal = ref(false);
const showExitWarningModal = ref(false);
const isDeleting = ref(false);
const isSavingDraft = ref(false);
const isAutoCreatedProduct = ref(false);
const pendingNavigation = ref(null);
const bypassNavigationGuard = ref(false); // Navigation guard'ı bypass etmek için
const originalProduct = ref(null); // Orijinal ürün verilerini saklamak için

// Computed
const isNewProduct = computed(() => route.params.id === "yeni");

// Check if product has color attribute
const hasColorAttribute = computed(() => {
  return attributeState.attributes?.some(attr =>
    attr.attribute_name && attr.attribute_name.toLowerCase() === 'renk'
  );
});

// Categories proxy to handle null/undefined values safely
const selectedCategoriesProxy = computed({
  get() {
    return productState.product.selectedCategories || [];
  },
  set(value) {
    productState.product.selectedCategories = value;
  }
});

// Video data computed
const productVideoData = computed(() => {
  if (!productState.product.video_url) return null;

  const result = {
    url: productState.product.video_url,
    type: productState.product.video_type,
    thumbnail: productState.product.video_thumbnail,
    description: productState.product.video_description,
    is_featured: Boolean(productState.product.is_video_featured)
  };

  console.log('productVideoData computed:', result);
  console.log('Product state is_video_featured:', productState.product.is_video_featured, typeof productState.product.is_video_featured);

  return result;
});

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
    key: 'VideoTab',
    label: 'Video',
    icon: 'i-heroicons-play-circle'
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
const hasUnsavedChanges = () => {
  if (!originalProduct.value || !productState.product) {
    return false;
  }

  // Önemli alanları karşılaştır
  const fieldsToCheck = [
    'name', 'description', 'price', 'sale_price', 'stock',
    'stock_management', 'sku', 'is_active', 'discount',
    'discount_start_date', 'discount_end_date', 'additional_info'
  ];

  for (const field of fieldsToCheck) {
    if (originalProduct.value[field] !== productState.product[field]) {
      console.log(`Değişiklik tespit edildi - ${field}:`, {
        orijinal: originalProduct.value[field],
        mevcut: productState.product[field]
      });
      return true;
    }
  }

  // Kategori değişikliklerini kontrol et
  const originalCategoryIds = originalProduct.value.selectedCategories?.map(cat => cat.id).sort() || [];
  const currentCategoryIds = productState.product.selectedCategories?.map(cat => cat.id).sort() || [];

  if (JSON.stringify(originalCategoryIds) !== JSON.stringify(currentCategoryIds)) {
    console.log('Kategori değişikliği tespit edildi');
    return true;
  }

  // Görsel değişikliklerini kontrol et
  const originalImageIds = originalProduct.value.selectedImages?.map(img => img.id).sort() || [];
  const currentImageIds = productState.product.selectedImages?.map(img => img.id).sort() || [];

  if (JSON.stringify(originalImageIds) !== JSON.stringify(currentImageIds)) {
    console.log('Görsel değişikliği tespit edildi');
    return true;
  }

  return false;
};

const saveOriginalProduct = () => {
  // Ürün verilerinin derin kopyasını al
  originalProduct.value = JSON.parse(JSON.stringify(productState.product));
  console.log('Orijinal ürün verileri kaydedildi:', originalProduct.value);
};

const getStatusLabel = (status) => {
  // is_active değerine göre status belirle
  if (productState.product.is_active === 1) {
    return 'Yayında';
  } else if (productState.product.is_active === 0) {
    return 'Taslak';
  }

  // Eski status sistemi için fallback
  const labels = {
    active: 'Aktif',
    draft: 'Taslak',
    inactive: 'Pasif'
  };
  return labels[status] || 'Bilinmiyor';
};

const getStatusColor = (status) => {
  // Stok durumu kontrolü
  if (productState.product.stock_status === 'out_of_stock') {
    return 'red';
  } else if (productState.product.stock_status === 'discontinued') {
    return 'gray';
  }

  // is_active değerine göre renk belirle
  if (productState.product.is_active === 1) {
    return 'green';
  } else if (productState.product.is_active === 0) {
    return 'yellow';
  }

  // Eski status sistemi için fallback
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

      // 404 hatası ise ürün zaten silinmiş demektir, ürünler sayfasına git
      if (error.status === 404 || error.statusCode === 404) {
        console.log('Ürün zaten silinmiş, ürünler sayfasına yönlendiriliyor...');
        await navigateTo('/management/urunler');
      } else {
        // Diğer hatalar için toast göster
        try {
          useNuxtApp().$toast.error('Ürün silinirken beklenmeyen bir hata oluştu');
        } catch (toastError) {
          console.error('Toast error:', toastError);
          alert('Ürün silinirken beklenmeyen bir hata oluştu');
        }
      }
    }
  }
  showDeleteModal.value = false;
};

// Exit warning modal methods
const deleteAndExit = async () => {
  isDeleting.value = true;
  try {
    console.log('deleteAndExit başlıyor, product ID:', productState.product.id);

    if (productState.product.id) {
      console.log('Ürün siliniyor...');
      await deleteProduct(productState.product.id);
      console.log('Ürün başarıyla silindi');
    }

    showExitWarningModal.value = false;

    // Navigation guard'ı bypass et
    bypassNavigationGuard.value = true;

    // Ürün silindikten sonra her durumda ürünler sayfasına git
    console.log('Ürünler sayfasına yönlendiriliyor...');
    await navigateTo('/management/urunler');

  } catch (error) {
    console.error('Ürün silinirken hata oluştu:', error);

    // 404 hatası ise ürün zaten silinmiş demektir, sayfadan çık
    if (error.status === 404 || error.statusCode === 404) {
      console.log('Ürün zaten silinmiş, sayfadan çıkılıyor...');
      showExitWarningModal.value = false;
      bypassNavigationGuard.value = true; // Navigation guard'ı bypass et
      await navigateTo('/management/urunler');
    } else {
      // Diğer hatalar için toast göster ama yine de sayfadan çık
      try {
        useNuxtApp().$toast.error('Ürün silinirken beklenmeyen bir hata oluştu');
      } catch (toastError) {
        console.error('Toast error:', toastError);
        alert('Ürün silinirken beklenmeyen bir hata oluştu');
      }

      // Hata olsa bile modal'ı kapat ve sayfadan çık
      showExitWarningModal.value = false;
      bypassNavigationGuard.value = true; // Navigation guard'ı bypass et
      await navigateTo('/management/urunler');
    }
  } finally {
    console.log('deleteAndExit finally bloğu');
    isDeleting.value = false;
  }
};

const saveDraftAndExit = async () => {
  isSavingDraft.value = true;
  try {
    console.log('saveDraftAndExit başlıyor, mevcut product:', productState.product);

    // is_active = 0 olarak kaydet (taslak) ve sale_price problemini çöz
    const originalIsActive = productState.product.is_active;
    const originalSalePrice = productState.product.sale_price;

    productState.product.is_active = 0;
    // Eğer sale_price 0 ise null yap ki validation problemi olmasın
    if (productState.product.sale_price === 0) {
      console.log('sale_price 0 bulundu, null yapılıyor');
      productState.product.sale_price = null;
    }

    console.log('saveProduct çağrılıyor...');
    await saveProduct(productState.product.id, false);

    console.log('saveProduct başarılı, modal kapatılıyor...');
    showExitWarningModal.value = false;

    // Navigation guard'ı bypass et
    bypassNavigationGuard.value = true;

    // Taslak kaydedildikten sonra ürünler sayfasına git
    console.log('Ürünler sayfasına yönlendiriliyor...');
    await navigateTo('/management/urunler');

  } catch (error) {
    console.error('Taslak kaydedilirken hata oluştu:', error);

    // 422 validation hatası ise detayları göster
    if (error.status === 422 || error.statusCode === 422) {
      const errorMessage = error.data?.errors ?
        Object.values(error.data.errors).flat().join(', ') :
        'Validation hatası oluştu';

      console.log('422 hatası alındı, error message:', errorMessage);

      // Toast varsa kullan, yoksa console'a yaz
      try {
        useNuxtApp().$toast.error(`Validation Hatası: ${errorMessage}`);
      } catch (toastError) {
        console.error('Toast error:', toastError);
        alert(`Validation Hatası: ${errorMessage}`);
      }
    } else {
      // Diğer hatalar için
      try {
        useNuxtApp().$toast.error('Taslak kaydedilirken bir hata oluştu');
      } catch (toastError) {
        console.error('Toast error:', toastError);
        alert('Taslak kaydedilirken bir hata oluştu');
      }
    }
  } finally {
    console.log('saveDraftAndExit finally bloğu');
    isSavingDraft.value = false;
  }
};

const cancelExit = () => {
  showExitWarningModal.value = false;
  pendingNavigation.value = null;
};

// Navigation guard
onBeforeRouteLeave((to, from, next) => {
  // Eğer bypass flag aktifse veya normal koşullar varsa geç
  if (bypassNavigationGuard.value) {
    console.log('Navigation guard bypass edildi');
    next(); // Bypass, navigasyona izin ver
    return;
  }

  // Değişiklik kontrolü yap
  const hasChanges = hasUnsavedChanges();

  // Otomatik oluşturulmuş ürün kontrolü - daha kapsamlı
  const isEmptyAutoCreated = productState.product.id &&
    (isAutoCreatedProduct.value ||
      (!productState.product.name || productState.product.name.trim() === '')) &&
    productState.product.is_active === 0; // Sadece taslak durumundaki ürünler için

  console.log('Navigation guard kontrol:', {
    hasChanges,
    isEmptyAutoCreated,
    isAutoCreatedProduct: isAutoCreatedProduct.value,
    productName: productState.product.name,
    productId: productState.product.id,
    isActive: productState.product.is_active
  });

  if (isEmptyAutoCreated || hasChanges) {
    console.log('Navigation guard - modal açılıyor', {
      isEmptyAutoCreated,
      hasChanges
    });
    pendingNavigation.value = to.path;
    showExitWarningModal.value = true;
    next(false); // Navigasyonu durdur
  } else {
    console.log('Navigation guard - normal navigasyon');
    next(); // Normal navigasyona izin ver
  }
});

// Window beforeunload event for browser close/refresh
onMounted(() => {
  const handleBeforeUnload = (event) => {
    // Otomatik oluşturulmuş ürün kontrolü - daha kapsamlı
    const isEmptyAutoCreated = productState.product.id &&
      (isAutoCreatedProduct.value ||
        (!productState.product.name || productState.product.name.trim() === '')) &&
      productState.product.is_active === 0;

    if (isEmptyAutoCreated) {
      event.preventDefault();
      event.returnValue = 'Otomatik oluşturulan ürün var. Sayfayı kapatmak istediğinizden emin misiniz?';
      return event.returnValue;
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
});

// Initialize
// Önce kategorileri yükle
await categoryState.getCategories();

if (isNewProduct.value) {
  productState.product = {
    name: '', // Boş string (null değil)
    description: '',
    price: 0,
    sale_price: null,
    stock: 0,
    stock_management: 0,
    stock_status: 'in_stock',
    sku: '',
    is_active: 0,
    discount: null,
    discount_start_date: null,
    discount_end_date: null,
    additional_info: '',
    coverImageId: null,
    selectedCategories: [], // Güvenli varsayılan değer
    selectedImages: []
  };

  // Yeni ürün oluştur
  await saveProduct(productState.product.id, false);

  // Ürün oluşturulduktan sonra ID'li sayfasına yönlendir
  if (productState.product.id) {
    // Navigation guard'ı bypass et çünkü bu otomatik yönlendirme
    bypassNavigationGuard.value = true;
    await navigateTo(`/management/urunler/${productState.product.id}`);
  }
} else {
  // Mevcut ürünü yükle
  await getProduct(route.params.id);

  // Ürün yüklendikten sonra nitelikleri de yükle
  if (productState.product?.id) {
    await attributeState.fetchAttributes(productState.product.id);
  }

  isAutoCreatedProduct.value = !productState.product.name || productState.product.name.trim() === '';
  originalProduct.value = JSON.parse(JSON.stringify(productState.product));
}

// Ürün yayınlama için gerekli alanları kontrol et
const canPublishProduct = computed(() => {
  if (!productState.product) return false;

  // Temel gereklilikler
  const hasName = productState.product.name && productState.product.name.trim() !== '';
  const hasCategories = productState.product.selectedCategories && productState.product.selectedCategories.length > 0;

  // Fiyat kontrolü - varyasyonlu ürünler için daha detaylı kontrol
  let hasPrice = false;

  // Eğer varyasyon niteliği varsa, varyasyon fiyatlarını kontrol et
  if (hasColorAttribute.value || (attributeState.attributes && attributeState.attributes.some(attr => attr.useForVariation))) {
    // Varyasyonlu ürün - varyasyon fiyatlarını kontrol et
    if (variationState.variations && variationState.variations.length > 0) {
      hasPrice = variationState.variations.some(variation =>
        (variation.price && parseFloat(variation.price) > 0) ||
        (variation.sale_price && parseFloat(variation.sale_price) > 0)
      );
    } else {
      // Varyasyon tanımlanmış ama varyasyon oluşturulmamış
      hasPrice = false;
    }
  } else {
    // Basit ürün - ana ürün fiyatını kontrol et
    hasPrice = productState.product.price && parseFloat(productState.product.price) > 0;
  }

  // Renk niteliği varsa görsel kontrolünü atla (her renk için ayrı görsel atanıyor)
  const hasImages = hasColorAttribute.value ? true :
    (productState.product.selectedImages && productState.product.selectedImages.length > 0);

  console.log('Yayınlama gereklilikleri kontrolü:', {
    hasName,
    hasPrice,
    hasCategories,
    hasImages,
    hasColorAttribute: hasColorAttribute.value,
    hasVariationAttributes: attributeState.attributes?.some(attr => attr.useForVariation),
    variationsCount: variationState.variations?.length || 0,
    variationPrices: variationState.variations?.map(v => ({ id: v.id, price: v.price, sale_price: v.sale_price })) || [],
    canPublish: hasName && hasPrice && hasCategories && hasImages
  });

  return hasName && hasPrice && hasCategories && hasImages;
});

// Save button wrapper functions
const handleSaveProduct = async (isActive = true) => {
  try {
    await saveProduct(productState.product.id, isActive);
    // Başarılı kayıt sonrası orijinal verileri güncelle
    saveOriginalProduct();
    console.log('Ürün başarıyla kaydedildi, orijinal veriler güncellendi');
  } catch (error) {
    console.error('Ürün kaydedilirken hata oluştu:', error);
    throw error;
  }
};

const handleSaveDraft = async () => {
  try {
    await saveProduct(productState.product.id, false);
    // Başarılı kayıt sonrası orijinal verileri güncelle
    saveOriginalProduct();
    console.log('Taslak başarıyla kaydedildi, orijinal veriler güncellendi');
  } catch (error) {
    console.error('Taslak kaydedilirken hata oluştu:', error);
    throw error;
  }
};

const handlePublishProduct = async () => {
  try {
    // is_active'i 1 yap (yayınla)
    productState.product.is_active = 1;
    await saveProduct(productState.product.id, true);
    // Başarılı kayıt sonrası orijinal verileri güncelle
    saveOriginalProduct();
    console.log('Ürün başarıyla yayınlandı, orijinal veriler güncellendi');
  } catch (error) {
    console.error('Ürün yayınlanırken hata oluştu:', error);
    throw error;
  }
};

const getProductUrl = () => {
  if (!productState.product?.id) {
    return '/';
  }

  // Ürün slug'ı varsa kullan, yoksa 'urun' varsayılanını kullan
  const slug = productState.product.slug || 'urun';

  // Renk niteliği kontrolü
  const colorAttribute = attributeState.attributes?.find(attr =>
    attr.attribute_name && attr.attribute_name.toLowerCase() === 'renk'
  );

  // Eğer renk niteliği varsa ve en az bir renk terimi varsa
  if (colorAttribute && colorAttribute.product_attribute_terms && colorAttribute.product_attribute_terms.length > 0) {
    const firstColorTerm = colorAttribute.product_attribute_terms[0];

    // Slug oluşturma - basit yöntem kullan
    const colorSlug = firstColorTerm.term_name
      .toLowerCase()
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const termId = firstColorTerm.product_attribute_term_id || firstColorTerm.id;

    // URL formatı: /urun/[slug]--[colorSlug]-[termId]
    return `/urun/${slug}--${colorSlug}-${termId}`;
  }

  // Renk niteliği yoksa normal URL formatı: /urun/[slug]--[id]
  return `/urun/${slug}--${productState.product.id}`;
};

// Video updated handler
const handleVideoUpdated = (videoData) => {
  console.log('Video güncellendi:', videoData);
  console.log('videoData.is_featured:', videoData.is_featured, typeof videoData.is_featured);

  // Product state'ini güncelle
  productState.product.video_url = videoData.url;
  productState.product.video_type = videoData.type;
  productState.product.video_thumbnail = videoData.thumbnail;
  productState.product.video_description = videoData.description;
  productState.product.is_video_featured = Boolean(videoData.is_featured);

  console.log('Product state güncellendi:', {
    video_url: productState.product.video_url,
    video_type: productState.product.video_type,
    is_video_featured: productState.product.is_video_featured
  });
};
</script>
