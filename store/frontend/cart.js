import { defineStore } from "pinia";


export const useCartState = defineStore('cartState', () => {
  const nuxtApp = useNuxtApp()
  const cart = ref([])
  const cartQyt = computed(() => {
    return cart.value.reduce((total, item) => total + item.qyt, 0);
  })
  const cartTotalAmount = computed(() => {
    return cart.value.reduce((total, item) => {
      if (item.variation) {
        // Varyasyon varsa ve sale_price doluysa onu al, yoksa price'ı al
        const price = item.variation.sale_price ? item.variation.sale_price : item.variation.price;
        return total + (price * item.qyt);
      } else {
        // Varyasyon yoksa ve sale_price doluysa onu al, yoksa price'ı al
        const price = item.sale_price ? item.sale_price : item.price;
        return total + (price * item.qyt);
      }
    }, 0);
  });

  const resetCartState = () => {
    cart.value = []
  }


  const patchCart = async (obj, qyt) => {

    if (nuxtApp.$mainState.isAuthenticated) {

      const response = await useBaseOFetchWithAuth('cart', {
        method: 'POST',
        body: JSON.stringify({
          ...obj,
          qyt
        })
      })

      if (response.error) {
        return
      }

      obj.id = response.cartItem.id
    }

    const existObjIndex = findObjectIndex(cart.value, obj, 'qyt')

    if (existObjIndex === -1) {


      cart.value.push(obj)

    } else {

      cart.value[existObjIndex].qyt += qyt
    }

  }


  const cartDBToState = async () => {

    if (cart.value.length == 0 && nuxtApp.$mainState.isAuthenticated) {
      
      const response = await useBaseOFetchWithAuth('cart')
      cart.value = response.cart
    }
  }


  const deleteCartItem = async (deleteCartItem) => {


    if (nuxtApp.$mainState.isAuthenticated) {

      const response = await useBaseOFetchWithAuth(`cart/${deleteCartItem.id}`, {
        method: 'DELETE'
      })

      if (response.error) {
        return
      }
    }

    if (deleteCartItem.variation) {
      cart.value = cart.value.filter(item => item.variation.id !== deleteCartItem.variation.id);
    } else {
      cart.value = cart.value.filter(item => item.product_id !== deleteCartItem.product_id);
    }
  }



  return { cart, cartQyt, cartTotalAmount, cartDBToState, resetCartState, patchCart, deleteCartItem }
},
  {
    persist: {
      storage: persistedState.localStorage,
    },
  })