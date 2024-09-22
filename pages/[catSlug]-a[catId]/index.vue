<template>
  <div class="standart-section-spacing">
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
const isChangeRoute = ref(false)

watch(() => router.currentRoute.value.path, (newVal, oldVal) => {

  console.log(newVal, oldVal)
  if (newVal != oldVal) {
    isChangeRoute.value = true
  }
});

const initCategoryIds = route.query.selectedCategoryIds
if (initCategoryIds) {
  categoryState.patchSelectedCategories(initCategoryIds)
}

const query = ref({
  searchWord: route.query.searchWord,
  page: parseInt(route.query.page) || 1,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});


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
watch([
  () => query.value.page,
  () => query.value.sort,
  () => categoryState.selectedCategoryIds.slice(),
  () => query.value.searchWord,
  () => route.query.searchWord
], async (newValues, oldValues) => {
  // newValues ve oldValues dizileri aşağıdaki indekslere sahiptir:
  // [0]: query.value.page
  // [1]: query.value.sort
  // [2]: categoryState.selectedCategoryIds
  // [3]: query.value.searchWord
  // [4]: route.query.searchWord

  if (!isChangeRoute.value) {
    // Filtreler değiştiğinde sayfayı 1'e resetlemek için kontrol
    let filtersChanged = false;

    if (newValues[1] !== oldValues[1] || // sort değişti mi?
      JSON.stringify(newValues[2]) !== JSON.stringify(oldValues[2]) || // selectedCategoryIds değişti mi?
      newValues[3] !== oldValues[3]) { // searchWord değişti mi?
      filtersChanged = true;
    }

    if (filtersChanged) {
      query.value.page = 1;
    }

    pushQueryParams();

    loading.value = true;
    query.value.searchWord = route.query.searchWord;

    await productState.getProducts({
      ...query.value,
      selectedCategoryIds: JSON.stringify(categoryState.selectedCategoryIds)
    });

    loading.value = false;
  }
}, {
  deep: true,
});



const pushQueryParams = () => {
  if (!isChangeRoute.value) {
    router.push({
      query: {
        ...route.query,
        ...query.value,
        selectedCategoryIds: categoryState.selectedCategoryIds.join(','),
        searchWord: query.value.searchWord
      }
    });
  }
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
