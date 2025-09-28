# Merkezi Hata Yönetim Sistemi

Bu döküman, Beyraha projesi için geliştirilen merkezi hata yönetim sisteminin kullanımını açıklar.

## 🎯 Sistem Özellikleri

### Backend Özellikleri
- **Standart Hata Formatı**: Tüm API hataları tek format
- **Otomatik Hata Loglama**: Detaylı hata logları
- **Hata Kategorilerine Ayırma**: Validation, Auth, Server vb.
- **Development Debug**: Geliştirme modunda detaylı hata bilgileri
- **Güvenlik**: Hassas bilgilerin filtrelenmesi

### Frontend Özellikleri
- **Otomatik Hata Yakalama**: Tüm hata türleri yakalanır
- **Merkezi State Yönetimi**: Global hata durumu
- **Akıllı Toast Sistemi**: Hata seviyesine göre bildirimler
- **Development Monitor**: Geliştirici paneli
- **Local Hata Logları**: Client-side error storagee

## 📋 Backend Kullanımı

### 1. Standart Hata Formatı

Backend'den gelen tüm hatalar şu formattadır:

```json
{
  "success": false,
  "error": true,
  "message": "Kullanıcı dostu hata mesajı",
  "error_code": "VALIDATION_ERROR",
  "severity": "warning",
  "error_id": "uuid-burada-olacak",
  "timestamp": "2024-01-01T12:00:00Z",
  "errors": {}, // Validation hataları için
  "debug": {} // Development modunda
}
```

### 2. Hata Kodları

| Kod | Açıklama | HTTP Status |
|-----|----------|-------------|
| `VALIDATION_ERROR` | Form doğrulama hatası | 422 |
| `AUTHENTICATION_REQUIRED` | Giriş gerekli | 401 |
| `TOKEN_EXPIRED` | Token süresi doldu | 401 |
| `TOKEN_INVALID` | Geçersiz token | 401 |
| `AUTHORIZATION_FAILED` | Yetki yetersiz | 403 |
| `RESOURCE_NOT_FOUND` | Kaynak bulunamadı | 404 |
| `RATE_LIMIT_EXCEEDED` | Rate limit aşıldı | 429 |
| `INTERNAL_SERVER_ERROR` | Sunucu hatası | 500 |

### 3. Laravel Exception Handler

Sistem otomatik olarak tüm hataları yakalar ve standart formata çevirir:

```php
// app/Exceptions/Handler.php
// Tüm hatalar otomatik olarak işlenir
```

## 🎨 Frontend Kullanımı

### 1. Temel Kullanım

```javascript
import { useErrorHandler } from '~/composables/useErrorHandler'

const { handleError } = useErrorHandler()

try {
  // API isteği
  const result = await $fetch('/api/endpoint')
} catch (error) {
  await handleError(error, {
    context: 'api-call-context',
    showToast: true,
    redirectOnAuth: true
  })
}
```

### 2. Özelleştirilmiş Hata İşleme

```javascript
// Custom error message ile
await handleError(error, {
  customMessage: 'Özel hata mesajınız',
  context: 'specific-operation'
})

// Toast göstermeden
await handleError(error, {
  showToast: false,
  logError: true
})

// Auth redirect olmadan
await handleError(error, {
  redirectOnAuth: false
})
```

### 3. Hata State Yönetimi

```javascript
const { 
  errors,           // Tüm hatalar
  lastError,        // Son hata
  clearErrors,      // Hataları temizle
  getErrorById,     // ID'ye göre hata
  getErrorsByType,  // Type'a göre hatalar
  getErrorsBySeverity // Severity'ye göre hatalar
} = useErrorHandler()
```

## 🔧 Development Araçları

### 1. Error Monitor

Development modunda sağ alt köşede hata monitörü görünür:
- Gerçek zamanlı hata sayısı
- Hata listesi ve filtreleme
- Detaylı hata görüntüleme
- Log export/clear özellikleri

### 2. Test Sayfası

`/error-system-test` sayfasında test edebilirsiniz:
- Frontend hata testleri
- Backend hata testleri
- Hata istatistikleri
- Export/clear işlemleri

### 3. Console Logları

Tüm hatalar console'da detaylı şekilde loglanır:

```javascript
🚨 Error Handler - ERROR
Error Details: {
  error_id: "err_1704123456789_abc123def",
  type: "VALIDATION_ERROR",
  message: "Form doğrulama hatası",
  severity: "warning",
  context: "user-registration",
  timestamp: "2024-01-01T12:00:00Z"
}
```

## 📊 Hata Seviyeleri

