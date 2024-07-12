import { defineStore } from 'pinia';

export const useNewProductStore = defineStore({
    id: 'newProduct',
    state: () => ({
        id: null,
        name: "",
        description: "",
        additional_info: "",
        coverImageId: 0,
        selectedImages: [],
        selectedCategories: [],
        price: null,
        sale_price: null,
        sku: null,
        stock_management: false,
        stock: 0,
        loading: false,
        categories: [],
        featured_infos: []

    }),



});





