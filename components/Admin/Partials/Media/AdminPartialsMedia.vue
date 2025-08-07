<template>
  <div class="flex flex-col">
    <!-- Header Section -->
    <div class="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-col gap-4">
        <!-- Title and Stats -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Medya Galerisi</h2>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ images.total || 0 }} görsel • {{ selectedCount }} seçili
            </p>
          </div>

          <div class="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <!-- View Mode Toggle -->
            <UButtonGroup size="sm" orientation="horizontal" class="flex-shrink-0">
              <UButton :color="viewMode === 'grid' ? 'primary' : 'gray'"
                :variant="viewMode === 'grid' ? 'solid' : 'outline'" icon="i-heroicons-squares-2x2"
                @click="viewMode = 'grid'" />
              <UButton :color="viewMode === 'list' ? 'primary' : 'gray'"
                :variant="viewMode === 'list' ? 'solid' : 'outline'" icon="i-heroicons-list-bullet"
                @click="viewMode = 'list'" />
            </UButtonGroup>

            <!-- Upload Button -->
            <AdminPartialsMediaUploadButton @uploaded-images="imgs => addNewPathsToImages(imgs)"
              class="flex-shrink-0" />
          </div>
        </div>

        <!-- Search and Filters -->
        <!-- <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass" placeholder="Görsellerde ara..." size="md"
              :ui="{ icon: { trailing: { pointer: '' } } }">
              <template #trailing>
                <UButton v-show="searchQuery !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                  :padded="false" @click="searchQuery = ''" />
              </template>
</UInput>
</div>

<USelectMenu v-model="sortBy" :options="sortOptions" placeholder="Sıralama" size="md"
  class="w-full sm:w-48 flex-shrink-0" :ui="{
              rounded: 'rounded-lg',
              trigger: 'flex items-center justify-between w-full',
              background: 'bg-white dark:bg-gray-800',
              ring: 'ring-1 ring-gray-300 dark:ring-gray-600',
              placeholder: 'text-gray-500 dark:text-gray-400',
              color: {
                white: {
                  outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400'
                }
              }
            }" />
