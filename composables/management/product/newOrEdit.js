import { useNewProductStore } from "~/store/newProduct.js";
import {
    AdminPartialsProductGeneralTab,
    AdminPartialsProductAttributeTab,
    AdminPartialsProductVariationTab,
    AdminPartialsProductFeaturedInfos,
} from "#components";

export function useProductCreate() {

    const productState = useNewProductStore()
    const tabs = {
        GeneralTab: AdminPartialsProductGeneralTab,
        VariationTab: AdminPartialsProductVariationTab,
        AttributeTab: AdminPartialsProductAttributeTab,
        FeaturedTab: AdminPartialsProductFeaturedInfos
    };

    const saveProduct = async (productId, isAllSave = false) => {

        productState.loading = true
        productState.id = productId != 'yeni' ? productId : null
        const { data, error } = await useBaseFetch("products", {
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

            if (isAllSave) {

                navigateTo('/management/urunler/' + productState.id)
            }
        }

    }

    const getCategories = async () => {

        const { data, error } = await useBaseFetch("categories");

        if (data.value && !error.value) {

            // productState.categories güncelle
            productState.categories = data.value;

            // Seçilen kategorileri en başa al
            const selectedIds = productState.selectedCategories.map(cat => cat.id);
            const sortedCategories = productState.categories.sort((a, b) => {
                if (selectedIds.includes(a.id) && !selectedIds.includes(b.id)) {
                    return -1;
                }
                if (!selectedIds.includes(a.id) && selectedIds.includes(b.id)) {
                    return 1;
                }
                return 0;
            });

            // Güncellenen kategoriler listesiyle state'i kaydet
            productState.categories = sortedCategories;

        }
    }


    const getProduct = async (productIdOrSlug) => {

        const { data, error } = await useBaseFetch(`product/${productIdOrSlug}`);

        if (data.value && !error.value) {
            // reactive objeyi güncelleyin

            productState.$patch({ ...data.value })
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