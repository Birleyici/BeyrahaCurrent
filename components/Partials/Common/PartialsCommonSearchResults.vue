<template>
    <div class="max-h-[400px] overflow-y-auto">
        <!-- Loading State -->
        <div v-if="isSearching" class="p-4">
            <div class="space-y-3">
                <!-- Loading Header -->
                <div class="flex items-center justify-center space-x-2 mb-4">
                    <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-secondary-500 animate-spin" />
                    <span class="text-sm text-neutral-600">Aranıyor...</span>
                </div>

                <!-- Loading Skeleton -->
                <div class="space-y-2">
                    <div v-for="i in 3" :key="i" class="flex items-center space-x-3 p-2">
                        <!-- Image Skeleton -->
                        <div class="w-10 h-10 bg-neutral-200 rounded-lg animate-pulse"></div>

                        <!-- Content Skeleton -->
                        <div class="flex-1 space-y-1">
                            <div class="h-3 bg-neutral-200 rounded animate-pulse"
                                :style="{ width: Math.random() * 40 + 60 + '%' }"></div>
                            <div class="h-2 bg-neutral-200 rounded animate-pulse"
                                :style="{ width: Math.random() * 30 + 40 + '%' }"></div>
                        </div>

                        <!-- Price Skeleton -->
                        <div class="w-12 h-3 bg-neutral-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results -->
        <div v-else-if="!isSearching && searchWord && products.length === 0" class="p-6 text-center">
            <div class="flex flex-col items-center space-y-4">
                <div class="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                    <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 text-neutral-400" />
                </div>
                <div>
                    <h3 class="text-base font-medium text-neutral-900 mb-2">Sonuç bulunamadı</h3>
                    <p class="text-neutral-500 text-sm">
                        "<span class="font-medium text-secondary-600">{{ searchWord }}</span>" için sonuç bulunamadı.
                    </p>
                </div>

                <!-- Search Suggestions -->
                <div class="mt-4 w-full">
                    <p class="text-xs text-neutral-500 mb-3">Bunları deneyebilirsiniz:</p>
                    <div class="flex flex-wrap gap-2 justify-center">
                        <button v-for="suggestion in searchSuggestions" :key="suggestion"
                            @click="$emit('suggestion-click', suggestion)"
                            class="px-2.5 py-1 text-xs bg-neutral-50 hover:bg-secondary-50 text-neutral-600 hover:text-secondary-600 rounded-md transition-colors duration-150 border border-neutral-200/60">
                            {{ suggestion }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Results -->
        <div v-else-if="!isSearching && products.length > 0" class="divide-y divide-neutral-100">
            <!-- Search Info -->
            <div class="p-3 bg-neutral-50/50 border-b border-neutral-100">
                <p class="text-xs text-neutral-500 flex items-center">
                    <UIcon name="i-heroicons-check-circle" class="w-3 h-3 text-green-500 mr-1.5" />
                    <span class="font-medium text-neutral-700">{{ products.length }}</span> ürün bulundu
                    <span v-if="searchWord" class="ml-1">
                        "<span class="font-medium text-secondary-600">{{ searchWord }}</span>" için
                    </span>
                </p>
            </div>

            <!-- Product Results -->
            <div class="p-2">
                <div class="space-y-1">
                    <NuxtLink v-for="product in products.slice(0, 6)" :key="product.id" :to="product.product_url"
                        @click="$emit('product-click', product)"
                        class="group flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors duration-150">
                        <!-- Product Image -->
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-neutral-100 rounded-lg overflow-hidden">
                                <NuxtImg v-if="product.coverImage" :src="`cl/${product.coverImage}`" :alt="product.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    width="40" height="40" />
                                <div v-else class="w-full h-full flex items-center justify-center">
                                    <UIcon name="i-heroicons-photo" class="w-4 h-4 text-neutral-400" />
                                </div>
                            </div>
                        </div>

                        <!-- Product Info -->
                        <div class="flex-1 min-w-0">
                            <h4
                                class="text-sm font-medium text-neutral-900 group-hover:text-secondary-600 transition-colors duration-150 line-clamp-1">
                                {{ product.name }}
                            </h4>
                            <div class="flex items-center justify-between mt-0.5">
                                <p class="text-sm font-semibold text-secondary-600">
                                    {{ formatPrice(product.price) }}
                                </p>
                                <UIcon name="i-heroicons-arrow-right"
                                    class="w-3 h-3 text-neutral-400 group-hover:text-secondary-500 group-hover:translate-x-0.5 transition-all duration-150" />
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- View All Button -->
                <div v-if="products.length > 6" class="mt-3 pt-3 border-t border-neutral-100">
                    <button @click="$emit('view-all')"
                        class="w-full py-2 px-3 bg-secondary-500 hover:bg-secondary-600 text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center space-x-1.5">
                        <span>Tüm {{ products.length }} sonucu gör</span>
                        <UIcon name="i-heroicons-arrow-right" class="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!searchWord" class="p-6 text-center">
            <div class="flex flex-col items-center space-y-4">
                <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6 text-secondary-500" />
                </div>
                <div>
                    <h3 class="text-base font-medium text-neutral-900 mb-2">Ürün Arayın</h3>
                    <p class="text-neutral-500 text-sm">
                        Aradığınız ürünün adını yazarak başlayın
                    </p>
                </div>

                <!-- Popular Categories -->
                <div class="mt-4 w-full">
                    <p class="text-xs text-neutral-500 mb-3 flex items-center justify-center">
                        <UIcon name="i-heroicons-star" class="w-3 h-3 text-orange-400 mr-1" />
                        Popüler Kategoriler:
                    </p>
                    <div class="grid grid-cols-2 gap-2">
                        <button v-for="category in popularCategories" :key="category.name"
                            @click="$emit('category-click', category)"
                            class="flex items-center space-x-2 p-2 bg-neutral-50 hover:bg-secondary-50 rounded-lg transition-colors duration-150 text-left border border-neutral-200/60 hover:border-secondary-200">
                            <div class="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <UIcon :name="category.icon" class="w-3 h-3 text-secondary-500" />
                            </div>
                            <span class="text-xs font-medium text-neutral-600">{{ category.name }}</span>
                        </button>
                    </div>
                </div>
            </div>
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

const searchSuggestions = [
    'Tesettür Elbise',
    'Başörtüsü',
    'Tunik',
    'Pantolon'
]

const popularCategories = [
    { name: 'Elbise', icon: 'i-heroicons-sparkles' },
    { name: 'Başörtüsü', icon: 'i-heroicons-heart' },
    { name: 'Tunik', icon: 'i-heroicons-star' },
    { name: 'Pantolon', icon: 'i-heroicons-fire' }
]
</script>