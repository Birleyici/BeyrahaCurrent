<template>
  <div class="h-full flex flex-col">
    <!-- Header Section -->
    <div class="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Medya Galerisi</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ images.total || 0 }} görsel • {{ selectedCount }} seçili
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- View Mode Toggle -->
          <UButtonGroup size="sm" orientation="horizontal">
            <UButton :color="viewMode === 'grid' ? 'primary' : 'gray'"
              :variant="viewMode === 'grid' ? 'solid' : 'outline'" icon="i-heroicons-squares-2x2"
              @click="viewMode = 'grid'" />
            <UButton :color="viewMode === 'list' ? 'primary' : 'gray'"
              :variant="viewMode === 'list' ? 'solid' : 'outline'" icon="i-heroicons-list-bullet"
              @click="viewMode = 'list'" />
          </UButtonGroup>

          <!-- Upload Button -->
          <AdminPartialsMediaUploadButton @uploaded-images="imgs => addNewPathsToImages(imgs)" />
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="mt-4 flex flex-col sm:flex-row gap-3">
        <div class="flex-1">
          <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass" placeholder="Görsellerde ara..." size="md"
            :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-show="searchQuery !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                :padded="false" @click="searchQuery = ''" />
            </template>
          </UInput>
        </div>

        <USelectMenu v-model="sortBy" :options="sortOptions" placeholder="Sıralama" size="md" class="w-full sm:w-48" />
      </div>

      <!-- Bulk Actions -->
      <div v-if="selectedCount > 0"
        class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-blue-900 dark:text-blue-100">
            {{ selectedCount }} görsel seçildi
          </span>
          <div class="flex items-center gap-2">
            <UButton size="xs" color="gray" variant="outline" label="Tümünü Kaldır" @click="clearSelection" />
            <UButton size="xs" color="red" variant="outline" icon="i-heroicons-trash" label="Seçilenleri Sil"
              @click="showBulkDeleteModal = true" />
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 overflow-hidden relative">
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
        class="flex flex-col items-center justify-center h-full p-8">
        <Icon name="i-heroicons-photo" class="w-16 h-16 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ searchQuery ? 'Görsel bulunamadı' : 'Henüz görsel yok' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-6">
          {{ searchQuery ? 'Arama kriterlerinizi değiştirmeyi deneyin' : 'İlk görselinizi yükleyerek başlayın' }}
        </p>
        <AdminPartialsMediaUploadButton @uploaded-images="imgs => addNewPathsToImages(imgs)" />
      </div>

      <!-- Grid View -->
      <div v-else-if="viewMode === 'grid'" class="p-6 h-full overflow-y-auto">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <div v-for="img in filteredImages" :key="img.id"
            class="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200"
            :class="{
              'border-primary-500 ring-2 ring-primary-500/20': isSelected(img.id),
              'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': !isSelected(img.id)
            }">
            <!-- Image -->
            <NuxtImg :src="'cl/' + img.path" :alt="`Görsel ${img.id}`" class="w-full h-full object-cover cursor-pointer"
              @click="toggleSelection(img)" />

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

            <!-- Selection Checkbox -->
            <div class="absolute top-2 left-2">
              <UCheckbox :model-value="isSelected(img.id)" @update:model-value="toggleSelection(img)" color="primary"
                :ui="{
                  base: 'h-5 w-5',
                  background: 'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600'
                }" />
            </div>

            <!-- Actions -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <UDropdown :items="getImageActions(img)" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-vertical" size="xs" color="white" variant="solid"
                  class="backdrop-blur-sm" />
              </UDropdown>
            </div>

            <!-- Image Info -->
            <div
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p class="text-white text-xs truncate">
                {{ getImageName(img.path) }}
              </p>
              <p class="text-white/80 text-xs">
                {{ formatFileSize(img.size) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="h-full overflow-y-auto">
        <UTable :columns="listColumns" :rows="filteredImages" :loading="loading" :empty-state="{
          icon: 'i-heroicons-photo',
          label: 'Görsel bulunamadı',
          description: 'Arama kriterlerinizi değiştirmeyi deneyin'
        }" :ui="{
            td: { base: 'max-w-[0] truncate', padding: 'px-4 py-3' },
            th: { padding: 'px-4 py-3' }
          }">
          <template #image-data="{ row }">
            <div class="flex items-center gap-3">
              <div class="relative">
                <NuxtImg :src="'cl/' + row.path" :alt="`Görsel ${row.id}`" class="w-12 h-12 object-cover rounded-lg" />
                <UCheckbox :model-value="isSelected(row.id)" @update:model-value="toggleSelection(row)" color="primary"
                  class="absolute -top-1 -left-1" :ui="{ base: 'h-4 w-4' }" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ getImageName(row.path) }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  ID: {{ row.id }}
                </p>
              </div>
            </div>
          </template>

          <template #size-data="{ row }">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatFileSize(row.size) }}
            </span>
          </template>

          <template #date-data="{ row }">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(row.created_at) }}
            </span>
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end">
              <UDropdown :items="getImageActions(row)" :popper="{ placement: 'bottom-end' }">
                <UButton icon="i-heroicons-ellipsis-horizontal" size="xs" color="gray" variant="ghost" />
              </UDropdown>
            </div>
          </template>
        </UTable>
      </div>
    </div>

    <!-- Footer Section -->
    <div v-if="images.total > query.limit" class="flex-shrink-0 p-6 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          {{ (query.page - 1) * query.limit + 1 }}-{{ Math.min(query.page * query.limit, images.total) }} / {{
            images.total
          }} görsel
        </div>
        <UPagination v-model="query.page" :page-count="query.limit" :total="images.total" :max="7"
          @click="getImagesData" :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-md',
            default: { size: 'sm' }
          }" />
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
const searchQuery = ref('');
const sortBy = ref('newest');
const showBulkDeleteModal = ref(false);
const showDeleteModal = ref(false);
const imageToDelete = ref(null);

