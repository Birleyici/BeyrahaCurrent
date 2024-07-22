<template>

  <div class="px-x-mobil lg:px-x-desktop ">
    <PartialsCategoryDesktop v-if="!$device.isMobile" v-model:u-select="query.sort" :products="productState.products"
      v-model:query="query" :loading="loading" />
    <PartialsCategoryMobile v-else v-model:u-select="query.sort" :products="productState.products" v-model:query="query"
      :loading="loading" />
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

const query = ref({
  page: parseInt(route.query.page) || 1,
  limit: 3,
  sort: route.query.sort || 'default', // Etkisiz başlangıç değeri
});

await getCategories();

const selectedCategoryIds = computed(() => {
  return categoryState.selectedCategories.map(category => category.id);
});

const loading = ref(false);

watchEffect(async () => {
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

  setTimeout(() => {
    loading.value = false;
  }, 100);
});

watch(
  () => [query, selectedCategoryIds.value],
  () => {
    router.push({
      query: {
        ...route.query,
        ...query.value,
        selectedCategoryIds: selectedCategoryIds.value.join(',')
      }
    });
  },
  { deep: true }
);
</script>
