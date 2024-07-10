export function useProduct() {

    const products = ref([])

    const getProducts = async (piece) => {

        const { data, error } = await useBaseFetch('products', {

            params: {
                piece
            }

        })

        if(data.value && !error.value){
            console.log(data)

            products.value = data.value
        }

    }

    return {
        getProducts,
        products
    }
}