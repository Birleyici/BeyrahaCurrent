import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref({
        freeShippingLimit: 1000, // Varsayılan değer
        shippingCost: 60, // Varsayılan değer
        siteTitle: 'Beyraha',
        siteDescription: '',
        contactPhone: '',
        contactEmail: '',
        whatsappNumber: '',
        bankName: '',
        bankAccountName: '',
        bankIban: ''
    })
    
    const loading = ref(false)

    const fetchSettings = async (forceRefresh = false) => {
        loading.value = true
        try {
            // Cache busting ile fresh data çek
            const url = forceRefresh ? `settings/app?_t=${Date.now()}` : 'settings/app'
            const response = await useBaseOFetch(url)
            if (response && !response.error) {
                settings.value = {
                    freeShippingLimit: response.FREE_SHIPPING_LIMIT || 1000,
                    shippingCost: response.SHIPPING_COST || 60,
                    siteTitle: response.site_title || 'Beyraha',
                    siteDescription: response.site_description || '',
                    contactPhone: response.contact_phone || '',
                    contactEmail: response.contact_email || '',
                    whatsappNumber: response.whatsapp_number || '',
                    bankName: response.bank_name || '',
                    bankAccountName: response.bank_account_name || '',
                    bankIban: response.bank_iban || ''
                }
            }
        } catch (error) {
            console.warn('Ayarlar yüklenirken hata:', error)
        } finally {
            loading.value = false
        }
    }

    // Force refresh için yardımcı metod
    const refreshSettings = async () => {
        return await fetchSettings(true)
    }

    // Kargo ücreti hesaplama
    const calculateShippingCost = (totalAmount) => {
        return totalAmount >= settings.value.freeShippingLimit ? 0 : settings.value.shippingCost
    }

    // Ücretsiz kargo için kalan miktar
    const remainingForFreeShipping = (totalAmount) => {
        const remaining = settings.value.freeShippingLimit - totalAmount
        return remaining > 0 ? remaining : 0
    }

    // Belirli bir ayar değerini getir
    const getSetting = (key, defaultValue = null) => {
        return settings.value[key] ?? defaultValue
    }

    return {
        settings: readonly(settings),
        loading: readonly(loading),
        fetchSettings,
        refreshSettings,
        calculateShippingCost,
        remainingForFreeShipping,
        getSetting
    }
}) 