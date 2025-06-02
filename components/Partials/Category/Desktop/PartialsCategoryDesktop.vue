<template>
  <div class="grid grid-cols-12 gap-8">
    <!-- Filtreler -->
    <div class="col-span-3">
      <div class="sticky top-24 space-y-6">
        <!-- Filtreler Kartı -->
        <div class="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-funnel" class="w-5 h-5 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-neutral-900">Filtreler</h3>
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
          class="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h4 class="text-sm font-semibold text-neutral-900 mb-3">Seçili Kategoriler</h4>
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
      <div class="space-y-8">
        <!-- Üst Bar - Sonuç Sayısı ve Sıralama -->
        <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div class="flex justify-between items-center">
            <!-- Sol - Sonuç Bilgisi -->
            <div class="flex items-center space-x-4">
              <div class="text-sm text-neutral-600">
                <span class="font-semibold text-neutral-900">{{ props.products?.total || 0 }}</span> ürün bulundu
              </div>
            </div>

            <!-- Sağ - Sıralama -->
            <div class="flex items-center space-x-3">
              <label class="text-sm font-medium text-neutral-700">Sıralama:</label>
              <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" class="min-w-[200px]"
                :ui="{ base: 'min-w-0' }" />
            </div>
          </div>
        </div>

        <!-- Ürün Grid -->
        <div class="relative">
          <!-- Loading Overlay -->
          <div v-if="props.loading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
            <div class="flex flex-col items-center space-y-4">
              <Icon name="mdi:loading" class="w-12 h-12 animate-spin text-secondary-500"></Icon>
              <p class="text-neutral-600 font-medium">Ürünler yükleniyor...</p>
            </div>
          </div>

          <!-- Ürün Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- Ürün Bulunamadı Durumu -->
            <div v-if="props.products.data?.length === 0 && !props.loading" class="col-span-full">
              <div class="text-center py-16 bg-white rounded-xl border border-neutral-200 shadow-sm">
                <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-neutral-900 mb-2">Ürün bulunamadı</h3>
                <p class="text-neutral-600 mb-4">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                <UButton v-if="categoryState.selectedCategories.length > 0"
                  @click="categoryState.selectedCategories = []" color="secondary" variant="outline" size="sm">
                  Filtreleri Temizle
                </UButton>
              </div>
            </div>

            <!-- Ürün Kartları -->
            <PartialsProductCard :product="product" v-for="product in props.products.data" :key="product.id" />
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
  { name: 'Varsayılan', value: 'default' },
  { name: 'Fiyat (Düşükten Yükseğe)', value: 'price_asc' },
  { name: 'Fiyat (Yüksekten Düşüğe)', value: 'price_desc' },
  { name: 'Yeni Ürünler', value: 'newest' },
  { name: 'Popüler Ürünler', value: 'popular' }
]
</script>