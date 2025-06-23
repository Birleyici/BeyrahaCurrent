<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <!-- Breadcrumb -->
    <UiCommonBreadcrumb :links="breadcrumbLinks" />

    <div class="page-content-spacing">
      <!-- Sayfa Başlığı -->
      <div class="container">
        <div v-if="slugsCat || query.searchWord" class="mb-8">
          <h1 class="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            <span v-if="query.searchWord">"{{ query.searchWord }}" için arama sonuçları</span>
            <span v-else>{{ slugsCat?.label }}</span>
          </h1>
          <p v-if="slugsCat && !query.searchWord" class="text-neutral-600 dark:text-neutral-400">
            {{ slugsCat?.description || 'Kaliteli ürünlerimizi keşfedin' }}
          </p>
          <p v-else-if="query.searchWord" class="text-neutral-600 dark:text-neutral-400">
            {{ productState.products?.total || 0 }} ürün bulundu
          </p>
        </div>
      </div>

      <div class="container">
        <PartialsCategoryDesktop v-if="!isMobile" v-model:u-select="query.sort" :products="productState.products"
          :loading="loading" />
        <PartialsCategoryMobile v-else v-model:u-select="query.sort" :products="productState.products"
          :loading="loading" />

        <!-- Infinite Loading Trigger -->
        <div v-if="$mainState.isLoaded" id="finishProducts"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDevice } from '~/composables/useDevice'

const productState = useProductState();
const categoryState = useCategoryState();
const route = useRoute();
const router = useRouter();
const { settings } = useSettings()
const catSlug = route.params.catSlug
const catId = route.params.catId
const isChangeRoute = ref(false)

// Device detection
const { isMobile } = useDevice()

watch(() => router.currentRoute.value.path, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  if (newVal != oldVal) {
    isChangeRoute.value = true

    // Route değiştiğinde URL parametrelerindeki kategori ID'lerini güncelle
    const newRoute = router.currentRoute.value
    const newCategoryIds = newRoute.query.selectedCategoryIds

    if (newCategoryIds && categoryState.categories.length > 0) {
      categoryState.selectedCategories = []
      categoryState.patchSelectedCategories(newCategoryIds)
      categoryState.updateSelectedCategoriesWithFullData()
    }
  }
});

const initCategoryIds = route.query.selectedCategoryIds

const query = ref({
  searchWord: route.query.searchWord,
  page: parseInt(route.query.page) || 1,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});


await useAsyncData('initDataProducts', async () => {
  try {
    categoryState.selectedCategories = []

    // Önce ana kategoriyi ekle (eğer kategori sayfasındaysak)
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

    // Kategoriler yüklendikten sonra seçili kategorilerin tam bilgilerini güncelle
    categoryState.updateSelectedCategoriesWithFullData();

    // URL'den gelen ek kategori ID'lerini işle
    if (initCategoryIds) {
      categoryState.patchSelectedCategories(initCategoryIds)
      categoryState.updateSelectedCategoriesWithFullData()
    }

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



const slugsCat = computed(() => {
  return categoryState.categories?.find(c => c.id === parseInt(catId))
})



useHead({
  title: computed(() => `${route.params.catSlug} - ${settings.value.siteName}`),
  meta: [
    {
      name: 'description',
      content: computed(() => `${route.params.catSlug} kategorisindeki ürünleri keşfedin. ${settings.value.siteDescription || 'Kaliteli tesettür giyim ürünleri'}.`)
    }
  ]
})

useShowElement('finishProducts', () => {
  if (!loading.value && query.value.page < productState.products.last_page) {
    query.value.page++;
  }
});

const breadcrumbLinks = computed(() => {
  const links = [{
    label: 'Ana Sayfa',
    to: '/'
  }]

  if (query.value.searchWord) {
    // Arama sayfası için
    links.push({
      label: `"${query.value.searchWord}" arama sonuçları`
    })
  } else if (slugsCat.value) {
    // Kategori sayfası için
    links.push({
      label: slugsCat.value.label
    })
  }

  return links
})

</script>
