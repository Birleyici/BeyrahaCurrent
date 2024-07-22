<template>
  <div class="grid grid-cols-10 gap-10">
    <div class="col-span-3 ">
      <div class="grid gap-2">
        <b class="font-medium">Filtreler</b>
        <div class="h-[500px] overflow-y-scroll bg-slate-100 p-4 rounded-md border">
          <UCommandPalette :emptyState="{
            queryLabel: 'Sonuç bulunamadı...'
          }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
            :autoselect="false" :groups="[{ key: 'label', commands: categoryState.categories }]"
            :fuse="{ resultLimit: -1 }" />

        </div>
      </div>
    </div>
    <div class="col-span-7 ">
      <div class="grid gap-10">
        <div class="flex justify-between">
          <div></div>
          <div class="flex space-x-2 items-center">
            <p class="text-sm">Sıralama :</p>
            <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" />
          </div>
        </div>
        <div class=" relative">
          <div v-if="props.loading"
            class="absolute bg-slate-100 w-full h-full z-[2] opacity-40 flex items-center justify-center">
            <Icon name="mdi:loading" class="w-12 h-12 animate-spin"></Icon>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <PartialsProductCard :product="product" v-for="product in props.products.data">
            </PartialsProductCard>
          </div>
        </div>
        <div class="flex justify-center">
          <div>
            <UPagination v-model="query.page" :page-count="query.limit" :total="props.products.total || 0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { useCategoryState } = useStateIndex()
const categoryState = useCategoryState()
const props = defineProps(['products', 'loading'])
const uSelect = defineModel('uSelect')
const query = defineModel('query')

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
</script>