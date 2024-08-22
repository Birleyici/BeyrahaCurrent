import { defineStore } from "pinia";


export const useCartState = defineStore('cartState', () => {
  const cart = ref([])
  const toast = useToast()
  const authStore = useAuthStore()
  const addToCartloading = ref(false)

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
    addToCartloading.value = true
    if (authStore.token) {

      const response = await useBaseOFetchWithAuth('cart', {
        method: 'POST',
        body: JSON.stringify({
          ...obj,
          qyt
        })
      })
      if (response.error) {
        toast.add({
          title: 'Bir hata oluştu!',
          color: 'red',
          icon: "i-heroicons-exclamation-triangle",
        })

        addToCartloading.value = true
        return
      }

      obj.id = response.cartItem.id
    }

    const existObjIndex = findObjectIndex(cart.value, obj, ['qyt', 'total'])


    if (existObjIndex === -1) {

      cart.value.push(obj)

    } else {

      cart.value[existObjIndex].qyt += qyt
    }

    const actions = ref([{
      label: 'Sepete Git',
      click: () => navigateTo('/sepet')
    }])

    toast.add({
      title: 'Sepete eklendi!',
      color: 'orange',
      icon: "i-heroicons-check-badge",
      actions
    })

    addToCartloading.value = false

  }


  const cartDBToState = async () => {

    if (cart.value.length == 0 && authStore.token) {

      const response = await useBaseOFetchWithAuth('cart')
      cart.value = response.cart
    }
  }


  const deleteCartItem = async (deleteCartItem) => {


    if (authStore.token) {

      const response = await useBaseOFetchWithAuth(`cart/${deleteCartItem.id}`, {
        method: 'DELETE'
      })

      if (response.error) {
        return
      }
    }

    if (deleteCartItem.variation) {
      cart.value = cart.value.filter(item =>
        !(item.variation.id === deleteCartItem.variation.id &&
          item.product_attribute_term_id === deleteCartItem.product_attribute_term_id)
      );
    } else {
      cart.value = cart.value.filter(item =>
        !(item.product_id === deleteCartItem.product_id &&
          item.product_attribute_term_id === deleteCartItem.product_attribute_term_id)
      );
    }

  }



  return { cart, cartQyt, cartTotalAmount,addToCartloading, cartDBToState, resetCartState, patchCart, deleteCartItem }
},
  {
    persist: {
      storage: persistedState.localStorage,
    },
  })