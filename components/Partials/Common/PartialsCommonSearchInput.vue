<template>
  <div v-if="!isMobile || isOpenSearch" class="relative" :class="{
    'w-full': true
  }">
    <!-- Mobile Search Overlay -->
    <template v-if="isOpenSearch && isMobile">
      <Transition name="search-overlay">
        <div class="fixed inset-0 z-50">
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
                  :is-typing="isTyping" @submit="goSearch" placeholder="Aradığınız ürünü yazınız..." class="w-full" />
              </div>

              <!-- Mobile Results -->
              <div class="flex-1 overflow-y-auto">
                <PartialsCommonSearchResults :products="productsSearched" :is-searching="isSearching"
                  :is-typing="isTyping" :search-word="searchWord" @product-click="closeSearch" @view-all="goSearch"
                  @suggestion-click="handleSuggestionClick" @category-click="handleCategoryClick" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </template>

    <!-- Desktop Search -->
    <div v-else class="relative w-full">
      <PartialsCommonSearchInputField ref="searchInput" v-model="searchWord" :is-searching="isSearching"
        :is-typing="isTyping" @submit="goSearch" @focus="openSearch" @blur="handleBlur"
        placeholder="Aradığınız ürünü yazınız..." class="w-full" />

      <!-- Desktop Results Dropdown -->
      <Transition name="search-dropdown">
        <div v-if="isOpenSearch && !isMobile"
          class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200/80 dark:border-neutral-700/80 z-50 max-h-[400px] overflow-hidden results-container transition-colors duration-300">
          <PartialsCommonSearchResults :products="productsSearched" :is-searching="isSearching" :is-typing="isTyping"
            :search-word="searchWord" @product-click="closeSearch" @view-all="goSearch"
            @suggestion-click="handleSuggestionClick" @category-click="handleCategoryClick" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import pkg from 'lodash'
const { debounce } = pkg

// Device detection
const { isMobile } = useDevice()

const productState = useProductState()
const { $mainState, $changeMainState } = useNuxtApp()
const searchInput = ref(null)
const router = useRouter()
const route = useRoute()
const searchWord = ref(route.query.searchWord || '')
const productsSearched = ref([])
const isSearching = ref(false)
const isTyping = ref(false)

// Computed property for SSR compatibility
const isOpenSearch = computed(() => {
  if (process.server) return false
  // $mainState'in var olup olmadığını kontrol et
  if (!$mainState) return false
  return $mainState.isOpenSearch || false
})

// Native back button handler - TEK SATIR!
const { useBackHandler, BACK_HANDLER_PRIORITIES } = await import('~/composables/useNativeBackHandler.js')
useBackHandler(isOpenSearch, BACK_HANDLER_PRIORITIES.SEARCH, () => $changeMainState({ isOpenSearch: false }))

function openSearch() {
  if (process.client && $changeMainState) {
    $changeMainState({ isOpenSearch: true })
  }
}

function closeSearch() {
  if (process.client && $changeMainState) {
    $changeMainState({ isOpenSearch: false })
  }
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

function handleSuggestionClick(suggestion) {
  searchWord.value = suggestion
  goSearch()
}

function handleCategoryClick(category) {
  // Kategori slug'ına göre kategoriye yönlendir
  const categoryPath = `/${category.slug}-a${category.id}`
  router.push(categoryPath)
  closeSearch()
}

function handleBlur(event) {
  // Eğer tıklanan element arama sonuçları içinde değilse blur işlemi yapılır
  if (
    !event.relatedTarget ||
    !event.relatedTarget.closest('.results-container')
  ) {
    setTimeout(() => {
      if (process.client && $changeMainState) {
        $changeMainState({ isOpenSearch: false })
      }
    }, 150)

  }

}

// Debounce edilmiş arama fonksiyonu
const debouncedSearch = debounce(async (newVal) => {
  if (!newVal || newVal.length < 3) {
    productsSearched.value = []
    isSearching.value = false
    isTyping.value = false
    return
  }

  console.log('🔍 Arama yapılıyor:', newVal)
  isTyping.value = false
  isSearching.value = true

  try {
    const searchParams = {
      searchWord: newVal,
      limit: 8
    }

    console.log('📤 Arama parametreleri:', searchParams)

    const response = await productState.getProducts(searchParams, true)

    console.log('📥 Arama yanıtı:', response)
    console.log('📊 Bulunan ürün sayısı:', response?.data?.length || 0)

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
}, 600)

watch(
  () => searchWord.value,
  (newVal) => {
    // Kullanıcı yazmaya başladığında hemen typing indicator'ı göster
    if (newVal && newVal.length >= 1) {
      isTyping.value = true
    } else {
      isTyping.value = false
    }

    debouncedSearch(newVal)
  }
)

watch(
  () => isOpenSearch.value,
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
    if (e.key === 'Escape' && isOpenSearch.value) {
      closeSearch()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Aramayı temizle
const clearSearch = () => {
  searchWord.value = ""
  productsSearched.value = []
}

// Sayfa değiştiğinde search'ü kapat
watch(() => route.path, () => {
  closeSearch()
})
</script>

<style scoped>
/* Native-style Search Dropdown Transition */
.search-dropdown-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.search-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.search-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
}

/* Mobile Search Overlay Transition */
.search-overlay-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-overlay-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.search-overlay-enter-from {
  opacity: 0;
}

.search-overlay-leave-to {
  opacity: 0;
}

.search-overlay-enter-from .bg-white {
  transform: translateY(20px) scale(0.96);
}

.search-overlay-leave-to .bg-white {
  transform: translateY(-10px) scale(1.02);
}

.search-overlay-enter-active .bg-white,
.search-overlay-leave-active .bg-white {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
