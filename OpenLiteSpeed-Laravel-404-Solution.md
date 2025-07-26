# OpenLiteSpeed Laravel 404 Hatası Çözümü

## 🚨 Problem
- Laravel projesi PHP CLI'dan çalışıyor ama web sunucusundan 404 hatası veriyor
- OpenLiteSpeed 8080 portunda "404 Not Found" gösteriyor
- API endpoint'leri erişilemiyor

## 🔍 Ana Sorun Kaynakları
1. **Virtual Host Document Root Hatası**
2. **PHP Handler (LSPHP) Eksikliği**
3. **Virtual Host Listener Mapping Sorunu**
4. **Log Dosyası İzin Sorunları**

## ✅ Çözüm Adımları

### 1. Log Dizinlerini Oluştur
```bash
mkdir -p /var/www/beyraha-api/logs
chown -R www-data:www-data /var/www/beyraha-api/logs
chmod -R 755 /var/www/beyraha-api/logs
```

### 2. Laravel Virtual Host Yapılandırması
`/usr/local/lsws/conf/vhosts/laravel.conf`:
```nginx
docRoot                   /var/www/beyraha-api/public
enableGzip                1

errorlog /var/www/beyraha-api/logs/error.log {
  useServer               0
  logLevel                DEBUG
  rollingSize             10M
}

accesslog /var/www/beyraha-api/logs/access.log {
  useServer               0
  rollingSize             10M
  keepDays                30
}

index  {
  useServer               0
  indexFiles              index.php, index.html
}

scripthandler  {
  add                     lsphp83 php
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
}
```

### 3. Ana Config'e PHP Handler Ekle
`/usr/local/lsws/conf/httpd_config.conf` sonuna:
```nginx
extprocessor lsphp83 {
  type                    lsphp
  address                 uds://tmp/lshttpd/lsphp.sock
  maxConns                35
  env                     PHP_LSAPI_CHILDREN=35
  initTimeout             60
  retryTimeout            0
  enableSpdy              1
  command                 /usr/local/lsws/lsphp83/bin/lsphp
}
```

### 4. Listener Mapping Kontrolü
8080 portundaki listener'ın doğru virtual host'a bağlı olduğunu kontrol et:
```nginx
listener HTTP-8080 {
  address                 *:8080
  secure                  0
  map                     Laravel *
}
```

### 5. Servisi Yeniden Başlat
```bash
systemctl restart lsws
```

## 🧪 Test
```bash
curl http://localhost:8080
# Laravel ana sayfası görünmeli

curl http://localhost:8080/api
# API endpoint'i test et
```

## 📋 Kontrol Listesi
- [x] PHP LSPHP83 kurulu mu? (`/usr/local/lsws/lsphp83/bin/lsphp`)
- [x] Document Root doğru mu? (`/var/www/beyraha-api/public`)
- [x] Log dizinleri var ve yazılabilir mi?
- [x] Virtual Host'ta PHP handler tanımlı mı? (`lsphp83`)
- [x] Listener doğru virtual host'a map edilmiş mi?
- [x] Laravel cache temizlenmiş mi? (`php artisan config:clear`)

## 🔧 Debug Komutları
```bash
# Yapılandırma test et
/usr/local/lsws/bin/lshttpd -t

# Log'ları kontrol et
tail -f /var/www/beyraha-api/logs/error.log
tail -f /usr/local/lsws/logs/error.log

# PHP sürümü kontrol et
php --version
```

## ⚠️ Yaygın Hatalar
1. **"Unknown external processor lsphp"** → PHP handler eksik
2. **"missing <fileName> in <errorlog>"** → Log dosyası yolu yanlış
3. **"<suffix> is invalid: php"** → Script handler yanlış tanımlanmış
4. **404 Not Found** → Document Root veya Listener mapping yanlış

## 📝 Notlar
- OpenLiteSpeed'de 404 sayfası built-in, dosya silmek çözmez
- Virtual Host değişiklikleri için **Graceful Restart** gerekli
- Laravel için `.htaccess` dosyası ve rewrite kuralları önemli
- PHP CLI çalışması web sunucusu çalışması anlamına gelmez

---
**Toplam Çözüm Süresi:** ~3 saat  
**Zorluk:** Orta  
**Son Test:** Laravel ana sayfası başarıyla görüntüleniyor ✅ 