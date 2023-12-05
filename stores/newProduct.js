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
        stock_management: false,
        stock: 0,
        loading: false
    }),

    actions: {

        async saveProduct(productId) {


            this.loading = true
            this.id = productId != 'yeni' ? productId : null
            const { data, pending, refresh, error } = await useBaseFetch("products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.$state),
            });
            this.loading = false

            if (error.value == null) {
                this.id = data.value.id
            }

        },

        async getProduct(productId) {

            try {
                const { data, error } = await useBaseFetch("product/" + productId, {
                    method: "GET",
                });


                if (data.value.selectedImages) {
                    data.value.selectedImages = data.value.selectedImages.map(image => {
                        if (typeof image === 'string') {
                            return JSON.parse(image);
                        }
                        return image;
                    });
                }


                this.$state = data.value

            } catch (error) {

                this.id = data.value.id

            }


        }


    }

});





