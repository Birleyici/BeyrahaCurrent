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
          'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-md flex justify-between border-gray-200 dark:border-gray-600 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 transition-all duration-300 p-4 cursor-pointer',
          open ? 'rounded-t-xl border-b' : 'rounded-xl'
        ]">

          <div class="flex items-center space-x-3">
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <span class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ item.label }}</span>
            <span
              class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
              {{ props.item.product_attribute_terms.length }} renk
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
            <!-- Renk Ekleme -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Yeni Renk Ekle
              </label>
              <div class="flex gap-3">
                <UInput @keydown.enter="addTerm(props.item)" placeholder="Renk adı (örn: #FF5733 veya Kırmızı)"
                  v-model="props.item.termWord" size="md" class="flex-1" />
                <UButton @click="addTerm(props.item)" color="orange" size="md" :disabled="!props.item.termWord?.trim()">
                  <UIcon name="i-heroicons-plus" class="mr-1" />
                  Ekle
                </UButton>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Renk kodu (#FF5733) veya renk adı (Kırmızı) girebilirsiniz
              </p>
            </div>

            <!-- Renk Kartları -->
            <div v-if="props.item.product_attribute_terms.length > 0" class="space-y-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mevcut Renkler ({{ props.item.product_attribute_terms.length }})
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="term in props.item.product_attribute_terms" :key="term.id"
                  class="group relative bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 hover:shadow-lg transition-all duration-300">
                  <!-- Renk Başlığı -->
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {{ term.term_name }}
                    </h4>
                    <UButton :loading="term.loading" @click="showDeleteTermConfirmation(term)" icon="i-heroicons-x-mark"
                      variant="ghost" color="red" size="2xs" class="hover:bg-red-50 dark:hover:bg-red-900/20" />
                  </div>

                  <!-- Renk Gösterimi -->
                  <div class="space-y-3">
                    <!-- Renk Kodu Gösterimi - sadece görsel yoksa göster -->
                    <div v-if="!hasTermImage(term)" class="relative">
                      <div class="w-full h-16 rounded-lg border-2 border-gray-200 dark:border-gray-500 shadow-inner"
                        :style="{
                          background: isValidColor(term.term_name)
                            ? `linear-gradient(135deg, ${term.term_name}, ${lightenColor(term.term_name, 30)})`
                            : `linear-gradient(135deg, ${getColorFromName(term.term_name)}, ${lightenColor(getColorFromName(term.term_name), 30)})`
                        }">
                        <!-- Glossy effect -->
                        <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                        {{ isValidColor(term.term_name) ? term.term_name : getColorFromName(term.term_name) }}
                      </p>
                    </div>

                    <!-- Görsel Seçimi -->
                    <div class="space-y-2">
                      <label class="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Renk Görseli
                      </label>

                      <!-- Mevcut Görsel -->
                      <div v-if="hasTermImage(term)" class="relative group/image">
                        <div
                          class="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <!-- Önce image formatını kontrol et -->
                          <NuxtImg v-if="term.image" :src="'cl/' + term.image.path" :alt="term.term_name"
                            class="w-full h-full object-cover" />
                          <!-- Sonra term_images formatını kontrol et -->
                          <NuxtImg v-else-if="term.term_images && term.term_images.length > 0"
                            :src="'cl/' + term.term_images[0].path" :alt="term.term_name"
                            class="w-full h-full object-cover" />
                        </div>
                        <!-- Görsel Üzerinde Hover Aksiyonları -->
                        <div
                          class="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-colors duration-200 rounded-lg flex items-center justify-center">
                          <div
                            class="opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex space-x-2">
                            <UButton icon="i-heroicons-pencil" color="white" variant="solid" size="xs"
                              @click="openImageSelector(term)" />
                            <UButton icon="i-heroicons-trash" color="red" variant="solid" size="xs"
                              @click="showDeleteImageConfirmation(term)" />
                          </div>
                        </div>
                      </div>

                      <!-- Görsel Seçme Butonu -->
                      <UButton v-else @click="openImageSelector(term)" variant="outline" color="gray" size="sm"
                        class="w-full">
                        <UIcon name="i-heroicons-photo" class="mr-2" />
                        Görsel Seç
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Ayarlar -->
            <div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4" />
                <span>Renk Nitelik Ayarları</span>
              </h4>
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

    <!-- Media Selection Modal -->
    <UModal v-model="isMediaModalOpen">
      <div class="h-full bg-white dark:bg-gray-900 flex flex-col">
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ selectedTerm?.term_name }} için Görsel Seç
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="closeModal" />
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto">
          <AdminPartialsMedia v-model="selectedImages" />
        </div>

        <!-- Modal Footer -->
        <div
          class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0 z-10">
          <UButton color="gray" variant="ghost" @click="closeModal">
            İptal
          </UButton>
          <UButton color="orange" @click="assignImageToTerm" :disabled="!selectedImages.length">
            Görseli Ata
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Delete Term Confirmation Modal -->
    <UModal v-model="showDeleteTermModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Renk Terimini Sil
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                "{{ termToDelete?.term_name }}" rengini silmek istediğinizden emin misiniz?
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Bu işlem geri alınamaz ve renk ile ilişkili tüm veriler silinir.
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

    <!-- Delete Image Confirmation Modal -->
    <UModal v-model="showDeleteImageModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Renk Görselini Kaldır
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-photo" class="w-8 h-8 text-orange-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                "{{ imageToDelete?.term_name }}" renginin görselini kaldırmak istediğinizden emin misiniz?
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Görsel kaldırıldıktan sonra renk paleti gösterilecektir.
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="hideDeleteImageModal">
              İptal
            </UButton>
            <UButton color="orange" @click="confirmDeleteImage">
              Görseli Kaldır
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
              Renk Niteliğini Sil
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-500" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                "{{ attrToDelete?.attribute_name }}" renk niteliğini silmek istediğinizden emin misiniz?
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Bu işlem geri alınamaz ve tüm renkler, görseller ve ilişkili veriler silinir.
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
  </div>
