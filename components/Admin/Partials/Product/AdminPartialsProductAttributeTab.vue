<template>
  <div class="space-y-6">
    <!-- Nitelik Ekleme Kartı -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nitelik Seçin
          </label>
          <USelectMenu searchable searchable-placeholder="Bir nitelik seçin..." class="w-full"
            placeholder="Bir nitelik seçin" :options="attrsAndVarsState.globalAttrs"
            v-model="attrsAndVarsState.selectedAttrObj" option-attribute="text" :search-attributes="['text']" :ui="{
              rounded: 'rounded-lg',
              trigger: 'flex items-center justify-between w-full',
              background: 'bg-white dark:bg-gray-800',
              ring: 'ring-1 ring-gray-300 dark:ring-gray-600',
              placeholder: 'text-gray-500 dark:text-gray-400',
              color: {
                white: {
                  outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400'
                }
              }
            }" />
        </div>
        <div class="flex items-end">
          <UButton @click="addAttrWithRefresh()" color="orange" size="md" class="w-full sm:w-auto min-w-[100px]"
            :disabled="!attrsAndVarsState.selectedAttrObj">
            <UIcon name="i-heroicons-plus" class="mr-2" />
            Ekle
          </UButton>
        </div>
      </div>
    </div>

    <!-- Nitelik Listesi -->
    <div v-if="attributeState.attributes.length === 0" class="text-center py-12">
      <div
        class="bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
        <UIcon name="i-heroicons-squares-plus" class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Henüz nitelik eklenmemiş</h3>
        <p class="text-gray-500 dark:text-gray-400">Ürününüz için nitelik ekleyerek başlayın.</p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div v-for="(item, index) in attributeState.attributes" :key="item.attribute_id"
        class="transform transition-all duration-200 hover:scale-[1.01]">
        <AdminPartialsAttributeColor v-if="item.attribute_name.toLowerCase() == 'renk'" :item="item" />
        <AdminPartialsAttribute v-else :item="item" />
      </div>
    </div>

    <!-- Kaydetme Butonu -->
    <div v-if="attributeState.attributes.length > 0"
      class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
      <UButton @click="saveAttrs()" color="orange" size="lg" :loading="attributeState.attributes.loading"
        class="min-w-[150px]">
        <UIcon name="i-heroicons-check" class="mr-2" />
        {{ attributeState.attributes.loading ? 'Kaydediliyor...' : 'Nitelikleri Kaydet' }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationState = useVariationState();
const attrsAndVarsState = useAttrsAndVarsState();
const toast = useToast()

const { addAttr, fetchGlobalAttrs } = useAttributes();

await attributeState.fetchAttributes(productState.product.id);
await fetchGlobalAttrs();

// Nitelik ekleme fonksiyonu - varyasyonları da günceller
const addAttrWithRefresh = async () => {
  addAttr();
  // Yeni attribute eklendikten sonra varyasyonları güncelle
  await variationState.fetchVariations(productState.product.id);
}

const saveAttrs = async () => {
  attributeState.attributes.loading = true

  try {
    const response = await useBaseOFetchWithAuth("products/" + productState.product.id + "/attributes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attributeState.attributes),
    });

    if (!response.error) {
      // Backend'den gelen durum değişikliklerini kontrol et
      const statusChanges = response.status_changes || [];
      const variationSync = response.variation_sync || {};

      let statusMessage = '';
      if (statusChanges.length > 0) {
        const deactivatedAttrs = statusChanges.filter(change =>
          change.old_status === 1 && change.new_status === 0 && change.affected_variations > 0
        );

        const activatedAttrs = statusChanges.filter(change =>
          change.old_status === 0 && change.new_status === 1
        );

        if (deactivatedAttrs.length > 0) {
          const totalDeactivated = deactivatedAttrs.reduce((sum, change) => sum + change.affected_variations, 0);
          statusMessage += ` (${totalDeactivated} varyasyon deaktif edildi)`;
        }

        if (activatedAttrs.length > 0) {
          statusMessage += activatedAttrs.length > 0 ?
            ` (${activatedAttrs.length} nitelik varyasyon için aktif edildi)` : '';
        }
      }

      // Senkronizasyon sonuçlarını kontrol et
      let syncMessage = '';
      if (variationSync.total_cleaned > 0) {
        const details = [];
        if (variationSync.orphaned > 0) details.push(`${variationSync.orphaned} yetim`);
        if (variationSync.duplicates > 0) details.push(`${variationSync.duplicates} tekrar eden`);
        if (variationSync.invalid > 0) details.push(`${variationSync.invalid} geçersiz`);
        if (variationSync.deactivated > 0) details.push(`${variationSync.deactivated} deaktif`);

        syncMessage = ` (${details.join(', ')} varyasyon temizlendi)`;
      }

      toast.add({
        title: 'Nitelikler kaydedildi!',
        description: `Nitelik ayarları başarıyla güncellendi${statusMessage}${syncMessage}`,
        color: 'green',
      })
    }
  } catch (error) {
    console.error('Error saving attributes:', error);
    toast.add({
      title: 'Hata!',
      description: 'Nitelikler kaydedilirken bir hata oluştu.',
      color: 'red',
    })
  } finally {
    attributeState.attributes.loading = false
  }

  await attributeState.fetchAttributes(productState.product.id);
  await variationState.fetchVariations(productState.product.id);
};
</script>
