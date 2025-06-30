import { defineStore } from 'pinia'

export const useOrderStoreFront = defineStore('orderStoreFront', () => {
  const cartState = useCartState()
  const toast = useToast()
  const isOpenAddressModal = ref(false)
  const openAllAddressModal = ref(false)
  const createOrderLoading = ref(false)

  const newAddress = ref({
    name: null,
    last_name: null,
    phone: null,
    address: null,
    city: null,
    district: null,
    email: null,
    isDefault: true
  })

  const copyNewAddress = {
    name: null,
    last_name: null,
    phone: null,
    address: null,
    city: null,
    district: null,
    email: null,
    isDefault: true
  }

  const addresses = ref([])
  const cities = ref([])
  const districts = ref([])

  const defaultAddress = computed(() => {
    let filteredAddresses = addresses.value?.filter(
      (address) => address.isDefault === true
    )
    return filteredAddresses.length ? filteredAddresses[0] : null
  })

  const orderOptions = ref({
    selectedPaymentMethod: 'bacs',
    selectedAddress: defaultAddress?.id,
    isOpenOtherAddress: false
  })

  const orders = ref([])

  const saveAddress = async (item) => {
    const response = await useBaseOFetchWithAuth('address', {
      method: 'POST',
      body: JSON.stringify(item)
    })

    if (!response.error) {
      if (response.isNew) {
        await setDefaultFalseOtherAddresses(response.id)
        addresses.value.unshift(response)
      } else {
        const index = addresses.value.findIndex(
          (item) => item.id === response.id
        )
        if (index == -1) {
          addresses.value = [response]
        } else {
          addresses.value[index] = response
        }
      }
    }
    isOpenAddressModal.value = false
    return
  }

  const setDefaultFalseOtherAddresses = (id) => {
    addresses.value.forEach((address) => {
      if (address.id !== id) {
        address.isDefault = false
      } else {
        address.isDefault = true
      }
    })
  }

  const setDefaultAddress = async (address) => {
    address.loading = true
    const response = await useBaseOFetchWithAuth('address/default', {
      method: 'POST',
      body: JSON.stringify({ addressId: address.id })
    }).finally(() => {
      address.loading = false
    })
    if (!response.error) {
      setDefaultFalseOtherAddresses(address.id)
    }
  }

  const deleteAddress = (id) => {
    addresses.value = addresses.value.filter((address) => address.id !== id)
  }

  const fetchCities = async () => {
    const response = await useBaseOFetch(`countries/1/cities`)

    cities.value = response
  }

  const fetchDistricts = async (city) => {
    const response = await useBaseOFetch(`cities/${city?.id}/districts`)
    districts.value = response
  }

  const createOrder = async () => {
    if (addresses.value.length == 0) {
      toast.add({
        title: 'Lütfen "Yeni adres" butonundan sipariş adresi ekleyin.',
        color: 'red'
      })
      return
    }

    if (cartState.cart.length == 0) {
      return
    }

    // Frontend'teki ödeme yöntemi kodlarını backend enum değerlerine dönüştür
    const paymentMethodMap = {
      'bacs': 'bank_transfer',      // Havale/EFT
      'credit_card': 'credit_card', // Kredi Kartı
      'cash_on_delivery': 'cash_on_delivery', // Kapıda Ödeme
      'digital_wallet': 'digital_wallet', // Dijital Cüzdan
      'installment': 'installment'  // Taksitli Ödeme
    }

    const newOrderObj = {
      address: addresses.value[0],
      cart: cartState.cart,
      // shipping_cost: kaldırıldı - backend hesaplayacak
      payment_method: paymentMethodMap[orderOptions.value.selectedPaymentMethod] || 'bank_transfer',
      payment_status: 'pending', // Yeni siparişler varsayılan olarak beklemede
      // Kupon bilgisi
      coupon: cartState.appliedCoupon,
      coupon_discount: cartState.couponDiscount
    }

    createOrderLoading.value = true
    const response = await useBaseOFetchWithAuth(`order/create`, {
      method: 'POST',
      body: JSON.stringify(newOrderObj)
    }).finally(() => {
      createOrderLoading.value = false
    })

    addresses.value = []
    cartState.resetCartState()

    await navigateTo({
      path: '/tesekkurler',
      query: {
        order: response.token
      }
    })
  }

  const fetchAddresses = async () => {
    const response = await useBaseOFetchWithAuth('addresses')
    addresses.value = response
  }

  const getOrders = async () => {
    const response = await useBaseOFetchWithAuth(`orders`)
    orders.value = response
  }

  watch(isOpenAddressModal, () => {
    if (!isOpenAddressModal.value) {
      newAddress.value = copyNewAddress
    }
  })

  return {
    orderOptions,
    addresses,
    defaultAddress,
    newAddress,
    copyNewAddress,
    isOpenAddressModal,
    openAllAddressModal,
    cities,
    districts,
    orders,
    createOrderLoading,
    fetchAddresses,
    setDefaultAddress,
    saveAddress,
    deleteAddress,
    fetchCities,
    fetchDistricts,
    createOrder,
    getOrders
  }
})
