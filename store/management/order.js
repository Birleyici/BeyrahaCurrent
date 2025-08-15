import { defineStore } from 'pinia'

export const useOrderManagementStore = defineStore(
  'orderManagementStore',
  () => {
    const vendorOrders = ref([])
    const vendorOrder = ref(null)
    const pagination = ref({
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0,
      has_more_pages: false
    })
    const filters = ref({
      statuses: [],
      sort_by: 'id',
      sort_order: 'desc'
    })
    const loading = ref(false)
    const toast = useToast()
    
    const statuses = {
      pending: { color: 'gray', text: 'Beklemede' },
      processing: { color: 'blue', text: 'Hazırlanıyor' },
      prepared: { color: 'orange', text: 'Hazırlandı' },
      shipped: { color: 'green', text: 'Kargoya Verildi' },
      in_transit: { color: 'yellow', text: 'Yolda' },
      delivered: { color: 'emerald', text: 'Teslim Edildi' },
      cancelled: { color: 'red', text: 'İptal Edildi' },
      returned: { color: 'purple', text: 'İade Edildi' },
      failed: { color: 'black', text: 'Başarısız' }
    }

    const statusOptions = computed(() => {
      return Object.entries(statuses).map(([key, value]) => ({
        value: key,
        label: value.text,
        color: value.color
      }))
    })

    const orderListColumns = [
      { key: 'id', label: 'ID' },
      { key: 'full_name', label: 'Ad Soyad' },
      { key: 'total', label: 'Toplam' },
      { key: 'status', label: 'Durum' },
      { key: 'created_at', label: 'Tarih' },
      { key: 'actions', label: 'İşlemler' }
    ]

    const initializeFromUrl = (route) => {
      // URL parametrelerinden filtreleri ayarla
      if (route.query.statuses) {
        filters.value.statuses = route.query.statuses.split(',')
      }
      
      if (route.query.sort_by) {
        filters.value.sort_by = route.query.sort_by
      }
      
      if (route.query.sort_order) {
        filters.value.sort_order = route.query.sort_order
      }
      
      // Sayfa numarasını ayarla
      const page = parseInt(route.query.page) || 1
      pagination.value.current_page = page
      
      return page
    }

    const fetchVendorOrders = async (page = 1, resetFilters = false) => {
      if (resetFilters) {
        filters.value = {
          statuses: [],
          sort_by: 'id',
          sort_order: 'desc'
        }
      }

      loading.value = true
      
      try {
        const params = {
          page,
          per_page: pagination.value.per_page,
          sort_by: filters.value.sort_by,
          sort_order: filters.value.sort_order
        }

        // Status filtresi varsa ekle
        if (filters.value.statuses && filters.value.statuses.length > 0) {
          params.statuses = filters.value.statuses.join(',')
        }

        const response = await useBaseOFetchWithAuth('vendor/orders', {
          query: params
        })

        vendorOrders.value = response.data
        pagination.value = response.meta
      } catch (error) {
        console.error('Siparişler yüklenirken hata:', error)
        toast.add({
          title: 'Siparişler yüklenemedi!',
          color: 'red',
          icon: 'i-heroicons-exclamation-triangle'
        })
      } finally {
        loading.value = false
      }
    }

    const applyFilters = async () => {
      // URL'yi güncelle
      await navigateTo({
        path: '/management/siparisler',
        query: {
          page: 1,
          ...(filters.value.statuses.length > 0 && { statuses: filters.value.statuses.join(',') }),
          ...(filters.value.sort_by !== 'id' && { sort_by: filters.value.sort_by }),
          ...(filters.value.sort_order !== 'desc' && { sort_order: filters.value.sort_order })
        }
      })
      
      await fetchVendorOrders(1) // Filtreleme yapılırken ilk sayfaya git
    }

    const clearFilters = async () => {
      filters.value = {
        statuses: [],
        sort_by: 'id',
        sort_order: 'desc'
      }
      
      // URL'yi temizle
      await navigateTo({
        path: '/management/siparisler',
        query: {}
      })
      
      await fetchVendorOrders(1)
    }

    const changePage = async (page) => {
      // URL'yi güncelle
      await navigateTo({
        path: '/management/siparisler',
        query: {
          page,
          ...(filters.value.statuses.length > 0 && { statuses: filters.value.statuses.join(',') }),
          ...(filters.value.sort_by !== 'id' && { sort_by: filters.value.sort_by }),
          ...(filters.value.sort_order !== 'desc' && { sort_order: filters.value.sort_order })
        }
      })
      
      await fetchVendorOrders(page)
    }

    const fetchVendorOrder = async (orderId) => {
      const response = await useBaseOFetchWithAuth('suborder/' + orderId)

      vendorOrder.value = response
    }

    const deleteSubOrder = async (subOrderId) => {
      const response = await useBaseOFetchWithAuth('subOrder/' + subOrderId, {
        method: 'DELETE'
      })

      // Mevcut sayfayı yeniden yükle
      await fetchVendorOrders(pagination.value.current_page)
    }

    const saveAddress = async (item) => {
      const response = await useBaseOFetchWithAuth('subOrder/address', {
        method: 'POST',
        body: JSON.stringify(item)
      })

      console.log(response)
      if (!response.error) {
        return true
      } else {
        return false
      }
    }

    const deleteSubOrderItem = async (itemId) => {
      await useBaseOFetchWithAuth('subOrder/items/' + itemId, {
        method: 'DELETE'
      })

      vendorOrder.value.order_items = vendorOrder.value.order_items.filter(
        (i) => {
          return i.id != itemId
        }
      )
    }

    const saveInput = async (input) => {
      input.loading = true
      const response = await useBaseOFetchWithAuth('subOrder/save-input', {
        method: 'POST',
        body: JSON.stringify(input)
      }).finally(() => {
        input.loading = false
      })

      if (!response.error) {
        input.value = response.orderItemInput.value
        toast.add({
          title: 'Özel alan güncellendi!',
          icon: 'i-heroicons-check-badge'
        })
      } else {
        toast.add({
          title: 'Bir hata oluştu!',
          color: 'red',
          icon: 'i-heroicons-exclamation-triangle'
        })
      }
      input.loading = false
    }

    const updateStatus = async (subOrder, status) => {
      subOrder.loadingState = status

      const response = await useBaseOFetchWithAuth('subOrder/status', {
        method: 'POST',
        body: {
          sub_order_id: subOrder.id,
          status
        }
      }).finally(() => {
        subOrder.loadingState = null
      })

      if (!response.error) {
        subOrder.status = response.sub_order.status
      }
    }

    const getShippingCode = async (subOrder) => {
      subOrder.shippingLoading = true
      const response = await useBaseOFetchWithAuth('shipping/get-code', {
        method: 'POST',
        body: {
          subOrderId: subOrder.id
        },
        onResponseError: async (error) => {
          const message = error.response?._data?.details
          toast.add({
            title: message ? message : 'Bir hata oluştu!',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
          })
        }
      }).finally(() => {
        subOrder.shippingLoading = false
      })
      if (!response.error) {
        // Yeni sistem: ShippingDetail oluşturuldu, vendorOrder'ı yeniden yükle
        await fetchVendorOrder(subOrder.id)
        
        // Kapıda ödeme durumuna göre mesaj özelleştir
        let toastMessage = 'Kargo kodu alındı!'
        if (response.payment_method === 'cash_on_delivery' && response.collect_amount) {
          toastMessage = `Kargo kodu alındı! Kapıda tahsil edilecek: ${formatPrice(response.collect_amount)}`
        }
        
        toast.add({
          title: toastMessage,
          description: response.message,
          icon: 'i-heroicons-check-badge',
          color: 'green'
        })
      }
    }

    const getTrackingCode = async (subOrder) => {
      subOrder.trackingLoading = true
      const response = await useBaseOFetchWithAuth('shipping/get-tracking', {
        method: 'POST',
        body: {
          subOrderId: subOrder.id
        },
        onResponseError: async (error) => {
          const message = error.response?._data?.message
          toast.add({
            title: message ? message : 'Bir hata oluştu!',
            color: 'red',
            icon: 'i-heroicons-exclamation-triangle'
          })
        }
      }).finally(() => {
        subOrder.trackingLoading = false
      })
      
      if (!response.error) {
        // Yeni sistem: ShippingDetail güncellendi, vendorOrder'ı yeniden yükle
        await fetchVendorOrder(subOrder.id)
        
        toast.add({
          title: 'Takip kodu alındı!',
          description: response.tracking_url ? 'Takip linki de kaydedildi' : `Takip kodu: ${response.tracking_code}`,
          icon: 'i-heroicons-check-badge'
        })
      }
    }

    return {
      fetchVendorOrders,
      fetchVendorOrder,
      saveAddress,
      vendorOrders,
      vendorOrder,
      pagination,
      filters,
      loading,
      orderListColumns,
      statuses,
      statusOptions,
      initializeFromUrl,
      applyFilters,
      clearFilters,
      changePage,
      deleteSubOrder,
      deleteSubOrderItem,
      saveInput,
      updateStatus,
      getShippingCode,
      getTrackingCode
    }
  }
)
