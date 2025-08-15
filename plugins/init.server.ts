export default defineNuxtPlugin(async (nuxtApp) => {
  // Settings state'ini oluştur
  const settings = useState('app-settings', () => ({
    siteTitle: '',
    siteName: '',
    siteDescription: '',
    freeShippingLimit: null,
    shippingCost: null,
    cashOnDeliveryCost: 0,
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: '',
    bankName: '',
    bankAccountName: '',
    bankIban: ''
  }))

  try {
    // Settings verilerini fetch et
    const response = await useBaseOFetch('settings/app') as any

    if (response) {
      // Settings state'ini güncelle - response direkt veriyi içeriyor
      settings.value = {
        siteTitle: response.site_title || '',
        siteName: response.site_name || '',
        siteDescription: response.site_description || '',
        freeShippingLimit: response.FREE_SHIPPING_LIMIT || null,
        shippingCost: response.SHIPPING_COST || null,
        cashOnDeliveryCost: response.CASH_ON_DELIVERY_COST || 0,
        contactPhone: response.contact_phone || '',
        contactEmail: response.contact_email || '',
        whatsappNumber: response.whatsapp_number || '',
        bankName: response.bank_name || '',
        bankAccountName: response.bank_account_name || '',
        bankIban: response.bank_iban || ''
      }
    }
  } catch (error) {
    console.error('Settings yüklenirken hata:', error)
  }
}) 