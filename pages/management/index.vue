<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Dashboard" description="Genel bakış ve istatistikler"
            :breadcrumb-links="breadcrumbLinks" />

        <!-- İstatistik Kartları -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Total Products -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Ürün</p>
                        <p class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            dashboardStats.totalProducts }}
                        </p>
                        <div class="flex items-center mt-2">
                            <Icon :name="dashboardStats.productGrowth >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'"
                                :class="dashboardStats.productGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="w-4 h-4 mr-1" />
                            <span :class="dashboardStats.productGrowth >= 0 ? 'text-green-600' : 'text-red-600'"
                                class="text-sm font-medium">
                                {{ Math.abs(dashboardStats.productGrowth) }}%
                            </span>
                            <span class="text-neutral-500 dark:text-neutral-400 text-sm ml-1">bu ay</span>
                        </div>
                    </div>
                    <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Icon name="mdi:package-variant" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <!-- Active Products -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Aktif Ürün</p>
                        <p class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            dashboardStats.activeProducts }}
                        </p>
                        <div class="flex items-center mt-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                                {{ Math.round((dashboardStats.activeProducts / dashboardStats.totalProducts) * 100) || 0
                                }}% aktif
                            </span>
                        </div>
                    </div>
                    <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <Icon name="mdi:check-circle" class="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <!-- Total Orders -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Sipariş</p>
                        <p class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            dashboardStats.totalOrders }}</p>
                        <div class="flex items-center mt-2">
                            <Icon :name="dashboardStats.orderGrowth >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'"
                                :class="dashboardStats.orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="w-4 h-4 mr-1" />
                            <span :class="dashboardStats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'"
                                class="text-sm font-medium">
                                {{ Math.abs(dashboardStats.orderGrowth) }}%
                            </span>
                            <span class="text-neutral-500 dark:text-neutral-400 text-sm ml-1">bu ay</span>
                        </div>
                    </div>
                    <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                        <Icon name="mdi:shopping" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            <!-- Total Revenue -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Gelir</p>
                        <p class="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            formatCurrency(dashboardStats.totalRevenue) }}</p>
                        <div class="flex items-center mt-2">
                            <Icon :name="dashboardStats.revenueGrowth >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'"
                                :class="dashboardStats.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="w-4 h-4 mr-1" />
                            <span :class="dashboardStats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'"
                                class="text-sm font-medium">
                                {{ Math.abs(dashboardStats.revenueGrowth) }}%
                            </span>
                            <span class="text-neutral-500 dark:text-neutral-400 text-sm ml-1">bu ay</span>
                        </div>
                    </div>
                    <div class="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                        <Icon name="mdi:currency-try" class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Aylık İstatistikler -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Bu Ay Siparişler -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bu Ay Siparişler</p>
                        <p class="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            dashboardStats.thisMonthOrders }}</p>
                    </div>
                    <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Icon name="mdi:calendar-month" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <!-- Bu Ay Gelir -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bu Ay Gelir</p>
                        <p class="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            formatCurrency(dashboardStats.thisMonthRevenue) }}</p>
                    </div>
                    <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <Icon name="mdi:chart-line" class="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <!-- Bekleyen Siparişler -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bekleyen Siparişler</p>
                        <p class="text-2xl font-bold text-neutral-900 dark:text-white mt-2">{{
                            dashboardStats.pendingOrders }}</p>
                    </div>
                    <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                        <Icon name="mdi:clock-outline" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6">Hızlı İşlemler</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <NuxtLink to="/management/urunler/yeni"
                    class="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-blue-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:plus" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Yeni Ürün</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Ürün ekle</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/urunler"
                    class="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-green-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:package-variant" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Ürünleri Yönet</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Düzenle & sil</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/siparisler"
                    class="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:shopping" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Siparişler</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Sipariş takibi</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/kuponlar"
                    class="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-orange-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:ticket-percent" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Kupon Yönetimi</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">İndirim kuponları</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/management/yorumlar"
                    class="flex items-center p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200 group">
                    <div
                        class="p-2 bg-secondary-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:comment-multiple" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Yorum Yönetimi</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Yorumları incele</p>
                    </div>
                </NuxtLink>

                <button @click="refreshData" :disabled="isRefreshing"
                    class="flex items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200 group disabled:opacity-50">
                    <div
                        class="p-2 bg-neutral-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon name="mdi:refresh" class="w-6 h-6 text-white" :class="{ 'animate-spin': isRefreshing }" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-neutral-900 dark:text-white">Verileri Yenile</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Güncel bilgiler</p>
                    </div>
                </button>
            </div>
        </div>

        <!-- Recent Activity & Product Status -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Products -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Son Eklenen Ürünler</h2>
                    <NuxtLink to="/management/urunler"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                        Tümünü Gör →
                    </NuxtLink>
                </div>

                <div class="space-y-4">
                    <div v-for="product in recentProducts" :key="product.id"
                        class="flex items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200">
                        <div
                            class="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center mr-4 overflow-hidden">
                            <!-- Renk niteliği olan ürünlerde renk görselleri -->
                            <div v-if="product.has_color_attribute && product.colorImages?.length > 0"
                                class="w-full h-full">
                                <div class="grid grid-cols-2 gap-0.5 w-full h-full p-1">
                                    <div v-for="(colorImage, index) in product.colorImages.slice(0, 4)" :key="index"
                                        class="relative rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-600"
                                        :class="{
                                            'col-span-2': product.colorImages.length === 1,
                                            'w-full h-full': product.colorImages.length <= 4
                                        }">
                                        <NuxtImg :src="'cl/' + colorImage.image_path" :alt="colorImage.color_name"
                                            class="w-full h-full object-cover" format="webp" quality="90" />
                                    </div>
                                    <!-- Fazla renk göstergesi -->
                                    <div v-if="product.colorImages.length > 4"
                                        class="absolute bottom-0 right-0 w-4 h-4 bg-neutral-800/80 text-white text-[8px] flex items-center justify-center rounded-full">
                                        +{{ product.colorImages.length - 4 }}
                                    </div>
                                </div>
                            </div>
                            <!-- Normal ürün görseli -->
                            <div v-else class="w-full h-full">
                                <template v-if="getProductImagePath(product)">
                                    <NuxtImg :src="'cl/' + getProductImagePath(product)" :alt="product.name"
                                        class="w-full h-full object-cover" format="webp" quality="90" />
                                </template>
                                <template v-else>
                                    <NuxtImg :src="'cl/' + 'edb26c39-166b-465f-780d-e930fa903900/public'"
                                        :alt="product.name || 'Varsayılan görsel'" class="w-full h-full object-cover"
                                        format="webp" quality="90" />
                                </template>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-medium text-neutral-900 dark:text-white truncate">
                                {{ product.name || `Taslak ürün #${product.id}` }}
                            </h3>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
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
                        <Icon name="mdi:package-variant-closed" class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                        <p class="text-neutral-600 dark:text-neutral-400">Henüz ürün eklenmemiş</p>
                    </div>
                </div>
            </div>

            <!-- Product Status Chart -->
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6">Ürün Durumu Dağılımı</h2>

                <div class="space-y-4">
                    <!-- Active Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                            <span class="text-neutral-700 dark:text-neutral-300">Aktif Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-neutral-900 dark:text-white mr-2">{{
                                dashboardStats.activeProducts }}</span>
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">
                                ({{ Math.round((dashboardStats.activeProducts / dashboardStats.totalProducts) * 100) ||
                                    0 }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(dashboardStats.activeProducts / dashboardStats.totalProducts) * 100 || 0}%` }">
                        </div>
                    </div>

                    <!-- Draft Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                            <span class="text-neutral-700 dark:text-neutral-300">Taslak Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-neutral-900 dark:text-white mr-2">{{
                                dashboardStats.draftProducts }}</span>
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">
                                ({{ Math.round((dashboardStats.draftProducts / dashboardStats.totalProducts) * 100) || 0
                                }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(dashboardStats.draftProducts / dashboardStats.totalProducts) * 100 || 0}%` }">
                        </div>
                    </div>

                    <!-- Inactive Products -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                            <span class="text-neutral-700 dark:text-neutral-300">Pasif Ürünler</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-semibold text-neutral-900 dark:text-white mr-2">{{
                                dashboardStats.inactiveProducts }}</span>
                            <span class="text-sm text-neutral-500 dark:text-neutral-400">
                                ({{ Math.round((dashboardStats.inactiveProducts / dashboardStats.totalProducts) * 100)
                                    || 0 }}%)
                            </span>
                        </div>
                    </div>
                    <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full transition-all duration-500"
                            :style="{ width: `${(dashboardStats.inactiveProducts / dashboardStats.totalProducts) * 100 || 0}%` }">
                        </div>
                    </div>
                </div>

                <div v-if="dashboardStats.totalProducts === 0" class="text-center py-8">
                    <Icon name="mdi:chart-pie" class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <p class="text-neutral-600 dark:text-neutral-400">Henüz analiz edilecek veri yok</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// SEO ayarları
