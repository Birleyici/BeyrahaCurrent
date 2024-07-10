import { useNewProductStore } from "~/store/newProduct.js";
import {
    LazyAdminPartialsProductGeneralTab,
    LazyAdminPartialsProductAttributeTab,
    LazyAdminPartialsProductVariationTab,
} from "#components";



export function useProductCreate() {

    const productState = useNewProductStore()
    const tabs = {
        GeneralTab: LazyAdminPartialsProductGeneralTab,
        VariationTab: LazyAdminPartialsProductVariationTab,
        AttributeTab: LazyAdminPartialsProductAttributeTab,
    };

    const saveProduct = async (productId) => {

        productState.loading = true
        productState.id = productId != 'yeni' ? productId : null
        const { data, pending, refresh, error } = await useBaseFetch("products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache',
            body: JSON.stringify(productState),
        });
        productState.loading = false

        if (error.value == null) {
            productState.id = data.value.id
        }

    }

    const getProduct = async (productIdOrSlug) => {

        try {
            const { data, error } = await useBaseFetch(`product/${productIdOrSlug}` , {
                method: "GET",
            });

            if (data.value && !error.value) {
                // reactive objeyi güncelleyin
                Object.assign(productState, data.value);
            }

            getCategories()

        } catch (error) {

            console.log(error)

        }


    }


    const getCategories = async () => {

        const { data, pending, error, refresh } = await useBaseFetch("categories", {
            method: "GET",
        });


        if (data.value && !error.value) {
            // reactive objeyi güncelleyin
            productState.categories = data.value;
        }
    }






    return {
        productState,
        saveProduct,
        getProduct,
        getCategories,
        tabs,
    };
}