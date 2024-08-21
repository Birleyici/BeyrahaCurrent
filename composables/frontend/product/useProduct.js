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


        if(piece){
            productState.products = response
        } else {
            
            if(filters.page == 1){
                productState.products = response
            } else {
                const dataArray = Object.values(response.data);
                productState.products.data.push(...dataArray);
            }

        }

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