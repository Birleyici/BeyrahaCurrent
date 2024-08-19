import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';


export const useOrderState = defineStore('orderState', () => {

    const cartState = useStateIndex().useCartState()
    const mainState = useNuxtApp().$mainState

    const isOpenAddressModal = ref(false)
    const openAllAddressModal = ref(false)

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

    const getDefaultAddress = computed(() => {

        let filteredAddresses = addresses.value?.filter(address => address.isDefault === true);
        return filteredAddresses.length ? filteredAddresses[0] : null;
    });


    const orderOptions = ref({
        selectedPaymentMethod: 'bacs',
        selectedAddress: getDefaultAddress?.id,
        isOpenOtherAddress: false
    })

    const orders = ref([])

    const saveAddress = async (item) => {

        if (!mainState.isAuthenticated) {
            if (!item.id) {
                item.id = uuidv4();
            }
            addresses.value = [item]
        } else {

            const response = await useBaseOFetchWithAuth('address', {
                method: 'POST',
                body: JSON.stringify(item)
            })

            if (!response.error) {

                if (response.isNew) {
                    await setDefaultFalseOtherAddresses(response.id)
                    addresses.value.unshift(response)
                } else {
                    const index = addresses.value.findIndex(item => item.id === response.id)
                    addresses.value[index] = response
                }
            }
            isOpenAddressModal.value = false
            return
        }
        isOpenAddressModal.value = false
    };

    const setDefaultFalseOtherAddresses = (id) => {
        addresses.value.forEach((address) => {
            if (address.id !== id) {
                address.isDefault = false;
            } else {
                address.isDefault = true;
            }
        });
    }


    const setDefaultAddress = async (id) => {
        const response = await useBaseOFetchWithAuth('address/default', {
            method: 'POST',
            body: JSON.stringify({ addressId: id }),
        });

        if (!response.error) {
            setDefaultFalseOtherAddresses(id)
        }
    }


    const deleteAddress = (id) => {

        addresses.value = addresses.value.filter(address => address.id !== id)
    }


    const fetchCities = async () => {

        const response = await useBaseOFetch(`countries/1/cities`)

        cities.value = response
    }

    const fetchDistricts = async (isEditing = false) => {

        if (!isEditing) {
            newAddress.value.district = null
        }
        const response = await useBaseOFetch(`cities/${newAddress.value?.city?.id}/districts`)
        districts.value = response

    }


    const editAddress = async (id) => {

        isOpenAddressModal.value = true
        const editingObj = addresses.value.find(address => address.id === id)
        newAddress.value = toRaw({ ...editingObj })
        await fetchDistricts(true)
    }


    const createOrder = async () => {

        if (addresses.value.length == 0 || cartState.cart.length == 0) {
            return
        }
        const newOrderObj = {
            address: addresses.value[0],
            cart: cartState.cart
        }

        const response = await useBaseOFetchWithAuth(`order/create`,
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

    const fetchAddresses = async () => {
        if (mainState.isAuthenticated) {
            const response = await useBaseOFetchWithAuth('addresses')
            addresses.value = response
        }
    }

    const getOrders = async () => {
        const response = await useBaseOFetchWithAuth(`orders`);
        orders.value = response;
    };


    watch(isOpenAddressModal, () => {
        if (!isOpenAddressModal.value) {
            newAddress.value = copyNewAddress
        }
    })

    return {
        orderOptions,
        addresses,
        getDefaultAddress,
        newAddress,
        copyNewAddress,
        isOpenAddressModal,
        openAllAddressModal,
        cities,
        districts,
        orders,
        fetchAddresses,
        setDefaultAddress,
        saveAddress,
        deleteAddress,
        fetchCities,
        fetchDistricts,
        editAddress,
        createOrder,
        getOrders
    }
},
    {
        persist: {
            storage: persistedState.sessionStorage,
        },
    })