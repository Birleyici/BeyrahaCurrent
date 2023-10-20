import { defineStore } from 'pinia';

export const useNewProductStore = defineStore({
    id: 'newProduct',
    state: () => ({
        id: null,
        name: "",
        description: "",
        additional_info: "",
        coverImage: 0,
        selectedImages: [],
        selectedCategories: [],
        price: null,
        sale_price: null,
        sku: null,
        stock_management: 0,
        stock: 0,
        loading: false
    }),

    actions: {

        async saveProduct() {
            this.loading = true
            const { data, pending, refresh, error } = await useJsonPlaceholderData("/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.$state),
                cache: false,
            });
            this.loading = false

            if (error.value == null) {
                this.id = data.value.id
            }

        }

    }

});





