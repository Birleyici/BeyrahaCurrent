<template>
  <div class="space-y-6">
    <!-- Filtre ve Sıralama Butonları -->
    <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
      <div class="grid grid-cols-2 gap-3">
        <UButton @click="isOpenFiltersSlideOver = true" variant="outline" color="gray"
          class="flex-1 justify-center h-12" icon="i-heroicons-funnel">
          Sıralama
        </UButton>

        <UButton @click="isOpenCategorySlideOver = true" variant="outline" color="gray"
          class="flex-1 justify-center h-12" icon="i-heroicons-squares-2x2">
          Kategoriler
        </UButton>
      </div>

      <!-- Sonuç Bilgisi -->
      <div class="mt-4 pt-4 border-t border-neutral-200">
        <div class="text-sm text-neutral-600 text-center">
          <span class="font-semibold text-neutral-900">{{ props.products?.total || 0 }}</span> ürün bulundu
        </div>
      </div>

      <!-- Seçili Kategoriler -->
      <div v-if="categoryState.selectedCategories.length > 0 && categoryState.categories.length > 0"
        class="mt-4 pt-4 border-t border-neutral-200">
        <div class="text-xs font-semibold text-neutral-700 mb-2">Seçili Kategoriler:</div>
        <div class="flex flex-wrap gap-1">
          <UBadge v-for="category in categoryState.selectedCategories" :key="category.id" color="secondary"
            variant="subtle" class="text-xs">
            {{ category.label || category.name }}
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Sıralama Slide Over -->
    <USlideover side="bottom" v-model="isOpenFiltersSlideOver" :ui="{ wrapper: 'fixed inset-0 flex z-[999999]' }">
      <UCard class="flex flex-col flex-1" :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-neutral-200',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-funnel" class="w-5 h-5 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-neutral-900">Sıralama</h3>
            </div>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenFiltersSlideOver = false" />
          </div>
        </template>

        <div class="space-y-4 p-4">
          <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" size="lg" class="w-full" />
        </div>
      </UCard>
    </USlideover>

    <!-- Kategori Slide Over -->
    <USlideover side="bottom" v-model="isOpenCategorySlideOver" :ui="{ wrapper: 'fixed inset-0 flex z-[999999]' }">
      <UCard class="flex flex-col flex-1" :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-neutral-200',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-neutral-900">Kategoriler</h3>
            </div>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenCategorySlideOver = false" />
          </div>
        </template>

        <div class="h-72 overflow-y-auto p-4">
          <UCommandPalette :emptyState="{
            queryLabel: 'Sonuç bulunamadı...',
          }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
            :autoselect="false" :groups="[{ key: 'label', commands: categoryState.sortedCategories }]"
            :fuse="{ resultLimit: -1 }" />
        </div>

        <!-- Footer - Temizle Butonu -->
        <div v-if="categoryState.selectedCategories.length > 0" class="p-4 border-t border-neutral-200">
          <UButton @click="categoryState.selectedCategories = []" color="gray" variant="outline" class="w-full"
            icon="i-heroicons-x-circle">
            Tüm Filtreleri Temizle
          </UButton>
        </div>
      </UCard>
    </USlideover>

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
      <div class="grid grid-cols-2 gap-4">
        <!-- Ürün Bulunamadı Durumu -->
        <div v-if="props.products.data?.length === 0 && !props.loading" class="col-span-full">
          <div class="text-center py-12 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 class="text-base font-medium text-neutral-900 mb-2">Ürün bulunamadı</h3>
            <p class="text-sm text-neutral-600 mb-4">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
            <UButton v-if="categoryState.selectedCategories.length > 0" @click="categoryState.selectedCategories = []"
              color="secondary" variant="outline" size="sm">
              Filtreleri Temizle
            </UButton>
          </div>
        </div>

        <!-- Ürün Kartları -->
        <PartialsProductCard :product="product" v-for="product in props.products?.data" :key="product.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
const categoryState = useCategoryState();
const isOpenFiltersSlideOver = ref(false);
const isOpenCategorySlideOver = ref(false);
const props = defineProps(["products", "loading"]);
const uSelect = defineModel("uSelect");

const sortOptions = [
  { name: 'Varsayılan', value: 'default' },
  { name: 'Fiyat (Düşükten Yükseğe)', value: 'price_asc' },
  { name: 'Fiyat (Yüksekten Düşüğe)', value: 'price_desc' },
  { name: 'Yeni Ürünler', value: 'newest' },
  { name: 'Popüler Ürünler', value: 'popular' }
]
</script>
