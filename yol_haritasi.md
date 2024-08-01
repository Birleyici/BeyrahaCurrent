YOL HARİTASI

*VariationTab daki adminpartialsvariation componentinin ihtiyacı olan obje

{

    ...product_variation verileri nin tamamı ve image_id sütunundan variation_imagesten ordanda image_id deenimages den path değeri variation_image anahtarında,
    product_variation_terms: [
        //product_variation_id ye göre varyasyonun tüm termlerini al
        {
            //product_term_id e göre product_terms tablosundaki term_id e göre terms tablosundan name'i al ve buraya dahil et
            term_name:
        }

    ]
}

TARTIŞMA
-Basitleştirme adına Varyasyon tab yapısının değerlendirilmesi 
0- varyasyon içerisindeki select olayını kaldır.
1- Varyasyonları oluştur, varyasyonları sil adında iki buton olur
2- Varyasyonları oluştur butonu daha önce varyasyonlar için eklenen tüm varyasyonları oluşturur
3- Bu butona her tıklandığında eksik oln varyasyonları generate eder.
(Opsiyonel ileride) 4- 3. bir alan aşağıda olarak bir select içerisinde
tüm varyasyonların fiyatını birim olarak arttır
tüm varyasyonların fiyatını yüzde olarak arttır
vs  gibi seçenekelr olur ve sağında bir girdi(değer için) ve sağında Toplu olarak güncelle butonu olur

