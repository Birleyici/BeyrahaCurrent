export const useAdminReviews = () => {
    // State
    const reviews = ref([])
    const loading = ref(false)
    const pagination = ref({
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
    })
    const statistics = ref({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    })

    // Filters
    const filters = ref({
        status: '',
        rating: null,
        search: '',
        sort: 'recent'
    })

    // Computed
    const hasReviews = computed(() => reviews.value.length > 0)
    const canLoadMore = computed(() => pagination.value.current_page < pagination.value.last_page)

    // Methods
    const fetchReviews = async (page = 1) => {
        loading.value = true

        try {
            const params = {
                page,
                per_page: pagination.value.per_page,
                ...filters.value
            }

            // Null/undefined değerleri temizle
            Object.keys(params).forEach(key => {
                if (params[key] === null || params[key] === undefined || params[key] === '') {
                    delete params[key]
                }
            })

            const { data } = await useBaseOFetchWithAuth('admin/reviews', {
                params
            })

            console.log(data)

            if (page === 1) {
                reviews.value = data.reviews
            } else {
                reviews.value.push(...data.reviews)
            }

            pagination.value = data.pagination
            statistics.value = data.statistics

        } catch (error) {
            console.error('Admin reviews fetch error:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    const approveReview = async (reviewId) => {
        try {
            const { data } = await useBaseOFetchWithAuth(`admin/reviews/${reviewId}/approve`, {
                method: 'POST'
            })

            // Local state'i güncelle
            const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
            if (reviewIndex !== -1) {
                reviews.value[reviewIndex] = data.data
                statistics.value.pending--
                statistics.value.approved++
            }

            return data
        } catch (error) {
            console.error('Approve review error:', error)
            throw error
        }
    }

    const rejectReview = async (reviewId, reason = null) => {
        try {
            const { data } = await useBaseOFetchWithAuth(`admin/reviews/${reviewId}/reject`, {
                method: 'POST',
                body: { reason }
            })

            // Local state'i güncelle
            const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
            if (reviewIndex !== -1) {
                reviews.value[reviewIndex] = data.data
                statistics.value.pending--
                statistics.value.rejected++
            }

            return data
        } catch (error) {
            console.error('Reject review error:', error)
            throw error
        }
    }

    const deleteReview = async (reviewId) => {
        try {
            await useBaseOFetchWithAuth(`admin/reviews/${reviewId}`, {
                method: 'DELETE'
            })

            // Local state'den kaldır
            const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
            if (reviewIndex !== -1) {
                const review = reviews.value[reviewIndex]
                reviews.value.splice(reviewIndex, 1)
                
                // İstatistikleri güncelle
                statistics.value.total--
                if (review.status === 'pending') statistics.value.pending--
                else if (review.status === 'approved') statistics.value.approved--
                else if (review.status === 'rejected') statistics.value.rejected--
            }

        } catch (error) {
            console.error('Delete review error:', error)
            throw error
        }
    }

    const updateFilters = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    const loadMore = async () => {
        if (canLoadMore.value && !loading.value) {
            await fetchReviews(pagination.value.current_page + 1)
        }
    }

    const resetFilters = () => {
        filters.value = {
            status: '',
            rating: null,
            search: '',
            sort: 'recent'
        }
    }

    // Status labels
    const getStatusLabel = (status) => {
        const labels = {
            pending: 'Beklemede',
            approved: 'Onaylandı',
            rejected: 'Reddedildi'
        }
        return labels[status] || status
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'warning',
            approved: 'success',
            rejected: 'error'
        }
        return colors[status] || 'neutral'
    }

    return {
        // State
        reviews,
        loading,
        pagination,
        statistics,
        filters,

        // Computed
        hasReviews,
        canLoadMore,

        // Methods
        fetchReviews,
        approveReview,
        rejectReview,
        deleteReview,
        updateFilters,
        loadMore,
        resetFilters,
        getStatusLabel,
        getStatusColor
    }
} 