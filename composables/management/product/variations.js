import { useNewProductStore } from "~/store/newProduct.js";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";

export const useVariations = () => {

    const productState = useNewProductStore()
    const attrsAndVarsState = useAttrsAndVarsState()


    let productId = computed(() => {
        return productState.id || useRoute().params.id
    });

    const fetchVariationsForFrontEnd = async () => {

        const {
            data, error
        } = await useBaseFetch("page/products/" + productState.id + "/variations");

        if (data.value && !error.value) {

            attrsAndVarsState.variations = data.value
        }

    }


    // Tüm varyasyonları döndüren computed property
    const filteredVariations = computed(() => {
        return attrsAndVarsState.variations.filter(variation => {
            // Price ve sale_price her ikisi de null veya boş olanları filtrele
            return variation.price || variation.sale_price;
        });
    });

    // Seçeneklerin aktif olup olmadığını kontrol eden computed property
    const isActive = computed(() => (attributeName, option) => {
        let tempSelected = { ...selectedOptions.value, [attributeName]: option };

        return filteredVariations.value.some((variation) => {
            return Object.keys(tempSelected).every((key) => {
                if (!variation.attributes[key]) return true; // Öznitelik varyasyonda yoksa doğru olarak kabul ediyoruz.
                return variation.attributes[key] === tempSelected[key];
            });
        });
    });


    const fetchVariations = async (id) => {

        const { data, error } = await useBaseFetch("products/" + id + "/variations");

        attrsAndVarsState.variations = data.value

        if (!error.value) {
            attrsAndVarsState.variations.variations.forEach((variation) => {
                if (!variation.terms || variation.terms.length < attrsAndVarsState.attributes.length) {
                    let missingTerms = [];

                    attrsAndVarsState.attributes.forEach((attribute) => {
                        if (attribute.useForVariation == 0) {
                            return;
                        }

                        if (!variation.terms.some((term) => term.product_term.product_attribute_id === attribute.product_attribute_id)) {
                            const templateTerm = {
                                product_variation_id: variation.id,
                                useForVariation: attribute.useForVariation,
                                product_term_id: "null",
                                product_images: variation.product_images,
                                product_term: {
                                    product_attribute_id: attribute.product_attribute_id,
                                    term_id: null,
                                },
                            };
                            missingTerms.push(templateTerm);
                        }

                    });

                    variation.terms = missingTerms.concat(variation.terms);
                }

                if (variation.variation_image && typeof variation.variation_image === 'string') {
                    try {
                        variation.variation_image = JSON.parse(variation.variation_image);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        // Hatalı parse işlemi için hata işleme
                    }
                }

                // Gerçek ve şablon term'lerini product_attribute_id'ye göre sıralayın
                variation.terms.sort((a, b) => a.product_term.product_attribute_id - b.product_term.product_attribute_id);
            });
        }
        attrsAndVarsState.variations = attrsAndVarsState.variations.variations;
    }


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

    const selectOption = (attributeName, option, colorTerm=null) => {

        if(colorTerm){
            productState.selectedColorTermImages = colorTerm.term_images
        }



        selectedOptions.value = { ...selectedOptions.value, [attributeName]: option };

        //varyasyona ait image varsa selectedImages'in en başına unshiftliyoruz.
        if (getSelectedVariation.value.image) {

            const selectedVarImg = { ...getSelectedVariation.value.image, added: true }
            if (productState.selectedImages[0]?.added) {
                productState.selectedImages[0] = selectedVarImg
            } else {
                productState.selectedImages.unshift(selectedVarImg)
            }
            

        } else if (productState.selectedImages[0]?.added) {

            productState.selectedImages.shift()

        }
    };



    const isSelected = (attributeName, option) => {
        return selectedOptions.value[attributeName] === option;
    };

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
            product_id: productState.id,
            terms: [],
        };

        try {
            const { data, pending, refresh, error } = await useBaseFetch("variations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newVariation),
                cache: false,
            });

            console.log(data, error)

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


    async function createAllVariation() {
        // Tüm nitelikleri ve bu niteliklere ait termleri alalım.
        const attributesWithTerms = attrsAndVarsState.attributes.filter(
            (attribute) => attribute.product_terms && attribute.product_terms.length > 0
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
            attribute.product_terms.map((term) => term.product_term_id)
        );

        // Tüm kombinasyonları oluşturalım.
        const allCombinations = generateCombinations(termsArrays);

        // Oluşturulan kombinasyonları kullanarak varyasyonları oluşturalım.
        const allVariations = allCombinations?.map((combination) => ({
            isOpen: false,
            price: null,
            sale_price: null,
            coast: null,
            stockCode: "",
            stockAmount: 0,
            isStockManagement: false,
            product_id: productState.id,
            terms: combination?.map((termId, index) => ({
                product_variation_id: null, // Bu değer varyasyon oluşturulduktan sonra atanacak.
                product_term_id: termId,
                product_term: {
                    product_attribute_id: attributesWithTerms[index].product_attribute_id,
                    term_id: termId,
                },
            })),
        }));

        const { data, pending, refresh, error } = await useBaseFetch("variations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(allVariations),
            cache: false,
        });

        if (error.data == null) {
            await fetchVariations(productState.id);
        }
    }

    const saveVariations = async () => {

        try {
            await useBaseOFetch(`products/${productState.id}/variations/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ variations: attrsAndVarsState.variations }),
            });

            await fetchVariations(productState.id);

        } catch (error) {

            console.log(error)
        }
    };



    const deleteAllVariations = async (productId) => {
        try {
            await useBaseFetch("products/" + productId + "/variations", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            await fetchVariations(productId);

        } catch (e) {

            console.error("Beklenmedik bir hata oluştu:", e);
        }
    };


    const findValueInAttrs = (
        data,
        product_term_id,
        attribute_id,
        attribute_name
    ) => {
        const attribute = data.find((e) => e.product_attribute_id == attribute_id);

        // Eğer belirli bir attribute_id'ye sahip öğe bulunmazsa, hemen bir default değer döndürelim.
        if (!attribute) return `Herhangi Bir ${attribute_name}`;

        const term = attribute.product_terms?.find(
            (d) => d.product_term_id == product_term_id
        );

        return term?.term_name || `Herhangi Bir ${attribute.attribute_name}`;
    };

    const deleteVariation = async (id) => {

        await useBaseFetch("variations/" + id, { method: "DELETE" });
        deleteVariationOnState(id);

    };



    return {
        deleteVariationOnState,
        fetchVariations,
        fetchVariationsForFrontEnd,
        isActive,
        selectOption,
        isSelected,
        getSelectedVariation,
        createOneVariation,
        createAllVariation,
        saveVariations,
        deleteAllVariations,
        findValueInAttrs,
        deleteVariation,
    }
}