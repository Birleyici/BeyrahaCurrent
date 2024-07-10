import { defineStore } from 'pinia';

export const useCategories = defineStore({
    id: 'kategoriler',
    state: () => ({

        urunKategorileri: []
    }),

    actions: {

        async kategorileriGetir() {

            const { data, pending, error, refresh } = await useBaseFetch("categories", {
                method: "GET",
            });

            this.urunKategorileri = data
        }
    },

  
});





