import { useProductState } from "~/store/frontend/product";

export function useProduct() {

    const productState = useProductState()

    const getProducts = async ({ piece, filters = {} }) => {

        // Eğer filters objesinde page yoksa, varsayılan olarak 1 ayarla
        if (!('page' in filters)) {
            filters.page = 1;
        }

        const params = piece ? { piece } : { ...filters };



        const response = await useBaseOFetchWithAuth(`products`,
            {
                params
            }
        )


        productState.products = response

        if (process.client && 'page' in filters) {
            localStorage.setItem("prevPage", filters.page);
        }
    };




    const getProductsByCatId = async (catIds) => {

        catIds = catIds.map(cat => cat.id);


        const response = await useBaseOFetch('products/category',
            {
                params: {
                    catIds: catIds.join(','),
                    limit: 5
                }
            }
        )


        productState.patchCategoryProducts(response)

    }

    return {
        getProducts,
        getProductsByCatId
    }
}