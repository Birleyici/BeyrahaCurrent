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
const { getProducts } = useProduct();
const { getCategories } = useCategory();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp()

const query = ref({
  page: parseInt(route.query.page) || 1,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});


const page = ref(1)
useScrollEnd('finishProducts', () => {
  if(query.value.page < productState.products.total){
    query.value.page ++
  }
});


await useAsyncData("initCategoryPageData", async () => {
  await getCategories();
  return true
})



const selectedCategoryIds = computed(() => {
  return categoryState.selectedCategories.map(category => category.id);
});



const loading = ref(false);

watch([query, selectedCategoryIds], async () => {

  loading.value = true;

  if (process.client) {
    const prevPage = localStorage.getItem('prevPage');
    if (prevPage && parseInt(prevPage) == query.value.page) {
      query.value.page = 1;
    }
  }

  await getProducts({
    filters: {
      ...query.value,
      selectedCategoryIds: JSON.stringify(selectedCategoryIds.value)
    }
  });

  pushQueryParams()

  loading.value = false;
},
  {
    deep: true,
    immediate: true
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
