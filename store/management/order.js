import { defineStore } from "pinia";

export const useOrderManagementStore = defineStore('orderManagementStore', () => {

    const vendorOrders = ref([])
    const vendorOrder = ref(null)


    const fetchVendorOrders = async () => {

        const response = await useBaseOFetchWithAuth('vendor/orders')

        vendorOrders.value = response

    }

    
    const fetchVendorOrder = async (orderId) => {

        const response = await useBaseOFetchWithAuth('suborder/'+orderId)

        vendorOrder.value = response

    }

    const deleteOrder = async (orderId) => {

     
        const response = await useBaseOFetchWithAuth('orders/' + orderId, {
            method: 'DELETE'
        })

        console.log(response, orderId)

        vendorOrders.value = vendorOrders.value.filter(o=> o.id !== orderId)

    }

    const orderListColumns = [
        { key: "id", label: "ID" },
        { key: "full_name", label: "Ad Soyad", sortable: true },
        { key: "total", label: "Toplam tutar", sortable: true },
        { key: "created_at", label: "Tarih", sortable: true },
        { key: "delete", label: "İşlemler" },
    ];

    return {

        fetchVendorOrders,
        fetchVendorOrder,
        vendorOrders,
        vendorOrder,
        orderListColumns,
        deleteOrder
    }
},
)