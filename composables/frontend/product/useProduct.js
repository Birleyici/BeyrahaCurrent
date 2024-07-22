import { useProductState } from "~/store/frontend/product";

export function useProduct() {

    const productState = useProductState()

    const getProducts = async ({ piece, filters = {} }) => {
        // Eğer filters objesinde page yoksa, varsayılan olarak 1 ayarla
        if (!('page' in filters)) {
            filters.page = 1;
        }
    
        const params = piece ? { piece } : { ...filters };
    
        const { data, error } = await useBaseFetch('products', {
            params
        });
    
        if (data.value && !error.value) {
            // Gelen veri sayfalı ise data.value.data, değilse düz data.value
            productState.$patch({ products: data.value });
        }
    
        if (process.client && 'page' in filters) {
            localStorage.setItem("prevPage", filters.page);
        }
    };
    



    const getProductsByCatId = async (catIds) => {

        catIds = catIds.map(cat => cat.id);

        const { data, error } = await useBaseFetch(`products/category`, {
            params: {
                catIds: catIds.join(','),
                limit: 5
            }
        })

        if (data.value && !error.value) {
            productState.$patch({ categoryProducts: data.value })
        }

    }

    return {
        getProducts,
        getProductsByCatId
    }
}