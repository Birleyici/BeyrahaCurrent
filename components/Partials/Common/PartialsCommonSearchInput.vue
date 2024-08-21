<template>
  <div v-if="!$device.isMobile || $mainState.isOpenSearch" class="min-w-[50px] lg:w-[500px]" :class="{
    'absolute right-0 left-0 lg:!w-full lg:px-x-desktop !border-b-transparent': $mainState.isOpenSearch,
  }">
    <div class="relative">
      <div class="items-center relative w-11/12 lg:w-full flex mx-auto">
        <input ref="searchInput" @focus="$changeMainState({ isOpenSearch: true })"
          @blur="$changeMainState({ isOpenSearch: false })" type="text" v-model="searchWord"
          class="focus:p-3 rounded-xl w-full bg-slate-100 focus:bg-white px-4 py-2 focus:outline-0 duration-200 z-[4]"
          placeholder="Ara..." @keydown.enter="goSearch()" />
        <Icon v-if="!$mainState.isOpenSearch || ($mainState.isOpenSearch && !searchWord)" name="ph:magnifying-glass"
          class="w-6 h-6 absolute z-[10] right-2" color="black" />
        <Icon v-if="$mainState.isOpenSearch && searchWord" name="eos-icons:loading"
          class="w-6 h-6 absolute right-2 z-[5]" color="black" />

      </div>
      <div v-if="searchWord && $mainState.isOpenSearch"
        class="min-h-[20px] p-4 bg-white w-full absolute z-10 right-0 top-[50px] rounded-xl">
        <p v-if="productsSearched.length == 0" class="italic">Sonuç bulunamadı...</p>
        <div v-else class="grid gap-4">
          <div v-for="p in productsSearched">
            {{ p.name }}
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="opacity-40 bg-black absolute bottom-0 top-0 right-0 left-0 w-full z-[3]" v-if="$mainState.isOpenSearch">
  </div>
</template>

<script setup>
const { useProductState } = useStateIndex()
const productState = useProductState()

const { $mainState } = useNuxtApp()
const searchInput = ref(null);
const router = useRouter()
const route = useRoute()
const searchWord = ref(route.query.searchWord);
const nuxtApp = useNuxtApp()
const goSearch = () => {
  router.push({
    path: 'kategori',
    query: {
      searchWord: searchWord.value
    }
  })
  nuxtApp.$changeMainState({ isOpenSearch: false })
  searchInput.value.blur()
}
watch(
  () => $mainState.isOpenSearch,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        searchInput.value.focus();
      });
    }
  }
);

const productsSearched = ref([])

watchEffect(async (onInvalidate) => {
  const controller = new AbortController();
  const signal = controller.signal;

  // onInvalidate içindeki kod, watchEffect'in yeniden çalıştırılması durumunda önceki işlemi iptal eder.
  onInvalidate(() => controller.abort());

  try {
    const response = await productState.getProducts({
      filters: {
        searchWord: searchWord.value
      }
    }, { signal });

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
