<template>
  <div class="grid grid-cols-12 gap-8">
    <!-- Filtreler -->
    <div class="col-span-3">
      <div class="sticky top-24 space-y-6">
        <!-- Filtreler Kartı -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors duration-300">
          <div class="p-6 border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-300">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center transition-colors duration-300">
                <UIcon name="i-heroicons-funnel" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                Filtreler</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="h-[400px] overflow-y-auto">
              <UCommandPalette :emptyState="{
                queryLabel: 'Sonuç bulunamadı...'
              }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
                :autoselect="false" :groups="[{ key: 'label', commands: categoryState.sortedCategories }]"
                :fuse="{ resultLimit: 20 }" />
            </div>
          </div>
        </div>

        <!-- Seçili Filtreler -->
        <div v-if="categoryState.selectedCategories.length > 0 && categoryState.categories.length > 0"
          class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 transition-colors duration-300">
          <h4 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 transition-colors duration-300">
            Seçili Kategoriler</h4>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="category in categoryState.selectedCategories" :key="category.id" color="secondary"
              variant="subtle" class="text-xs">
              {{ category.label || category.name }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürünler -->
    <div class="col-span-9">
      <div class="content-gap">
        <!-- Üst Bar - Sonuç Sayısı ve Sıralama -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 transition-colors duration-300">
          <div class="flex justify-between items-center">
            <!-- Sol - Sonuç Bilgisi -->
            <div class="flex items-center space-x-4">
              <div class="text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                <span class="font-semibold text-neutral-900 dark:text-neutral-100">{{ props.products?.total || 0
                }}</span> ürün bulundu
              </div>
            </div>

            <!-- Sağ - Sıralama -->
            <div class="flex items-center space-x-3">
              <label
                class="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-300">Sıralama:</label>
              <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" class="min-w-[200px]"
                :ui="{ base: 'min-w-0' }" />
            </div>
          </div>
        </div>

        <!-- Ürün Grid -->
        <div class="relative">
          <!-- Loading Overlay -->
          <div v-if="props.loading"
            class="absolute inset-0 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl transition-colors duration-300">
            <div class="flex flex-col items-center space-y-4">
              <Icon name="mdi:loading" class="w-12 h-12 animate-spin text-secondary-500 dark:text-secondary-400"></Icon>
              <p class="text-neutral-600 dark:text-neutral-400 font-medium transition-colors duration-300">Ürünler
                yükleniyor...</p>
            </div>
          </div>

          <!-- Ürün Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            <!-- Ürün Bulunamadı Durumu -->
            <div v-if="props.products.data?.length === 0 && !props.loading" class="col-span-full">
              <div
                class="text-center py-16 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors duration-300">
                <UIcon name="i-heroicons-magnifying-glass"
                  class="w-16 h-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                <h3
                  class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                  Ürün bulunamadı</h3>
                <p class="text-neutral-600 dark:text-neutral-400 mb-4 transition-colors duration-300">Arama
                  kriterlerinizi değiştirerek tekrar deneyin.</p>
                <UButton v-if="categoryState.selectedCategories.length > 0"
                  @click="categoryState.selectedCategories = []" color="secondary" variant="outline" size="sm">
                  Filtreleri Temizle
                </UButton>
              </div>
            </div>

            <!-- Ürün Kartları -->
            <PartialsProductCard :product="product" v-for="product in props.products.data"
              :key="product.variant_id || `product-${product.id}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const categoryState = useCategoryState()
const props = defineProps(['products', 'loading'])
const uSelect = defineModel('uSelect')
const query = defineModel('query')

const sortOptions = [
  { name: 'En Çok Satılan', value: 'popular' },
  { name: 'Fiyat (Düşükten Yükseğe)', value: 'price_asc' },
  { name: 'Fiyat (Yüksekten Düşüğe)', value: 'price_desc' },
  { name: 'Yeni Ürünler', value: 'newest' },
]
</script>