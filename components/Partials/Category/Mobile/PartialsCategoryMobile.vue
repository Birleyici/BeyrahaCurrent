<template>
  <div class="space-y-6">
    <!-- Filtre ve Sıralama Butonları -->
    <div class="flex space-x-4">
      <UButton @click="isOpenFiltersSlideOver = true" variant="outline" color="gray" class="flex-1 justify-center"
        icon="i-heroicons-funnel">
        Sıralama
      </UButton>

      <UButton @click="isOpenCategorySlideOver = true" variant="outline" color="gray" class="flex-1 justify-center"
        icon="i-heroicons-squares-2x2">
        Kategoriler
      </UButton>
    </div>

    <!-- Sıralama Slide Over -->
    <USlideover side="bottom" v-model="isOpenFiltersSlideOver">
      <UCard class="flex flex-col flex-1" :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-neutral-200',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-neutral-900">
              Sıralama
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenFiltersSlideOver = false" />
          </div>
        </template>

        <div class="space-y-4">
          <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" size="lg" class="w-full" />
        </div>
      </UCard>
    </USlideover>

    <!-- Kategori Slide Over -->
    <USlideover side="bottom" v-model="isOpenCategorySlideOver">
      <UCard class="flex flex-col flex-1" :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-neutral-200',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-neutral-900">
              Kategoriler
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenCategorySlideOver = false" />
          </div>
        </template>

        <div class="h-72 overflow-y-auto">
          <UCommandPalette :emptyState="{
            queryLabel: 'Sonuç bulunamadı...',
          }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
            :autoselect="false" :groups="[{ key: 'label', commands: categoryState.sortedCategories }]"
            :fuse="{ resultLimit: -1 }" />
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
        <div v-if="props.products.data.length == 0" class="col-span-full">
          <div class="text-center py-16">
            <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">Ürün bulunamadı</h3>
            <p class="text-neutral-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
          </div>
        </div>
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
