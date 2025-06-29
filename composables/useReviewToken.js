export const useReviewToken = () => {
    const authStore = useAuthStore()
    const toast = useToast()

    /**
     * Review token'ı doğrula
     */
    const validateToken = async (token) => {
        try {
            const response = await useBaseOFetch('review-token/validate', {
                method: 'POST',
                body: { token }
            })

            return response.data
        } catch (error) {
            console.error('Token validation error:', error)
            throw error
        }
    }

    /**
     * Review token ile otomatik giriş yap
     */
    const authenticateWithToken = async (token) => {
        try {
            const response = await useBaseOFetch('review-token/authenticate', {
                method: 'POST',
                body: { token }
            })

            // Auth store'u güncelle
            if (response.data.token && response.data.user) {
                authStore.setToken(response.data.token)
                authStore.setCurrentUser(response.data.user)

                toast.add({
                    title: 'Giriş başarılı!',
                    description: 'Artık ürünü değerlendirebilirsiniz',
                    color: 'green',
                    icon: 'i-heroicons-check-circle'
                })
            }

            return response.data
        } catch (error) {
            console.error('Token authentication error:', error)
            
            let errorMessage = 'Giriş yapılamadı'
            if (error.response?.status === 400) {
                errorMessage = 'Geçersiz veya süresi dolmuş bağlantı'
            }

            toast.add({
                title: 'Hata',
                description: errorMessage,
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle'
            })
            
            throw error
        }
    }

    /**
     * URL'den review token parametrelerini kontrol et ve işle
     */
    const handleReviewTokenFromUrl = async () => {
        const route = useRoute()
        const router = useRouter()

        const reviewToken = route.query.review_token
        const shouldReview = route.query.review === 'true'

        if (!reviewToken || !shouldReview) {
            return null
        }

        try {
            // Eğer kullanıcı zaten giriş yapmışsa, sadece review modal'ını aç
            if (authStore.token && authStore.currentUser) {
                // URL'den parametreleri temizle
                await router.replace({
                    query: {
                        ...route.query,
                        review_token: undefined,
                        review: undefined
                    }
                })

                return {
                    shouldOpenReview: true,
                    isAuthenticated: true
                }
            }

            // Token ile otomatik giriş yap
            const authData = await authenticateWithToken(reviewToken)

            // URL'den parametreleri temizle
            await router.replace({
                query: {
                    ...route.query,
                    review_token: undefined,
                    review: undefined
                }
            })

            return {
                shouldOpenReview: true,
                isAuthenticated: true,
                authData
            }

        } catch (error) {
            // Hata durumunda parametreleri temizle
            await router.replace({
                query: {
                    ...route.query,
                    review_token: undefined,
                    review: undefined
                }
            })

            return {
                shouldOpenReview: false,
                isAuthenticated: false,
                error
            }
        }
    }

    /**
     * Kullanıcının review token'larını getir
     */
    const getUserTokens = async () => {
        try {
            const response = await useBaseOFetchWithAuth('review-tokens')

            return response.data
        } catch (error) {
            console.error('Get user tokens error:', error)
            throw error
        }
    }

    return {
        validateToken,
        authenticateWithToken,
        handleReviewTokenFromUrl,
        getUserTokens
    }
} 