useHead({
    title: 'Dashboard - Beyraha Admin',
    meta: [
        { name: 'description', content: 'Beyraha admin panel dashboard sayfası' }
    ]
})

// Breadcrumb links
const breadcrumbLinks = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home'
    }
];

definePageMeta({
    layout: "admin",
});

// Dashboard Stats Composable
const { stats: dashboardStats, recentProducts, loading, error, fetchDashboardStats } = useDashboardStats();

// Reactive data
const isRefreshing = ref(false);

// Methods
const refreshData = async () => {
    isRefreshing.value = true;
    try {
        await fetchDashboardStats();
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

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(amount || 0);
};

const getProductImagePath = (product) => {
    // Önce cover image'i kontrol et
    if (product.coverImage?.path || product.cover_image?.path) {
        return product.coverImage?.path || product.cover_image?.path;
    }
    // Sonra oldest image'i kontrol et
    else if (product.oldestImage?.image?.path || product.oldest_image?.image?.path) {
        return product.oldestImage?.image?.path || product.oldest_image?.image?.path;
    }
    // API'den gelen image field'ini kontrol et
    else if (product.image) {
        return product.image;
    }
    // Eğer renk niteliği varsa ilk renk görseli
    else if (product.has_color_attribute && product.colorImages?.length > 0) {
        return product.colorImages[0].image_path;
    }
    // Hiçbiri yoksa null döndür
    return null;
};

// Initialize data
await fetchDashboardStats();
</script>