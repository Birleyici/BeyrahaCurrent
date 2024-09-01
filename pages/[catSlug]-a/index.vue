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
const productState = useProductState();
const categoryState = useCategoryState();
const route = useRoute();
const router = useRouter();

// - categoryState.selectedCategories STATE'İ kullanıcının seçtiği kategoriler için
// v-model olarak kullanılan bir model değişkenidir.

const initCategoryIds = route.query.selectedCategoryIds
if (initCategoryIds) {
  categoryState.selectedCategories = initCategoryIds.split(',').map(Number).map(id => ({ id }))
}

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
  return categoryState.selectedCategories.map(category => category.id) || [];
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

watch(() => [query, selectedCategoryIds, query.value.page], async (newValue, oldValue) => {


  //eğer sayfa değişmediyse ama diğer filtreler tetiklendiyse
  if (newValue?.[2] == oldValue?.[2]) {
    query.value.page = 1
  }

  loading.value = true;
  query.value.searchWord = route.query.searchWord

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



onMounted(() => {
  watch(() => categoryState.selectedCategories, () => {
    categoryState.sortCategories()
  }, {
    immediate: true,
    deep: true
  })
})


onBeforeRouteUpdate(async (to, from) => {
  if (to.path == '/kategori' && (to.query.selectedCategoryIds !== from.query.selectedCategoryIds)) {
    categoryState.selectedCategories = to.query.selectedCategoryIds.split(',').map(Number).map(id => ({ id }))
  }
})


const categorySlug = categoryState.categories.find(c => c.slug === route.params.catSlug);
if (categorySlug && !categoryState.selectedCategories.some(cat => cat.id === categorySlug.id)) {
  categoryState.selectedCategories.push({ id: categorySlug.id });
}


</script>
