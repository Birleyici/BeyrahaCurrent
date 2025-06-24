export const useVariations = () => {

    const productState = useProductState()
    const attrsAndVarsState = useAttrsAndVarsState()
    const variationState = useVariationState();
    const attributeState = useAttributeState();
    const toast = useToast()

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
            toast.add({
                title: 'Hata!',
                description: 'Varyasyon oluşturmak için en az bir niteliğin varyasyon için kullanılması gerekir.',
                color: 'red',
            });
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
            stock_status: 'in_stock',
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
                
                toast.add({
                    title: 'Varyasyon oluşturuldu!',
                    description: 'Yeni varyasyon başarıyla oluşturuldu.',
                    color: 'green',
                })
            }
        } catch (e) {
            console.error("Beklenmedik bir hata oluştu:", e);
            toast.add({
                title: 'Hata!',
                description: 'Varyasyon oluşturulurken bir hata oluştu.',
                color: 'red',
            })
        }
    };

    async function createAllVariation(productId) {
        try {
            // Sadece useForVariation=true olan nitelikleri al
            const attributesWithTerms = attributeState.attributes.filter(
                (attribute) => attribute.useForVariation == 1 && 
                attribute.product_attribute_terms && 
                attribute.product_attribute_terms.length > 0
            );

            // Eğer varyasyon için kullanılacak hiç attribute yoksa hata fırlat
            if (attributesWithTerms.length === 0) {
                throw new Error('Varyasyon oluşturmak için en az bir nitelik seçili olmalı ve bu niteliğin terimleri olmalıdır.');
            }

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

            // Eğer kombinasyon yoksa hata fırlat
            if (allCombinations.length === 0) {
                throw new Error('Varyasyon oluşturmak için geçerli terim kombinasyonu bulunamadı.');
            }

            // Oluşturulan kombinasyonları kullanarak varyasyonları oluşturalım.
            const allVariations = allCombinations.map((combination) => ({
                isOpen: false,
                price: null,
                sale_price: null,
                coast: null,
                stockCode: "",
                stockAmount: 0,
                isStockManagement: false,
                stock_status: 'in_stock',
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

            const response = await useBaseOFetchWithAuth("variations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(allVariations),
            });

            // Backend'den gelen senkronizasyon sonucunu göster
            const syncResult = response.sync_result || {};
            let syncMessage = '';
            
            if (syncResult.total_cleaned > 0) {
                const details = [];
                if (syncResult.orphaned > 0) details.push(`${syncResult.orphaned} yetim`);
                if (syncResult.duplicates > 0) details.push(`${syncResult.duplicates} tekrar eden`);
                if (syncResult.invalid > 0) details.push(`${syncResult.invalid} geçersiz`);
                
                syncMessage = ` (${details.join(', ')} varyasyon otomatik temizlendi)`;
            }

            await variationState.fetchVariations(productId);

            toast.add({
                title: 'Varyasyonlar oluşturuldu!',
                description: `${allVariations.length} adet varyasyon başarıyla oluşturuldu${syncMessage}`,
                color: 'green',
            })
        } catch (error) {
            console.error('Error creating all variations:', error);
            toast.add({
                title: 'Hata!',
                description: error.message || 'Varyasyonlar oluşturulurken bir hata oluştu.',
                color: 'red',
            })
            throw error;
        }
    }

    const saveVariations = async (productId, variations) => {
        try {
            const response = await useBaseOFetchWithAuth(`products/${productId}/variations/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    variations,
                    skipSync: true // Normal varyasyon kaydetme işleminde senkronizasyonu atla
                }),
            });

            await variationState.fetchVariations(productId);

            toast.add({
                title: 'Varyasyonlar kaydedildi!',
                description: 'Varyasyonlar başarıyla güncellendi',
                color: 'green',
            })
        } catch (error) {
            console.error('Error saving variations:', error);
            toast.add({
                title: 'Hata!',
                description: 'Varyasyonlar kaydedilirken bir hata oluştu.',
                color: 'red',
            })
            throw error;
        }
    }

    const deleteAllVariations = async (productId) => {
        try {
            const response = await useBaseOFetchWithAuth(`products/${productId}/variations/delete-all-with-cleanup`, {
                method: "DELETE",
            });

            await variationState.fetchVariations(productId);

            // Silme sonucunu göster
            const deletedCount = response.deleted_count || 0;
            const cleanupResult = response.cleanup_result || {};
            
            let message = `${deletedCount} varyasyon silindi`;
            if (cleanupResult.total_cleaned > 0) {
                message += ` (${cleanupResult.total_cleaned} geçersiz varyasyon temizlendi)`;
            }

            toast.add({
                title: 'Tüm varyasyonlar silindi!',
                description: message,
                color: 'orange',
            })
        } catch (error) {
            console.error('Error deleting all variations:', error);
            toast.add({
                title: 'Hata!',
                description: 'Varyasyonlar silinirken bir hata oluştu.',
                color: 'red',
            })
            throw error;
        }
    }

    /**
     * Manuel varyasyon temizliği yapar
     */
    const cleanupVariations = async (productId) => {
        try {
            const response = await useBaseOFetchWithAuth(`products/${productId}/variations/cleanup`, {
                method: "POST",
            });

            await variationState.fetchVariations(productId);

            const cleanupDetails = response.cleanup_details || {};
            const totalCleaned = cleanupDetails.total_cleaned || 0;

            if (totalCleaned > 0) {
                const details = [];
                if (cleanupDetails.orphaned > 0) details.push(`${cleanupDetails.orphaned} yetim`);
                if (cleanupDetails.duplicates > 0) details.push(`${cleanupDetails.duplicates} tekrar eden`);
                if (cleanupDetails.invalid > 0) details.push(`${cleanupDetails.invalid} geçersiz`);
                if (cleanupDetails.deactivated > 0) details.push(`${cleanupDetails.deactivated} deaktif`);

                toast.add({
                    title: 'Varyasyon temizliği tamamlandı!',
                    description: `${details.join(', ')} varyasyon temizlendi`,
                    color: 'green',
                })
            } else {
                toast.add({
                    title: 'Temizlik gerekmiyor!',
                    description: 'Tüm varyasyonlar zaten geçerli durumda',
                    color: 'blue',
                })
            }
        } catch (error) {
            console.error('Error cleaning up variations:', error);
            toast.add({
                title: 'Hata!',
                description: 'Varyasyon temizliği sırasında bir hata oluştu.',
                color: 'red',
            })
            throw error;
        }
    }

    return {
        deleteVariationOnState,
        getSelectedVariation,
        selectedOptions,
        createOneVariation,
        createAllVariation,
        saveVariations,
        deleteAllVariations,
        cleanupVariations
    }
}