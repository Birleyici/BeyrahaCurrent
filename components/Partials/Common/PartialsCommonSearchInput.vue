<template>
  <div v-if="!$device.isMobile || $mainState.isOpenSearch" class="relative" :class="{
    'w-full': true
  }">
    <!-- Mobile Search Overlay -->
    <div v-if="$mainState.isOpenSearch && $device.isMobile" class="fixed inset-0 z-50">
      <div class="absolute inset-0 p-4">
        <div
          class="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-h-[90vh] overflow-hidden transition-colors duration-300">
          <!-- Mobile Header -->
          <div class="flex items-center p-4 border-b border-neutral-100 dark:border-neutral-700">
            <button @click="closeSearch"
              class="p-2 -ml-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-150">
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <h3 class="ml-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">Ürün Ara</h3>
          </div>

          <!-- Mobile Search Input -->
          <div class="p-4">
            <PartialsCommonSearchInputField ref="searchInput" v-model="searchWord" :is-searching="isSearching"
              @submit="goSearch" placeholder="Aradığınız ürünü yazınız..." class="w-full" />
          </div>

          <!-- Mobile Results -->
          <div class="flex-1 overflow-y-auto">
            <PartialsCommonSearchResults :products="productsSearched" :is-searching="isSearching"
              :search-word="searchWord" @product-click="closeSearch" @view-all="goSearch" />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Search -->
    <div v-else class="relative w-full">
      <PartialsCommonSearchInputField ref="searchInput" v-model="searchWord" :is-searching="isSearching"
        @submit="goSearch" @focus="$changeMainState({ isOpenSearch: true })" @blur="handleBlur"
        placeholder="Aradığınız ürünü yazınız..." class="w-full" />

      <!-- Desktop Results Dropdown -->
      <Transition enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-98 opacity-0 translate-y-1"
        enter-to-class="transform scale-100 opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100 translate-y-0"
        leave-to-class="transform scale-98 opacity-0 translate-y-1">
        <div v-if="searchWord && $mainState.isOpenSearch && !$device.isMobile"
          class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200/80 dark:border-neutral-700/80 z-50 max-h-[400px] overflow-hidden results-container transition-colors duration-300">
          <PartialsCommonSearchResults :products="productsSearched" :is-searching="isSearching"
            :search-word="searchWord" @product-click="closeSearch" @view-all="goSearch" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import pkg from 'lodash'
const { debounce } = pkg
const productState = useProductState()
const { $mainState } = useNuxtApp()
const searchInput = ref(null)
const router = useRouter()
const route = useRoute()
const searchWord = ref(route.query.searchWord || '')
const productsSearched = ref([])
const isSearching = ref(false)

function closeSearch() {
  $mainState.isOpenSearch = false
  if (searchInput.value?.$refs?.input) {
    searchInput.value.$refs.input.blur()
  }
}

function goSearch() {
  if (!searchWord.value.trim()) return

  router.push({
    path: '/arama-a0',
    query: {
      searchWord: searchWord.value.trim()
    }
  })
  closeSearch()
}

function handleBlur(event) {
  // Eğer tıklanan element arama sonuçları içinde değilse blur işlemi yapılır
  if (
    !event.relatedTarget ||
    !event.relatedTarget.closest('.results-container')
  ) {
    setTimeout(() => {
      $mainState.isOpenSearch = false
    }, 150)
  }
}

// Debounce edilmiş arama fonksiyonu
const debouncedSearch = debounce(async (newVal) => {
  if (!newVal || newVal.length < 2) {
    productsSearched.value = []
    isSearching.value = false
    return
  }

  isSearching.value = true

  try {
    const response = await productState.getProducts(
      {
        searchWord: newVal,
        limit: 8
      },
      true
    )

    productsSearched.value = response.data || []
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Previous request aborted')
    } else {
      console.error('Fetch error:', error)
      productsSearched.value = []
    }
  } finally {
    isSearching.value = false
  }
}, 300)

watch(
  () => searchWord.value,
  (newVal) => {
    debouncedSearch(newVal)
  }
)

watch(
  () => $mainState.isOpenSearch,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        if (searchInput.value?.$refs?.input) {
          searchInput.value.$refs.input.focus()
        }
      })
    }
  }
)

// Escape tuşu ile arama kapatma
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && $mainState.isOpenSearch) {
      closeSearch()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>