| Seviye | Açıklama | Toast Süresi | Renk |
|--------|----------|--------------|------|
| `info` | Bilgilendirme | 3 saniye | Mavi |
| `warning` | Uyarı | 5 saniye | Sarı |
| `error` | Hata | 7 saniye | Kırmızı |
| `critical` | Kritik | 10 saniye | Mor |

## 🔒 Güvenlik

### Backend Güvenliği
- Hassas header'lar filtrelenir (`authorization`, `cookie`)
- Hassas form alanları filtrelenir (`password`, `token`)
- Production'da debug bilgileri gizlenir

### Frontend Güvenliği
- Hassas kullanıcı bilgileri loglanmaz
- LocalStorage'da sadece meta bilgiler tutulur
- Error details production'da kısıtlanır

## 📈 İzleme ve Analiz

### Local Storage Logları

```javascript
// Log'ları görüntüle
const { getErrorLogs } = useErrorHandler()
const logs = getErrorLogs()

// Log'ları temizle
const { clearErrorLogs } = useErrorHandler()
clearErrorLogs()

// Log'ları export et
const { exportErrorLogs } = useErrorHandler()
exportErrorLogs() // JSON dosyası indirir
```

### Error Statistics

```javascript
const { 
  errors,
  getErrorsByType,
  getErrorsBySeverity 
} = useErrorHandler()

console.log(`Total errors: ${errors.length}`)
console.log(`Validation errors: ${getErrorsByType('VALIDATION_ERROR').length}`)
console.log(`Critical errors: ${getErrorsBySeverity('critical').length}`)
```

## 🚀 Entegrasyon

### Mevcut API Çağrıları

Sistem `useBaseOFetchWithAuth` ile otomatik entegre edilmiştir:

```javascript
// Otomatik hata yakalama
const response = await useBaseOFetchWithAuth('endpoint')
```

### Manual Entegrasyon

```javascript
// Eski kod
try {
  const response = await $fetch('/api/endpoint')
} catch (error) {
  console.error(error) // ❌ Eski yöntem
}

// Yeni kod
try {
  const response = await $fetch('/api/endpoint')
} catch (error) {
  await handleError(error, { context: 'endpoint-call' }) // ✅ Yeni yöntem
}
```

## 📝 Migration Rehberi

### 1. Eski Hata İşlemelerini Güncelleme

```javascript
// Eski
import { parseError } from '~/utils/functions'
const { errors } = parseError(error)

// Yeni
import { useErrorHandler } from '~/composables/useErrorHandler'
const { handleError } = useErrorHandler()
await handleError(error)
```

### 2. Toast Sistemini Güncelleme

```javascript
// Eski
$toast.error('Hata mesajı')

// Yeni (otomatik)
await handleError(error) // Toast otomatik gösterilir
```

### 3. Error State Yönetimi

```javascript
// Eski (manuel state)
const errors = ref([])

// Yeni (merkezi state)
const { errors } = useErrorHandler()
```

## 🔧 Konfigürasyon

### Environment Variables

```bash
# Backend
APP_DEBUG=true # Development modunda debug bilgileri

# Frontend
NODE_ENV=development # Development özellikleri
```

### Customization

Hata mesajlarını özelleştirmek için:

```javascript
// composables/useErrorHandler.js
const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Özel validation mesajı',
  // ...
}
```

## 🐛 Troubleshooting

### Yaygın Sorunlar

1. **Toast gösterilmiyor**
   - `$toast` plugin'i yüklü mü kontrol edin
   - `showToast: false` option'ı kullanıyor musunuz?

2. **Error Monitor görünmüyor**
   - Development modunda mısınız?
   - Browser console'da hata var mı?

3. **Hatalar loglanmıyor**
   - `logError: false` option'ı kullanıyor musunuz?
   - LocalStorage quota'sı dolmuş olabilir

### Debug Komutları

```javascript
// Console'da test edin
const { handleError } = useErrorHandler()
await handleError(new Error('Test error'), { context: 'debug' })

// Error state'i kontrol edin
const { errors } = useErrorHandler()
console.log('Current errors:', errors.value)

// Log'ları kontrol edin
const { getErrorLogs } = useErrorHandler()
console.log('Error logs:', getErrorLogs())
```

## 📚 Kaynaklar

- [Laravel Exception Handling](https://laravel.com/docs/errors)
- [Nuxt Error Handling](https://nuxt.com/docs/getting-started/error-handling)
- [Vue 3 Composables](https://vuejs.org/guide/reusability/composables.html)

---

Bu sistem ile artık tüm hatalar merkezi olarak yönetilir, loglanır ve kullanıcı dostu şekilde gösterilir. Development sürecinde hataları izlemek ve production'da kullanıcı deneyimini iyileştirmek için güçlü araçlar sunar. 