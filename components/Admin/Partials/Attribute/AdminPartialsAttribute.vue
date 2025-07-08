<template>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
    :class="[isOpen ? 'rounded-t-xl rounded-b-xl' : 'rounded-xl']">
    <UAccordion :items="[{ label: props.item.attribute_name, slot: 'attr-content' }]" :ui="{
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
          'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-md flex justify-between border-gray-200 dark:border-gray-600 p-4 cursor-pointer hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300',
          open ? 'rounded-t-xl border-b' : 'rounded-xl'
        ]">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
            <span class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ item.label }}</span>
            <span
              class="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-xs rounded-full">
              {{ props.item.product_attribute_terms.length }} terim
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <UButton icon="i-heroicons-trash" color="red" variant="ghost"
              @click.prevent="showDeleteAttrConfirmation(props.item)" :loading="props.item.loading" size="sm"
              class="hover:bg-red-50 dark:hover:bg-red-900/20" />
            <UIcon name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-200"
              :class="[open && 'rotate-90']" />
          </div>
        </div>
      </template>

      <template #attr-content>
        <div :class="[
          'bg-white dark:bg-gray-800',
          isOpen ? 'rounded-b-xl' : ''
        ]">
          <div class="p-6 space-y-6">
            <!-- Terim Ekleme -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Yeni Terim Ekle
              </label>
              <div class="flex gap-3">
                <UInput @keydown.enter="addTerm(props.item)" placeholder="Nitelik terimi" v-model="props.item.termWord"
                  size="md" class="flex-1" />
                <UButton @click="addTerm(props.item)" color="orange" size="md" :disabled="!props.item.termWord?.trim()">
                  <UIcon name="i-heroicons-plus" class="mr-1" />
                  Ekle
                </UButton>
              </div>
            </div>

            <!-- Mevcut Terimler -->
            <div v-if="props.item.product_attribute_terms.length > 0" class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mevcut Terimler ({{ props.item.product_attribute_terms.length }})
              </label>
              <div class="flex flex-wrap gap-2">
                <div v-for="term in props.item.product_attribute_terms" :key="term.id"
                  class="group flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full pl-4 pr-2 py-2 transition-colors duration-200">

                  <!-- Görsel İkonu -->
                  <button @click="openImageSelector(term)"
                    class="flex items-center justify-center w-6 h-6 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-900/20 transition-colors"
                    :title="term.term_images?.length > 0 ? 'Görsel değiştir' : 'Görsel ekle'">
                    <UIcon v-if="term.term_images?.length > 0" name="i-heroicons-photo"
                      class="w-4 h-4 text-secondary-500" />
                    <UIcon v-else name="i-heroicons-photo"
                      class="w-4 h-4 text-gray-400 hover:text-secondary-500 transition-colors" />
                  </button>

                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ term.term_name }}</span>
                  <UButton :loading="term.loading" @click="showDeleteTermConfirmation(term)" icon="i-heroicons-x-mark"
                    variant="ghost" color="gray" size="2xs" :ui="{ rounded: 'rounded-full' }"
                    class="opacity-70 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400" />
                </div>
              </div>
            </div>

            <!-- Ayarlar -->
            <div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Nitelik Ayarları</h4>
              <div class="space-y-3">
                <UCheckbox class="flex items-center space-x-3" v-model="props.item.useForVariation" :value="true"
                  label="Varyasyonlar için kullan" />
                <UCheckbox class="flex items-center space-x-3" v-model="props.item.showProductPage" :value="true"
                  label="Ürün sayfasında göster" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Delete Term Confirmation Modal -->
    <UModal v-model="showDeleteTermModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Nitelik Terimini Sil
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                "{{ termToDelete?.term_name }}" terimini silmek istediğinizden emin misiniz?
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Bu işlem geri alınamaz ve terim ile ilişkili tüm veriler silinir.
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="hideDeleteTermModal">
              İptal
            </UButton>
            <UButton color="red" :loading="termToDelete?.loading" @click="confirmDeleteTerm">
              Evet, Sil
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>

    <!-- Delete Attribute Confirmation Modal -->
    <UModal v-model="showDeleteAttrModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Niteliği Sil
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                "{{ attrToDelete?.attribute_name }}" niteliğini silmek istediğinizden emin misiniz?
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Bu işlem geri alınamaz ve nitelik ile ilişkili tüm terimler ve veriler silinir.
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="hideDeleteAttrModal">
              İptal
            </UButton>
            <UButton color="red" :loading="attrToDelete?.loading" @click="confirmDeleteAttr">
              Evet, Sil
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>

    <!-- Media Selection Modal -->
    <UModal v-model="isMediaModalOpen" :ui="{ width: 'sm:max-w-4xl' }" fullscreen="true">
      <div class="h-full bg-white dark:bg-gray-900 flex flex-col">
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ selectedTerm?.term_name }} için Görsel Seç
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="closeMediaModal" />
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto">
          <AdminPartialsMedia v-model="selectedImages" />
        </div>

        <!-- Modal Footer -->
        <div
          class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0 z-10">
          <UButton color="gray" variant="ghost" @click="closeMediaModal">
            İptal
          </UButton>
          <UButton v-if="selectedTerm?.term_images?.length > 0" color="red" variant="outline" @click="removeTermImage"
            :loading="isUpdatingImage">
            Görseli Kaldır
          </UButton>
          <UButton color="orange" @click="assignImageToTerm" :disabled="!selectedImages.length"
            :loading="isUpdatingImage">
            Görseli Ata
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const props = defineProps(["item"]);

