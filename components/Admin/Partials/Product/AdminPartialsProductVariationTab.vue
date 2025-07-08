<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div
      class="bg-gradient-to-r from-secondary-50 to-amber-50 dark:from-secondary-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-secondary-200 dark:border-secondary-700">
      <div class="flex items-center space-x-3 mb-4">
        <div
          class="w-10 h-10 bg-gradient-to-r from-secondary-500 to-amber-500 rounded-lg flex items-center justify-center">
          <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ürün Varyasyonları</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">Ürün özelliklerine göre varyasyonları yönetin</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <USelectMenu class="flex-1" color="orange" size="md" placeholder="İşlem seçin..." :options="options"
          v-model="addedType" value-attribute="value" option-attribute="label" :ui="{
            rounded: 'rounded-lg',
            trigger: 'flex items-center justify-between w-full',
            width: 'w-full',
            background: 'bg-white dark:bg-gray-800',
            ring: 'ring-1 ring-gray-300 dark:ring-gray-600',
            placeholder: 'text-gray-500 dark:text-gray-400',
            color: {
              white: {
                outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400'
              }
            }
          }" />
        <UButton :loading="loading" @click="variationHandle()" color="orange" size="md" class="sm:min-w-[100px]"
          :disabled="!addedType">
          <UIcon name="i-heroicons-play" class="mr-2" />
          {{ loading ? 'İşleniyor...' : 'Başlat' }}
        </UButton>
      </div>
    </div>

    <!-- Bulk Edit Toggle -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div class="flex items-center space-x-3">
        <UToggle v-model="bulkEditMode" color="orange" />
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">Toplu Düzenleme</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Birden fazla varyasyonu aynı anda düzenleyin</p>
        </div>
      </div>
    </div>

    <!-- Bulk Edit Section -->
    <div v-if="bulkEditMode"
      class="bg-gradient-to-r from-secondary-50 to-indigo-50 dark:from-secondary-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-secondary-200 dark:border-secondary-700 space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
        <h4 class="font-medium text-gray-900 dark:text-white">Toplu Düzenlemeler</h4>
      </div>

      <!-- Selection Options -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Seçim Seçenekleri</h5>
        <div class="flex flex-wrap gap-3">
          <UButton @click="selectAllVariations" size="sm" color="blue" variant="outline"
            icon="i-heroicons-check-circle">
            Tümünü Seç
          </UButton>
          <UButton @click="deselectAllVariations" size="sm" color="gray" variant="outline" icon="i-heroicons-x-circle">
            Seçimi Kaldır
          </UButton>
          <UButton @click="selectByTerms" size="sm" color="orange" variant="outline" icon="i-heroicons-funnel">
            Terime Göre Seç
          </UButton>
        </div>

        <!-- Selection Info -->
        <div v-if="selectedVariations.length > 0" class="mt-3 p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
          <p class="text-sm text-secondary-700 dark:text-secondary-300">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 inline mr-1" />
            {{ selectedVariations.length }} varyasyon seçildi
          </p>
        </div>
      </div>

      <!-- Bulk Edit Form -->
      <div v-if="selectedVariations.length > 0"
        class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
        <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Toplu Düzenleme Alanları</h5>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Price Field -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <UCheckbox v-model="bulkEditFields.price.enabled" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Normal Fiyat</label>
            </div>
            <UInput v-model="bulkEditFields.price.value" :disabled="!bulkEditFields.price.enabled"
              placeholder="Normal fiyat..." type="number" step="0.01" size="sm" />
          </div>

          <!-- Sale Price Field -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <UCheckbox v-model="bulkEditFields.sale_price.enabled" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">İndirimli Fiyat</label>
            </div>
            <UInput v-model="bulkEditFields.sale_price.value" :disabled="!bulkEditFields.sale_price.enabled"
              placeholder="İndirimli fiyat..." type="number" step="0.01" size="sm" />
          </div>

          <!-- Stock Status Field -->
          <div class="space-y-2 md:col-span-2">
            <div class="flex items-center space-x-2">
              <UCheckbox v-model="bulkEditFields.stock_status.enabled" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Stok Durumu</label>
            </div>
            <USelect v-model="bulkEditFields.stock_status.value" :disabled="!bulkEditFields.stock_status.enabled"
              :options="stockStatusOptions" size="sm" class="max-w-xs" />
          </div>
        </div>

        <!-- Apply Button -->
        <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <UButton @click="applyBulkEdit" :loading="applyingBulkEdit" color="blue" size="md" icon="i-heroicons-check">
            {{ applyingBulkEdit ? 'Uygulanıyor...' : `${selectedVariations.length} Varyasyona Uygula` }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Variations List -->
    <div v-if="variationState.variations?.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <UIcon name="i-heroicons-rectangle-stack" class="w-5 h-5 text-secondary-500" />
          <span>Mevcut Varyasyonlar ({{ variationState.variations.length }})</span>
        </h4>

        <!-- Bulk Edit Toggle for mobile -->
        <UButton v-if="!bulkEditMode" @click="bulkEditMode = true" size="sm" color="blue" variant="outline"
          class="md:hidden" icon="i-heroicons-pencil-square">
          Toplu Düzenle
        </UButton>
      </div>

      <div class="space-y-3">
        <div v-for="(item, index) in variationState.variations" :key="item.id || index"
          class="transform transition-all duration-200 hover:scale-[1.01] relative">
          <!-- Selection Checkbox (Bulk Edit Mode) -->
          <div v-if="bulkEditMode"
            class="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-600">
            <UCheckbox :model-value="isVariationSelected(item.id)"
              @update:model-value="toggleVariationSelection(item.id)" color="blue" />
          </div>

          <AdminPartialsVariation :item="item" :class="[
            bulkEditMode ? 'pl-16' : '',
            isVariationSelected(item.id) ? 'ring-2 ring-secondary-500 dark:ring-secondary-400' : ''
          ]" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else
      class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center">
      <div class="flex flex-col items-center space-y-4">
        <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <UIcon name="i-heroicons-squares-2x2" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Henüz varyasyon yok</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Varyasyon oluşturmak için yukarıdaki seçenekleri kullanın
          </p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage"
      class="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700 p-4">
      <div class="flex items-center space-x-3">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600 dark:text-red-400" />
        <div>
          <h4 class="text-sm font-medium text-red-800 dark:text-red-200">Hata</h4>
          <p class="text-sm text-red-700 dark:text-red-300">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div v-if="variationState.variations?.length > 0"
      class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
      <UButton @click="saveVariations(productState.product.id, variationState.variations)" size="lg" color="orange"
        class="min-w-[180px]" :loading="savingVariations">
        <UIcon name="i-heroicons-check" class="mr-2" />
        {{ savingVariations ? 'Kaydediliyor...' : 'Varyasyonları Kaydet' }}
      </UButton>
    </div>

    <!-- Term Selection Modal -->
    <UModal v-model="showTermSelectionModal" :ui="{ width: 'sm:max-w-2xl' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Terime Göre Varyasyon Seçimi
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="showTermSelectionModal = false" />
          </div>
        </template>

        <div class="space-y-6">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Seçtiğiniz terimlere sahip varyasyonlar otomatik olarak seçilecektir.
          </p>

          <!-- Available Terms -->
          <div v-if="availableTerms.length > 0" class="space-y-4">
            <div v-for="attribute in availableTerms" :key="attribute.id" class="space-y-3">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ attribute.attribute_name }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <button v-for="term in attribute.terms" :key="term.id" @click="toggleTermSelection(term)" :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium border transition-colors',
                  selectedTermsForFilter.some(t => t.id === term.id)
                    ? 'bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 border-secondary-300 dark:border-secondary-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]">
                  {{ term.term_name }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400">Henüz hiç terim bulunamadı</p>
          </div>

          <!-- Selected Terms Preview -->
          <div v-if="selectedTermsForFilter.length > 0" class="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
            <h5 class="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">Seçili Terimler:</h5>
            <div class="flex flex-wrap gap-2">
              <span v-for="term in selectedTermsForFilter" :key="term.id"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200">
                {{ term.term_name }}
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1 cursor-pointer"
                  @click="toggleTermSelection(term)" />
              </span>
            </div>
            <p class="text-xs text-secondary-700 dark:text-secondary-300 mt-2">
              {{ getVariationCountByTerms() }} varyasyon seçilecek
            </p>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="showTermSelectionModal = false">
              İptal
            </UButton>
            <UButton color="orange" @click="selectVariationsByTerms(selectedTermsForFilter)"
              :disabled="selectedTermsForFilter.length === 0">
              Varyasyonları Seç
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const productState = useProductState();
const variationState = useVariationState();
const attributeState = useAttributeState();
const bulkEditMode = ref(false)
const savingVariations = ref(false)
const toast = useToast()

const options = [
  {
    value: "2",
    label: "Tüm niteliklerden varyasyonlar oluştur",
    icon: "i-heroicons-squares-plus"
  },
  {
    value: "3",
    label: "Tüm varyasyonları sil",
    icon: "i-heroicons-trash"
  },
];

const {
  createAllVariation,
  saveVariations: saveVariationsComposable,
  deleteAllVariations,
} = useVariations();

await attributeState.fetchAttributes(productState.product.id);
await variationState.fetchVariations(productState.product.id);

const addedType = ref(null);
const errorMessage = ref(null);
const loading = ref(false)

// Bulk Edit State
const selectedVariations = ref([]);
const bulkEditFields = ref({
  price: { enabled: false, value: null },
  sale_price: { enabled: false, value: null },
  stock_status: { enabled: false, value: 'in_stock' },
});

const stockStatusOptions = [
  { label: 'Stokta', value: 'in_stock' },
  { label: 'Stok Dışı', value: 'out_of_stock' },
  { label: 'Üretimi Durduruldu', value: 'discontinued' }
];

const applyingBulkEdit = ref(false);
const showTermSelectionModal = ref(false);
const selectedTermsForFilter = ref([]);

// Main Functions
const variationHandle = async () => {
  if (!addedType.value) return;

  loading.value = true
  errorMessage.value = null

  try {
    if (addedType.value == 2) {
      await createAllVariation(productState.product.id);
    }
    if (addedType.value == 3) {
      await deleteAllVariations(productState.product.id);
    }
  } catch (error) {
    errorMessage.value = error.message || 'İşlem sırasında bir hata oluştu'
  } finally {
    loading.value = false
  }
};

const saveVariations = async (productId, variations) => {
  savingVariations.value = true
  try {
    await saveVariationsComposable(productId, variations)
  } finally {
    savingVariations.value = false
  }
}

// Bulk Edit Functions
const selectAllVariations = () => {
  selectedVariations.value = variationState.variations.map(v => v.id);
};

const deselectAllVariations = () => {
  selectedVariations.value = [];
};

const selectByTerms = () => {
  selectedTermsForFilter.value = [];
  showTermSelectionModal.value = true;
};

const isVariationSelected = (id) => {
  return selectedVariations.value.includes(id);
};

const toggleVariationSelection = (id) => {
  if (selectedVariations.value.includes(id)) {
    selectedVariations.value = selectedVariations.value.filter(i => i !== id);
  } else {
    selectedVariations.value.push(id);
  }
};

// Computed properties for modal
const availableTerms = computed(() => {
  // AttributeState'den terimleri alalım
  if (attributeState.attributes && Array.isArray(attributeState.attributes) && attributeState.attributes.length > 0) {
    const fromAttributes = attributeState.attributes
      .filter(attr => attr.useForVariation === true || attr.useForVariation === 1 || attr.useForVariation === "1")
      .map(attr => ({
        id: attr.product_attribute_id || attr.attribute_id,
        attribute_name: attr.attribute_name,
        terms: attr.product_attribute_terms?.map(term => ({
          id: term.product_attribute_term_id || term.id,
          term_name: term.term_name || term.name,
          attribute_id: attr.product_attribute_id || attr.attribute_id
        })) || []
      }))
      .filter(attr => attr.terms.length > 0);

    if (fromAttributes.length > 0) {
      return fromAttributes;
    }
  }

  // Eğer attributeState'den alamıyorsak, mevcut varyasyonlardan terimleri çıkaralım
  if (!variationState.variations || !Array.isArray(variationState.variations)) {
    return [];
  }

  const attributesMap = new Map();

  variationState.variations.forEach(variation => {
    if (variation.terms && Array.isArray(variation.terms)) {
      variation.terms.forEach(term => {
        const termId = term.product_attribute_term_id || term.id;
        const termName = term.term_name || term.name;

        // Farklı veri yapılarını deniyoruz
        let attributeId = null;
        let attributeName = null;

        if (term.product_term) {
          attributeId = term.product_term.product_attribute_id;
          attributeName = term.product_term.attribute_name;
        } else if (term.attribute_id) {
          attributeId = term.attribute_id;
          attributeName = term.attribute_name;
        } else if (term.product_attribute_id) {
          attributeId = term.product_attribute_id;
          attributeName = term.attribute_name;
        }

        if (termId && termName && attributeId) {
          // Attribute bilgilerini topla
          if (!attributesMap.has(attributeId)) {
            attributesMap.set(attributeId, {
              id: attributeId,
              attribute_name: attributeName || `Nitelik ${attributeId}`,
              terms: []
            });
          }

          // Term bilgilerini topla (tekrar etmesin diye kontrol ediyoruz)
          const existingTerms = attributesMap.get(attributeId).terms;
          if (!existingTerms.some(t => t.id === termId)) {
            attributesMap.get(attributeId).terms.push({
              id: termId,
              term_name: termName,
              attribute_id: attributeId
            });
          }
        }
      });
    }
  });

  return Array.from(attributesMap.values())
    .filter(attr => attr.terms.length > 0);
});

// Modal functions
const toggleTermSelection = (term) => {
  const index = selectedTermsForFilter.value.findIndex(t => t.id === term.id);
  if (index > -1) {
    selectedTermsForFilter.value.splice(index, 1);
  } else {
    selectedTermsForFilter.value.push(term);
  }
};

const getVariationCountByTerms = () => {
  if (selectedTermsForFilter.value.length === 0) return 0;

  const termIds = selectedTermsForFilter.value.map(term => term.id);

  return variationState.variations.filter(variation => {
    if (!variation.terms || !Array.isArray(variation.terms)) {
      return false;
    }

    return variation.terms.some(term => {
      const termId = term.product_attribute_term_id || term.id;
      return termIds.includes(termId);
    });
  }).length;
};

const selectVariationsByTerms = (selectedTerms) => {
  const termIds = selectedTerms.map(term => term.id);

  selectedVariations.value = variationState.variations
    .filter(variation => {
      if (!variation.terms || !Array.isArray(variation.terms)) {
        return false;
      }

      return variation.terms.some(term => {
        const termId = term.product_attribute_term_id || term.id;
        return termIds.includes(termId);
      });
    })
    .map(v => v.id);

  showTermSelectionModal.value = false;

  toast.add({
    title: 'Varyasyonlar seçildi!',
    description: `${selectedVariations.value.length} varyasyon seçildi`,
    color: 'blue',
  });
};

const applyBulkEdit = async () => {
  if (selectedVariations.value.length === 0) {
    toast.add({
      title: 'Uyarı!',
      description: 'Lütfen en az bir varyasyon seçin',
      color: 'yellow',
    });
    return;
  }

  // Check if at least one field is enabled
  const hasEnabledFields = Object.values(bulkEditFields.value).some(field => field.enabled);
  if (!hasEnabledFields) {
    toast.add({
      title: 'Uyarı!',
      description: 'Lütfen en az bir düzenleme alanını seçin',
      color: 'yellow',
    });
    return;
  }

  applyingBulkEdit.value = true;

  try {
    // Clone variations and apply bulk edits to selected ones
    const updatedVariations = variationState.variations.map(variation => {
      if (selectedVariations.value.includes(variation.id)) {
        const updatedVariation = { ...variation };

        if (bulkEditFields.value.price.enabled && bulkEditFields.value.price.value !== null) {
          updatedVariation.price = parseFloat(bulkEditFields.value.price.value);
        }

        if (bulkEditFields.value.sale_price.enabled && bulkEditFields.value.sale_price.value !== null) {
          updatedVariation.sale_price = parseFloat(bulkEditFields.value.sale_price.value);
        }

        if (bulkEditFields.value.stock_status.enabled && bulkEditFields.value.stock_status.value) {
          updatedVariation.stock_status = bulkEditFields.value.stock_status.value;
        }

        return updatedVariation;
      }
      return variation;
    });

    // Save the updated variations
    await saveVariationsComposable(productState.product.id, updatedVariations);

    // Reset bulk edit fields
    bulkEditFields.value = {
      price: { enabled: false, value: null },
      sale_price: { enabled: false, value: null },
      stock_status: { enabled: false, value: 'in_stock' },
    };

    // Deselect all variations
    selectedVariations.value = [];

    toast.add({
      title: 'Toplu düzenleme tamamlandı!',
      description: 'Seçili varyasyonlar başarıyla güncellendi',
      color: 'green',
    });

  } catch (error) {
    console.error('Bulk edit error:', error);
    toast.add({
      title: 'Hata!',
      description: 'Toplu düzenleme sırasında bir hata oluştu',
      color: 'red',
    });
  } finally {
    applyingBulkEdit.value = false;
  }
};

// Watch for bulk edit mode changes
watch(bulkEditMode, (newValue) => {
  if (!newValue) {
    selectedVariations.value = [];
    selectedTermsForFilter.value = [];
    bulkEditFields.value = {
      price: { enabled: false, value: null },
      sale_price: { enabled: false, value: null },
      stock_status: { enabled: false, value: 'in_stock' },
    };
  }
});

// Watch for modal close
watch(showTermSelectionModal, (newValue) => {
  if (!newValue) {
    selectedTermsForFilter.value = [];
  }
});
</script>
