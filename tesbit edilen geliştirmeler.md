-media modaldaki resimlere alt ekleme özelliği eklenecek.
-bir pluginle site içerisinde kullanılan linkler tek bir yerde toplanacak.
-bir müşteri sipariş verip daha sonra siparişine ekleme yapmak istediğinde
eğer adres aynı ise ve aldığı yeni ürünlerin sahibi olan mağazalar ürünleri kargolamadıysa
o subOrder a eklenir. (geliştirilmesi gereken özellik)
-Eğer bir müşteri bir mağazadan sipariş verdiyse ve daha sonra aynı adrese tekrar sipariş verdiyse
her iki sipariş sayfasında müşterinin aynı adrese başka siparişleri olduğu uyarısı verilir.

VERİLEN SİPARİŞİN İPTALİ / DÜZENLENMESİ
-Müşteri siparişi siparişlerim sayfasından iptal edebilsin. 
*iptal edildikten sonra zaten sipariş için kargo kodu alınamaz. 
*eğer kargo kodu alındıysada iptal edilemesin.
*kargo kendisine gelir, teslim alır ve iade işlemi başlatır.
-Sipariş adresi ve sipariş notu/inputu  gibi düzenlemeler haricinde
*siparişe ürün ekleme, çıkarma gibi olaylar olmayacak.
*Müşteri eğer ödemeyi yapmadıysa, siparişi iptal eder. yeni sipariş girer.
*eğer ödemeyi yaptıysa siparişi iptal eder iadesi yapılır tekrar sipariş verirse tekrar ödeme yapar.

SİPARİŞ NOTLARI
-Sipariş  notları ürün inputlarından yönetilecek ekstra bir sipariş notu olmayacak.
-Müşteri notu değiştirmek istediğinde zaten düzenlenebilecek.
-Not özelliği eklenmemiş ürünler için not alımı sistemde olmayacak ama müşteri satıcıyla iletişime geçip
isteğini söyleyebilir.
-wc deki gibi sipariş notları sistemi dah sonra yapılabilir.

ANONİM USER İD
-Otantike olmamış olan kullanıcılar için sepete ekleme, adres ekleme vs gibi işlemler için anonim user sistemi oluşturalım. o anonim user ın id si ile cart ve adres işlemlerini yapalım. böylelikle anonim kullanıcının da cart'ındaki ürünleri güncel tutabiliriz.