import { useProductState } from "~/store/frontend/product";
import {
    AdminPartialsProductGeneralTab,
    AdminPartialsProductAttributeTab,
    AdminPartialsProductVariationTab,
    AdminPartialsProductFeaturedInfos,
    AdminPartialsProductExtrasTab,
} from "#components";

export function useProductCreate() {

    const productState = useProductState()

    const tabs = {
        GeneralTab: AdminPartialsProductGeneralTab,
        VariationTab: AdminPartialsProductVariationTab,
        AttributeTab: AdminPartialsProductAttributeTab,
        FeaturedTab: AdminPartialsProductFeaturedInfos,
        ExstrasTab: AdminPartialsProductExtrasTab
    };



    const saveProduct = async (productId, isAllSave = false) => {

        productState.product.loading = true
        productState.product.id = productId != 'yeni' ? productId : null


        const isCoverSelected = productState.product.selectedImages.find(i => i.id == productState.product.coverImageId)

        if (!isCoverSelected) {
            productState.product.coverImageId = 0
        }

        try {

            const response = await useBaseOFetchWithAuth("products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productState.product),
            });
            productState.product.loading = false

            productState.product.id = response.id

            if (isAllSave) {

                navigateTo('/management/urunler/' + productState.product.id)
            }

        } catch (error) {

            console.log('Productsave error: ', error)
        }

    }

    const getCategories = async () => {

        const response = await useBaseOFetchWithAuth("categories");

        if (response) {

            // productState.product.categories güncelle
            productState.product.categories = response;

            // Seçilen kategorileri en başa al
            const selectedIds = productState.product.selectedCategories.map(cat => cat.id);
            const sortedCategories = productState.product.categories.sort((a, b) => {
                if (selectedIds.includes(a.id) && !selectedIds.includes(b.id)) {
                    return -1;
                }
                if (!selectedIds.includes(a.id) && selectedIds.includes(b.id)) {
                    return 1;
                }
                return 0;
            });

            // Güncellenen kategoriler listesiyle state'i kaydet
            productState.product.categories = sortedCategories;

        }
    }


    const getProduct = async (productIdOrSlug) => {


       const response = await useBaseOFetchWithAuth(`product/${productIdOrSlug}`)

       if (response) {

        productState.patchProduct({ ...response })
        
        return response

    }
       
    


    }


    return {
        saveProduct,
        getProduct,
        getCategories,
        tabs,
    };
}