export const useAttributes = () => {

    const attrsAndVarsState = useAttrsAndVarsState()
    const attributeState = useAttributeState()
    const variationState = useVariationState()
    const productState = useProductState()
    const toast = useToast()



    const addAttr = () => {

        const item = attrsAndVarsState.selectedAttrObj

        // attributes içerisinde bu attribute_id'ye sahip bir öğe olup olmadığını kontrol ediyoruz.
        const isAttributeExists = attributeState.attributes.some(
            (attr) => attr.attribute_id === item.id
        );

        // Eğer bu ID'ye sahip bir öğe zaten varsa veya attributes uzunluğu 30'dan fazla ise, yeni bir öğe eklemiyoruz.
        if (!isAttributeExists && attributeState.attributes.length < 30) {
            attributeState.attributes.unshift({
                attribute_id: item.id,
                attribute_name: item.text,
                isOpen: true,
                useForVariation: false,
                showProductPage: true,
                termWord: "",
                product_attribute_terms: [],
            });

            toast.add({
                title: 'Nitelik eklendi!',
                description: `${item.text} niteliği başarıyla eklendi.`,
                color: 'green',
            })
        } else if (isAttributeExists) {
            toast.add({
                title: 'Bu nitelik zaten var!',
                description: `${item.text} niteliği daha önce eklenmiş.`,
                color: 'orange',
            })
        }
    }

    const addTerm = async (attr) => {
        if (!attr.termWord || attr.termWord.length > 25) {
            toast.add({
                title: 'Geçersiz terim!',
                description: 'Terim adı 1-25 karakter arasında olmalıdır.',
                color: 'red',
            })
            return;
        }

        // Aynı isimde terim var mı kontrol et
        if (attr.product_attribute_terms.some((t) => t.term_name === attr.termWord)) {
            toast.add({
                title: 'Bu terim zaten var!',
                description: `"${attr.termWord}" terimi daha önce eklenmiş.`,
                color: 'orange',
            })
            return;
        }

        // Eğer ürün ID'si varsa backend'e kaydet
        if (productState.product?.id) {
            try {
                const response = await useBaseOFetchWithAuth(
                    `products/${productState.product.id}/attributes/${attr.attribute_id}/terms`,
                    {
                        method: 'POST',
                        body: {
                            term_name: attr.termWord
                        }
                    }
                );

                // Backend'den dönen terim bilgisini kullan
                attr.product_attribute_terms.push(response.term);
                
                toast.add({
                    title: 'Terim eklendi!',
                    description: `"${attr.termWord}" terimi başarıyla eklendi ve kaydedildi.`,
                    color: 'green',
                })

                attr.termWord = "";
            } catch (error) {
                console.error('Terim ekleme hatası:', error);
                toast.add({
                    title: 'Hata!',
                    description: 'Terim eklenirken bir hata oluştu.',
                    color: 'red',
                })
            }
        } else {
            // Ürün henüz kaydedilmemişse sadece frontend'e ekle (eski davranış)
            attr.product_attribute_terms.push({ 
                term_name: attr.termWord, 
                term_images: [] 
            });
            
            toast.add({
                title: 'Terim eklendi!',
                description: `"${attr.termWord}" terimi başarıyla eklendi.`,
                color: 'green',
            })

            attr.termWord = "";
        }
    };


    const fetchAttributes = async (id) => {

        if (id == null) { return }

        const response = await useBaseOFetchWithAuth(`products/${id}/attributes`)

        // Her iki state'i de güncelle
        attrsAndVarsState.attributes = response
        attributeState.attributes = response

    }

    // Geçerli attribute term ID'lerini topla
    const getValidAttributeTermIds = () => {
        const validIds = [];
        attributeState.attributes.forEach(attr => {
            attr.product_attribute_terms.forEach(term => {
                if (term.product_attribute_term_id) {
                    validIds.push(term.product_attribute_term_id);
                }
            });
        });
        return validIds;
    }

    const removeTerm = async (term, terms) => {

        if (term.product_attribute_term_id) {

            console.log('🔥 DELETING TERM:', term.product_attribute_term_id, 'from product:', productState.product.id);

            term.loading = true
            try {
                const response = await useBaseOFetchWithAuth(
                    "product-terms/" + term.product_attribute_term_id,
                    {
                        method: "DELETE",
                    }
                );

                console.log('✅ BACKEND RESPONSE:', response);

                // Term UI'dan kaldır
                const index = terms.indexOf(term);
                if (index !== -1) {
                    terms.splice(index, 1);
                }

                // Backend'den gelen senkronizasyon sonucunu göster
                const syncDetails = response.sync_details || {};
                let cleanupMessage = '';
                
                if (syncDetails.total_cleaned > 0) {
                    const details = [];
                    if (syncDetails.orphaned > 0) details.push(`${syncDetails.orphaned} yetim`);
                    if (syncDetails.duplicates > 0) details.push(`${syncDetails.duplicates} tekrar eden`);
                    if (syncDetails.invalid > 0) details.push(`${syncDetails.invalid} geçersiz`);
                    if (syncDetails.deactivated > 0) details.push(`${syncDetails.deactivated} deaktif`);
                    
                    cleanupMessage = ` (${details.join(', ')} varyasyon temizlendi)`;
                }

                // Varyasyonları yeniden fetch et
                await variationState.fetchVariations(productState.product.id);

                console.log('✅ VARIATIONS REFRESHED. NEW COUNT:', variationState.variations.length);

                toast.add({
                    title: 'Terim silindi!',
                    description: `"${term.term_name}" terimi silindi${cleanupMessage}`,
                    color: 'orange',
                })
            } catch (error) {
                console.error('❌ ERROR DELETING TERM:', error);
                toast.add({
                    title: 'Hata!',
                    description: 'Terim silinirken bir hata oluştu.',
                    color: 'red',
                })
            } finally {
                term.loading = false
            }
        } else {
            // Sadece UI'dan kaldır (henüz backend'e kaydedilmemiş)
            const index = terms.indexOf(term);
            if (index !== -1) {
                terms.splice(index, 1);
            }

            toast.add({
                title: 'Terim kaldırıldı!',
                description: `"${term.term_name}" terimi listeden kaldırıldı.`,
                color: 'orange',
            })
        }
    };

    const deleteAttr = async (attr) => {
        if (attr.product_attribute_id) {

            attr.loading = true
            try {
                const response = await useBaseOFetchWithAuth(
                    "product-attributes/" + attr.product_attribute_id,
                    {
                        method: "DELETE",
                    }
                );

                // Attribute'u UI'dan kaldır
                attributeState.attributes = attributeState.attributes.filter(attribute => attribute.product_attribute_id !== attr.product_attribute_id);

                // Backend'den gelen temizlik türünü kontrol et
                const cleanupType = response.cleanup_type || 'sync';
                const wasUsedForVariation = response.was_used_for_variation || false;
                const syncDetails = response.sync_details || {};
                
                let cleanupMessage = '';
                
                if (cleanupType === 'full_cleanup' && wasUsedForVariation) {
                    // Varyasyon için kullanılan nitelik silindiğinde tüm varyasyonlar temizlendi
                    const deletedCount = response.deleted_variations || 0;
                    cleanupMessage = ` (varyasyon niteliği olduğu için ${deletedCount} varyasyon tamamen temizlendi)`;
                } else if (syncDetails.total_cleaned > 0) {
                    // Normal senkronizasyon temizliği
                    const details = [];
                    if (syncDetails.orphaned > 0) details.push(`${syncDetails.orphaned} yetim`);
                    if (syncDetails.duplicates > 0) details.push(`${syncDetails.duplicates} tekrar eden`);
                    if (syncDetails.invalid > 0) details.push(`${syncDetails.invalid} geçersiz`);
                    if (syncDetails.deactivated > 0) details.push(`${syncDetails.deactivated} deaktif`);
                    
                    cleanupMessage = ` (${details.join(', ')} varyasyon temizlendi)`;
                }

                // Varyasyonları yeniden fetch et
                await variationState.fetchVariations(productState.product.id);

                toast.add({
                    title: 'Nitelik silindi!',
                    description: `"${attr.attribute_name}" niteliği silindi${cleanupMessage}`,
                    color: wasUsedForVariation ? 'orange' : 'red',
                })
            } catch (error) {
                toast.add({
                    title: 'Hata!',
                    description: 'Nitelik silinirken bir hata oluştu.',
                    color: 'red',
                })
            } finally {
                attr.loading = false
            }
        } else {
            // Sadece UI'dan kaldır (henüz backend'e kaydedilmemiş)
            attributeState.attributes = attributeState.attributes.filter(attribute => attribute.product_attribute_id !== attr.product_attribute_id);

            toast.add({
                title: 'Nitelik kaldırıldı!',
                description: `"${attr.attribute_name}" niteliği listeden kaldırıldı.`,
                color: 'orange',
            })
        }
    };




    const fetchGlobalAttrs = async () => {

        const response = await useBaseOFetchWithAuth(
            "attributes/global"
        );

        attrsAndVarsState.globalAttrs = response
    }


    return {
        deleteAttr,
        fetchAttributes,
        addAttr,
        addTerm,
        removeTerm,
        fetchGlobalAttrs,
        getValidAttributeTermIds,
    }
}