</template>

<script setup>
const props = defineProps(['item'])

const {
  deleteAttr,
  addTerm,
  removeTerm
} = useAttributes()

// Accordion state
const isOpen = ref(false)

// Media selection state
const isMediaModalOpen = ref(false)
const selectedTerm = ref(null)
const selectedImages = ref([])

// Delete confirmation states
const showDeleteTermModal = ref(false)
const showDeleteImageModal = ref(false)
const showDeleteAttrModal = ref(false)
const termToDelete = ref(null)
const imageToDelete = ref(null)
const attrToDelete = ref(null)

// Accordion change handler
const handleAccordionChange = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    isOpen.value = data.includes(0) // 0 is the index of our accordion item
  } else {
    isOpen.value = false
  }
}

// Renk validation ve helper fonksiyonları
const isValidColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

const getColorFromName = (colorName) => {
  const colorMap = {
    'kırmızı': '#EF4444',
    'red': '#EF4444',
    'mavi': '#3B82F6',
    'blue': '#3B82F6',
    'yeşil': '#10B981',
    'green': '#10B981',
    'sarı': '#F59E0B',
    'yellow': '#F59E0B',
    'mor': '#8B5CF6',
    'purple': '#8B5CF6',
    'pembe': '#EC4899',
    'pink': '#EC4899',
    'turuncu': '#F97316',
    'orange': '#F97316',
    'siyah': '#1F2937',
    'black': '#1F2937',
    'beyaz': '#F9FAFB',
    'white': '#F9FAFB',
    'gri': '#6B7280',
    'gray': '#6B7280',
    'kahverengi': '#92400E',
    'brown': '#92400E'
  }

  return colorMap[colorName.toLowerCase()] || '#6B7280'
}

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

