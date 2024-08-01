import { defineStore } from "pinia";


export const useCartState = defineStore('cartState', () => {

    const cart = ref([])
    const cartQyt = ref(cart.value?.length)
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
      

    const patchCart = (obj, qyt) => {

        const existObjIndex = findObjectIndex(cart.value, obj, 'qyt')

        if (existObjIndex === -1) {

            cart.value.push(obj)

        } else {

            cart.value[existObjIndex].qyt += qyt
        }

        updateCartQyt()

    }

    const updateCartQyt = ()=>{
        cartQyt.value = cart.value.reduce((total, item) => total + item.qyt, 0);
    }

    const deleteCartItem = (deleteCartItem) => {

        if (deleteCartItem.variation) {
          cart.value = cart.value.filter(item => item.variation.id !== deleteCartItem.variation.id);
        } else {
          cart.value = cart.value.filter(item => item.product_id !== deleteCartItem.product_id);
        }
      
        updateCartQyt()
      }



    return { cart, cartQyt, cartTotalAmount, patchCart, deleteCartItem }
},
    {
        persist: {
            storage: persistedState.localStorage,
        },
    })