YOL HARİTASI
- cart_item_product_inputs pivot tablosu oluşturulur
- cart_item_id ve product_input_id, value sütunları olur
- cart_item_id ve product_inut id beraber unique olmalı
- sepete bir item eklendiğinde cart_item_product_inputs anahtarı altında
[
    {
    id : product_inputs id'si
    label : input labeli
    value: kullanıcının product_input a girdiği değer 
} 
]
verisi kaydedilir.
-Backendde cart_item_product_inputs da gelen veriler döngüye alınır. cart_item_product_inputs tablosuna
gelen product_input id si ve cart_item id si ve valuesi kaydedilir. 
-Cart, order'a aktarılırken cart_item_product_inputs daki veri sub_order_inputs tablosuna aktarılır.
-Bu tabloda order_item_id, label ve value input_id(on delete set null[raporlama için sütun]) sütunları bulunur. 

*Eğer bir input üründen kaldırılırsa otantike kullanıcının sepetinden ürün delete cascade 
ile otomatik kalkar.
