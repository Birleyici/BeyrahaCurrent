<template>
  <div v-if="!$device.isMobile || $mainState.isOpenSearch" class="min-w-[50px] lg:w-[500px]" :class="{
    'absolute right-0 left-0 lg:!w-full lg:px-x-desktop !border-b-transparent': $mainState.isOpenSearch,
  }">
    <div class="relative">
      <form @submit.prevent="goSearch" class="items-center relative w-11/12 lg:w-full flex mx-auto">
        <UInput ref="searchInput" @focus="$changeMainState({ isOpenSearch: true })" @blur="handleBlur" color="orange"
          @mousedown.stop type="text" @input="onInput" :value="searchWord" size="md"
          class="w-full bg-slate-100 rounded-md z-[4]" placeholder="Ara..." />
        <Icon v-if="!$mainState.isOpenSearch || ($mainState.isOpenSearch && !searchWord)" name="ph:magnifying-glass"
          class="w-6 h-6 absolute z-[10] right-2" color="black" />
        <Icon v-if="$mainState.isOpenSearch && searchWord && !$device.isMobile" name="eos-icons:loading"
          class="w-6 h-6 absolute right-2 z-[5]" color="black" />
      </form>
      <div v-if="searchWord && $mainState.isOpenSearch"
        class="min-h-[20px] w-11/12 p-4 bg-white absolute z-10 left-0 right-0 mx-auto top-[50px] rounded-xl results-container">
        <p v-if="isSearching" class="italic">Aranıyor...</p>
        <p v-else-if="productsSearched.length === 0" class="italic">Sonuç
          bulunamadı...</p>
        <div v-else class="grid gap-4">
          <div v-for="p in productsSearched.slice(0, 6)" :key="p.id">
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
import { debounce } from 'lodash';
const productState = useProductState();
const { $mainState } = useNuxtApp();
const searchInput = ref(null);
const router = useRouter();
const route = useRoute();
const searchWord = ref(route.query.searchWord || '');
const productsSearched = ref([]);
const isSearching = ref(false);

function closeSearch() {
  $mainState.isOpenSearch = false;
  searchInput.value.$refs.input.blur();
}

function goSearch() {
  router.push({
    path: '/arama-a0',
    query: {
      searchWord: searchWord.value,
    },
  });
  closeSearch();
}

function handleBlur(event) {
  // Eğer tıklanan element arama sonuçları içinde değilse blur işlemi yapılır
  if (!event.relatedTarget || !event.relatedTarget.closest('.results-container')) {
    $mainState.isOpenSearch = false;
  }
}

// Kullanıcının girdiği değeri güncelleyen fonksiyon
function onInput(evt) {
  searchWord.value = evt.target.value;
}

// Debounce edilmiş arama fonksiyonu
const debouncedSearch = debounce(async (newVal) => {
  if (!newVal) {
    productsSearched.value = [];
    return;
  }

  isSearching.value = true; // Arama başlıyor

  try {
    const response = await productState.getProducts(
      {
        searchWord: newVal,
        limit: 10,
      },
      true
    );

    productsSearched.value = response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Previous request aborted');
    } else {
      console.error('Fetch error:', error);
    }
  } finally {
    isSearching.value = false;
  }
}, 300); // 300ms gecikme

watch(
  () => searchWord.value,
  (newVal, oldVal) => {
    isSearching.value = true;
    debouncedSearch(newVal);
  }
);

watch(
  () => $mainState.isOpenSearch,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        searchInput.value.$refs.input.focus();
      });
    }
  }
);
</script>
