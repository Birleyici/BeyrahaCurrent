<template>
    <div class="space-y-6">
        <!-- Welcome Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Hoş Geldiniz! 👋</h1>
                    <p class="text-blue-100 text-lg">
                        Beyraha Admin Paneline hoş geldiniz. İşletmenizi yönetmek için tüm araçlar burada.
                    </p>
                </div>
                <div class="hidden md:block">
                    <div class="text-right">
                        <p class="text-blue-100 text-sm">Bugün</p>
                        <p class="text-2xl font-bold">{{ currentDate }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Total Products -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Ürün</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalProducts }}</p>
                        <div class="flex items-center mt-2">
                            <Icon :name="stats.productGrowth >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'"
                                :class="stats.productGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="w-4 h-4 mr-1" />
                            <span :class="stats.productGrowth >= 0 ? 'text-green-600' : 'text-red-600'"
                                class="text-sm font-medium">
                                {{ Math.abs(stats.productGrowth) }}%
                            </span>
                            <span class="text-gray-500 dark:text-gray-400 text-sm ml-1">bu ay</span>
                        </div>
                    </div>
                    <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Icon name="mdi:package-variant" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <!-- Active Products -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif Ürün</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.activeProducts }}</p>
                        <div class="flex items-center mt-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span class="text-gray-500 dark:text-gray-400 text-sm">
                                {{ Math.round((stats.activeProducts / stats.totalProducts) * 100) }}% aktif
                            </span>
                        </div>
                    </div>
                    <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <Icon name="mdi:check-circle" class="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <!-- Draft Products -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Taslak Ürün</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.draftProducts }}</p>
                        <div class="flex items-center mt-2">
                            <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span class="text-gray-500 dark:text-gray-400 text-sm">
                                Yayınlanmayı bekliyor
                            </span>
                        </div>
                    </div>
                    <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                        <Icon name="mdi:file-document-edit" class="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                </div>
            </div>

            <!-- Total Orders -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Sipariş</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalOrders }}</p>
                        <div class="flex items-center mt-2">
                            <Icon :name="stats.orderGrowth >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'"
                                :class="stats.orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="w-4 h-4 mr-1" />
                            <span :class="stats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'"
                                class="text-sm font-medium">
                                {{ Math.abs(stats.orderGrowth) }}%
                            </span>
                            <span class="text-gray-500 dark:text-gray-400 text-sm ml-1">bu ay</span>
                        </div>
                    </div>
                    <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                        <Icon name="mdi:shopping" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Hızlı İşlemler</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <NuxtLink to="/management/urunler/yeni"
                    class="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-blue-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:plus" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Yeni Ürün</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Ürün ekle</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/urunler"
                    class="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-green-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:package-variant" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Ürünleri Yönet</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Düzenle & sil</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/siparisler"
                    class="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:shopping" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Siparişler</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Sipariş takibi</p>
                    </div>
                </NuxtLink>

                <button @click="refreshData" :disabled="isRefreshing"
                    class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group disabled:opacity-50">
                    <div
                        class="p-2 bg-gray-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:refresh" class="w-6 h-6 text-white" :class="{ 'animate-spin': isRefreshing }" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Verileri Yenile</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Güncel bilgiler</p>
                    </div>
                </button>
            </div>
        </div>

        <!-- Recent Activity & Product Status -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Products -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Son Eklenen Ürünler</h2>
                    <NuxtLink to="/management/urunler"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                        Tümünü Gör →
                    </NuxtLink>
                </div>

                <div class="space-y-4">
                    <div v-for="product in recentProducts" :key="product.id"
                        class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        <div
                            class="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-4 overflow-hidden">
                            <img v-if="product.image" :src="product.image" :alt="product.name"
                                class="w-full h-full object-cover" />
                            <Icon v-else name="mdi:image-outline" class="w-6 h-6 text-gray-400" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-medium text-gray-900 dark:text-white truncate">
                                {{ product.name || `Taslak ürün #${product.id}` }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ formatDate(product.created_at) }}
                            </p>
                        </div>
                        <UBadge
                            :color="product.status === 'active' ? 'green' : product.status === 'draft' ? 'yellow' : 'red'"
                            variant="soft" size="xs">
                            {{ getStatusLabel(product.status) }}
                        </UBadge>
                    </div>

                    <div v-if="recentProducts.length === 0" class="text-center py-8">
                        <Icon name="mdi:package-variant-closed" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p class="text-gray-600 dark:text-gray-400">Henüz ürün eklenmemiş</p>
                    </div>
                </div>
            </div>

            <!-- Product Status Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Ürün Durumu Dağılımı</h2>

                <div class="space-y-4">
                    <!-- Active Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                            <span class="text-gray-700 dark:text-gray-300">Aktif Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-gray-900 dark:text-white mr-2">{{
                                stats.activeProducts }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                ({{ Math.round((stats.activeProducts / stats.totalProducts) * 100) || 0 }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(stats.activeProducts / stats.totalProducts) * 100 || 0}%` }"></div>
                    </div>

                    <!-- Draft Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                            <span class="text-gray-700 dark:text-gray-300">Taslak Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-gray-900 dark:text-white mr-2">{{
                                stats.draftProducts }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                ({{ Math.round((stats.draftProducts / stats.totalProducts) * 100) || 0 }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(stats.draftProducts / stats.totalProducts) * 100 || 0}%` }"></div>
                    </div>

                    <!-- Inactive Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                            <span class="text-gray-700 dark:text-gray-300">Pasif Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-gray-900 dark:text-white mr-2">{{
                                stats.inactiveProducts }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                ({{ Math.round((stats.inactiveProducts / stats.totalProducts) * 100) || 0 }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(stats.inactiveProducts / stats.totalProducts) * 100 || 0}%` }"></div>
                    </div>
                </div>

                <div v-if="stats.totalProducts === 0" class="text-center py-8">
                    <Icon name="mdi:chart-pie" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p class="text-gray-600 dark:text-gray-400">Henüz analiz edilecek veri yok</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const productState = useProductState();
const { getVendorProducts } = useProductList();

// Reactive data
const isRefreshing = ref(false);

// Computed properties
const currentDate = computed(() => {
    return new Date().toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
});

const stats = computed(() => {
    const products = productState.vendorProducts || [];
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === 'active').length;
    const draftProducts = products.filter(p => p.status === 'draft').length;
    const inactiveProducts = products.filter(p => p.status === 'inactive').length;

    return {
        totalProducts,
        activeProducts,
        draftProducts,
        inactiveProducts,
        totalOrders: 0, // Bu değer gerçek sipariş verilerinden gelecek
        productGrowth: 12, // Bu değer gerçek büyüme verilerinden gelecek
        orderGrowth: 8 // Bu değer gerçek büyüme verilerinden gelecek
    };
});

const recentProducts = computed(() => {
    const products = [...(productState.vendorProducts || [])];
    return products
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
});

// Methods
const refreshData = async () => {
    isRefreshing.value = true;
    try {
        await getVendorProducts();
        // Diğer verileri de yenile
    } finally {
        isRefreshing.value = false;
    }
};

const getStatusLabel = (status) => {
    const labels = {
        active: 'Aktif',
        draft: 'Taslak',
        inactive: 'Pasif'
    };
    return labels[status] || status;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// Initialize data
await getVendorProducts();
</script>