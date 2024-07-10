// import { defineStore } from 'pinia';

// export const useProduct = defineStore({
//     id: 'products',
//     state: () => ({

//         vendorProducts: []
//     }),

//     actions: {

//         async getVendorProducts() {

//             const { data, pending, refresh, error } = await useBaseFetch("vendor/products", {
//                 method: "GET",
//                 credentials:'include'
//             });


//             if (data?.value?.products) {

//                 Object.assign(vendorProducts, data.value.products)

//             }

//         }

//     },

// });





