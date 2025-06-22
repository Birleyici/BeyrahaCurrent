export const useAdminStats = () => {
    
    // State
    const pendingReviewsCount = ref(0)
    const loading = ref(false)
    const error = ref(null)

    // Bekleyen yorum sayısını getir
    const fetchPendingReviewsCount = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await useBaseOFetchWithAuth('admin/reviews/pending-count')

            console.log(response)
            
            if (response.success) {
                pendingReviewsCount.value = response.data.pending_count
            }
        } catch (err) {
            console.error('Bekleyen yorum sayısı getirilemedi:', err)
            error.value = err.message || 'Bir hata oluştu'
            pendingReviewsCount.value = 0
        } finally {
            loading.value = false
        }
    }

    // Admin stats'ları başlat
    const initAdminStats = async () => {
        await fetchPendingReviewsCount()
    }

    return {
        // State
        pendingReviewsCount: readonly(pendingReviewsCount),
        loading: readonly(loading),
        error: readonly(error),

        // Methods
        fetchPendingReviewsCount,
        initAdminStats
    }
} 