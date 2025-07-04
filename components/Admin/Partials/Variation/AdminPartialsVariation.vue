<template>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
    :class="[isOpen ? 'rounded-t-xl rounded-b-xl' : 'rounded-xl']">
    <UAccordion :items="[{ data: item, slot: 'variation-content' }]" :ui="{
      wrapper: 'flex flex-col w-full',
      item: {
        base: 'w-full',
        size: 'text-sm',
        color: 'text-gray-500 dark:text-gray-400',
        padding: 'p-0',
        icon: 'ms-auto transform transition-transform duration-200'
      }
    }" @change="handleAccordionChange">
      <template #default="{ item, index, open }">
        <div :class="[
          'bg-white dark:bg-gray-800 p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-750',
          open ? 'rounded-t-xl border-b border-gray-200 dark:border-gray-700' : 'rounded-xl'
        ]">
          <!-- Header Row -->
          <div class="flex items-center justify-between mb-3">
            <!-- Left: Status Indicator + Terms -->
            <div class="flex items-center space-x-3 min-w-0 flex-1">
              <!-- Status Indicator -->
              <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex-shrink-0"></div>

              <!-- Terms for Mobile & Desktop -->
              <div class="flex flex-wrap gap-1.5 min-w-0">
                <span v-for="(term, index) in (item.data.terms || [])" :key="term.id || index"
                  class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  {{ term.term_name }}
                </span>
              </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center space-x-1 flex-shrink-0">
              <UButton icon="i-heroicons-trash" color="red" variant="ghost" @click.prevent="showDeleteConfirmation"
                :loading="isDeleting" size="sm"
                class="opacity-60 hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20" />
              <UIcon name="i-heroicons-chevron-down"
                class="w-4 h-4 text-gray-400 dark:text-gray-500 transform transition-transform duration-200"
                :class="[open && 'rotate-180']" />
            </div>
          </div>

          <!-- Price Row -->
          <div v-if="item.data.price" class="flex items-center justify-between">
            <!-- Price Info -->
            <div class="flex items-center space-x-2">
              <span class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ formatPrice(item.data.sale_price || item.data.price) }}
              </span>
              <span v-if="item.data.sale_price && item.data.price !== item.data.sale_price"
                class="text-sm line-through text-gray-400 dark:text-gray-500">
                {{ formatPrice(item.data.price) }}
              </span>

            </div>

            <!-- Stock Status -->
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-2 h-2 rounded-full',
                item.data.stock_status === 'in_stock' ? 'bg-green-500' :
                  item.data.stock_status === 'out_of_stock' ? 'bg-red-500' : 'bg-gray-400'
              ]"></div>
              <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {{ getStockStatusText(item.data.stock_status) }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #variation-content>
        <div :class="[
          'bg-white dark:bg-gray-800',
          isOpen ? 'rounded-b-xl' : ''
        ]">
          <div class="p-6 space-y-6">
            <!-- Image Selection -->
            <!-- <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Varyasyon Görseli
              </label>

              <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div class="flex items-center space-x-4">
                  <div @click="openImageSelector"
                    class="relative w-20 h-20 bg-gray-100 dark:bg-gray-600 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors duration-200 flex items-center justify-center group">
                    <NuxtImg v-if="item.image" :src="'cl/' + item.image.path" :alt="'Varyasyon görseli'"
                      class="w-full h-full object-cover rounded-lg" />
                    <div v-else class="text-center">
                      <UIcon name="i-heroicons-photo"
                        class="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors" />
                    </div>

                    <div
                      class="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <UIcon name="i-heroicons-pencil"
                        class="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div class="flex-1">
                    <p v-if="!item.image" class="text-sm text-gray-500 dark:text-gray-400">
                      Varyasyon için özel görsel seçilmedi
                    </p>
                    <p v-else class="text-sm font-medium text-gray-900 dark:text-white">
                      Görsel seçildi
                    </p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Tıklayarak görsel seçin veya değiştirin
                    </p>
                  </div>

                  <UButton v-if="item.image" @click="removeImage" icon="i-heroicons-trash" color="red" variant="outline"
                    size="xs" />
                </div>
              </div>
            </div> -->

            <!-- Form Fields -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Stock Code -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stok Kodu
                  <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">(Otomatik oluşturulur)</span>
                </label>
                <UInput v-model="item.stockCode" placeholder="Otomatik oluşturulacak..." size="md" :ui="{
                  rounded: 'rounded-lg',
                  base: 'cursor-not-allowed bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }" readonly />
              </div>

              <!-- Regular Price -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Normal Fiyat
                </label>
                <UInput v-model="item.price" placeholder="Normal fiyat..." size="md" type="number" step="0.01"
                  :ui="{ rounded: 'rounded-lg' }" />
              </div>

              <!-- Sale Price -->
              <div class="space-y-2 lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  İndirimli Fiyat
                </label>
                <UInput v-model="item.sale_price" placeholder="İndirimli fiyat..." size="md" type="number" step="0.01"
                  :ui="{ rounded: 'rounded-lg' }" class="lg:max-w-md" />
              </div>

              <!-- Stock Status -->
              <div class="space-y-2 lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stok Durumu
                </label>
                <USelect v-model="item.stock_status" :options="stockStatusOptions" size="md"
                  :ui="{ rounded: 'rounded-lg' }" class="lg:max-w-md" />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Bu varyasyonun stok durumunu belirleyin
                </p>
              </div>
            </div>

            <!-- Stock Management -->
            <!-- <div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center space-x-3">
                <UCheckbox v-model="item.isStockManagement" :value="true" color="orange" />
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stok yönetimini etkinleştir
                  </label>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Bu varyasyon için stok takibi yapılacak
                  </p>
                </div>
              </div>

              <div v-show="item.isStockManagement" class="ml-6 space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stok Miktarı
                </label>
                <UInput v-model="item.stock" placeholder="Stok miktarı..." size="md" type="number" min="0"
                  :ui="{ rounded: 'rounded-lg' }" class="max-w-xs" />
              </div>
            </div> -->
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Image Selection Modal -->
    <UModal v-model="isMediaModalOpen">
      <div class="h-full bg-white dark:bg-gray-900 flex flex-col">
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Varyasyon Görseli Seç
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isMediaModalOpen = false" />
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto">
          <AdminPartialsMedia v-model="selectedImages" />
        </div>

        <!-- Modal Footer -->
        <div
          class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0 z-10">
          <UButton color="gray" variant="ghost" @click="isMediaModalOpen = false">
            İptal
          </UButton>
          <UButton color="orange" @click="assignImage" :disabled="!selectedImages.length">
            Görseli Ata
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Varyasyonu Sil
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Bu varyasyonu silmek istediğinizden emin misiniz?
              </p>
              <div v-if="item && item.terms && item.terms.length > 0" class="flex space-x-2 mt-2">
                <span v-for="term in item.terms" :key="term.id"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                  {{ term.term_name }}
                </span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Bu işlem geri alınamaz ve varyasyon ile ilişkili tüm veriler silinir.
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="hideDeleteModal">
              İptal
            </UButton>
            <UButton color="red" :loading="isDeleting" @click="confirmDelete">
              Evet, Sil
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const variationState = useVariationState()
const { item } = defineProps(["item"]);

