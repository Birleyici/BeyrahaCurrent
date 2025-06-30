import { defineStore } from 'pinia'

export const useCartState = defineStore('cartState', () => {
  const cart = ref([])
  const toast = useToast()
  const addToCartloading = ref(false)
  const uiStore = useUIStore()
  
  // Kupon sistemi
  const appliedCoupon = ref(null)
  const couponDiscount = ref(0)
  const couponLoading = ref(false)
  const couponError = ref('')

  const cartQyt = computed(() => {
    return cart.value.reduce((total, item) => total + item.qyt, 0)
  })
  const cartTotalAmount = computed(() => {
    return cart.value.reduce((total, item) => {
      if (item.variation.id) {
        // Varyasyon varsa ve sale_price doluysa onu al, yoksa price'ı al
        const price = item.variation.sale_price
          ? item.variation.sale_price
          : item.variation.price
        return total + price * item.qyt
      } else {
        // Varyasyon yoksa ve sale_price doluysa onu al, yoksa price'ı al
        const price = item.sale_price ? item.sale_price : item.price
        return total + price * item.qyt
      }
    }, 0)
  })

  // Kupon indirimi sonrası toplam tutar
  const cartFinalAmount = computed(() => {
    return Math.max(0, cartTotalAmount.value - couponDiscount.value)
  })

  // Kupon var mı kontrolü
  const hasCoupon = computed(() => {
    return appliedCoupon.value !== null
  })

  const resetCartState = () => {
    cart.value = []
    appliedCoupon.value = null
    couponDiscount.value = 0
    couponError.value = ''
  }

  const patchCart = async (obj, qyt, openSlide = true) => {
    addToCartloading.value = true

    const response = await useBaseOFetchWithAuth('cart', {
      method: 'POST',
      body: JSON.stringify({
        ...obj,
        qyt
      })
    }).finally(() => {
      addToCartloading.value = false
    })

    if (response.error) {
      toast.add({
        title: 'Bir hata oluştu, tekrar deneyin.',
        color: 'red',
        icon: 'i-heroicons-exclamation-triangle'
      })
      return
    }

    obj.id = response.cartItem.id
    const existObjIndex = findObjectIndex(cart.value, response.cartItem, [
      'qyt',
      'total',
      'input_value'
    ])

    if (existObjIndex === -1) {
      cart.value.push(response.cartItem)
    } else {
      cart.value[existObjIndex].qyt += qyt
      if (obj.input_value) {
        cart.value[existObjIndex].input_value = obj.input_value
      }
    }

    if (openSlide) {
      uiStore.cartSlide = true
    }
  }

  const cartDBToState = async () => {
    const response = await useBaseOFetchWithAuth('cart')
    cart.value = response.cart
  }

  const deleteCartItem = async (deleteCartItem) => {
    const response = await useBaseOFetchWithAuth(`cart/${deleteCartItem.id}`, {
      method: 'DELETE'
    })

    if (response.error) {
      console.log(response.error)
      return
    }

    cart.value = cart.value.filter((item) => {
      // Ürün varyasyonu varsa
      if (deleteCartItem.variation) {
        if (
          item.variation.id === deleteCartItem.variation.id &&
          item.product_attribute_term_id ===
            deleteCartItem.product_attribute_term_id
        ) {
          // input_value varsa, bunları karşılaştır
          if (item.input_value && deleteCartItem.input_value) {
            return (
              JSON.stringify(item.input_value) !==
              JSON.stringify(deleteCartItem.input_value)
            )
          }

          return false
        }
      } else {
        if (
          item.product_id === deleteCartItem.product_id &&
          item.product_attribute_term_id ===
            deleteCartItem.product_attribute_term_id
        ) {
          // input_value varsa, bunları karşılaştır
          if (item.input_value && deleteCartItem.input_value) {
            return (
              JSON.stringify(item.input_value) !==
              JSON.stringify(deleteCartItem.input_value)
            )
          }

          return false
        }
      }

      return true
    })
  }

  // Kupon fonksiyonları
  const applyCoupon = async (couponCode) => {
    if (!couponCode || couponCode.trim() === '') {
      couponError.value = 'Kupon kodu boş olamaz'
      return false
    }

    couponLoading.value = true
    couponError.value = ''

    try {
      const response = await useBaseOFetchWithAuth('coupon/validate', {
        method: 'POST',
        body: JSON.stringify({
          coupon_code: couponCode.trim().toUpperCase()
        })
      })

      if (response.success) {
        appliedCoupon.value = response.coupon
        couponDiscount.value = response.discount
        
        toast.add({
          title: 'Kupon başarıyla uygulandı!',
          description: `${response.discount.toFixed(2)} TL indirim kazandınız.`,
          color: 'green',
          icon: 'i-heroicons-check-circle'
        })
        
        return true
      } else {
        couponError.value = response.message
        
        toast.add({
          title: 'Kupon uygulanamadı',
          description: response.message,
          color: 'red',
          icon: 'i-heroicons-exclamation-triangle'
        })
        
        return false
      }
    } catch (error) {
      couponError.value = 'Kupon doğrulanırken bir hata oluştu'
      
      toast.add({
        title: 'Bağlantı hatası',
        description: 'Kupon doğrulanırken bir hata oluştu, lütfen tekrar deneyin.',
        color: 'red',
        icon: 'i-heroicons-exclamation-triangle'
      })
      
      return false
    } finally {
      couponLoading.value = false
    }
  }

  const removeCoupon = () => {
    appliedCoupon.value = null
    couponDiscount.value = 0
    couponError.value = ''
    
    toast.add({
      title: 'Kupon kaldırıldı',
      description: 'Kupon başarıyla sepetinizden kaldırıldı.',
      color: 'blue',
      icon: 'i-heroicons-information-circle'
    })
  }

  const validateCurrentCoupon = async () => {
    if (!appliedCoupon.value) return true
    
    const isValid = await applyCoupon(appliedCoupon.value.code)
    if (!isValid) {
      removeCoupon()
    }
    return isValid
  }

  return {
    cart,
    cartQyt,
    cartTotalAmount,
    cartFinalAmount,
    addToCartloading,
    cartDBToState,
    resetCartState,
    patchCart,
    deleteCartItem,
    // Kupon sistemi
    appliedCoupon,
    couponDiscount,
    couponLoading,
    couponError,
    hasCoupon,
    applyCoupon,
    removeCoupon,
    validateCurrentCoupon
  }
})
