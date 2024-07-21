<template>
  <div class="px-x-mobil lg:px-x-desktop lg:grid grid-cols-10 gap-10">
    <button @click="isOpenFilters = !isOpenFilters" v-if="useMain().isMobile"
      class="w-full bg-slate-50 border rounded-full mb-minimal py-2 text-secondary-500 flex items-center space-x-2 justify-center">
      <Icon name="ic:round-filter-alt" class="w-5 h-5"></Icon>
      <p class="font-medium">Filtreler</p>
    </button>
    <div class="col-span-3" :class="[
      isOpenFilters || !useMain().isMobile ? 'translate-y-0' : 'translate-y-full',
      {
        'right-0 z-[20] left-0 p-4 duration-300 h-full fixed z-10 bg-slate-50 rounded-t-xl border': useMain()
          .isMobile,
      },
    ]">
      <div @click="isOpenFilters = !isOpenFilters" class="flex justify-between items-center">
        <b>Filtreler</b>
        <Icon v-if="useMain().isMobile" class="w-6 h-6" name="mdi:close"></Icon>
      </div>
      <div class="space-y-minimal">

        <div class="h-[300px] overflow-y-scroll bg-slate-50 p-2 rounded-md">
          <!-- <UCommandPalette :emptyState="{
            queryLabel: 'Sonuç bulunamadı...'
          }" placeholder="Kategorilerde ara..." v-model="productState.selectedCategories" multiple nullable
            :autoselect="false" :groups="[{ key: 'label', commands: productState.categories }]"
            :fuse="{ resultLimit: -1 }" /> -->
        </div>

        <UiFormCheckboxToggle>Ücretsiz Kargo</UiFormCheckboxToggle>
      </div>
    </div>
    <div @click="isOpenFilters = false" v-if="isOpenFilters && useMain().isMobile"
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
        <UiFormSelect class="lg:w-72">
          <option value="">Akıllı sıralama</option>
          <option value="">En çok satanlar</option>
          <option value="">Azalan fiyat</option>
          <option value="">Artan fiyat</option>
        </UiFormSelect>
      </div>
      <div class="grid grid-cols-5 md:grid-cols-3 gap-2 lg:gap-5">
        <PartialsProductCard :product="product" v-for="product in productFrontState.products.data"></PartialsProductCard>
      </div>
      <UPagination @click="getProducts(query)" v-model="query.page" :page-count="query.limit" :total="productFrontState.products.total || 0" />
      
    </div>
  </div>
</template>

<script setup>
const isOpenFilters = ref(false);
const { useProductState } = useStateIndex()
const productFrontState = useProductState()
const { getProducts } = useProduct()
const { getCategories } = useProductCreate();
const query = ref({
  page: 1,
  limit: 3
})
await getProducts(query.value)
await getCategories()

</script>
