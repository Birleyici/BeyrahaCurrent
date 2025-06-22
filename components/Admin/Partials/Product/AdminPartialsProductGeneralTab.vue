<template>
  <div v-if="!hasVariationAttributes" class="space-y-6">
    <!-- Fiyat Bilgileri -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
        <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5 mr-2" />
        Fiyat Bilgileri
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Normal Fiyat <span class="text-red-500">*</span>
          </label>
          <UInput v-model="productState.product.price" placeholder="0.00" size="md" type="number" min="0" step="0.01"
            class="w-full" />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Ürünün satış fiyatını girin (TL)
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            İndirimli Fiyat
          </label>
          <UInput v-model="productState.product.sale_price" placeholder="0.00" size="md" type="number" min="0"
            step="0.01" class="w-full" />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Varsa indirimli fiyatı girin (TL)
          </p>
        </div>
      </div>
    </div>

    <!-- Stok Bilgileri -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
        <UIcon name="i-heroicons-cube" class="w-5 h-5 mr-2" />
        Stok Bilgileri
      </h3>

      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stok Kodu (SKU)
          </label>
          <UInput v-model="productState.product.sku" placeholder="Örn: PRD-001, SHIRT-RED-M" size="md" class="w-full" />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Ürün için benzersiz stok kodu girin
          </p>
        </div>

        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <UCheckbox v-model="stockManagementProxy" label="Stok yönetimini etkinleştir"
              class="text-sm font-medium text-gray-700 dark:text-gray-300" />
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400 cursor-help"
              :title="'Stok yönetimi aktif edildiğinde stok miktarı takip edilir ve stok bittiğinde ürün otomatik olarak satıştan kaldırılır.'" />
          </div>

          <div v-if="productState.product.stock_management != 0" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stok Miktarı <span class="text-red-500">*</span>
            </label>
            <UInput v-model="productState.product.stock" placeholder="0" size="md" type="number" min="0"
              class="w-full" />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Mevcut stok miktarını girin
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bilgilendirme Notu -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div class="flex items-start space-x-3">
        <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">
            Basit Ürün Ayarları
          </h4>
          <p class="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Bu ayarlar varyasyonu olmayan basit ürünler için geçerlidir. Ürününüze varyasyon eklemek için
            <strong>Nitelikler</strong> sekmesinden nitelik ekleyin ve <strong>Varyasyonlar için kullan</strong>
            seçeneğini aktif edin.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Varyasyon Ürünü Uyarısı -->
  <div v-else class="space-y-6">
    <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
      <div class="flex items-start space-x-4">
        <UIcon name="i-heroicons-squares-2x2" class="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" />
        <div>
          <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100">
            Varyasyonlu Ürün Tespit Edildi
          </h3>
          <p class="text-sm text-orange-700 dark:text-orange-300 mt-2">
            Bu ürün için varyasyon nitelikleri tanımlanmış. Fiyat, stok ve diğer ayarlar <strong>Varyasyonlar</strong>
            sekmesinden yönetilmelidir.
          </p>
          <div class="mt-4">
            <p class="text-xs text-orange-600 dark:text-orange-400 font-medium">
              Varyasyon için kullanılan nitelikler:
            </p>
            <ul class="list-disc list-inside mt-1 text-xs text-orange-700 dark:text-orange-300">
              <li v-for="attr in variationAttributes" :key="attr.attribute_id">
                {{ attr.attribute_name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();

// Stock management için boolean proxy
const stockManagementProxy = computed({
  get() {
    return productState.product.stock_management === 1;
  },
  set(value) {
    productState.product.stock_management = value ? 1 : 0;
  }
});

// Varyasyon için kullanılan nitelikleri kontrol et
const variationAttributes = computed(() => {
  return attributeState.attributes?.filter(attr => attr.useForVariation) || [];
});

// Varyasyon niteliği var mı kontrolü
const hasVariationAttributes = computed(() => {
  return variationAttributes.value.length > 0;
});
</script>
