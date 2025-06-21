import { ref, computed } from 'vue'

export const useProductReviews = () => {
  const reviews = ref([])
  const reviewStats = ref({
    average_rating: 0,
    total_reviews: 0,
    rating_distribution: {}
  })
  const loading = ref(false)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  })

  // Filters
  const filters = ref({
    rating: null,
    sort: 'recent',
    verified_only: false,
    with_images: false,
    page: 1,
    per_page: 10
  })

  // Computed
  const hasReviews = computed(() => reviews.value.length > 0)
  const averageRatingFormatted = computed(() => {
    return Math.round(reviewStats.value.average_rating * 10) / 10
  })

  // Methods
  const fetchReviews = async (productId, options = {}) => {
    loading.value = true
    
    try {
      const params = {
        ...filters.value,
        ...options
      }

      // Null/undefined değerleri temizle
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key]
        } else if (typeof params[key] === 'boolean') {
          // Boolean değerleri 0/1'e dönüştür
          params[key] = params[key] ? 1 : 0
        }
      })

      const response = await useBaseOFetch(`products/${productId}/reviews`, {
        params
      })

      if (response.success) {
        if (params.page === 1) {
          reviews.value = response.data.reviews
        } else {
          reviews.value.push(...response.data.reviews)
        }
        
        pagination.value = response.data.pagination
        reviewStats.value = response.data.statistics
      }

      return response
    } catch (error) {
      console.error('Reviews fetch error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const submitReview = async (productId, reviewData) => {
    try {
      const formData = new FormData()
      formData.append('comment', reviewData.comment)
      formData.append('rating', reviewData.rating)
      
      if (reviewData.images && reviewData.images.length > 0) {
        reviewData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image)
        })
      }

      const response = await useBaseOFetchWithAuth(`products/${productId}/reviews`, {
        method: 'POST',
        body: formData
      })

      return response
    } catch (error) {
      console.error('Review submit error:', error)
      throw error
    }
  }

  const voteReview = async (reviewId, isHelpful) => {
    try {
      const response = await useBaseOFetchWithAuth(`reviews/${reviewId}/vote`, {
        method: 'POST',
        body: {
          is_helpful: isHelpful
        }
      })

      if (response.success) {
        // Update local review data
        const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
        if (reviewIndex !== -1) {
          reviews.value[reviewIndex].helpful_count = response.data.helpful_count
          reviews.value[reviewIndex].not_helpful_count = response.data.not_helpful_count
          reviews.value[reviewIndex].helpful_percentage = response.data.helpful_percentage
          reviews.value[reviewIndex].user_vote = response.data.user_vote
        }
      }

      return response
    } catch (error) {
      console.error('Review vote error:', error)
      throw error
    }
  }

  const addVendorReply = async (reviewId, reply) => {
    try {
      const response = await useBaseOFetchWithAuth(`reviews/${reviewId}/vendor-reply`, {
        method: 'POST',
        body: {
          reply
        }
      })

      if (response.success) {
        // Update local review data
        const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
        if (reviewIndex !== -1) {
          reviews.value[reviewIndex].vendor_reply = response.data.vendor_reply
          reviews.value[reviewIndex].vendor_replied_at = response.data.vendor_replied_at
        }
      }

      return response
    } catch (error) {
      console.error('Vendor reply error:', error)
      throw error
    }
  }

  const getReviewableProducts = async () => {
    try {
      const response = await useBaseOFetchWithAuth('reviews/reviewable-products')
      return response
    } catch (error) {
      console.error('Reviewable products error:', error)
      throw error
    }
  }

  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      rating: null,
      sort: 'recent',
      verified_only: false,
      with_images: false,
      page: 1,
      per_page: 10
    }
  }

  const loadMore = async (productId) => {
    if (pagination.value.current_page < pagination.value.last_page) {
      const nextPage = pagination.value.current_page + 1
      await fetchReviews(productId, { page: nextPage })
    }
  }

  // Rating distribution helpers
  const getRatingPercentage = (rating) => {
    const total = reviewStats.value.total_reviews
    if (total === 0) return 0
    
    const count = reviewStats.value.rating_distribution[rating] || 0
    return Math.round((count / total) * 100)
  }

  const getRatingCount = (rating) => {
    return reviewStats.value.rating_distribution[rating] || 0
  }

  // Check if user can review a product
  const checkCanUserReview = async (productId) => {
    try {
      const response = await useBaseOFetchWithAuth(`products/${productId}/can-review`)
      return response.can_review || false
    } catch (error) {
      console.error('Can review check error:', error)
      return false
    }
  }

  return {
    // State
    reviews,
    reviewStats,
    loading,
    pagination,
    filters,
    
    // Computed
    hasReviews,
    averageRatingFormatted,
    
    // Methods
    fetchReviews,
    submitReview,
    voteReview,
    addVendorReply,
    getReviewableProducts,
    updateFilters,
    resetFilters,
    loadMore,
    getRatingPercentage,
    getRatingCount,
    checkCanUserReview
  }
} 