// Sort options
const sortOptions = [
  { label: 'En Yeni', value: 'newest' },
  { label: 'En Eski', value: 'oldest' },
  { label: 'A-Z', value: 'name_asc' },
  { label: 'Z-A', value: 'name_desc' },
  { label: 'Boyut (Küçük-Büyük)', value: 'size_asc' },
  { label: 'Boyut (Büyük-Küçük)', value: 'size_desc' }
];

// Table columns for list view
const listColumns = [
  { key: 'image', label: 'Görsel' },
  { key: 'size', label: 'Boyut' },
  { key: 'date', label: 'Tarih' },
  { key: 'actions', label: '' }
];

// Computed
const selectedCount = computed(() => {
  return Array.isArray(model.value) ? model.value.length : 0;
});

const filteredImages = computed(() => {
  let result = [...(images.value.data || [])];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(img =>
      img.path.toLowerCase().includes(query) ||
      img.id.toString().includes(query)
    );
  }

  // Sort
  switch (sortBy.value) {
    case 'oldest':
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'name_asc':
      result.sort((a, b) => getImageName(a.path).localeCompare(getImageName(b.path)));
      break;
    case 'name_desc':
      result.sort((a, b) => getImageName(b.path).localeCompare(getImageName(a.path)));
      break;
    case 'size_asc':
      result.sort((a, b) => (a.size || 0) - (b.size || 0));
      break;
    case 'size_desc':
      result.sort((a, b) => (b.size || 0) - (a.size || 0));
      break;
    default: // newest
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return result;
});

const getImagesData = async () => {
  loading.value = true;
  try {
    const response = await useBaseOFetchWithAuth("vendor/images", {
      query: query.value,
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

// Watch for search changes to reset pagination
watch(searchQuery, () => {
  query.value.page = 1;
});

// Initialize
await getImagesData();
</script>