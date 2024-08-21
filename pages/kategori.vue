<template>

  <div class="px-x-mobil lg:px-x-desktop ">
    <PartialsCategoryDesktop v-if="!$device.isMobile" v-model:u-select="query.sort" :products="productState.products"
      :loading="loading" />
    <PartialsCategoryMobile v-else v-model:u-select="query.sort" :products="productState.products" :loading="loading" />
    <div class="text-center mt-4 bg-slate-50 p-4 rounded-md" v-if="loading">Ürünler yükleniyor</div>
    <!-- <div class="flex justify-center">
      <div>
        <UPagination v-model="query.page" :page-count="query.limit" :total="productState.products.total || 0" />
      </div>
    </div> -->
    <div id="finishProducts"></div>
  </div>

</template>

<script setup>
const { useProductState, useCategoryState } = useStateIndex();
const productState = useProductState();
const categoryState = useCategoryState();
const route = useRoute();
const router = useRouter();

const query = ref({
  searchWord: route.query.searchWord,
  page: parseInt(route.query.page) || 1,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});

useScrollEnd('finishProducts', () => {
  if (query.value.page < productState.products.last_page) {
    query.value.page++
  }
});

const selectedCategoryIds = computed(() => {
  return categoryState.selectedCategories.map(category => category.id);
});


await useAsyncData('initDataProductss', async () => {
  try {
    await Promise.all([
      productState.getProducts({
        filters: {
          ...query.value,
          selectedCategoryIds: JSON.stringify(selectedCategoryIds.value)
        }
      }),
      categoryState.getCategories(),
    ]);
    return [true, true];
  } catch (error) {
    console.error('Hata oluştu:', error);
    return [false, false];
  }
});



const loading = ref(false);

watch(()=> [query, selectedCategoryIds, route.query.searchWord], async () => {

  query.value.searchWord = route.query.searchWord
  
  loading.value = true;

  if (process.client) {
    const prevPage = localStorage.getItem('prevPage');
    if (prevPage && parseInt(prevPage) == query.value.page) {
      query.value.page = 1;
    }
  }

  await productState.getProducts({
    filters: {
      ...query.value,
      selectedCategoryIds: JSON.stringify(selectedCategoryIds.value)
    }
  });

  pushQueryParams()

  loading.value = false;
},
  {
    deep: true
  });



const pushQueryParams = () => {

  router.push({
    query: {
      ...route.query,
      ...query.value,
      selectedCategoryIds: selectedCategoryIds.value.join(',')
    }
  });

}


</script>
