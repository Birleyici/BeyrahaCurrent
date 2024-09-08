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
    <div v-if="$mainState.isLoaded" id="finishProducts"></div>

  </div>
</template>

<script setup>


const productState = useProductState();
const categoryState = useCategoryState();
const route = useRoute();
const router = useRouter();
const catSlug = route.params.catSlug
const catId = route.params.catId



const initCategoryIds = route.query.selectedCategoryIds
if (initCategoryIds) {
  categoryState.patchSelectedCategories(initCategoryIds)
}

const query = ref({
  searchWord: route.query.searchWord,
  page: parseInt(route.query.page) || 1,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});



//kategori ürün listesine girildiğinde eğer yükleme devam ediyorsa
//scroll tetiklendiğinde örneğin 2. sayfayı products e set ediyor 1. sayfa kayboluyor

await useAsyncData('initDataProducts', async () => {
  try {
    categoryState.selectedCategories = []
    if ((catSlug && catId) && catSlug != 'arama') {
      categoryState.patchSelectedCategories(catId.toString(), false)
    }
    await Promise.all([
      productState.getProducts({
        ...query.value,
        selectedCategoryIds: JSON.stringify(categoryState.selectedCategoryIds)
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
watch(() => [query, categoryState.selectedCategoryIds, query.value.page], async (newValue, oldValue) => {

  //eğer sayfa değişmediyse ama diğer filtreler tetiklendiyse
  if (newValue?.[2] == oldValue?.[2]) {
    query.value.page = 1
  }

  loading.value = true;
  query.value.searchWord = route.query.searchWord

  console.log(JSON.stringify(categoryState.selectedCategoryIds))
  await productState.getProducts({
      ...query.value,
      selectedCategoryIds: JSON.stringify(categoryState.selectedCategoryIds)
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
      selectedCategoryIds: categoryState.selectedCategoryIds.join(',')
    }
  });

}


const slugsCat = categoryState.categories?.find(c => c.id === parseInt(catId))
let meta
if (query.value.searchWord) {
  meta = {
    title: `${query.value.searchWord} arama sonuçları`,
  }
} else if (slugsCat) {
  meta = {
    title: `${slugsCat?.label} fiyatları ve modelleri`,
    meta: [
      { name: 'description', content: slugsCat?.description }
    ],
  }
}
useHead(meta)

useShowElement('finishProducts', () => {
  if (!loading.value && query.value.page < productState.products.last_page) {
    query.value.page++;
  }
});

</script>
