<template>
  <div class="px-x-mobil lg:px-x-desktop lg:grid grid-cols-10 gap-10">
    <button @click="isOpenFilters = !isOpenFilters" v-if="$device.isMobile"
      class="w-full bg-slate-50 border rounded-full mb-minimal py-2 text-secondary-500 flex items-center space-x-2 justify-center">
      <Icon name="ic:round-filter-alt" class="w-5 h-5"></Icon>
      <p class="font-medium">Filtreler</p>
    </button>
    <div class="col-span-3" :class="[
      isOpenFilters || !$device.isMobile ? 'translate-y-0' : 'translate-y-full',
      {
        'right-0 z-[20] left-0 p-4 duration-300 h-full fixed bg-slate-50 rounded-t-xl border': $device.isMobile,
      },
    ]">
      <div @click="isOpenFilters = !isOpenFilters" class="flex justify-between items-center">
        <b>Filtreler</b>
        <Icon v-if="$device.isMobile" class="w-6 h-6" name="mdi:close"></Icon>
      </div>
      <div class="space-y-minimal">

        <div class="h-[300px] overflow-y-scroll bg-slate-50 p-2 rounded-md">
          <UCommandPalette :emptyState="{
            queryLabel: 'Sonuç bulunamadı...'
          }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
            :autoselect="false" :groups="[{ key: 'label', commands: categoryState.categories }]"
            :fuse="{ resultLimit: -1 }" />
        </div>

        <UiFormCheckboxToggle>Ücretsiz Kargo</UiFormCheckboxToggle>
      </div>
    </div>
    <div @click="isOpenFilters = false" v-if="isOpenFilters && $device.isMobile"
      class="absolute left-0 right-0 bottom-0 top-0 bg-black opacity-20 w-full h-full z-[0]"></div>
    <div class="col-span-7 space-y-minimal ">
      <div class="space-y-minimal lg:flex justify-between items-center">
        <div class="flex space-x-4 items-center">
          <div class="flex items-center space-x-2">
            <UiBadgesBadge>Ücretsiz Kargo</UiBadgesBadge>
          </div>
          <div class="flex items-center space-x-2">
            <UiBadgesBadge>Marka 1</UiBadgesBadge>
          </div>
        </div>


        <USelect v-model="query.sort" :options="sortOptions" option-attribute="name" />

      </div>
      <div class="grid grid-cols-5 md:grid-cols-3 gap-2 lg:gap-5 relative">
        <div v-if="loading" class="absolute bg-slate-100 w-full h-full z-[2] opacity-40 flex items-center justify-center">
          <Icon name="mdi:loading" class="w-12 h-12 animate-spin"></Icon>
        </div>
        <PartialsProductCard :product="product" v-for="product in productState.products.data">
        </PartialsProductCard>
      </div>
      <UPagination v-model="query.page" :page-count="query.limit" :total="productState.products.total || 0" />

    </div>
  </div>
</template>

<script setup>
const isOpenFilters = ref(false);
const { useProductState, useCategoryState } = useStateIndex()
const productState = useProductState()
const categoryState = useCategoryState()
const { getProducts } = useProduct()
const { getCategories } = useCategory();

const query = ref({
  page: 1,
  limit: 3,
  sort: 'default', // Etkisiz başlangıç değeri
})

await getCategories()

const selectedCategoryIds = computed(() => {
  return categoryState.selectedCategories.map(category => category.id);
});

const sortOptions = [
  {
    name: 'Varsayılan sıralama',
    value: 'default'
  },
  {
    name: 'En çok satanlar',
    value: 'bestsellers'
  },
  {
    name: 'Artan fiyat',
    value: 'increase'
  },
  {
    name: 'Azalan fiyat',
    value: 'decrease'
  }]

const loading = ref(false)
watchEffect(async () => {
  loading.value = true
  await getProducts({
    filters: {
      ...query.value,
      selectedCategoryIds: JSON.stringify(selectedCategoryIds.value)
    }
  })

  setTimeout(() => {
    loading.value = false
  }, 100);
})

</script>
