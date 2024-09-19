import { defineStore } from 'pinia'

export const useCartState = defineStore('cartState', () => {
  const cart = ref([])
  const toast = useToast()
  const addToCartloading = ref(false)

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

  const resetCartState = () => {
    cart.value = []
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
    console.log(response.cartItem)
    const existObjIndex = findObjectIndex(cart.value, response.cartItem, [
      'qyt',
      'total',
      'input_value'
    ])
    console.log(existObjIndex)

    if (existObjIndex === -1) {
      cart.value.push(response.cartItem)
    } else {
      cart.value[existObjIndex].qyt += qyt
      if (obj.input_value) {
        cart.value[existObjIndex].input_value = obj.input_value
      }
    }

    if (openSlide) {
      useUIStore().cartSlide = true
    }
  }

  const cartDBToState = async () => {
    const response = await useBaseOFetchWithAuth('cart')
    console.log(response)
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

  return {
    cart,
    cartQyt,
    cartTotalAmount,
    addToCartloading,
    cartDBToState,
    resetCartState,
    patchCart,
    deleteCartItem
  }
})