</div> -->

        <!-- Bulk Actions -->
        <div v-if="selectedCount > 0"
          class="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span class="text-sm font-medium text-secondary-900 dark:text-secondary-100 text-center sm:text-left">
              {{ selectedCount }} görsel seçildi
            </span>
            <div class="flex items-center gap-2 justify-center sm:justify-end">
              <UButton size="xs" color="gray" variant="outline" label="Tümünü Kaldır" @click="clearSelection"
                class="text-xs px-2 py-1" />
              <UButton size="xs" color="red" variant="outline" icon="i-heroicons-trash" label="Seçilenleri Sil"
                @click="showBulkDeleteModal = true" class="text-xs px-2 py-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 relative">
      <!-- Loading Overlay -->
      <div v-if="loading"
        class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div class="text-center">
          <Icon name="mdi:loading" class="w-8 h-8 animate-spin text-primary-500 mx-auto mb-2" />
          <p class="text-sm text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && (!images.data || images.data.length === 0)"
        class="flex flex-col items-center justify-center min-h-[400px] p-6 sm:p-8">
        <Icon name="i-heroicons-photo" class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" />
        <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2 text-center">
          Henüz görsel yok
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4 sm:mb-6 text-sm sm:text-base max-w-md">
          İlk görselinizi yükleyerek başlayın
        </p>
        <AdminPartialsMediaUploadButton @uploaded-images="imgs => addNewPathsToImages(imgs)" />
      </div>

      <!-- Grid View -->
      <div v-else-if="viewMode === 'grid'" class="p-3 sm:p-4 md:p-6">
        <div
          class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4"
          style="min-height: 200px;">
          <div v-for="img in filteredImages" :key="img.id"
            class="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200"
            :class="{
              'border-primary-500 ring-2 ring-primary-500/20': isSelected(img.id),
              'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': !isSelected(img.id)
            }">
            <!-- Image -->
            <NuxtImg :src="'/cl/' + img.path" :alt="`Görsel ${img.id}`"
              class="w-full h-full object-cover cursor-pointer" @click="toggleSelection(img)" />

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

            <!-- Selection Checkbox -->
            <div class="absolute top-1 left-1 sm:top-2 sm:left-2">
              <UCheckbox :model-value="isSelected(img.id)" @update:model-value="toggleSelection(img)" color="primary"
                :ui="{
                  base: 'h-4 w-4 sm:h-5 sm:w-5',
                  background: 'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600'
                }" />
            </div>

            <!-- Actions -->
            <div
              class="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <UDropdown :items="getImageActions(img)" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-vertical" size="2xs" color="white" variant="solid"
                  class="backdrop-blur-sm h-6 w-6 sm:h-auto sm:w-auto" :ui="{ padding: { '2xs': 'p-1' } }" />
              </UDropdown>
            </div>

            <!-- Image Info -->
            <div
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p class="text-white text-xs truncate">
                {{ getImageName(img.path) }}
              </p>
              <p class="text-white/80 text-xs hidden sm:block">
                {{ formatFileSize(img.size) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="p-3 sm:p-4 md:p-6">
        <UTable :columns="listColumns" :rows="filteredImages" :loading="loading" :empty-state="{
          icon: 'i-heroicons-photo',
          label: 'Henüz görsel yok',
          description: 'İlk görselinizi yükleyerek başlayın'
        }" :ui="{
          td: { base: 'max-w-[0] truncate', padding: 'px-2 py-2 sm:px-4 sm:py-3' },
          th: { padding: 'px-2 py-2 sm:px-4 sm:py-3', base: 'text-xs sm:text-sm' },
          tbody: 'divide-y divide-gray-200 dark:divide-gray-700',
          thead: 'bg-gray-50 dark:bg-gray-800'
        }">
          <template #image-data="{ row }">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="relative flex-shrink-0">
                <NuxtImg :src="'/cl/' + row.path" :alt="`Görsel ${row.id}`"
                  class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg" />
                <UCheckbox :model-value="isSelected(row.id)" @update:model-value="toggleSelection(row)" color="primary"
                  class="absolute -top-1 -left-1" :ui="{ base: 'h-3 w-3 sm:h-4 sm:w-4' }" />
              </div>
              <div class="min-w-0">
                <p class="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                  {{ getImageName(row.path) }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  ID: {{ row.id }}
                </p>
              </div>
            </div>
          </template>

          <template #size-data="{ row }">
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {{ formatFileSize(row.size) }}
            </span>
          </template>

          <template #date-data="{ row }">
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              {{ formatDate(row.created_at) }}
            </span>
            <span class="text-xs text-gray-600 dark:text-gray-400 sm:hidden">
              {{ formatDate(row.created_at).split(' ')[0] }}
            </span>
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end">
              <UDropdown :items="getImageActions(row)" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-horizontal" size="2xs" color="gray" variant="ghost"
                  class="h-6 w-6 sm:h-auto sm:w-auto" />
              </UDropdown>
            </div>
          </template>
        </UTable>
      </div>
    </div>

    <!-- Footer Section -->
    <div v-if="images.total > query.limit"
      class="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <!-- Sayfa Bilgisi -->
        <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          <span class="font-medium">{{ (query.page - 1) * query.limit + 1 }}-{{ Math.min(query.page * query.limit,
            images.total) }}</span>
          <span class="mx-1">/</span>
          <span class="font-medium">{{ images.total }}</span>
          <span class="ml-1">görsel</span>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center sm:justify-end">
          <UPagination v-model="query.page" :page-count="query.limit" :total="images.total" :max="5"
            @click="getImagesData" :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-md',
              default: { size: 'xs' },
              base: 'min-w-[2rem] h-8 text-xs',
              font: 'font-medium'
            }" />
        </div>
      </div>
    </div>

    <!-- Bulk Delete Modal -->
    <PartialsUiModalConfirmation v-model:is-open="showBulkDeleteModal"
      :message="`${selectedCount} görseli kalıcı olarak silmek istediğinizden emin misiniz?`" confirm-text="Evet, Sil"
      cancel-text="İptal" @is-confirm="handleBulkDelete" />

    <!-- Single Delete Modal -->
    <PartialsUiModalConfirmation v-model:is-open="showDeleteModal"
      :message="`'${imageToDelete?.path}' görselini kalıcı olarak silmek istediğinizden emin misiniz?`"
      confirm-text="Evet, Sil" cancel-text="İptal" @is-confirm="handleSingleDelete" />
  </div>
</template>

<script setup>
import { useProductState } from '~/store/frontend/product';
const productState = useProductState()

const model = defineModel()
const query = ref({
  limit: 20,
  page: 1,
});
const images = ref({ data: [], total: 0 });
const loading = ref(false);
const viewMode = ref('grid');
// const searchQuery = ref('');
// const sortBy = ref('newest');
const showBulkDeleteModal = ref(false);
const showDeleteModal = ref(false);
const imageToDelete = ref(null);

