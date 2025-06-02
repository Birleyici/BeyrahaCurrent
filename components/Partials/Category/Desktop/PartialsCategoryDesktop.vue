<template>
  <div class="grid grid-cols-12 gap-8">
    <!-- Filtreler -->
    <div class="col-span-3">
      <div class="sticky top-24 space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-neutral-900">Filtreler</h3>
          </div>
          <div class="card-body">
            <div class="h-[400px] overflow-y-auto">
              <UCommandPalette :emptyState="{
                queryLabel: 'Sonuç bulunamadı...'
              }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
                :autoselect="false" :groups="[{ key: 'label', commands: categoryState.sortedCategories }]"
                :fuse="{ resultLimit: 20 }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürünler -->
    <div class="col-span-9">
      <div class="space-y-8">
        <!-- Sıralama -->
        <div class="flex justify-between items-center">
          <div></div>
          <div class="flex items-center space-x-3">
            <label class="text-sm font-medium text-neutral-700">Sıralama:</label>
            <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" class="min-w-[200px]" />
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
            <div v-if="props.products.data.length == 0" class="col-span-full">
              <div class="text-center py-16">
                <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-neutral-900 mb-2">Ürün bulunamadı</h3>
                <p class="text-neutral-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
              </div>
            </div>
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