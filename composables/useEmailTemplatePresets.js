export const useEmailTemplatePresets = () => {
  // Template İçerikleri
  const welcomeTemplate = `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #f97316; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Hoş Geldiniz! 🎉</h1>
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #f97316; margin-bottom: 20px;">Merhaba {musteri.ad_soyad}!</h2>
    
    <p style="margin-bottom: 20px;">
      Beyraha ailesine katıldığınız için çok mutluyuz! Artık en kaliteli organik ürünlere kolayca erişebileceksiniz.
    </p>
    
    <p style="margin-bottom: 20px;">
      Hesabınız başarıyla oluşturuldu ve alışverişe başlayabilirsiniz.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{site.url}" style="background: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Alışverişe Başla
      </a>
    </div>
    
    <p style="margin-bottom: 20px;">
      Herhangi bir sorunuz olursa, bizimle iletişime geçmekten çekinmeyin.
    </p>
    
    <p style="margin-bottom: 0;">
      Sevgilerle,<br>
      <strong>Beyraha Ekibi</strong>
    </p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p style="margin: 0;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
  </div>
</div>`

  const orderConfirmationTemplate = `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #f97316; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Siparişiniz Alındı! 📦</h1>
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #f97316; margin-bottom: 20px;">Merhaba {musteri.ad_soyad}!</h2>
    
    <p style="margin-bottom: 20px;">
      Siparişinizi başarıyla aldık ve en kısa sürede hazırlamaya başlayacağız.
    </p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">📋 Sipariş Detayları</h3>
      <p style="margin: 5px 0;"><strong>Sipariş No:</strong> #{siparis.numara}</p>
      <p style="margin: 5px 0;"><strong>Sipariş Tarihi:</strong> {siparis.tarih}</p>
      <p style="margin: 5px 0;"><strong>Toplam Tutar:</strong> {siparis.genel_toplam}</p>
    </div>
    
    <h3 style="color: #333; margin-bottom: 15px;">🛒 Sipariş İçeriği</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: #f8f9fa;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Ürün</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Adet</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Birim Fiyat</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Toplam</th>
        </tr>
      </thead>
      <tbody>
        {siparis.urunler}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border-top: 2px solid #dee2e6; font-weight: bold;">Ara Toplam:</td>
          <td style="padding: 12px; text-align: right; border-top: 2px solid #dee2e6; font-weight: bold;">{siparis.toplam}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right;">Kargo:</td>
          <td style="padding: 12px; text-align: right;">{siparis.kargo_ucreti}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; font-size: 16px; color: #f97316;">Genel Toplam:</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 16px; color: #f97316;">{siparis.genel_toplam}</td>
        </tr>
      </tfoot>
    </table>
    
    {odeme.detay}
    
    <p style="margin-bottom: 0;">
      Siparişinizle ilgili güncellemeleri size bildireceğiz.<br>
      <strong>Beyraha Ekibi</strong>
    </p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p style="margin: 0;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
  </div>
</div>`

  const shippingTemplate = `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #f97316; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Siparişiniz Kargoya Verildi! 🚚</h1>
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #f97316; margin-bottom: 20px;">Merhaba {musteri.ad_soyad}!</h2>
    
    <p style="margin-bottom: 20px;">
      Harika haber! #{siparis.numara} numaralı siparişiniz kargoya verildi ve size doğru yola çıktı.
    </p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">📦 Kargo Bilgileri</h3>
      <p style="margin: 5px 0;"><strong>Takip Numarası:</strong> {siparis.kargo_takip}</p>
      <p style="margin: 5px 0;"><strong>Sipariş No:</strong> #{siparis.numara}</p>
      <p style="margin: 5px 0;"><strong>Kargo Tarihi:</strong> {tarih}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Kargonu Takip Et
      </a>
    </div>
    
    <p style="margin-bottom: 20px;">
      Siparişiniz 1-3 iş günü içinde adresinize teslim edilecektir.
    </p>
    
    <p style="margin-bottom: 0;">
      İyi alışverişler!<br>
      <strong>Beyraha Ekibi</strong>
    </p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p style="margin: 0;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
  </div>
</div>`

  const newsletterTemplate = `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #f97316; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Yeni Haberler! 📰</h1>
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #f97316; margin-bottom: 20px;">Merhaba {musteri.ad_soyad}!</h2>
    
    <p style="margin-bottom: 20px;">
      Bu hafta sizin için özel olarak seçtiğimiz haberler ve güncellemeler burada!
    </p>
    
    <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #333; margin-top: 0;">📢 Bu Haftanın Özellikleri</h3>
      <ul style="padding-left: 20px;">
        <li style="margin-bottom: 10px;">Yeni organik ürünler mağazamızda!</li>
        <li style="margin-bottom: 10px;">Mevsimlik indirimler başladı</li>
        <li style="margin-bottom: 10px;">Ücretsiz kargo fırsatı devam ediyor</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{site.url}" style="background: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Mağazayı Ziyaret Et
      </a>
    </div>
    
    <p style="margin-bottom: 0;">
      İyi alışverişler!<br>
      <strong>Beyraha Ekibi</strong>
    </p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p style="margin: 0;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
    <p style="margin: 5px 0;">Bu e-postayı almak istemiyorsanız <a href="#">buradan</a> abonelikten çıkabilirsiniz.</p>
  </div>
</div>`

  const promotionTemplate = `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #f97316; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Özel İndirim Fırsatı! 🎁</h1>
  </div>
  
  <div style="padding: 30px 20px; background: white;">
    <h2 style="color: #f97316; margin-bottom: 20px;">Merhaba {musteri.ad_soyad}!</h2>
    
    <p style="margin-bottom: 20px;">
      Sadece sizin için özel bir indirim fırsatı hazırladık!
    </p>
    
    <div style="background: linear-gradient(135deg, #f97316, #fb923c); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
      <h3 style="color: white; margin: 0 0 10px 0; font-size: 32px;">%25 İNDİRİM</h3>
      <p style="color: white; margin: 0; font-size: 18px;">Tüm organik ürünlerde</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{site.url}" style="background: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
        Hemen Alışveriş Yap
      </a>
    </div>
    
    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-size: 14px;">
        ⏰ <strong>Son Tarih:</strong> {tarih} - Bu fırsat sınırlı sürelidir!
      </p>
    </div>
    
    <p style="margin-bottom: 0;">
      Fırsatı kaçırmayın!<br>
      <strong>Beyraha Ekibi</strong>
    </p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p style="margin: 0;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
  </div>
</div>`

  // Email Bileşenleri
  const emailComponents = ref([
    {
      type: 'header',
      label: 'Başlık Bölümü',
      template: `<div style="background: #f97316; padding: 30px; text-align: center;">
  <h1 style="color: white; margin: 0;">Beyraha</h1>
</div>`
    },
    {
      type: 'button',
      label: 'Eylem Butonu',
      template: `<div style="text-align: center; margin: 20px 0;">
  <a href="{site.url}" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
    Butonu Tıkla
  </a>
</div>`
    },
    {
      type: 'product',
      label: 'Ürün Kartı',
      template: `<div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin: 20px 0;">
  <img src="{urun.resim}" style="width: 100%; max-width: 200px; height: auto;" />
  <h3>{urun.ad}</h3>
  <p style="font-size: 18px; font-weight: bold; color: #f97316;">{urun.fiyat} TL</p>
</div>`
    },
    {
      type: 'payment',
      label: 'Ödeme Bilgileri',
      template: `{odeme.detay}`
    },
    {
      type: 'footer',
      label: 'Alt Bilgi',
      template: `<div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
  <p>© 2024 Beyraha. Tüm hakları saklıdır.</p>
  <p>Bu e-postayı almak istemiyorsanız <a href="#">buradan</a> abonelikten çıkabilirsiniz.</p>
</div>`
    }
  ])

  // Hazır Şablonlar
  const presetTemplates = [
    {
      name: 'Hoş Geldin Şablonu',
      type: 'welcome',
      subject: 'Hoş Geldiniz! 🎉',
      content: welcomeTemplate
    },
    {
      name: 'Sipariş Onayı Şablonu',
      type: 'order_confirmation',
      subject: 'Siparişiniz Alındı! 📦',
      content: orderConfirmationTemplate
    },
    {
      name: 'Kargo Şablonu',
      type: 'shipping',
      subject: 'Siparişiniz Kargoya Verildi! 🚚',
      content: shippingTemplate
    },
    {
      name: 'Bülten Şablonu',
      type: 'newsletter',
      subject: 'Yeni Haberler! 📰',
      content: newsletterTemplate
    },
    {
      name: 'Promosyon Şablonu',
      type: 'promotion',
      subject: 'Özel İndirim Fırsatı! 🎁',
      content: promotionTemplate
    }
  ]

  // Dinamik Değişkenler
  const availableVariables = ref({
    musteri: {
      'musteri.ad_soyad': 'Müşteri Adı Soyadı',
      'musteri.email': 'Müşteri E-mail Adresi',
      'musteri.telefon': 'Müşteri Telefon Numarası'
    },
    siparis: {
      'siparis.numara': 'Sipariş Numarası',
      'siparis.tarih': 'Sipariş Tarihi',
      'siparis.durum': 'Sipariş Durumu',
      'siparis.toplam': 'Sipariş Ara Toplam Tutarı',
      'siparis.kargo_ucreti': 'Kargo Ücreti',
      'siparis.genel_toplam': 'Genel Toplam (Kargo Dahil)',
      'siparis.urunler': 'Sipariş Ürünleri (Sadece TR Satırları)',
      'siparis.detay': 'Sipariş Detay Tablosu (HTML)',
      'siparis.kargo_takip': 'Kargo Takip Numarası',
      'siparis.kargo_firma': 'Kargo Firması Adı',
      'siparis.takip_link': 'Kargo Takip Linki'
    },
    odeme: {
      'odeme.yontem': 'Ödeme Yöntemi',
      'odeme.durum': 'Ödeme Durumu',
      'odeme.detay': 'Ödeme Detay Bilgileri (HTML)'
    },
    banka: {
      'banka.ad': 'Banka Adı',
      'banka.iban': 'IBAN Numarası',
      'banka.hesap_sahibi': 'Hesap Sahibi'
    },
    urun: {
      'urun.ad': 'Ürün Adı',
      'urun.fiyat': 'Ürün Fiyatı',
      'urun.resim': 'Ürün Resmi URL'
    },
    sistem: {
      'tarih': 'Bugünün Tarihi',
      'site.ad': 'Site Adı',
      'site.url': 'Site Ana URL\'si'
    }
  })

  // Kategori isimlerini döndüren fonksiyon
  const getCategoryName = (category) => {
    const names = {
      musteri: 'Müşteri Bilgileri',
      siparis: 'Sipariş Bilgileri',
      odeme: 'Ödeme Bilgileri',
      banka: 'Banka Bilgileri',
      urun: 'Ürün Bilgileri',
      sistem: 'Sistem Bilgileri'
    }
    return names[category] || category
  }

  // Örnek verilerle render fonksiyonu
  const getSampleData = () => {
    // Kargo ücreti bazen ücretsiz, bazen ücretli olsun
    const isFreeShipping = Math.random() > 0.5
    const shippingCost = isFreeShipping ? 0 : 9.99
    const shippingText = isFreeShipping ? 'Ücretsiz' : '9.99 TL'
    const totalAmount = 289.90
    const finalTotal = totalAmount + shippingCost

    // Sipariş durum örnekleri
    const orderStatuses = ['Sipariş Alındı', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi', 'İptal Edildi']
    const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]

    return {
      '{musteri.ad_soyad}': 'Ahmet Yılmaz',
      '{musteri.email}': 'ahmet@example.com',
      '{musteri.telefon}': '+90 555 123 45 67',
      '{siparis.numara}': '2024001',
      '{siparis.tarih}': new Date().toLocaleDateString('tr-TR'),
      '{siparis.durum}': randomStatus,
      '{siparis.toplam}': totalAmount.toFixed(2) + ' TL',
      '{siparis.kargo_ucreti}': shippingText,
      '{siparis.genel_toplam}': finalTotal.toFixed(2) + ' TL',
      '{siparis.kargo_takip}': randomStatus === 'Kargoya Verildi' || randomStatus === 'Teslim Edildi' ? 'TRK123456789' : 'Henüz atanmadı',
      '{odeme.yontem}': 'Havale/EFT',
      '{odeme.durum}': randomStatus === 'İptal Edildi' ? 'İade Edildi' : 'Ödeme Alındı',
      '{odeme.detay}': `<div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #856404;">💳 Ödeme Bilgileri</h4>
          <p style="color: #856404; margin: 10px 0;">
              <strong>Ödeme Yöntemi:</strong> Havale/EFT<br>
              <strong>Ödeme Tutarı:</strong> ${finalTotal.toFixed(2)} TL
          </p>
          <div style="background: #fff; padding: 15px; border-radius: 6px; margin: 10px 0;">
              <h5 style="margin-top: 0; color: #856404;">🏦 Banka Bilgileri</h5>
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                  <strong>Ziraat Bankası</strong><br>
                  IBAN: TR00 0001 0000 0000 0000 0000 00<br>
                  Hesap Sahibi: Beyraha Ltd. Şti.<br>
                  Açıklama: Sipariş No: #2024001
              </p>
          </div>
          <p style="color: #856404; font-size: 12px; margin-bottom: 0;">
              ⚠️ Ödeme yaparken açıklama kısmına mutlaka sipariş numaranızı yazınız.
          </p>
      </div>`,
      '{banka.ad}': 'Ziraat Bankası',
      '{banka.iban}': 'TR00 0001 0000 0000 0000 0000 00',
      '{banka.hesap_sahibi}': 'Beyraha Ltd. Şti.',
      '{urun.ad}': 'Organik Zeytinyağı',
      '{urun.fiyat}': '99.90',
      '{urun.resim}': 'https://via.placeholder.com/200x200',
      '{tarih}': new Date().toLocaleDateString('tr-TR'),
      '{site.ad}': 'Beyraha',
      '{site.url}': 'https://beyraha.com',
      '{siparis.urunler}': `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">2x Organik Zeytinyağı</td>
          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6;">2</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">99.00 TL</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; font-weight: bold;">198.00 TL</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">1x Doğal Bal</td>
          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6;">1</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">91.90 TL</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; font-weight: bold;">91.90 TL</td>
        </tr>
      `,
      '{siparis.detay}': `<div style="background: #f9f9f9; padding: 15px; border-radius: 8px; font-family: Arial, sans-serif;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
              <div style="flex: 1;">
                  <div style="font-weight: bold; margin-bottom: 4px;">2x Organik Zeytinyağı</div>
                  <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Boyut: 500ml, Renk: Altın Sarısı</div>
                  <div style="font-size: 12px; color: #888;">Birim: 99.00 TL</div>
              </div>
              <div style="text-align: right;">
                  <span style="font-weight: bold; font-size: 16px;">198.00 TL</span>
              </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
              <div style="flex: 1;">
                  <div style="font-weight: bold; margin-bottom: 4px;">1x Doğal Bal</div>
                  <div style="font-size: 12px; color: #888;">Birim: 91.90 TL</div>
              </div>
              <div style="text-align: right;">
                  <span style="font-weight: bold; font-size: 16px;">91.90 TL</span>
              </div>
          </div>
      </div>`
    }
  }

  return {
    emailComponents,
    presetTemplates,
    availableVariables,
    getCategoryName,
    getSampleData
  }
} 