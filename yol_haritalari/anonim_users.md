YOL HARİTASI
-anonymous_users adında bir tablo oluştur uuid, name(ANON-25124 gibi(sayıyı idden alabilir)otomatik oluştur) sütunları olsun
-bir kullanıcı etkileşime girdiğinde (sepete ekleme vs) kullanıcı eğer oturum açmadıysa
bir anonim kullanıcı oluştur ve id sini auth store da anonymous_user.id ve anonymous_user.name'ini kaydet
-sepete ekleme ve sipariş verme işlemlerini bu id ile yap. dolayısıyla carts ve orders tablolarına
anonim kullanıcı id sini bağla.

GVENLİK
-Sipariş verdikten sonra telefon onayıyla sipariş iptali ve adres değişikliği yapabilsin.
-Dolayısıyla 1 ay kadar bir süre bilgileri çerezde saklanabilir.