import { defineStore } from 'pinia';

export const useVariationState = defineStore('variationState', () => {

    const variations = ref([])
    const transformedVariations = ref([])

    const fetchVariations = async (productId) => {

        if (productId == null) { return }

        const response = await useBaseOFetchWithAuth(`products/${productId}/variations`);

        variations.value = response.variations
    }

    const deleteVariation = async (variationData) => {
        try {
            const response = await useBaseOFetchWithAuth("variations/" + variationData.id, { method: "DELETE" });
            
            // Backend'den gelen senkronizasyon sonucunu işle
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

            // Varyasyonları state'den kaldır
            deleteVariationOnState(variationData.id);

            // Toast bildirimi göster
            const toast = useToast();
            toast.add({
                title: 'Varyasyon silindi!',
                description: `Varyasyon başarıyla silindi${cleanupMessage}`,
                color: 'red',
            });

            return response;

        } catch (error) {
            console.error('Varyasyon silme hatası:', error);
            
            const toast = useToast();
            toast.add({
                title: 'Hata!',
                description: 'Varyasyon silinirken bir hata oluştu.',
                color: 'red',
            });
            
            throw error;
        }
    };

    function deleteVariationOnState(id) {

        variations.value = variations.value.filter(variation => variation.id !== id)
    }

    // Orphaned varyasyonları temizleme fonksiyonu
    const cleanupOrphanedVariations = (validAttributeTermIds) => {
        variations.value = variations.value.filter(variation => {
            // Eğer varyasyonun hiç termi yoksa orphaned
            if (!variation.terms || variation.terms.length === 0) {
                return false;
            }

            // Varyasyonun tüm termlerinin hala mevcut olup olmadığını kontrol et
            return variation.terms.every(term => {
                return validAttributeTermIds.includes(term.product_attribute_term_id);
            });
        });
    }


    return { variations, transformedVariations, fetchVariations, deleteVariation, cleanupOrphanedVariations }
})










