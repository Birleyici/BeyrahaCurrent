<template>
    <div class="max-h-[400px] overflow-y-auto scrollbar-stable">
        <!-- Loading State -->
        <div class="relative">
            <Transition name="search-content" mode="out-in">
                <!-- Results (Priority: Keep showing if exists) -->
                <div v-if="products.length > 0" key="results"
                    class="divide-y divide-neutral-100 dark:divide-neutral-700 relative">
                    <!-- Search Info -->
                    <div
                        class="p-3 bg-neutral-50/50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-700 transition-colors duration-300">
                        <p
                            class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center transition-colors duration-300">
                            <UIcon name="i-heroicons-check-circle"
                                class="w-3 h-3 text-green-500 dark:text-green-400 mr-1.5" />
                            <span class="font-medium text-neutral-700 dark:text-neutral-300">{{ products.length }}
                                &nbsp;</span>

                            ürün
                            bulundu
                            <span v-if="searchWord" class="ml-1">
                                "<span class="font-medium text-secondary-600 dark:text-secondary-400">{{ searchWord
                                }}</span>"
                                için
                            </span>
                        </p>
                    </div>

                    <!-- Product Results -->
                    <div class="p-2">
                        <TransitionGroup name="product" tag="div" class="space-y-1">
                            <NuxtLink v-for="(product, index) in products.slice(0, 6)" :key="product.id"
                                :to="product.product_url" @click="$emit('product-click', product)"
                                class="group flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150"
                                :style="{ '--stagger-delay': `${index * 50}ms` }">
                                <!-- Product Image -->
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden transition-colors duration-300">
                                        <NuxtImg v-if="product.coverImage" :src="`cl/${product.coverImage}`"
                                            :alt="product.name"
                                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            width="40" height="40" />
                                        <div v-else class="w-full h-full flex items-center justify-center">
                                            <UIcon name="i-heroicons-photo"
                                                class="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Product Info -->
                                <div class="flex-1 min-w-0">
                                    <h4
                                        class="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-150 line-clamp-1">
                                        {{ product.name }}
                                    </h4>
                                    <div class="flex items-center justify-between mt-0.5">
                                        <div class="text-sm">
                                            <PartialsProductPrice type="card" :price="product.price"
                                                :sale-price="product.sale_price" :display-price="product.display_price"
                                                :is-variation-product="product.is_variation_product"
                                                :has-price-range="product.has_price_range" />
                                        </div>
                                        <UIcon name="i-heroicons-arrow-right"
                                            class="w-3 h-3 text-neutral-400 dark:text-neutral-500 group-hover:text-secondary-500 dark:group-hover:text-secondary-400 group-hover:translate-x-0.5 transition-all duration-150" />
                                    </div>
                                </div>
                            </NuxtLink>
                        </TransitionGroup>

                        <!-- View All Button -->
                        <Transition name="view-all">
                            <div v-if="products.length > 6"
                                class="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700 transition-colors duration-300">
                                <button @click="$emit('view-all')"
                                    class="w-full py-2 px-3 bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-500 text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center space-x-1.5">
                                    <span>Tüm {{ products.length }} sonucu gör</span>
                                    <UIcon name="i-heroicons-arrow-right" class="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </Transition>
                    </div>

                    <!-- Loading Overlay when previous results exist -->
                    <Transition name="loading-overlay">
                        <div v-if="isSearching"
                            class="absolute inset-0 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center z-10">
                            <div
                                class="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
                                <UIcon name="i-heroicons-arrow-path"
                                    class="w-4 h-4 text-secondary-500 dark:text-secondary-400 animate-spin" />
                                <span class="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                                    Aranıyor...
                                </span>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Typing State -->
                <div v-else-if="isTyping && !isSearching" key="typing" class="p-6">
                    <div class="flex flex-col items-center justify-center space-y-3">
                        <div class="typing-dots-large">
                            <div class="typing-dot-large !bg-orange-500"></div>
                            <div class="typing-dot-large !bg-orange-500"></div>
                            <div class="typing-dot-large !bg-orange-500"></div>
                        </div>

                    </div>
                </div>

                <!-- Loading State -->
                <div v-else-if="isSearching" key="loading" class="p-4">
                    <div class="space-y-3">
                        <!-- Loading Header -->
                        <div class="flex items-center justify-center space-x-2 mb-4">
                            <UIcon name="i-heroicons-arrow-path"
                                class="w-4 h-4 text-secondary-500 dark:text-secondary-400 animate-spin" />
                            <span
                                class="text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300">Aranıyor...</span>
                        </div>

                        <!-- Loading Skeleton -->
                        <div class="space-y-2">
                            <TransitionGroup name="skeleton" tag="div">
                                <div v-for="i in 3" :key="`skeleton-${i}`" class="flex items-center space-x-3 p-2"
                                    :style="{ '--stagger-delay': `${(i - 1) * 80}ms` }">
                                    <!-- Image Skeleton -->
                                    <div
                                        class="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse transition-colors duration-300">
                                    </div>

                                    <!-- Content Skeleton -->
                                    <div class="flex-1 space-y-1">
                                        <div class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse transition-colors duration-300"
                                            :style="{ width: Math.random() * 40 + 60 + '%' }"></div>
                                        <div class="h-2 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse transition-colors duration-300"
                                            :style="{ width: Math.random() * 30 + 40 + '%' }"></div>
                                    </div>

                                    <!-- Price Skeleton -->
                                    <div
                                        class="w-12 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse transition-colors duration-300">
                                    </div>
                                </div>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>

                <!-- No Results -->
                <div v-else-if="!isSearching && searchWord && products.length === 0" key="no-results"
                    class="p-6 text-center">
                    <div class="flex flex-col items-center space-y-4">
                        <div
                            class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center transition-colors duration-300">
                            <UIcon name="i-heroicons-magnifying-glass"
                                class="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                        </div>
                        <div>
                            <h3
                                class="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                                Sonuç bulunamadı</h3>
                            <p class="text-neutral-500 dark:text-neutral-400 text-sm transition-colors duration-300">
                                "<span class="font-medium text-secondary-600 dark:text-secondary-400">{{ searchWord
                                    }}</span>"
                                için sonuç bulunamadı.
                            </p>
                        </div>

                        <!-- Search Suggestions -->
                        <div class="mt-4 w-full">
                            <p
                                class="text-xs text-neutral-500 dark:text-neutral-400 mb-3 transition-colors duration-300">
                                Bunları deneyebilirsiniz:</p>
                            <div class="flex flex-wrap gap-2 justify-center">
                                <TransitionGroup name="suggestion" tag="div"
                                    class="flex flex-wrap gap-2 justify-center">
                                    <button v-for="(suggestion, index) in searchSuggestions" :key="suggestion"
                                        @click="$emit('suggestion-click', suggestion)"
                                        class="px-2.5 py-1 text-xs bg-neutral-50 dark:bg-neutral-700 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 text-neutral-600 dark:text-neutral-300 hover:text-secondary-600 dark:hover:text-secondary-400 rounded-md transition-colors duration-150 border border-neutral-200/60 dark:border-neutral-600/60 hover:border-secondary-200 dark:hover:border-secondary-600"
                                        :style="{ '--stagger-delay': `${index * 40}ms` }">
                                        {{ suggestion }}
                                    </button>
                                </TransitionGroup>
                            </div>
                        </div>
                    </div>
                </div>



                <!-- Empty State -->
                <div v-else-if="!searchWord" key="empty" class="p-6 text-center">
                    <div class="flex flex-col items-center space-y-4">
                        <div
                            class="w-12 h-12 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center transition-colors duration-300">
                            <UIcon name="i-heroicons-magnifying-glass"
                                class="w-6 h-6 text-secondary-500 dark:text-secondary-400" />
                        </div>
                        <div>
                            <h3
                                class="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                                Ürün Arayın</h3>
                            <p class="text-neutral-500 dark:text-neutral-400 text-sm transition-colors duration-300">
                                Aradığınız ürünün adını yazarak başlayın
                            </p>
                        </div>

                        <!-- Popular Categories -->
                        <div class="mt-4 w-full">
                            <p
                                class="text-xs text-neutral-500 dark:text-neutral-400 mb-3 flex items-center justify-center transition-colors duration-300">
                                <UIcon name="i-heroicons-star" class="w-3 h-3 text-orange-400 mr-1" />
                                Popüler Kategoriler:
                            </p>
                            <TransitionGroup name="category" tag="div" class="grid grid-cols-2 gap-2">
                                <button v-for="(category, index) in popularCategories" :key="category.id"
                                    @click="$emit('category-click', category)"
                                    class="flex items-center space-x-2 p-2 bg-neutral-50 dark:bg-neutral-700 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 rounded-lg transition-colors duration-150 text-left border border-neutral-200/60 dark:border-neutral-600/60 hover:border-secondary-200 dark:hover:border-secondary-600"
                                    :style="{ '--stagger-delay': `${index * 70}ms` }">
                                    <div
                                        class="w-6 h-6 bg-white dark:bg-neutral-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                                        <UIcon :name="category.icon"
                                            class="w-3 h-3 text-secondary-500 dark:text-secondary-400" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <span
                                            class="text-xs font-medium text-neutral-600 dark:text-neutral-300 block truncate">{{
                                                category.name }}</span>
                                    </div>
                                </button>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    products: {
        type: Array,
        default: () => []
    },
    isSearching: {
        type: Boolean,
        default: false
    },
    isTyping: {
        type: Boolean,
        default: false
    },
    searchWord: {
        type: String,
        default: ''
    }
})

