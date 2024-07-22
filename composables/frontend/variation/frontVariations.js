import { useNewProductStore } from "~/store/newProduct.js";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";

export const useVariationsFront = () => {
    const productState = useNewProductStore();
    const attrsAndVarsState = useAttrsAndVarsState();

    const fetchVariationsForFrontEnd = async () => {
        const { data, error } = await useBaseFetch("front/products/" + productState.id + "/variations");

        if (data.value && !error.value) {
            attrsAndVarsState.variations = data.value;
        }
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
        return attrsAndVarsState.variations.filter(variation => {
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
        const hasSelectedOptions = Object.keys(selectedOptions.value).length === attrsAndVarsState.attributes.length;
    
        // Eğer tüm attribute terimleri seçilmemişse, null dön
        if (!hasSelectedOptions) {
            return null;
        }
    
        // İlk tam eşleşen varyasyonu bul
        let selectedVariation = attrsAndVarsState.variations.find((variation) => {
            return Object.keys(selectedOptions.value).every((key) => {
                return variation.attributes[key] === selectedOptions.value[key];
            });
        });
    
        // Eğer tam eşleşen bir varyasyon bulamazsanız, kısmi eşleşen varyasyonu bul
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
    });
    

    const selectedOptions = ref({});

    const selectOption = (attributeName, option, colorTerm = null) => {
        if (colorTerm) {
            productState.selectedColorTermImages = colorTerm.term_images;
        }

        selectedOptions.value = { ...selectedOptions.value, [attributeName]: option };

        if (getSelectedVariation.value?.image) {
            const selectedVarImg = { ...getSelectedVariation.value.image, added: true };
            if (productState.selectedImages[0]?.added) {
                productState.selectedImages[0] = selectedVarImg;
            } else {
                productState.selectedImages.unshift(selectedVarImg);
            }
        } else if (productState.selectedImages[0]?.added) {
            productState.selectedImages.shift();
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
