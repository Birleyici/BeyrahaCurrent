export const useEmailTemplates = () => {
  const templates = ref([])
  const loading = ref(false)
  const error = ref(null)


  // Tüm şablonları getir
  const fetchTemplates = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const queryParams = new URLSearchParams(params).toString()
      const url = `email-templates${queryParams ? `?${queryParams}` : ''}`
      
      const response = await useBaseOFetchWithAuth(url)

      if (response.success) {
        templates.value = response.data
        return response
      } else {
        throw new Error(response.message || 'Şablonlar alınamadı')
      }
    } catch (err) {
      error.value = err.message
      console.error('Şablonlar getirme hatası:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Yeni şablon oluştur
  const createTemplate = async (templateData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await useBaseOFetchWithAuth('email-templates', {
        method: 'POST',
        body: templateData
      })

      if (response.success) {
        // Local state'i güncelle
        templates.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Şablon oluşturulamadı')
      }
    } catch (err) {
      console.error('Şablon oluşturma hatası:', err)
      
      // API'den gelen validation hatalarını kontrol et
      if (err.data && err.data.errors) {
        // Laravel validation hatası
        const validationErrors = err.data.errors
        
        // Field isimlerini Türkçeleştir
        const fieldNames = {
          name: 'Şablon Adı',
          content: 'Email İçeriği',
          subject: 'Email Konusu',
          type: 'Şablon Tipi',
          description: 'Açıklama',
          is_active: 'Aktif Durumu'
        }
        
        let errorMessage = 'Lütfen aşağıdaki hataları düzeltin:\n\n'
        
        for (const [field, messages] of Object.entries(validationErrors)) {
          const fieldName = fieldNames[field] || field
          errorMessage += `${fieldName}:\n`
          messages.forEach(message => {
            errorMessage += `• ${message}\n`
          })
          errorMessage += '\n'
        }
        
        error.value = errorMessage.trim()
        throw new Error(errorMessage.trim())
      } else if (err.data && err.data.message) {
        // API'den gelen özel hata mesajı
        error.value = err.data.message
        throw new Error(err.data.message)
      } else {
        // Genel hata
        error.value = err.message || 'Şablon oluşturulamadı'
        throw new Error(err.message || 'Şablon oluşturulamadı')
      }
    } finally {
      loading.value = false
    }
  }

  // Şablon güncelle
  const updateTemplate = async (id, templateData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await useBaseOFetchWithAuth(`email-templates/${id}`, {
        method: 'PUT',
        body: templateData
      })

      if (response.success) {
        // Local state'i güncelle
        const index = templates.value.findIndex(t => t.id === id)
        if (index !== -1) {
          templates.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message || 'Şablon güncellenemedi')
      }
    } catch (err) {
      console.error('Şablon güncelleme hatası:', err)
      
      // API'den gelen validation hatalarını kontrol et
      if (err.data && err.data.errors) {
        // Laravel validation hatası
        const validationErrors = err.data.errors
        
        // Field isimlerini Türkçeleştir
        const fieldNames = {
          name: 'Şablon Adı',
          content: 'Email İçeriği',
          subject: 'Email Konusu',
          type: 'Şablon Tipi',
          description: 'Açıklama',
          is_active: 'Aktif Durumu'
        }
        
        let errorMessage = 'Lütfen aşağıdaki hataları düzeltin:\n\n'
        
        for (const [field, messages] of Object.entries(validationErrors)) {
          const fieldName = fieldNames[field] || field
          errorMessage += `${fieldName}:\n`
          messages.forEach(message => {
            errorMessage += `• ${message}\n`
          })
          errorMessage += '\n'
        }
        
        error.value = errorMessage.trim()
        throw new Error(errorMessage.trim())
      } else if (err.data && err.data.message) {
        // API'den gelen özel hata mesajı
        error.value = err.data.message
        throw new Error(err.data.message)
      } else {
        // Genel hata
        error.value = err.message || 'Şablon güncellenemedi'
        throw new Error(err.message || 'Şablon güncellenemedi')
      }
    } finally {
      loading.value = false
    }
  }

  // Şablon sil
  const deleteTemplate = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await useBaseOFetchWithAuth(`email-templates/${id}`, {
        method: 'DELETE'
      })

      if (response.success) {
        // Local state'den kaldır
        templates.value = templates.value.filter(t => t.id !== id)
        return true
      } else {
        throw new Error(response.message || 'Şablon silinemedi')
      }
    } catch (err) {
      error.value = err.message
      console.error('Şablon silme hatası:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Şablon önizleme
  const previewTemplate = async (id, customData = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await useBaseOFetchWithAuth(`email-templates/${id}/preview`, {
        method: 'POST',
        body: { data: customData }
      })

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Önizleme alınamadı')
      }
    } catch (err) {
      error.value = err.message
      console.error('Önizleme hatası:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Şablon kopyala
  const duplicateTemplate = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await useBaseOFetchWithAuth(`email-templates/${id}/duplicate`, {
        method: 'POST'
      })

      if (response.success) {
        templates.value.push(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Şablon kopyalanamadı')
      }
    } catch (err) {
      error.value = err.message
      console.error('Şablon kopyalama hatası:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Kullanılabilir değişkenleri getir
  const getAvailableVariables = async () => {
    try {
      const response = await useBaseOFetchWithAuth('email-templates/variables')

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Değişkenler alınamadı')
      }
    } catch (err) {
      console.error('Değişkenler getirme hatası:', err)
      throw err
    }
  }

  // Aktif şablonları getir
  const getActiveTemplates = async () => {
    try {
      const response = await useBaseOFetchWithAuth('email-templates/active')

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Aktif şablonlar alınamadı')
      }
    } catch (err) {
      console.error('Aktif şablonlar getirme hatası:', err)
      throw err
    }
  }

  // Tip'e göre şablon getir
  const getTemplateByType = async (type) => {
    try {
      const response = await useBaseOFetchWithAuth(`email-templates/type/${type}`)

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Şablon bulunamadı')
      }
    } catch (err) {
      console.error('Tip şablon getirme hatası:', err)
      throw err
    }
  }

  // Mevcut kritik şablon tiplerini kontrol et
  const checkExistingTypes = async () => {
    try {
      const response = await useBaseOFetchWithAuth('email-templates/check-existing-types')

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Tip kontrolü yapılamadı')
      }
    } catch (err) {
      console.error('Tip kontrol hatası:', err)
      throw err
    }
  }

  // Sipariş durumları listesini getir
  const getOrderStatuses = async () => {
    try {
      const response = await useBaseOFetchWithAuth('email-templates/order-statuses')

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Sipariş durumları alınamadı')
      }
    } catch (err) {
      console.error('Sipariş durumları getirme hatası:', err)
      throw err
    }
  }

  // Kullanılmış sipariş durumlarını getir
  const getUsedOrderStatuses = async () => {
    try {
      const response = await useBaseOFetchWithAuth('email-templates/used-order-statuses')

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Kullanılmış sipariş durumları alınamadı')
      }
    } catch (err) {
      console.error('Kullanılmış sipariş durumları getirme hatası:', err)
      throw err
    }
  }

  return {
    // State
    templates: readonly(templates),
    loading: readonly(loading),
    error: readonly(error),
    
    // Methods
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    previewTemplate,
    duplicateTemplate,
    getAvailableVariables,
    getActiveTemplates,
    getTemplateByType,
    checkExistingTypes,
    getOrderStatuses,
    getUsedOrderStatuses
  }
} 