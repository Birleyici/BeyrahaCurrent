<template>
  <div v-if="!$device.isMobile || $mainState.isOpenSearch" class="min-w-[50px] lg:w-[500px]" :class="{
    'absolute right-0 left-0 lg:!w-full lg:px-x-desktop !border-b-transparent': $mainState.isOpenSearch,
  }">
    <div class="relative">
      <div class="items-center relative w-11/12 lg:w-full flex mx-auto">
        <UInput ref="searchInput" @focus="$changeMainState({ isOpenSearch: true })" @blur="handleBlur" color="orange"
          @mousedown.stop type="text" @input='evt => searchWord = evt.target.value' :value="searchWord" size="md"
          class="w-full bg-slate-100 z-[4]" placeholder="Ara..." @keydown.enter="goSearch()" />
        <Icon v-if="!$mainState.isOpenSearch || ($mainState.isOpenSearch && !searchWord)" name="ph:magnifying-glass"
          class="w-6 h-6 absolute z-[10] right-2" color="black" />
        <Icon v-if="$mainState.isOpenSearch && searchWord && !$device.isMobile" name="eos-icons:loading"
          class="w-6 h-6 absolute right-2 z-[5]" color="black" />
        <div @click="goSearch()" class="absolute right-1 z-[5] bg-slate-100 p-2 rounded-xl"
          v-else-if="$mainState.isOpenSearch && searchWord">
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
        </div>
      </div>
      <div v-if="searchWord && $mainState.isOpenSearch"
        class="min-h-[20px] w-11/12 p-4 bg-white   absolute z-10 left-0 right-0 mx-auto top-[50px] rounded-xl results-container">
        <p v-if="productsSearched.length == 0" class="italic">Sonuç bulunamadı...</p>
        <div v-else class="grid gap-4">
          <div v-for="p in productsSearched.slice(0, 6)">
            <NuxtLink @click="closeSearch" :to="p.product_url">{{ p.name }}</NuxtLink>
          </div>
          <div v-if="productsSearched.length > 1">
            <UDivider type="dashed" />
            <ULink @click.prevent="goSearch()" class="text-orange-500 mt-2">Tüm sonuçları gör</ULink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-40 bg-black absolute bottom-0 top-0 right-0 left-0 w-full z-[3]" v-if="$mainState.isOpenSearch">
  </div>
</template>

<script setup>
const productState = useProductState();
const { $mainState } = useNuxtApp();
const searchInput = ref(null);
const router = useRouter();
const route = useRoute();
const searchWord = ref(route.query.searchWord);
const productsSearched = ref([]);


function closeSearch() {
  $mainState.isOpenSearch = false;
  searchInput._value.$refs.input.blur();
}


function goSearch() {
  router.push({
    path: '/arama-a0',
    query: {
      searchWord: searchWord.value
    }
  });
  closeSearch()
}

function handleBlur(event) {
  // Eğer tıklanan element arama sonuçları içinde değilse blur işlemi yapılır
  if (!event.relatedTarget || !event.relatedTarget.closest('.results-container')) {
    $mainState.isOpenSearch = false;
  }
}

watch(
  () => $mainState.isOpenSearch,
  (newValue) => {

    if (newValue) {
      nextTick(() => {
        searchInput._value.$refs.input.focus();
      });
    }
  }
);


watchEffect(async (onInvalidate) => {
  const controller = new AbortController();
  const signal = controller.signal;

  onInvalidate(() => controller.abort());

  try {
    const response = await productState.getProducts({
      searchWord: searchWord.value,
      limit: 10
    }, true, { signal });

    productsSearched.value = response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Previous request aborted');
    } else {
      console.error('Fetch error:', error);
    }
  }
});

</script>
