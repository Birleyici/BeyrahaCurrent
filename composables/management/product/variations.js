
export const useVariations = () => {

    const { useProductState, useAttrsAndVarsState, useVariationState, useAttributeState } = useStateIndex();

    const productState = useProductState()
    const attrsAndVarsState = useAttrsAndVarsState()
    const variationState = useVariationState();
    const attributeState = useAttributeState();




    const deleteVariationOnState = (id) => {
        attrsAndVarsState.variations = attrsAndVarsState.variations.filter(variation => variation.id !== id);
    }


    const getSelectedVariation = computed(() => {
        // Önce tam eşleşen bir varyasyon ara.
        let selectedVariation = attrsAndVarsState.variations.find((variation) => {
            return Object.keys(selectedOptions.value).every((key) => {
                return variation.attributes[key] === selectedOptions.value[key];
            });
        });



        // Eğer tam eşleşen bir varyasyon bulamazsanız, "any" durumunu da dikkate al.
        if (!selectedVariation) {
            selectedVariation = attrsAndVarsState.variations.find((variation) => {
                return Object.keys(selectedOptions.value).every((key) => {
                    return (
                        !variation.attributes[key] ||
                        variation.attributes[key] === selectedOptions.value[key]
                    );
                });
            });
        }

        return selectedVariation;
    })


    const selectedOptions = ref({});



    const createOneVariation = async () => {
        // Öncelikle, useForVariation değeri 1 olan herhangi bir attribute olup olmadığını kontrol edin.
        const hasAttributesForVariation = attrsAndVarsState.attributes.some(
            (attribute) => attribute.useForVariation == 1
        );

        // Eğer hiç attribute yoksa, fonksiyonu burada sonlandırın.
        if (!hasAttributesForVariation) {
            return;
        }

        const newVariation = {
            isOpen: true,
            isOpenModal: true,
            price: null,
            sale_price: null,
            coast: null,
            stockCode: "",
            stockAmount: 0,
            isStockManagement: false,
            product_id: productState.product.id,
            terms: [],
        };

        try {
            const { data, pending, refresh, error } = await useBaseOFetchWithAuth("variations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newVariation),
                cache: false,
            });


            // Şimdi, yeni oluşturulan varyasyon için şablon term'leri oluşturalım:
            const createdVariation = data.value.variation;
            createdVariation.terms = [];
            attrsAndVarsState.attributes.forEach((attribute) => {
                if (attribute.useForVariation == 0) {
                    return;
                }
                const templateTerm = {
                    product_variation_id: createdVariation.id,
                    product_term_id: "null",
                    product_term: {
                        product_attribute_id: attribute.product_attribute_id,
                        term_id: null,
                    },
                };
                createdVariation.terms.push(templateTerm);
            });

            // createdVariation.terms'i product_attribute_id'ye göre sıralayın
            createdVariation.terms.sort(
                (a, b) =>
                    a.product_term.product_attribute_id -
                    b.product_term.product_attribute_id
            );

            // Eğer term'ler oluşturulduysa, varyasyonu listeye ekleyin.
            if (createdVariation.terms.length > 0) {
                attrsAndVarsState.variations.unshift(createdVariation);
            }
        } catch (e) {
            console.error("Beklenmedik bir hata oluştu:", e);
        }
    };


    async function createAllVariation(productId) {
        // Tüm nitelikleri ve bu niteliklere ait termleri alalım.
        const attributesWithTerms = attributeState.attributes.filter(
            (attribute) => attribute.product_attribute_terms && attribute.product_attribute_terms.length > 0
        );

        // Tüm kombinasyonları oluşturmak için bir yardımcı fonksiyon
        function generateCombinations(arrays) {
            return arrays.reduce(
                (acc, curr) => acc.map((a) => curr.map((c) => a.concat([c]))).flat(),
                [[]]
            );
        }

        // Tüm termleri bir diziye alalım.
        const termsArrays = attributesWithTerms.map((attribute) =>
            attribute.product_attribute_terms.map((term) => term.product_attribute_term_id)
        );

        // Tüm kombinasyonları oluşturalım.
        const allCombinations = generateCombinations(termsArrays);

        // Oluşturulan kombinasyonları kullanarak varyasyonları oluşturalım.
        const allVariations = allCombinations.map((combination) => ({
            isOpen: false,
            price: null,
            sale_price: null,
            coast: null,
            stockCode: "",
            stockAmount: 0,
            isStockManagement: false,
            product_id: productState.product.id,
            terms: combination.map((termId, index) => ({
                product_variation_id: null, // Bu değer varyasyon oluşturulduktan sonra atanacak.
                product_attribute_term_id: termId,
                product_attribute: {
                    product_attribute_id: attributesWithTerms[index].product_attribute_id,
                    term_id: termId,
                },
            })),
        }));

            await useBaseOFetchWithAuth("variations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(allVariations),
        });

        await variationState.fetchVariations(productId);
    }

    const saveVariations = async (productId, variations) => {

        try {
            await useBaseOFetchWithAuth(`products/${productId}/variations/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ variations }),
            });

            await variationState.fetchVariations(productId);

        } catch (error) {

            console.log(error)
        }
    };



    const deleteAllVariations = async (productId) => {
        try {
            await useBaseOFetchWithAuth("products/" + productId + "/variations", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            await variationState.fetchVariations(productId);

        } catch (e) {

            console.error("Beklenmedik bir hata oluştu:", e);
        }
    };



   



    return {
        deleteVariationOnState,
        getSelectedVariation,
        createOneVariation,
        createAllVariation,
        saveVariations,
        deleteAllVariations,
   
    }
}