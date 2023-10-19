import { defineStore } from 'pinia';

export const useNewProductStore = defineStore({
    id: 'newProduct',
    state: () => ({
        id: null,
        title: "",
        description: "",
        additional_info: "",
        coverImage: 0,
        selectedImages: [],
        selectedCategories: [],
        price: null,
        sale_price: null,
        sku: null,
        stock_management: 0,
        stock: 1,
    }),

});





