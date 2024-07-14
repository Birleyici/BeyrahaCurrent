export function useProduct() {

    const products = ref([])
    const categoryProducts = ref([])

    const getProducts = async (piece) => {

        const { data, error } = await useBaseFetch('products', {

            params: {
                piece
            }

        })

        if (data.value && !error.value) {

            products.value = data.value
        }

    }


    const getProductsByCatId = async (catIds) => {


         catIds = catIds.map(cat => cat.id);


        const { data, error } = await useBaseFetch(`products/category`, {
            params: {
                catIds: catIds.join(','),
                limit: 5
            }
        })

        if (data.value && !error.value) {
            categoryProducts.value = data.value
        }

    }

    return {
        getProducts,
        getProductsByCatId,
        products,
        categoryProducts
    }
}