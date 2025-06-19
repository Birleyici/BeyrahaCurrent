<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div
      class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
      <div class="flex items-center space-x-3 mb-4">
        <div
          class="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
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
                outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400'
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
      class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
      <div class="flex items-center space-x-3 mb-4">
        <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 class="font-medium text-gray-900 dark:text-white">Toplu Düzenlemeler</h4>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">Bu özellik yakında eklenecek...</p>
    </div>

    <!-- Variations List -->
    <div v-if="variationState.variations?.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <UIcon name="i-heroicons-rectangle-stack" class="w-5 h-5 text-orange-500" />
          <span>Mevcut Varyasyonlar ({{ variationState.variations.length }})</span>
        </h4>
      </div>

      <div class="space-y-3">
        <AdminPartialsVariation :item="item" v-for="(item, index) in variationState.variations" :key="item.id || index"
          class="transform transition-all duration-200 hover:scale-[1.01]" />
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
  </div>
</template>

<script setup>
const productState = useProductState();
const variationState = useVariationState();
const attributeState = useAttributeState();
const bulkEditMode = ref(false)
const savingVariations = ref(false)

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
</script>