const emit = defineEmits([
    'product-click',
    'view-all',
    'suggestion-click',
    'category-click'
])

// Popüler kategoriler için composable kullan
const { popularCategories, fetchPopularCategories } = useCategoriesPopular()

// Gerçek verilerle arama önerileri
const searchSuggestions = computed(() => {
    return popularCategories.value.map(cat => cat.name).slice(0, 4)
})

// Component mount olduğunda popüler kategorileri getir
onMounted(async () => {
    await fetchPopularCategories(4)
    console.log('PartialsCommonSearchResults - Popüler kategoriler yüklendi:', popularCategories.value)
})
</script>

<style scoped>
/* Main Content Transitions */
.search-content-enter-active,
.search-content-leave-active {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-content-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.search-content-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* Product List Transitions */
.product-enter-active {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--stagger-delay, 0ms);
}

.product-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.product-enter-from {
    opacity: 0;
    transform: translateX(-12px) translateY(4px);
}

.product-leave-to {
    opacity: 0;
    transform: translateX(8px) translateY(-2px);
}

.product-move {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Skeleton Transitions */
.skeleton-enter-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--stagger-delay, 0ms);
}

.skeleton-enter-from {
    opacity: 0;
    transform: translateY(6px) scale(0.97);
}

/* Suggestion Transitions */
.suggestion-enter-active {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--stagger-delay, 0ms);
}

