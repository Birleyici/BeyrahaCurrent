import { defineStore } from 'pinia';

export const useProduct = defineStore({
    id: 'products',
    state: () => ({

        vendorProducts: []
    }),

    actions: {

         async getVendorProducts() {

            const { data, pending, refresh, error } = await useBaseFetch("vendor/products", {
                method: "GET"
            });

            this.vendorProducts = data

        }

    },

    getters: {

    },
});





