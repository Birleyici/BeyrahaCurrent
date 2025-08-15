export const useSettings = () => {
  // Plugin'de oluşturulan global state'e erişim
  const settings = useState('app-settings', () => ({}))
  
  // Kargo hesaplama fonksiyonu
  const calculateShippingCost = (cartTotal) => {
    if (!settings.value?.freeShippingLimit || !settings.value?.shippingCost) {
      return 0
    }
    
    return cartTotal >= settings.value.freeShippingLimit ? 0 : settings.value.shippingCost
  }
  
  // Ücretsiz kargo için kalan tutar
  const remainingForFreeShipping = (cartTotal) => {
    if (!settings.value?.freeShippingLimit) {
      return 0
    }
    
    const remaining = settings.value.freeShippingLimit - cartTotal
    return remaining > 0 ? remaining : 0
  }
  
  return {
    settings: readonly(settings),
    calculateShippingCost,
    remainingForFreeShipping,
    // Kolaylık için computed değerler
    siteName: computed(() => settings.value?.siteName || 'Beyraha'),
    siteTitle: computed(() => settings.value?.siteTitle || 'Beyraha'),
    siteDescription: computed(() => settings.value?.siteDescription || ''),
    contactPhone: computed(() => settings.value?.contactPhone || ''),
    contactEmail: computed(() => settings.value?.contactEmail || ''),
    whatsappNumber: computed(() => settings.value?.whatsappNumber || ''),
    bankName: computed(() => settings.value?.bankName || ''),
    bankAccountName: computed(() => settings.value?.bankAccountName || ''),
    bankIban: computed(() => settings.value?.bankIban || ''),
    freeShippingLimit: computed(() => settings.value?.freeShippingLimit || null),
    shippingCost: computed(() => settings.value?.shippingCost || null),
    cashOnDeliveryCost: computed(() => settings.value?.cashOnDeliveryCost || 0)
  }
} 