// Media selection methods
const openImageSelector = (term) => {
  console.log('openImageSelector çağrıldı:', {
    term: term,
    termId: term?.id,
    termName: term?.term_name
  })

  if (!term) {
    console.error('Term parametresi boş!')
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Renk terimi bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  if (!term.id) {
    console.error('Term ID boş!', term)
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Renk terimi ID\'si bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  selectedTerm.value = term

  // Mevcut görselleri selectedImages'a yükle - hem image hem term_images formatını destekle
  if (term.image) {
    selectedImages.value = [{
      id: term.image.id,
      path: term.image.path
    }]
  } else if (term.term_images && term.term_images.length > 0) {
    selectedImages.value = term.term_images.map(img => ({
      id: img.id,
      path: img.path
    }))
  } else {
    selectedImages.value = []
  }

  console.log('Modal açılıyor:', {
    term: term.term_name,
    termId: term.id,
    currentImages: selectedImages.value,
    selectedTerm: selectedTerm.value
  })

  isMediaModalOpen.value = true
}

const assignImageToTerm = async () => {
  // Daha detaylı kontroller ekle
  console.log('assignImageToTerm çağrıldı:', {
    selectedTerm: selectedTerm.value,
    selectedImages: selectedImages.value,
    termId: selectedTerm.value?.id || selectedTerm.value?.product_attribute_term_id,
    imageId: selectedImages.value?.[0]?.id
  })

  if (!selectedTerm.value) {
    console.error('selectedTerm boş!')
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Seçili renk terimi bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  // ID'yi hem id hem de product_attribute_term_id alanlarından kontrol et
  const termId = selectedTerm.value.id || selectedTerm.value.product_attribute_term_id
  if (!termId) {
    console.error('selectedTerm ID boş!', selectedTerm.value)
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Renk terimi ID\'si bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  if (!selectedImages.value?.length) {
    console.error('selectedImages boş!')
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Seçili görsel bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  if (!selectedImages.value[0]?.id) {
    console.error('selectedImages[0].id boş!', selectedImages.value[0])
    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Görsel ID\'si bulunamadı',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
    return
  }

  try {
    // Yeni API endpoint'ini kullan
    const response = await useBaseOFetchWithAuth(`product-attribute-terms/${termId}/image`, {
      method: 'POST',
      body: {
        image_id: selectedImages.value[0].id
      }
    })

    if (!response.error) {
      // Update local term object with the selected image
      selectedTerm.value.image = {
        id: selectedImages.value[0].id,
        path: selectedImages.value[0].path
      }

      // Also update term_images array if it exists for consistency
      if (!selectedTerm.value.term_images) {
        selectedTerm.value.term_images = []
      }
      selectedTerm.value.term_images = [selectedImages.value[0]]

      console.log('Renk terimi için görsel atandı:', {
        term: selectedTerm.value.term_name,
        image: selectedImages.value[0]
      })

      // Close modal and show success message
      closeModal()

      try {
        const nuxtApp = useNuxtApp()
        if (nuxtApp && nuxtApp.$toast) {
          nuxtApp.$toast.add({
            title: 'Görsel başarıyla atandı!',
            color: 'green',
            icon: 'i-heroicons-check'
          })
        }
      } catch (toastError) {
        console.log('Toast hatası:', toastError)
      }
    } else {
      console.error('API response error:', response.error)
      try {
        const nuxtApp = useNuxtApp()
        if (nuxtApp && nuxtApp.$toast) {
          nuxtApp.$toast.add({
            title: 'API hatası: ' + (response.error.message || 'Bilinmeyen hata'),
            color: 'red',
            icon: 'i-heroicons-x-mark'
          })
        }
      } catch (toastError) {
        console.log('Toast hatası:', toastError)
      }
    }
  } catch (error) {
    console.error('Görsel atama hatası:', error)

    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Görsel atanırken hata oluştu: ' + (error.message || 'Bilinmeyen hata'),
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
  }
}

const removeTermImage = async (term) => {
  try {
    // ID'yi hem id hem de product_attribute_term_id alanlarından kontrol et
    const termId = term.id || term.product_attribute_term_id

    if (!termId) {
      console.error('Term ID bulunamadı:', term)
      try {
        const nuxtApp = useNuxtApp()
        if (nuxtApp && nuxtApp.$toast) {
          nuxtApp.$toast.add({
            title: 'Term ID bulunamadı',
            color: 'red',
            icon: 'i-heroicons-x-mark'
          })
        }
      } catch (toastError) {
        console.log('Toast hatası:', toastError)
      }
      return
    }

    // Yeni API endpoint'ini kullan
    const response = await useBaseOFetchWithAuth(`product-attribute-terms/${termId}/image`, {
      method: 'DELETE'
    })

    if (!response.error) {
      // Remove image from local term object
      term.image = null
      term.term_images = []

      console.log('Renk terimi görseli kaldırıldı:', term.term_name)

      try {
        const nuxtApp = useNuxtApp()
        if (nuxtApp && nuxtApp.$toast) {
          nuxtApp.$toast.add({
            title: 'Görsel kaldırıldı',
            color: 'orange',
            icon: 'i-heroicons-trash'
          })
        }
      } catch (toastError) {
        console.log('Toast hatası:', toastError)
      }
    }
  } catch (error) {
    console.error('Görsel kaldırma hatası:', error)

    try {
      const nuxtApp = useNuxtApp()
      if (nuxtApp && nuxtApp.$toast) {
        nuxtApp.$toast.add({
          title: 'Görsel kaldırılırken hata oluştu',
          color: 'red',
          icon: 'i-heroicons-x-mark'
        })
      }
    } catch (toastError) {
      console.log('Toast hatası:', toastError)
    }
  }
}

const resetModalState = () => {
  selectedTerm.value = null
  selectedImages.value = []
}

const hasTermImage = (term) => {
  return term.image || (term.term_images && term.term_images.length > 0)
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
    console.error('Renk terimi silme hatası:', error)
  } finally {
    hideDeleteTermModal()
  }
}

const showDeleteImageConfirmation = (term) => {
  imageToDelete.value = term
  showDeleteImageModal.value = true
}

const hideDeleteImageModal = () => {
  showDeleteImageModal.value = false
  imageToDelete.value = null
}

const confirmDeleteImage = async () => {
  if (!imageToDelete.value) return

  try {
    await removeTermImage(imageToDelete.value)
  } catch (error) {
    console.error('Görsel kaldırma hatası:', error)
  } finally {
    hideDeleteImageModal()
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
    console.error('Renk niteliği silme hatası:', error)
  } finally {
    hideDeleteAttrModal()
  }
}

const closeModal = () => {
  isMediaModalOpen.value = false
  resetModalState()
}
</script>