// Stok durumu seçenekleri
const stockStatusOptions = [
  { label: 'Stokta', value: 'in_stock' },
  { label: 'Stok Dışı', value: 'out_of_stock' },
  { label: 'Üretimi Durduruldu', value: 'discontinued' }
];

// Accordion state
const isOpen = ref(false)

// Media selection state
const isMediaModalOpen = ref(false)
const selectedImages = ref([])

// Delete confirmation state
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Accordion change handler
const handleAccordionChange = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    isOpen.value = data.includes(0) // 0 is the index of our accordion item
  } else {
    isOpen.value = false
  }
}

// Image selection methods
const openImageSelector = () => {
  // Mevcut görseli seçili olarak göster
  if (item.image) {
    selectedImages.value = [{
      id: item.image.id,
      path: item.image.path
    }]
  } else {
    selectedImages.value = []
  }
  isMediaModalOpen.value = true
}

const assignImage = () => {
  if (selectedImages.value.length > 0) {
    item.image = {
      id: selectedImages.value[0].id,
      path: selectedImages.value[0].path
    }
  }
  isMediaModalOpen.value = false
}

const removeImage = () => {
  item.image = null
}

// Delete confirmation methods
const showDeleteConfirmation = () => {
  showDeleteModal.value = true
}

const hideDeleteModal = () => {
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  try {
    isDeleting.value = true
    await variationState.deleteVariation(item)
  } catch (error) {
    console.error('Varyasyon silme hatası:', error)
  } finally {
    isDeleting.value = false
    hideDeleteModal()
  }
}

// Utility functions
const formatPrice = (price) => {
  if (!price) return '0,00 ₺'
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}

const getStockStatusText = (status) => {
  const statusMap = {
    'in_stock': 'Stokta',
    'out_of_stock': 'Stok Dışı',
    'discontinued': 'Durduruldu'
  }
  return statusMap[status] || 'Belirsiz'
}
</script>
