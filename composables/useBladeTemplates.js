export const useBladeTemplates = () => {
  const config = useRuntimeConfig()

  // State management
  const loading = ref(false)
  const error = ref('')
  const templates = ref([])

  const api = {
    // Template CRUD
    async getAll() {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth('admin/blade-templates', {
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        error.value = err.message || 'Şablonlar yüklenirken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async getByType(type) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${type}`, {
          headers: useRequestHeaders(['cookie'])
        })
        return {
          success: true,
          template: response.template || response.data
        }
      } catch (err) {
        error.value = err.message || 'Şablon yüklenirken hata oluştu'
        return {
          success: false,
          template: null
        }
      } finally {
        loading.value = false
      }
    },

    async store(type, data) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${type}`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: data
        })
        return response
      } catch (err) {
        error.value = err.message || 'Şablon oluşturulurken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async create(data) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${data.type}`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: data
        })
        return response
      } catch (err) {
        error.value = err.message || 'Şablon oluşturulurken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async update(id, data) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${id}`, {
          method: 'PUT',
          headers: useRequestHeaders(['cookie']),
          body: data
        })
        return response
      } catch (err) {
        error.value = err.message || 'Şablon güncellenirken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async preview(type, data = {}) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${type}/preview`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: data
        })
        return response
      } catch (err) {
        error.value = err.message || 'Önizleme oluşturulurken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async toggleStatus(type) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${type}/toggle-status`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        error.value = err.message || 'Durum değiştirilirken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    async delete(id) {
      loading.value = true
      error.value = ''
      try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${id}`, {
          method: 'DELETE',
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        error.value = err.message || 'Şablon silinirken hata oluştu'
        throw err
      } finally {
        loading.value = false
      }
    },

    // Yeni API endpoint'leri
    async checkExistingTypes() {
      try {
        const response = await useBaseOFetchWithAuth('admin/blade-templates/check-existing-types', {
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        console.error('Mevcut tipler kontrol edilirken hata:', err)
        return { success: false, existing_types: {} }
      }
    },

    async getOrderStatuses() {
      try {
        const response = await useBaseOFetchWithAuth('admin/blade-templates/order-statuses', {
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        console.error('Sipariş durumları yüklenirken hata:', err)
        return { success: false, order_statuses: {} }
      }
    },

    async getUsedOrderStatuses() {
      try {
        const response = await useBaseOFetchWithAuth('admin/blade-templates/used-order-statuses', {
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        console.error('Kullanılan sipariş durumları yüklenirken hata:', err)
        return { success: false, used_statuses: {} }
      }
    },

    // Yeni merkezi değişken endpoint'i
    async getBladeVariables() {
      try {
        const response = await useBaseOFetchWithAuth('admin/blade-templates/variables', {
          headers: useRequestHeaders(['cookie'])
        })
        return response
      } catch (err) {
        console.error('Blade değişkenleri yüklenirken hata:', err)
        return { success: false, variables: {} }
      }
    }
  }

     // Blade değişkenleri ve örnek veriler (Backend ile senkronize)
   const getBladeVariables = () => {
     return {
       site: {
         'site_ad': 'Site Adı',
         'site_adi': 'Site Adı',
         'site_url': 'Site URL\'si',
         'site_email': 'Site E-mail Adresi',
         'site_telefon': 'Site Telefon Numarası',
         'site_adres': 'Site Adresi',
         'firma_adi': 'Firma Adı',
         'sirket_adi': 'Şirket Adı',
         'logo_url': 'Logo URL\'si',
         'logo': 'Logo URL\'si'
       },
       customer: {
         'musteri_ad_soyad': 'Müşteri Adı Soyadı',
         'musteri_adi': 'Müşteri Adı Soyadı',
         'ad_soyad': 'Ad Soyad',
         'tam_ad': 'Tam Ad',
         'isim': 'İsim',
         'ad': 'Ad',
         'soyad': 'Soyad',
         'musteri_ad': 'Müşteri Adı',
         'musteri_soyad': 'Müşteri Soyadı',
         'kullanici_adi': 'Kullanıcı Adı',
         'kullanici_ad': 'Kullanıcı Adı',
         'kullanici_soyad': 'Kullanıcı Soyadı',
         'email': 'E-mail Adresi',
         'eposta': 'E-posta Adresi',
         'musteri_email': 'Müşteri E-mail Adresi',
         'kullanici_email': 'Kullanıcı E-mail Adresi',
         'telefon': 'Telefon Numarası',
         'kullanici_telefon': 'Kullanıcı Telefon Numarası'
       },
       order: {
         'siparis_numara': 'Sipariş Numarası',
         'siparis_numarasi': 'Sipariş Numarası',
         'siparis_no': 'Sipariş No',
         'order_number': 'Order Number',
         'siparis_id': 'Sipariş ID',
         'siparis_kodu': 'Sipariş Kodu',
         'siparis_tutari': 'Sipariş Tutarı',
         'siparis_toplami': 'Sipariş Toplamı',
         'siparis_tarihi': 'Sipariş Tarihi',
         'siparis_saati': 'Sipariş Saati',
         'siparis_gun': 'Sipariş Günü',
         'siparis_durumu': 'Sipariş Durumu',
         'durum': 'Durum',
         'status': 'Status',
         'teslimat_tarihi': 'Teslimat Tarihi',
         'teslimat_gun': 'Teslimat Günü',
         'toplam_tutar': 'Toplam Tutar',
         'toplam': 'Toplam',
         'tutar': 'Tutar',
         'fiyat': 'Fiyat',
         'para_birimi': 'Para Birimi',
         'currency': 'Currency',
         'adet': 'Adet',
         'miktar': 'Miktar',
         'quantity': 'Quantity',
         'odeme_yontem_kodu': 'Ödeme Yöntemi Kodu'
       },
       shipping: {
         'kargo_firma': 'Kargo Firması',
         'kargo_takip_no': 'Kargo Takip Numarası',
         'kargo_takip_url': 'Kargo Takip URL\'si',
         'kargo_ucreti': 'Kargo Ücreti'
       },
       product: {
         'urun_adi': 'Ürün Adı',
         'urun_fiyati': 'Ürün Fiyatı',
         'urun_kodu': 'Ürün Kodu',
         'urun_kategori': 'Ürün Kategorisi',
         'urun_marka': 'Ürün Markası',
         'urun_renk': 'Ürün Rengi',
         'urun_beden': 'Ürün Bedeni',
         'urun_aciklama': 'Ürün Açıklaması',
         'stok_kodu': 'Stok Kodu',
         'barkod': 'Barkod'
       },
       financial: {
         'kdv_orani': 'KDV Oranı',
         'kdv_tutari': 'KDV Tutarı',
         'ara_toplam': 'Ara Toplam',
         'indirim_tutari': 'İndirim Tutarı',
         'kupon_kodu': 'Kupon Kodu',
         'banka_hesap_sahibi': 'Banka Hesap Sahibi'
       },
       address: {
         'teslimat_adresi': 'Teslimat Adresi',
         'fatura_adresi': 'Fatura Adresi',
         'mahalle': 'Mahalle',
         'cadde': 'Cadde',
         'bina_no': 'Bina No',
         'daire_no': 'Daire No',
         'kat': 'Kat',
         'posta_kodu': 'Posta Kodu',
         'ilce': 'İlçe',
         'il': 'İl',
         'sehir': 'Şehir',
         'bolge': 'Bölge',
         'ulke': 'Ülke',
         'adres': 'Adres'
       },
       datetime: {
         'tarih': 'Tarih',
         'saat': 'Saat',
         'bugun': 'Bugün',
         'simdi': 'Şimdi',
         'zaman': 'Zaman',
         'gun': 'Gün',
         'ay': 'Ay',
         'yil': 'Yıl'
       },
       general: {
         'baslik': 'Başlık',
         'mesaj': 'Mesaj',
         'icerik': 'İçerik',
         'hosgeldin': 'Hoş Geldin',
         'tesekkurler': 'Teşekkürler',
         'saygilar': 'Saygılar',
         'iyi_gunler': 'İyi Günler',
         'link': 'Link',
         'url': 'URL',
         'buton_metni': 'Buton Metni',
         'content_title': 'İçerik Başlığı',
         'content_message': 'İçerik Mesajı',
         'action_url': 'Aksiyon URL\'si',
         'action_text': 'Aksiyon Metni',
         'footer_text': 'Footer Metni',
         'copyright': 'Telif Hakkı',
         'destek_email': 'Destek E-mail',
         'iletisim_telefon': 'İletişim Telefon',
         'web_sitesi': 'Web Sitesi',
         'ana_sayfa': 'Ana Sayfa URL\'si',
         'iletisim_email': 'İletişim E-mail',
         'adres': 'Adres',
         'sehir': 'Şehir',
         'ulke': 'Ülke'
       }
     }
   }

  // Blade şablon tipleri
  const getTemplateTypes = () => {
    return [
      {
        type: 'order-confirmation',
        name: 'Sipariş Onayı',
        description: 'Müşteriye sipariş onayı için gönderilen email',
        icon: '📦'
      },
      {
        type: 'shipping-notification',
        name: 'Kargo Bildirimi',
        description: 'Siparişin kargoya verildiği bilgisi',
        icon: '🚚'
      },
      {
        type: 'welcome',
        name: 'Hoş Geldin',
        description: 'Yeni üyelere gönderilen karşılama emaili',
        icon: '👋'
      },
      {
        type: 'order-status-change',
        name: 'Sipariş Durum Değişikliği',
        description: 'Sipariş durumu değiştiğinde gönderilen bilgilendirme',
        icon: '🔄'
      }
    ]
  }

  // Blade direktifleri
  const getBladeDirectives = () => {
    return [
      {
        name: '@if',
        description: 'Koşul kontrolü',
        syntax: '@if($condition)\n    // içerik\n@endif',
        example: '@if($odeme_yontem === "bank_transfer")\n    <p>Banka bilgileri...</p>\n@endif'
      },
      {
        name: '@foreach',
        description: 'Döngü',
        syntax: '@foreach($array as $item)\n    // içerik\n@endforeach',
        example: '@foreach($siparis_urunler as $urun)\n    <div>{{ $urun["name"] }}</div>\n@endforeach'
      },
      {
        name: '@isset',
        description: 'Değişken varlığı kontrolü',
        syntax: '@isset($variable)\n    // içerik\n@endisset',
        example: '@isset($kargo_takip)\n    <p>Takip: {{ $kargo_takip }}</p>\n@endisset'
      },
      {
        name: '@switch',
        description: 'Çoklu koşul kontrolü',
        syntax: '@switch($variable)\n    @case("value1")\n        // içerik\n        @break\n    @default\n        // varsayılan\n@endswitch',
        example: '@switch($yeni_durum)\n    @case("shipped")\n        Kargoya verildi\n        @break\n    @default\n        Durum güncellendi\n@endswitch'
      },
      {
        name: '@empty',
        description: 'Boş değer kontrolü',
        syntax: '@empty($variable)\n    // boş ise içerik\n@endempty',
        example: '@empty($kargo_takip)\n    <p>Takip bilgisi henüz yok</p>\n@endempty'
      }
    ]
  }

  // Blade değişken formatlama
  const formatBladeVariable = (variable) => {
    return `{{ $${variable} }}`
  }

  // Kategori isimlerini döndüren fonksiyon
     const getCategoryName = (category) => {
     const names = {
       site: 'Site/Şirket Bilgileri',
       customer: 'Müşteri Bilgileri',
       order: 'Sipariş Bilgileri',
       shipping: 'Kargo Bilgileri',
       product: 'Ürün Bilgileri',
       financial: 'Mali Bilgiler',
       address: 'Adres Bilgileri',
       datetime: 'Tarih/Zaman',
       general: 'Genel Değişkenler'
     }
     return names[category] || category
  }

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    templates: readonly(templates),
    
    // API methods
    api,
    
    // Template methods
    async fetchTemplates() {
      try {
        const response = await api.getAll()
        if (response.success && response.templates) {
          templates.value = response.templates
        } else {
          templates.value = []
        }
      } catch (err) {
        console.error('Templates fetch error:', err)
        templates.value = []
      }
    },
    
    async previewTemplate(type, data = {}) {
      return await api.preview(type, data)
    },
    
    // Helper methods
    getBladeVariables,
    getTemplateTypes,
    getBladeDirectives,
    formatBladeVariable,
    getCategoryName
  }
} 