// Sort options
// const sortOptions = [
//   { label: 'En Yeni', value: 'newest' },
//   { label: 'En Eski', value: 'oldest' },
//   { label: 'A-Z', value: 'name_asc' },
//   { label: 'Z-A', value: 'name_desc' },
//   { label: 'Boyut (Küçük-Büyük)', value: 'size_asc' },
//   { label: 'Boyut (Büyük-Küçük)', value: 'size_desc' }
// ];

// Table columns for list view
const listColumns = computed(() => [
  { key: 'image', label: 'Görsel', class: 'w-1/2 sm:w-auto' },
  { key: 'size', label: 'Boyut', class: 'hidden sm:table-cell' },
  { key: 'date', label: 'Tarih', class: 'w-1/4 sm:w-auto' },
  { key: 'actions', label: '', class: 'w-1/4 sm:w-auto' }
]);

// Computed
const selectedCount = computed(() => {
  return Array.isArray(model.value) ? model.value.length : 0;
});

const filteredImages = computed(() => {
  // Backend'den seçili görseller zaten öncelikli geldiği için sadece data'yı döndür
  return [...(images.value.data || [])];
});

const getImagesData = async () => {
  loading.value = true;
  try {
    // Seçili görsellerin ID'lerini hazırla
    const selectedImageIds = Array.isArray(model.value)
      ? model.value.map(item => item.id).filter(id => id)
      : [];

    const queryParams = {
      ...query.value,
      // Seçili görsel ID'lerini backend'e gönder
      ...(selectedImageIds.length > 0 && { priority_ids: selectedImageIds.join(',') })
    };

    const response = await useBaseOFetchWithAuth("vendor/images", {
      query: queryParams,
    });

    if (response.data) {
      images.value = response;
    }
  } catch (error) {
    console.error('Görseller yüklenirken hata:', error);
  }
  loading.value = false;
};

const addNewPathsToImages = (imgs) => {
  images.value.data.unshift(...imgs);
  images.value.total += imgs.length;
};

const isSelected = (imageId) => {
  if (!Array.isArray(model.value)) return false;
  return model.value.some(item => item.id === imageId);
};

const toggleSelection = (image) => {
  if (!Array.isArray(model.value)) {
    model.value = [];
  }

  const index = model.value.findIndex(item => item.id === image.id);
  if (index > -1) {
    model.value.splice(index, 1);
  } else {
    model.value.push({ id: image.id, path: image.path });
  }
};

const clearSelection = () => {
  model.value = [];
};

const getImageName = (path) => {
  return path.split('/').pop() || path;
};

const formatFileSize = (bytes) => {
  if (!bytes) return 'Bilinmiyor';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (date) => {
  if (!date) return 'Bilinmiyor';
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

const getImageActions = (image) => {
  return [
    [{
      label: 'Görüntüle',
      icon: 'i-heroicons-eye',
      click: () => window.open(`cl/${image.path}`, '_blank')
    }],
    [{
      label: 'Kopyala',
      icon: 'i-heroicons-document-duplicate',
      click: () => copyImageUrl(image.path)
    }],
    [{
      label: 'Sil',
      icon: 'i-heroicons-trash',
      click: () => {
        imageToDelete.value = image;
        showDeleteModal.value = true;
      }
    }]
  ];
};

const copyImageUrl = async (path) => {
  try {
    await navigator.clipboard.writeText(`cl/${path}`);
    // Toast notification burada eklenebilir
  } catch (error) {
    console.error('URL kopyalanamadı:', error);
  }
};

const handleBulkDelete = async (confirmed) => {
  if (confirmed && selectedCount.value > 0) {
    // Bulk delete API call burada yapılacak
    console.log('Bulk delete:', model.value);
    clearSelection();
  }
  showBulkDeleteModal.value = false;
};

const handleSingleDelete = async (confirmed) => {
  if (confirmed && imageToDelete.value) {
    // Single delete API call burada yapılacak
    console.log('Single delete:', imageToDelete.value.id);
    imageToDelete.value = null;
  }
  showDeleteModal.value = false;
};

// Watch for selection changes to reload images with priority
watch(() => model.value, () => {
  // Sadece ilk sayfa için yeniden yükle
  if (query.value.page === 1) {
    getImagesData();
  }
}, { deep: true });

// Initialize
await getImagesData();
</script>