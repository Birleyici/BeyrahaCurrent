

export const useVariationsFront = () => {

    const { useProductState, useVariationsFrontState, useAttributeState } = useStateIndex()
    const productState = useProductState();
    const variationsFrontState = useVariationsFrontState()
    const attributeState = useAttributeState()

    const fetchVariationsForFrontEnd = async (productId) => {


        const response = await useBaseOFetch(`front/products/${productId}/variations`)

        if (response) {
            variationsFrontState.variations = response;
        }

        return response
    };

    function transform(attributes, variations) {


        let newAttrs = [];
        attributes.forEach((a) => {
            const obj = {};
            obj.name = a.attribute_name;

            // Yalnızca varyasyonlarda bulunan attribute ve term'leri ekle
            const termDetails = a.product_terms.filter(term => {
                return variations.some(variation => variation.attributes[a.attribute_name] === term.term_name);
            }).map(item => {
                return {
                    term_name: item.term_name,
                    term_images: item.term_images.map((image) => ({
                        id: image.id,
                        path: image.path
                    }))
                };
            });

            if (termDetails.length > 0) {
                obj.options = termDetails;
                newAttrs.push(obj);
            }
        });
        return newAttrs || [];
    }

    const filteredVariations = computed(() => {
        return variationsFrontState.variations.filter(variation => {
            return variation.price || variation.sale_price;
        });
    });

    const isActive = computed(() => (attributeName, option) => {
        let tempSelected = { ...selectedOptions.value, [attributeName]: option };

        return filteredVariations.value.some((variation) => {
            return Object.keys(tempSelected).every((key) => {
                if (!variation.attributes[key]) return true;
                return variation.attributes[key] === tempSelected[key];
            });
        });
    });

    const getSelectedVariation = computed(() => {
        // Seçili seçeneklerin olup olmadığını ve tüm attribute terimlerinin seçilip seçilmediğini kontrol et
        const hasSelectedOptions = Object.keys(selectedOptions.value).length === attributeState?.transformedAttrs?.length;

        // Eğer tüm attribute terimleri seçilmemişse, null dön
        if (!hasSelectedOptions) {
            return null;
        }

        // İlk tam eşleşen varyasyonu bul
        let selectedVariation = variationsFrontState.variations.find((variation) => {
            return Object.keys(selectedOptions.value).every((key) => {
                return variation.attributes[key] === selectedOptions.value[key];
            });
        });

        // Eğer tam eşleşen bir varyasyon bulamazsanız, kısmi eşleşen varyasyonu bul
        if (!selectedVariation) {
            selectedVariation = useVariationsFrontState.variations.find((variation) => {
                return Object.keys(selectedOptions.value).every((key) => {
                    return (
                        !variation.attributes[key] ||
                        variation.attributes[key] === selectedOptions.value[key]
                    );
                });
            });
        }

        return selectedVariation;
    });


    const selectedOptions = ref({});

    const selectOption = (attributeName, option, colorTerm = null) => {
        if (colorTerm) {
            productState.product.selectedColorTermImages = colorTerm.term_images;
        }

        selectedOptions.value = { ...selectedOptions.value, [attributeName]: option };

        if (getSelectedVariation.value?.image) {
            const selectedVarImg = { ...getSelectedVariation.value.image, added: true };
            if (productState.product.selectedImages[0]?.added) {
                productState.product.selectedImages[0] = selectedVarImg;
            } else {
                productState.product.selectedImages.unshift(selectedVarImg);
            }
        } else if (productState.product.selectedImages[0]?.added) {
            productState.product.selectedImages.shift();
        }
    };

    const isSelected = (attributeName, option) => {
        return selectedOptions.value[attributeName] === option;
    };

    const getTermImageSrc = (item, termName) => {
        const imagePath = item?.term_images?.[0]?.path;
        return imagePath ? `aws${imagePath}` : `https://placehold.co/100x100?text=${termName}`;
    };

    return {
        fetchVariationsForFrontEnd,
        isActive,
        selectOption,
        isSelected,
        getSelectedVariation,
        transform,
        getTermImageSrc
    };
};
