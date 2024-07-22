<template>
    <div class="grid grid-cols-2 gap-4">
        <button @click="isOpenCategorySlideOver = !isOpenCategorySlideOver"
            class="w-full bg-slate-50 border rounded-md mb-minimal py-2 px-4 flex items-center space-x-2 justify-center">
            <p class="font-medium">Kategoriler</p>
        </button>
        <button @click="isOpenFiltersSlideOver = !isOpenFiltersSlideOver"
            class="w-full bg-slate-50 border rounded-md mb-minimal py-2 px-4 text-secondary-500 flex items-center space-x-2 justify-center">
            <Icon name="ic:round-filter-alt" class="w-5 h-5"></Icon>
            <p class="font-medium">Filtreler</p>
        </button>

    </div>


    <div>
        <USlideover side="bottom" v-model="isOpenFiltersSlideOver">
            <UCard class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Filtreler
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenFiltersSlideOver = false" />
                    </div>
                </template>
                <div class="h-72 overflow-y-scroll">
                                    
                </div>
            </UCard>
        </USlideover>


        <USlideover side="bottom" v-model="isOpenCategorySlideOver">
            <UCard class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Kategoriler
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpenCategorySlideOver = false" />
                    </div>
                </template>
                <div class="h-72 overflow-y-scroll">
                    <UCommandPalette :emptyState="{
                        queryLabel: 'Sonuç bulunamadı...'
                    }" placeholder="Kategorilerde ara..." v-model="categoryState.selectedCategories" multiple nullable
                        :autoselect="false" :groups="[{ key: 'label', commands: categoryState.categories }]"
                        :fuse="{ resultLimit: -1 }" />
                </div>
            </UCard>
        </USlideover>
    </div>


    <div class="grid gap-6">
        <div class="flex justify-between">
          <div></div>
          <div class="w-full">
            <USelect v-model="uSelect" :options="sortOptions" option-attribute="name" />
          </div>
        </div>
        <div class=" relative">
          <div v-if="props.loading"
            class="absolute bg-slate-100 w-full h-full z-[2] opacity-40 flex items-center justify-center">
            <Icon name="mdi:loading" class="w-12 h-12 animate-spin"></Icon>
          </div>
          <div class="grid grid-cols-2 gap-4">
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
</template>

<script setup>
const { useCategoryState } = useStateIndex()
const categoryState = useCategoryState()
const isOpenFiltersSlideOver = ref(false)
const isOpenCategorySlideOver = ref(false);
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