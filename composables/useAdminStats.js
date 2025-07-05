export const useAdminStats = () => {
    
    // State
    const pendingReviewsCount = ref(0)
    const pendingQuestionsCount = ref(0)
    const pendingOrdersCount = ref(0)
    const loading = ref(false)
    const error = ref(null)

    // Bekleyen yorum sayısını getir
    const fetchPendingReviewsCount = async () => {
        try {
            const response = await useBaseOFetchWithAuth('admin/reviews/pending-count')
            
            if (response.success) {
                pendingReviewsCount.value = response.data.pending_count
            }
        } catch (err) {
            console.error('Bekleyen yorum sayısı getirilemedi:', err)
            pendingReviewsCount.value = 0
        }
    }

    // Bekleyen soru sayısını getir
    const fetchPendingQuestionsCount = async () => {
        try {
            const response = await useBaseOFetchWithAuth('admin/questions/statistics')
            
            if (response.success) {
                pendingQuestionsCount.value = response.data.pending_questions + response.data.pending_answers
            }
        } catch (err) {
            console.error('Bekleyen soru sayısı getirilemedi:', err)
            pendingQuestionsCount.value = 0
        }
    }

    // Bekleyen sipariş sayısını getir
    const fetchPendingOrdersCount = async () => {
        try {
            const response = await useBaseOFetchWithAuth('admin/orders/statistics')
            
            if (response.success) {
                // Sadece pending sub orders'ı al
                pendingOrdersCount.value = response.data.pending_sub_orders
            }
        } catch (err) {
            console.error('Bekleyen sipariş sayısı getirilemedi:', err)
            pendingOrdersCount.value = 0
        }
    }

    // Tüm admin stats'ları getir
    const fetchAllStats = async () => {
        try {
            loading.value = true
            error.value = null

            // Tüm statistics'leri paralel olarak çek
            await Promise.all([
                fetchPendingReviewsCount(),
                fetchPendingQuestionsCount(),
                fetchPendingOrdersCount()
            ])
        } catch (err) {
            console.error('Admin stats getirilemedi:', err)
            error.value = err.message || 'Bir hata oluştu'
        } finally {
            loading.value = false
        }
    }

    // Admin stats'ları başlat
    const initAdminStats = async () => {
        await fetchAllStats()
    }

    // Belirli bir stat'ı yenile
    const refreshStat = async (statType) => {
        switch (statType) {
            case 'reviews':
                await fetchPendingReviewsCount()
                break
            case 'questions':
                await fetchPendingQuestionsCount()
                break
            case 'orders':
                await fetchPendingOrdersCount()
                break
            default:
                await fetchAllStats()
        }
    }

    return {
        // State
        pendingReviewsCount: readonly(pendingReviewsCount),
        pendingQuestionsCount: readonly(pendingQuestionsCount),
        pendingOrdersCount: readonly(pendingOrdersCount),
        loading: readonly(loading),
        error: readonly(error),

        // Methods
        fetchPendingReviewsCount,
        fetchPendingQuestionsCount,
        fetchPendingOrdersCount,
        fetchAllStats,
        initAdminStats,
        refreshStat
    }
} 