const { deleteAttr, addTerm, removeTerm } = useAttributes();
const toast = useToast();

// Accordion state
const isOpen = ref(false)

// Delete confirmation states
const showDeleteTermModal = ref(false)
const termToDelete = ref(null)
const showDeleteAttrModal = ref(false)
const attrToDelete = ref(null)

// Media modal states
const isMediaModalOpen = ref(false)
const selectedTerm = ref(null)
const selectedImages = ref([])
const isUpdatingImage = ref(false)

// Accordion change handler
const handleAccordionChange = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    isOpen.value = data.includes(0) // 0 is the index of our accordion item
  } else {
    isOpen.value = false
  }
}

// Delete confirmation modal functions
const showDeleteTermConfirmation = (term) => {
  termToDelete.value = term
  showDeleteTermModal.value = true
}

const hideDeleteTermModal = () => {
  showDeleteTermModal.value = false
  termToDelete.value = null
}

const confirmDeleteTerm = async () => {
  if (!termToDelete.value) return

  try {
    await removeTerm(termToDelete.value, props.item.product_attribute_terms)
  } catch (error) {
    console.error('Nitelik terimi silme hatası:', error)
  } finally {
    hideDeleteTermModal()
  }
}

const showDeleteAttrConfirmation = (attr) => {
  attrToDelete.value = attr
  showDeleteAttrModal.value = true
}

const hideDeleteAttrModal = () => {
  showDeleteAttrModal.value = false
  attrToDelete.value = null
}

const confirmDeleteAttr = async () => {
  if (!attrToDelete.value) return

  try {
    await deleteAttr(attrToDelete.value)
  } catch (error) {
    console.error('Nitelik silme hatası:', error)
  } finally {
    hideDeleteAttrModal()
  }
}

// Media modal functions
const openImageSelector = (term) => {
  selectedTerm.value = term
  // Mevcut görseli seçili olarak göster
  if (term.term_images && term.term_images.length > 0) {
    selectedImages.value = [{
      id: term.term_images[0].id,
      path: term.term_images[0].path
    }]
  } else {
    selectedImages.value = []
  }
  isMediaModalOpen.value = true
}

const closeMediaModal = () => {
  isMediaModalOpen.value = false
  selectedTerm.value = null
  selectedImages.value = []
}

const assignImageToTerm = async () => {
  if (!selectedTerm.value || !selectedImages.value.length) return

  try {
    isUpdatingImage.value = true

    // ID'yi hem id hem de product_attribute_term_id alanlarından kontrol et
    const termId = selectedTerm.value.id || selectedTerm.value.product_attribute_term_id

    if (!termId) {
      throw new Error('Term ID bulunamadı')
    }

    // API çağrısı - laravel routes'da mevcut endpoint'i kullan
    const response = await useBaseOFetchWithAuth(`product-attribute-terms/${termId}/image`, {
      method: 'POST',
      body: {
        image_ids: [selectedImages.value[0].id]  // Array olarak gönder
      }
    })

    if (!response.error) {
      // Terime görseli ekle
      if (!selectedTerm.value.term_images) {
        selectedTerm.value.term_images = []
      }
      selectedTerm.value.term_images = [{
        id: selectedImages.value[0].id,
        path: selectedImages.value[0].path
      }]

      toast.add({
        title: 'Başarıyla kaydedildi!',
        description: `${selectedTerm.value.term_name} terimine görsel atandı.`,
        color: 'green',
        icon: "i-heroicons-check-circle",
      })

      closeMediaModal()
    }
  } catch (error) {
    console.error('Görsel atama hatası:', error)
    toast.add({
      title: 'Hata oluştu!',
      description: 'Görsel ataması sırasında bir hata oluştu.',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
  } finally {
    isUpdatingImage.value = false
  }
}

const removeTermImage = async () => {
  if (!selectedTerm.value) return

  try {
    isUpdatingImage.value = true

    // ID'yi hem id hem de product_attribute_term_id alanlarından kontrol et
    const termId = selectedTerm.value.id || selectedTerm.value.product_attribute_term_id

    if (!termId) {
      throw new Error('Term ID bulunamadı')
    }

    // API çağrısı - laravel routes'da mevcut endpoint'i kullan
    const response = await useBaseOFetchWithAuth(`product-attribute-terms/${termId}/image`, {
      method: 'DELETE'
    })

    if (!response.error) {
      // Terimden görseli kaldır
      selectedTerm.value.term_images = []

      toast.add({
        title: 'Başarıyla kaldırıldı!',
        description: `${selectedTerm.value.term_name} teriminden görsel kaldırıldı.`,
        color: 'green',
        icon: "i-heroicons-check-circle",
      })

      closeMediaModal()
    }
  } catch (error) {
    console.error('Görsel kaldırma hatası:', error)
    toast.add({
      title: 'Hata oluştu!',
      description: 'Görsel kaldırılması sırasında bir hata oluştu.',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
  } finally {
    isUpdatingImage.value = false
  }
}
</script>