.suggestion-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(4px);
}

/* Category Transitions */
.category-enter-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--stagger-delay, 0ms);
}

.category-enter-from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
}

/* View All Button */
.view-all-enter-active,
.view-all-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.view-all-enter-from,
.view-all-leave-to {
    opacity: 0;
    transform: translateY(4px);
}

/* Stable Scrollbar - prevents layout shift */
.scrollbar-stable {
    scrollbar-gutter: stable;
}

/* Custom Scrollbar Styling */
.scrollbar-stable::-webkit-scrollbar {
    width: 6px;
}

.scrollbar-stable::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-stable::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 3px;
    transition: all 0.3s ease;
}

.scrollbar-stable::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
}

/* Dark mode scrollbar */
.dark .scrollbar-stable::-webkit-scrollbar-thumb {
    background: rgba(209, 213, 219, 0.2);
}

.dark .scrollbar-stable::-webkit-scrollbar-thumb:hover {
    background: rgba(209, 213, 219, 0.3);
}

/* Firefox scrollbar */
.scrollbar-stable {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.dark .scrollbar-stable {
    scrollbar-color: rgba(209, 213, 219, 0.2) transparent;
}

/* Modern Large Typing Dots Animation */
.typing-dots-large {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
}

.typing-dot-large {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: typing-bounce-large 1.4s infinite ease-in-out;
}

.typing-dot-large:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-dot-large:nth-child(2) {
    animation-delay: -0.16s;
}

.typing-dot-large:nth-child(3) {
    animation-delay: 0s;
}

@keyframes typing-bounce-large {

    0%,
    80%,
    100% {
        transform: scale(0.6) translateY(0);
        opacity: 0.4;
    }

    40% {
        transform: scale(1.3) translateY(-2px);
        opacity: 1;
    }
}

/* Dark mode large typing dots */
.dark .typing-dot-large {
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
}

/* Loading Overlay Transitions */
.loading-overlay-enter-active,
.loading-overlay-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.loading-overlay-enter-from,
.loading-overlay-leave-to {
    opacity: 0;
}

.loading-overlay-enter-from>div,
.loading-overlay-leave-to>div {
    transform: scale(0.9) translateY(4px);
}

.loading-overlay-enter-active>div,
.loading-overlay-leave-active>div {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>