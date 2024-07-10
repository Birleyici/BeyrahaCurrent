
export function useProductList() {


    const productState = reactive({
        vendorProducts: []
    })

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Ürün adı", sortable: true },
        { key: "price", label: "Fiyat", sortable: true },
        { key: "sale_price", label: "İndirimli fiyat", sortable: true },
        { key: "sku", label: "SKU", sortable: true },
        { key: "delete", label: "İşlemler" },
    ];


    const getVendorProducts = async () => {

        const { data, error } = await useBaseFetch("vendor/products");

        if (data.value.products && !error.value) {

            productState.vendorProducts = data.value.products

        }

    }

    const deleteProduct = async (productId) => {


        const { data, error } = await useBaseFetch('product/' + productId, {
            method: 'DELETE'
        })

        if (data.value && !error.value) {

            filteredProducts(productId)

        }

    };

    const filteredProducts = (productId) => {

        productState.vendorProducts = productState.vendorProducts.filter(product => product.id !== productId);

    }

    return {

        productState,
        getVendorProducts,
        columns,
        deleteProduct,
        filteredProducts

    };
}