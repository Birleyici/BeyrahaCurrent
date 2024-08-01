import { useProductState } from "~/store/frontend/product";

export function useProductList() {

    const productState = useProductState()

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Ürün adı", sortable: true },
        { key: "price", label: "Fiyat", sortable: true },
        { key: "sale_price", label: "İndirimli fiyat", sortable: true },
        { key: "sku", label: "SKU", sortable: true },
        { key: "delete", label: "İşlemler" },
    ];


    const getVendorProducts = async () => {

        const response = await useBaseOFetchWithAuth("vendor/products");

        productState.patchVendorProducts(response.products)

    }

    const deleteProduct = async (productId) => {


        const { data, error } = await useBaseOFetchWithAuth('product/' + productId, {
            method: 'DELETE'
        })

        if (data.value && !error.value) {

            filteredProducts(productId)

        }

    };

    const filteredProducts = (productId) => {

        const filtered = productState.vendorProducts.filter(product => product.id !== productId)
        console.log(filtered)
        productState.patchVendorProducts(filtered)

    }

    return {

        getVendorProducts,
        columns,
        deleteProduct,
        filteredProducts

    };
}