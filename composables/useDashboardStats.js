import { useBaseOFetchWithAuth } from '~/composables/common/bases/useBaseOFetchWithAuth'

export const useDashboardStats = () => {
    const stats = ref({
        totalProducts: 0,
        activeProducts: 0,
        draftProducts: 0,
        inactiveProducts: 0,
        productGrowth: 0,
        totalOrders: 0,
        thisMonthOrders: 0,
        orderGrowth: 0,
        totalRevenue: 0,
        thisMonthRevenue: 0,
        revenueGrowth: 0,
        pendingOrders: 0,
    });

    const recentProducts = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchDashboardStats = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await useBaseOFetchWithAuth('/vendor/dashboard-stats', {
                method: 'GET'
            });

            if (response?.stats) {
                stats.value = response.stats;
            }
            
            if (response?.recentProducts) {
                recentProducts.value = response.recentProducts;
            }

        } catch (err) {
            error.value = err.message || 'Dashboard istatistikleri alınırken bir hata oluştu';
            console.error('Dashboard stats error:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        stats: readonly(stats),
        recentProducts: readonly(recentProducts),
        loading: readonly(loading),
        error: readonly(error),
        fetchDashboardStats,
    };
}; 