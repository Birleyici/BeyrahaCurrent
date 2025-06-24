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

        <!-- Infinite Scroll Loading Indicator -->
        <div v-if="isLoadingMore" class="flex items-center justify-center py-8 mt-6">
          <div class="flex flex-col items-center space-y-3">
            <Icon name="mdi:loading" class="w-8 h-8 animate-spin text-secondary-500 dark:text-secondary-400"></Icon>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Daha fazla ürün yükleniyor...</p>
          </div>
        </div>

        <!-- End of Products Indicator -->
        <div v-else-if="productState.products?.data?.length > 0 &&
          query.page >= productState.products.last_page &&
          !loading" class="flex items-center justify-center py-8 mt-6">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="heroicons:check" class="w-6 h-6 text-neutral-600 dark:text-neutral-400"></Icon>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Tüm ürünler gösterildi</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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
  sort: route.query.sort || 'popular', // Varsayılan sıralama: en çok satılan
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
const isLoadingMore = ref(false); // Infinite scroll için ayrı loading state

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
    const isPageChange = newValues[0] !== oldValues[0]; // Sadece sayfa değişikliği mi?

    if (newValues[1] !== oldValues[1] || // sort değişti mi?
      JSON.stringify(newValues[2]) !== JSON.stringify(oldValues[2]) || // selectedCategoryIds değişti mi?
      newValues[3] !== oldValues[3]) { // searchWord değişti mi?
      filtersChanged = true;
    }

    if (filtersChanged) {
      query.value.page = 1;
    }

    pushQueryParams();

    // Sayfa değişikliği ise infinite scroll loading, filtre değişikliği ise normal loading
    if (isPageChange && !filtersChanged) {
      isLoadingMore.value = true;
    } else {
      loading.value = true;
    }

    try {
      query.value.searchWord = route.query.searchWord;

      await productState.getProducts({
        ...query.value,
        selectedCategoryIds: JSON.stringify(categoryState.selectedCategoryIds)
      });
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
    } finally {
      loading.value = false;
      isLoadingMore.value = false;
    }
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
  title: computed(() => {
    if (query.value.searchWord) {
      return `"${query.value.searchWord}" Arama Sonuçları - ${settings.value.siteName}`
    } else if (slugsCat.value) {
      return `${slugsCat.value.label} Modelleri ve Fiyatları - ${settings.value.siteName}`
    } else {
      return `Ürünler - ${settings.value.siteName}`
    }
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (query.value.searchWord) {
          const productCount = productState.products?.total || 0
          return `"${query.value.searchWord}" arama sonuçları - ${productCount} ürün bulundu. ${settings.value.siteDescription || 'Kaliteli tesettür giyim ürünleri ve uygun fiyatlarla hemen sipariş verin.'}`
        } else if (slugsCat.value) {
          const categoryDesc = slugsCat.value.description
          if (categoryDesc) {
            return `${slugsCat.value.label} modelleri ve fiyatları. ${categoryDesc} ${settings.value.siteName}'de en uygun fiyatlarla hemen sipariş verin.`
          } else {
            return `${slugsCat.value.label} modelleri ve fiyatları. ${settings.value.siteName}'de en uygun fiyatlarla hemen sipariş verin.`
          }
        } else {
          return `${settings.value.siteDescription || 'Kaliteli tesettür giyim ürünleri ve uygun fiyatlarla hemen sipariş verin.'}`
        }
      })
    },
    {
      name: 'keywords',
      content: computed(() => {
        if (query.value.searchWord) {
          return `${query.value.searchWord}, arama, ürün, tesettür, giyim, online alışveriş`
        } else if (slugsCat.value) {
          return `${slugsCat.value.label}, ${slugsCat.value.label} modelleri, ${slugsCat.value.label} fiyatları, tesettür, giyim, online alışveriş`
        } else {
          return 'tesettür, giyim, ürünler, online alışveriş'
        }
      })
    },
    {
      property: 'og:title',
      content: computed(() => {
        if (query.value.searchWord) {
          return `"${query.value.searchWord}" Arama Sonuçları`
        } else if (slugsCat.value) {
          return `${slugsCat.value.label} Modelleri ve Fiyatları`
        } else {
          return 'Ürünler'
        }
      })
    },
    {
      property: 'og:description',
      content: computed(() => {
        if (query.value.searchWord) {
          const productCount = productState.products?.total || 0
          return `"${query.value.searchWord}" için ${productCount} ürün bulundu. Kaliteli tesettür giyim ürünleri ve uygun fiyatlarla.`
        } else if (slugsCat.value) {
          const categoryDesc = slugsCat.value.description
          if (categoryDesc) {
            return `${categoryDesc} En uygun fiyatlarla hemen sipariş verin.`
          } else {
            return `${slugsCat.value.label} kategorisindeki kaliteli ürünler. En uygun fiyatlarla hemen sipariş verin.`
          }
        } else {
          return settings.value.siteDescription || 'Kaliteli tesettür giyim ürünleri'
        }
      })
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})

const { isProcessing } = useShowElement('finishProducts', async () => {
  // Çoklu kontroller
  if (loading.value ||
    isLoadingMore.value ||
    !productState.products?.last_page ||
    query.value.page >= productState.products.last_page) {
    return;
  }

  try {
    query.value.page++;
  } catch (error) {
    console.error('Scroll loading error:', error);
    // Hata durumunda page'i geri al
    query.value.page--;
  }
}, {
  threshold: 0.3, // Elementin %30'u göründüğünde tetikle
  debounceTime: 1000, // 1 saniye debounce
  rootMargin: '200px' // 200px öncesinde tetikle
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
