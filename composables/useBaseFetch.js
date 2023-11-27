export const useBaseFetch = async (url, options = {}) => {
    let data = null;
    let pending = true;
    let error = null;

    // İstek yapma işlemini gerçekleştiren asıl fonksiyon
    const fetchData = async () => {
        try {
            // İstek yapılıyor
            data = await $fetch(`http://localhost/laravel-api/public/api/${url}`, options);
        } catch (err) {
            // Hata yakalandı
            console.error('Hata oluştu:', err);
            error = err.message || 'Bir hata oluştu';

            if (err.response) {
                // HTTP durum kodu, yanıt içeriği vb. gibi sunucu tarafından dönen yanıt
                console.log('Sunucu Yanıtı:', err.response);
            } else if (err.request) {
                // İstek yapıldı, ama sunucudan yanıt alınamadı
                console.log('Sunucudan Yanıt Alınamadı');
            } else {
                // İstek yapılırken bir hata oluştu
                console.log('İstek Hatası:', err.message);
            }
        } finally {
            pending = false;
        }
    };

    // İlk isteği yap
    await fetchData();

    // `refresh` fonksiyonu, isteği tekrar yapmak için kullanılabilir
    const refresh = async () => {
        pending = true;
        error = null;
        await fetchData();
    };

    return { data, pending, error, refresh };
};
