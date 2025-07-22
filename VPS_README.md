# 🚀 Beyraha VPS Kurulum Bilgileri

## 📍 **Server Bilgileri**
- **IP Adresi**: `69.62.121.214`
- **SSH Bağlantı**: `ssh root@69.62.121.214`
- **İşletim Sistemi**: Ubuntu/OpenLiteSpeed
- **Web Server**: Apache2 + OpenLiteSpeed

---

## 🎯 **Nuxt.js Frontend**
- **Dizin**: `/root/projects/BeyrahaCurrent`
- **Port**: `3000`
- **URL**: `http://69.62.121.214:3000`
- **Durum**: ✅ Aktif
- **Başlatma**: `cd /root/projects/BeyrahaCurrent && npm run dev`

---

## ⚡ **Laravel API**
- **Dizin**: `/var/www/beyraha-api`
- **Port**: `80` (Apache üzerinden)
- **URL**: `http://69.62.121.214/api`
- **Durum**: ✅ Aktif
- **Web Server**: Apache2
- **PHP Version**: 8.3

### Laravel Komutları
```bash
cd /var/www/beyraha-api
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🗄️ **phpMyAdmin**
- **Dizin**: `/var/www/phpmyadmin`
- **Port**: `80`
- **URL**: `http://69.62.121.214/phpmyadmin`
- **Kullanıcı**: `root`
- **Şifre**: `laravel123`
- **Web Server**: Apache2

### phpMyAdmin Sorun Giderme
```bash
# Apache yeniden başlat
systemctl restart apache2

# Symfony bağımlılıkları kontrol
cd /var/www/phpmyadmin
composer install --no-dev
```

---

## 🔧 **Önemli Servisler**

### Apache2
```bash
systemctl start apache2
systemctl stop apache2
systemctl restart apache2
systemctl status apache2
```

### OpenLiteSpeed
```bash
systemctl start lsws
systemctl stop lsws
systemctl restart lsws
```

### MySQL
```bash
systemctl start mysql
systemctl stop mysql
systemctl restart mysql
```

---

## 📁 **Dosya İzinleri**

### Laravel Storage İzinleri
```bash
cd /var/www/beyraha-api
chown -R www-data:www-data .
chmod -R 755 .
chmod -R 775 storage bootstrap/cache
```

### phpMyAdmin İzinleri
```bash
chown -R www-data:www-data /var/www/phpmyadmin
chmod -R 755 /var/www/phpmyadmin
```

---

## 🚦 **Port Durumları**
- **22**: SSH
- **80**: Apache (Laravel API + phpMyAdmin)
- **3000**: Nuxt.js Frontend
- **3306**: MySQL
- **7080**: OpenLiteSpeed Admin

---

## 🔍 **Faydalı Komutlar**

### Aktif Portları Kontrol Et
```bash
netstat -tlnp | grep LISTEN
```

### Disk Kullanımı
```bash
df -h
```

### Memory Kullanımı
```bash
free -h
```

### Log Dosyaları
```bash
# Apache Logs
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log

# Nuxt.js Logs
cd /root/projects/BeyrahaCurrent && npm run dev
```

---

## ⚠️ **Önemli Notlar**

1. **CORS Ayarları**: Laravel CORS config'de `http://69.62.121.214:3000` eklendi
2. **PHP Limits**: Upload limitleri 256MB'a çıkarıldı
3. **Database**: MySQL root kullanıcısı aktif
4. **Backup**: Düzenli database backup'ı önerilir

---

## 📞 **Sorun Giderme**

### Nuxt.js Çalışmıyorsa
```bash
cd /root/projects/BeyrahaCurrent
npm install
npm run dev
```

### Laravel API Çalışmıyorsa
```bash
cd /var/www/beyraha-api
composer install
php artisan key:generate
systemctl restart apache2
```

### phpMyAdmin Açılmıyorsa
```bash
systemctl restart apache2
chown -R www-data:www-data /var/www/phpmyadmin
```

---

**Son Güncelleme**: `$(date)`
**Oluşturan**: Beyraha Development Team # Nuxt Deploy Test - Sal 22 Tem 2025 12:25:05 +03
