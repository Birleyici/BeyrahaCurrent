YOL HARİTASI

Varyasyon tarafı

management
(tamam) -varyasyona sadece 1 adet görsel seçilebilecek
(tamam) -seçilen görsel varyasyonun (oluşturulacak olan)image_id sütununa eklenecek
-varyasyonun resim seçme görsel butonu seçildiğinde seçilen resimle dolacak, 
tekrar tıklandığında değiştirilebilecek

frontend
(tamam) -kullanıcı varyasyonu seçtiğinde eğer varyasyon görseli varsa görsel selectedImages'in 
en başına unshift edilecek 
(tamam) -başka bir varyasyon seçildiğinde onunda varsa onunla replace edilecek
(tamam) -başka bir varyasyon seçildiğinde görseli yoksa baştaki değer kaldırılacak

Term tarafı

management
-Renk attribute'un ui'ı diğerlerinden farklı olacak
-Eklenen termlere yani renklere görseller seçilebilecek

frontend
-Renk kısmında eğer rengin görseli varsa görsellerinden ilki yuvarlak içerisinde görünecek
-Eğer fotoğraf seçilmediyse renk ismi yazılacak
-Term seçildiğinde eğer terme ait resimler varsa selectedColorImages anahtarına yazılsın
-Eğer resmi olmayan bir terme tıklanırsa selectedColorImages boşaltılsın
-Eğer selectedColorImages doluysa onu değilse normal selectedImages verisini gösterecek şekilde
galeri ayarlansın


Database tarafı
(tamam)-product_variation a image_id eklenecek ve
-variation_images > product_color_term_images olarak değiştirilecek product_term_id ve image_id leri olacak
-Bu değişiklik gereğince kod üzerinde gerekli dzenlemeler yapılacak