import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';


export const useOrderState = defineStore('orderState', () => {

    const cartState = useStateIndex().useCartState()
    const mainState = useNuxtApp().$mainState

    const orderOptions = ref({
        selectedPaymentMethod: 'bacs',
        selectedAddress: 'address1',
        isOpenOtherAddress: false
    })

    const isOpenAddressModal = ref(false)

    let newAddress = ref(
        {
            name: null,
            last_name: null,
            phone: null,
            address: null,
            city: null,
            district: null,
            email: null,
            isDefault: true
        }
    )

    const copyNewAddress = toRaw({ ...newAddress.value })


    const addresses = ref([])
    const cities = ref([])
    const districts = ref([])

    const addressList = computed(() => {
        return addresses.value?.filter(address => {
            if (!orderOptions.value.isOpenOtherAddress) {
                return address.isDefault === true
            } else {
                return true
            }
        })
    })


    const saveAddress = (item) => {

        if (!mainState.isAuthenticated) {
            if (!item.id) {
                item.id = uuidv4();
            }
            addresses.value = [item]
        }
        isOpenAddressModal.value = false
    };

    const deleteAddress = (id) => {

        addresses.value = addresses.value.filter(address => address.id !== id)
    }


    const fetchCities = async () => {

        const response = await useBaseOFetch(`countries/1/cities`)

        cities.value = response
    }

    const fetchDistricts = async () => {

        newAddress.value.district = null
        const response = await useBaseOFetch(`cities/${newAddress.value?.city?.id}/districts`)
        districts.value = response

    }


    const editAddress = (id) => {

        isOpenAddressModal.value = true
        const editingObj = addresses.value.find(address => address.id === id)
        newAddress.value = toRaw({ ...editingObj })

    }


    const createOrder = async () => {

        if (addresses.value.length == 0 || cartState.cart.length == 0) {
            return
        }
        const newOrderObj = {
            address: addresses.value[0],
            cart: cartState.cart
        }

        const response = await useBaseOFetch(`order/create`,
            {
                method: 'POST',
                body: JSON.stringify(newOrderObj)
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


    return {
        orderOptions,
        addresses,
        addressList,
        newAddress,
        copyNewAddress,
        isOpenAddressModal,
        cities,
        districts,
        saveAddress,
        deleteAddress,
        fetchCities,
        fetchDistricts,
        editAddress,
        createOrder
    }
},
    {
        persist: {
            storage: persistedState.sessionStorage,
        },
    })