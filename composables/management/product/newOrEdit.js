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
        try {

            // Eğer yeni ürün ise is_active: 0 (taslak) olarak ayarla
            if (!productId && !productState.product.is_active) {
                productState.product.is_active = 0;
            }

            console.log('Saving product with data:', JSON.stringify(productState.product, null, 2));

            const response = await useBaseOFetchWithAuth("products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productState.product),
            }).finally(()=>{
                productState.product.loading = false
            });
            

            if(!productId){
                productState.product = response
            }

            if (isAllSave) {

                navigateTo('/management/urunler/' + productState.product.id)
            }

        } catch (error) {

            console.log('Productsave error: ', error);
            
            // 422 hatası ise validation detaylarını yazdır
            if (error.status === 422 || error.statusCode === 422) {
                console.log('Validation errors:', error.data);
                console.log('Error details:', JSON.stringify(error, null, 2));
                
                // Hata mesajlarını kullanıcı dostu formatta göster
                if (error.data?.errors) {
                    const errorMessages = Object.entries(error.data.errors).map(([field, messages]) => {
                        return `${field}: ${messages.join(', ')}`;
                    }).join('\n');
                    console.log('Formatted error messages:', errorMessages);
                }
            }
            
            throw error;
        }

    }

    const getCategories = async () => {

        const response = await useBaseOFetchWithAuth("categories");

        if (response) {

            // productState.product.categories güncelle
            productState.product.categories = response;

            // Seçilen kategorileri en başa al
            const selectedIds = productState.product.selectedCategories?.map(cat => cat.id);
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

    const deleteProduct = async (productId) => {
        try {
            const response = await useBaseOFetchWithAuth(`product/${productId}`, {
                method: "DELETE"
            });
            return response;
        } catch (error) {
            console.error('Product delete error:', error);
            
            // Hatayı daha detaylı logla
            if (error.status || error.statusCode) {
                console.error(`HTTP ${error.status || error.statusCode}: Ürün silme işlemi başarısız`);
            }
            
            throw error;
        }
    }


    return {
        saveProduct,
        getProduct,
        deleteProduct,
        getCategories,
        tabs,
    };
}