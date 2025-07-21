export const useCategoriesPopular = () => {
    const popularCategories = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchPopularCategories = async (limit = 4) => {
        isLoading.value = true
        error.value = null

        try {
            const response = await useBaseOFetch('categories/popular', {
                params: { limit }
            })
            
            console.log('Popüler kategoriler API yanıtı:', response)
            popularCategories.value = response || []
        } catch (err) {
            error.value = err
            console.error('Popüler kategoriler yüklenirken hata:', err)
            
            console.error('Hata detayı:', err)
            // Fallback veriler
            popularCategories.value = [
                { id: 1, name: 'Tesettür Elbise', slug: 'tesettur-elbise', icon: 'i-heroicons-sparkles', sales_count: 0 },
                { id: 2, name: 'Başörtüsü', slug: 'basortusu', icon: 'i-heroicons-heart', sales_count: 0 },
                { id: 3, name: 'Tunik', slug: 'tunik', icon: 'i-heroicons-star', sales_count: 0 },
                { id: 4, name: 'Pantolon', slug: 'pantolon', icon: 'i-heroicons-fire', sales_count: 0 }
            ]
        } finally {
            isLoading.value = false
        }
    }

    return {
        popularCategories: readonly(popularCategories),
        isLoading: readonly(isLoading),
        error: readonly(error),
        fetchPopularCategories
    }
} 