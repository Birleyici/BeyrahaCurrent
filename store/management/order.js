import { defineStore } from "pinia";

export const useOrderManagementStore = defineStore('orderManagementStore', () => {

    const vendorOrders = ref([])
    const vendorOrder = ref(null)
    const toast = useToast()
    const statuses = {
        pending: { color: 'gray', text: 'Beklemede' },
        processing: { color: 'blue', text: 'Hazırlanıyor' },
        shipped: { color: 'green', text: 'Kargoya Verildi' },
        in_transit: { color: 'yellow', text: 'Yolda' },
        cancelled: { color: 'red', text: 'İptal Edildi' },
        returned: { color: 'purple', text: 'İade Edildi' },
        failed: { color: 'black', text: 'Başarısız' }
    };

    const orderListColumns = [
        { key: "id", label: "ID" },
        { key: "full_name", label: "Ad Soyad", sortable: true },
        { key: "total", label: "Toplam", sortable: true },
        { key: "status", label: "Durum", sortable: true },
        { key: "created_at", label: "Tarih", sortable: true },
        { key: "actions", label: "İşlemler" },
    ];


    const fetchVendorOrders = async () => {

        const response = await useBaseOFetchWithAuth('vendor/orders')

        vendorOrders.value = response

    }


    const fetchVendorOrder = async (orderId) => {

        const response = await useBaseOFetchWithAuth('suborder/' + orderId)

        vendorOrder.value = response

    }

    const deleteOrder = async (orderId) => {


        const response = await useBaseOFetchWithAuth('orders/' + orderId, {
            method: 'DELETE'
        })

        vendorOrders.value = vendorOrders.value.filter(o => o.id !== orderId)

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
    };

    const deleteSubOrderItem = async (itemId) => {


        await useBaseOFetchWithAuth('subOrder/items/' + itemId, {
            method: 'DELETE'
        })


        vendorOrder.value.order_items = vendorOrder.value.order_items.filter(i => {
            return i.id != itemId
        })

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
                icon: "i-heroicons-check-badge",
            })
        } else {
            toast.add({
                title: 'Bir hata oluştu!',
                color: 'red',
                icon: "i-heroicons-exclamation-triangle",
            })
        }
        input.loading = false
    }


    const updateStatus = async (subOrder, status) => {
        subOrder.loadingState = status;

        const response = await useBaseOFetchWithAuth('subOrder/status', {
            method: 'POST',
            body: {
                sub_order_id: subOrder.id,
                status
            }
        }).finally(() => {
            subOrder.loadingState = null;
        });

        if (!response.error) {
            subOrder.status = response.sub_order.status;
        }
    };

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
                    icon: "i-heroicons-exclamation-triangle",
                })

            }
        }).finally(() => {
            subOrder.shippingLoading = false
        })
        if (!response.error) {
            subOrder.shipping_code = response.barcode
            subOrder.status = 'shipped'

            toast.add({
                title: 'Kargo kodu alındı!',
                icon: "i-heroicons-check-badge",
            })
        }


    }

    return {

        fetchVendorOrders,
        fetchVendorOrder,
        saveAddress,
        vendorOrders,
        vendorOrder,
        orderListColumns,
        statuses,
        deleteOrder,
        deleteSubOrderItem,
        saveInput,
        updateStatus,
        getShippingCode

    }
},
)