export const useEmailTemplatePresets = () => {
  // Template İçerikleri
  const welcomeTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Hoş Geldiniz</title>
  <style type="text/css">
    table.container { min-width: 600px !important; width: 600px !important; }
    a,a[href],a:hover, a:link, a:visited { text-decoration: none!important; color: #f97316; }
    .link { text-decoration: underline!important; }
    p, p:visited { font-size:15px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:300; text-decoration:none; color: #374151; }
    h1 { font-size:24px; line-height:28px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    h2 { font-size:20px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #f97316; }
    .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
    .ExternalClass {width: 100%;}
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6;">
  <div style="width: 100%; overflow-x: auto; min-width: 600px;">
    <table class="container" align="center" style="width: 600px; min-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          <!-- Logo Container -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <img style="width: 120px; max-width: 120px; height: auto;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
              </td>
            </tr>
          </table>

          <!-- Header Section -->
          <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">🎉</div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Beyraha'ya Hoş Geldiniz!</h1>
              </td>
            </tr>
          </table>

          <!-- Content Section -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {musteri.ad_soyad}! 👋</h2>
                <div style="width: 60px; height: 3px; background: #f97316; margin: 0 auto 30px; border-radius: 2px;"></div>
                
                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                      <p style="margin: 0; color: #92400e; font-size: 16px; line-height: 1.7;">
                        Beyraha ailesine katıldığınız için çok mutluyuz! ✨ Artık en kaliteli organik ürünlere kolayca erişebileceksiniz.
                      </p>
                    </td>
                  </tr>
                </table>

                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">✓ Hesabınız Hazır!</h3>
                      <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                        Hesabınız başarıyla oluşturuldu ve alışverişe başlayabilirsiniz.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <div style="text-align: center;">
                  <a href="{site.url}" target="_blank" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); font-size: 16px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; padding: 16px 32px; color: #ffffff; border-radius: 8px; display: inline-block; margin: 20px 0;">
                    🛒 Alışverişe Başla
                  </a>
                </div>

                <p style="margin: 30px 0 10px; color: #64748b; font-size: 15px;">
                  Herhangi bir sorunuz olursa, bizimle iletişime geçmekten çekinmeyin.
                </p>
                <p style="margin: 0; color: #1f2937; font-weight: 600; text-align: center;">
                  Sevgilerle,<br>
                  <span style="color: #f97316;">Beyraha Ekibi</span> 💜
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table style="width: 100%; background-color: #f8fafc;">
            <tr>
              <td style="padding: 30px; text-align: center;">
                <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
                <p style="margin: 0; font-size: 12px; color: #64748b;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`

  const orderConfirmationTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Sipariş Onayı</title>
  <style type="text/css">
    table.container { min-width: 600px !important; width: 600px !important; }
    a,a[href],a:hover, a:link, a:visited { text-decoration: none!important; color: #f97316; }
    .link { text-decoration: underline!important; }
    p, p:visited { font-size:15px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:300; text-decoration:none; color: #374151; }
    h1 { font-size:24px; line-height:28px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    h2 { font-size:20px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #f97316; }
    .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
    .ExternalClass {width: 100%;}
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6;">
  <div style="width: 100%; overflow-x: auto; min-width: 600px;">
    <table class="container" align="center" style="width: 600px; min-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          <!-- Logo Container -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <img style="width: 120px; max-width: 120px; height: auto;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
              </td>
            </tr>
          </table>

          <!-- Header Section -->
          <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">📦</div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Siparişiniz Alındı!</h1>
              </td>
            </tr>
          </table>

          <!-- Content Section -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {musteri.ad_soyad}! 👋</h2>
                <div style="width: 60px; height: 3px; background: #f97316; margin: 0 auto 30px; border-radius: 2px;"></div>
                
                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                      <p style="margin: 0; color: #92400e; font-size: 16px; line-height: 1.7;">
                        Siparişinizi başarıyla aldık ve en kısa sürede hazırlamaya başlayacağız. ✨
                      </p>
                    </td>
                  </tr>
                </table>

                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">📋 Sipariş Detayları</h3>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş No:</strong> #{siparis.numara}</p>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Tarihi:</strong> {siparis.tarih}</p>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Toplam Tutar:</strong> <span style="color: #f97316; font-weight: 600;">{siparis.genel_toplam}</span></p>
                    </td>
                  </tr>
                </table>

                <!-- Order Items Table -->
                <table style="width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <thead>
                    <tr style="background: #f8fafc;">
                      <th style="padding: 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">🛒 Sipariş İçeriği</th>
                      <th style="padding: 16px; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Adet</th>
                      <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Toplam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siparis.urunler}
                  </tbody>
                  <tfoot>
                    <tr style="background: #fef3e2;">
                      <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;" colspan="2">Genel Toplam:</td>
                      <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;">{siparis.genel_toplam}</td>
                    </tr>
                  </tfoot>
                </table>

                {odeme.detay}

                <p style="margin: 30px 0 10px; color: #64748b; font-size: 15px;">
                  Siparişinizle ilgili güncellemeleri size bildireceğiz.
                </p>
                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                  <span style="color: #f97316;">Beyraha Ekibi</span> 💜
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table style="width: 100%; background-color: #f8fafc;">
            <tr>
              <td style="padding: 30px; text-align: center;">
                <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
                <p style="margin: 0; font-size: 12px; color: #64748b;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`

  const shippingTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Kargo Bilgilendirmesi</title>
  <style type="text/css">
    table.container { min-width: 600px !important; width: 600px !important; }
    a,a[href],a:hover, a:link, a:visited { text-decoration: none!important; color: #f97316; }
    .link { text-decoration: underline!important; }
    p, p:visited { font-size:15px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:300; text-decoration:none; color: #374151; }
    h1 { font-size:24px; line-height:28px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    h2 { font-size:20px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #f97316; }
    .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
    .ExternalClass {width: 100%;}
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6;">
  <div style="width: 100%; overflow-x: auto; min-width: 600px;">
    <table class="container" align="center" style="width: 600px; min-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          <!-- Logo Container -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <img style="width: 120px; max-width: 120px; height: auto;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
              </td>
            </tr>
          </table>

          <!-- Header Section -->
          <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">🚚</div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Siparişiniz Kargoya Verildi!</h1>
              </td>
            </tr>
          </table>

          <!-- Content Section -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {musteri.ad_soyad}! 👋</h2>
                <div style="width: 60px; height: 3px; background: #f97316; margin: 0 auto 30px; border-radius: 2px;"></div>
                
                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                      <p style="margin: 0; color: #92400e; font-size: 16px; line-height: 1.7;">
                        Harika haber! #{siparis.numara} numaralı siparişiniz kargoya verildi ve size doğru yola çıktı. ✨
                      </p>
                    </td>
                  </tr>
                </table>

                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">📦 Kargo Bilgileri</h3>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Takip Numarası:</strong> <span style="color: #f97316; font-weight: 600;">{siparis.kargo_takip}</span></p>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş No:</strong> #{siparis.numara}</p>
                      <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Kargo Tarihi:</strong> {tarih}</p>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <a href="#" target="_blank" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); font-size: 16px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; padding: 16px 32px; color: #ffffff; border-radius: 8px; display: inline-block; margin: 20px 0;">
                  📍 Kargonu Takip Et
                </a>

                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                      <p style="margin: 0; color: #065f46; font-size: 15px; line-height: 1.6;">
                        ⏰ <strong>Teslimat Süresi:</strong> Siparişiniz 1-3 iş günü içinde adresinize teslim edilecektir.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                  İyi alışverişler!<br>
                  <span style="color: #f97316;">Beyraha Ekibi</span> 💜
                </p>

              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table style="width: 100%; background-color: #f8fafc;">
            <tr>
              <td style="padding: 30px; text-align: center;">
                <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
                <p style="margin: 0; font-size: 12px; color: #64748b;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`

  const newsletterTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Bülten</title>
  <style type="text/css">
    table.container { min-width: 600px !important; width: 600px !important; }
    a,a[href],a:hover, a:link, a:visited { text-decoration: none!important; color: #f97316; }
    .link { text-decoration: underline!important; }
    p, p:visited { font-size:15px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:300; text-decoration:none; color: #374151; }
    h1 { font-size:24px; line-height:28px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    h2 { font-size:20px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #f97316; }
    .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
    .ExternalClass {width: 100%;}
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6;">
  <div style="width: 100%; overflow-x: auto; min-width: 600px;">
    <table class="container" align="center" style="width: 600px; min-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          <!-- Logo Container -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <img style="width: 120px; max-width: 120px; height: auto;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
              </td>
            </tr>
          </table>

          <!-- Header Section -->
          <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">📰</div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Yeni Haberler!</h1>
              </td>
            </tr>
          </table>

          <!-- Content Section -->
          <table style="width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {musteri.ad_soyad}! 👋</h2>
                <div style="width: 60px; height: 3px; background: #f97316; margin: 0 auto 30px; border-radius: 2px;"></div>
                
                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                      <p style="margin: 0; color: #92400e; font-size: 16px; line-height: 1.7;">
                        Bu hafta sizin için özel olarak seçtiğimiz haberler ve güncellemeler burada! ✨
                      </p>
                    </td>
                  </tr>
                </table>

                <table style="width: 100%; margin: 30px 0;">
                  <tr>
                    <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                      <h3 style="color: #1f2937; margin: 0 0 20px; font-size: 18px;">📢 Bu Haftanın Özellikleri</h3>
                      
                      <table style="width: 100%;">
                        <tr>
                          <td style="padding: 8px 0; vertical-align: top; width: 30px;">
                            <span style="background: #fef3e2; color: #f97316; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px;">✨</span>
                          </td>
                          <td style="padding: 8px 0; color: #64748b; font-size: 15px;">Yeni organik ürünler mağazamızda!</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; vertical-align: top; width: 30px;">
                            <span style="background: #fef3e2; color: #f97316; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px;">🏷️</span>
                          </td>
                          <td style="padding: 8px 0; color: #64748b; font-size: 15px;">Mevsimlik indirimler başladı</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; vertical-align: top; width: 30px;">
                            <span style="background: #fef3e2; color: #f97316; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px;">🚚</span>
                          </td>
                          <td style="padding: 8px 0; color: #64748b; font-size: 15px;">Ücretsiz kargo fırsatı devam ediyor</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <a href="{site.url}" target="_blank" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); font-size: 16px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; padding: 16px 32px; color: #ffffff; border-radius: 8px; display: inline-block; margin: 20px 0;">
                  🛍️ Mağazayı Ziyaret Et
                </a>

                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                  İyi alışverişler!<br>
                  <span style="color: #f97316;">Beyraha Ekibi</span> 💜
                </p>

              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table style="width: 100%; background-color: #f8fafc;">
            <tr>
              <td style="padding: 30px; text-align: center;">
                <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png">
                <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
                <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                  Bu e-postayı almak istemiyorsanız <a href="#" style="color: #f97316; text-decoration: underline;">buradan</a> abonelikten çıkabilirsiniz.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`

  const promotionTemplate = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Özel İndirim</title>
  <style type="text/css">
    a,a[href],a:hover, a:link, a:visited { text-decoration: none!important; color: #f97316; }
    .link { text-decoration: underline!important; }
    p, p:visited { font-size:15px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:300; text-decoration:none; color: #374151; }
    h1 { font-size:24px; line-height:28px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    h2 { font-size:20px; line-height:24px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #f97316; }
    h3 { font-size:18px; line-height:22px; font-family:'Helvetica', Arial, sans-serif; font-weight:600; text-decoration:none; color: #1f2937; }
    .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
    .ExternalClass {width: 100%;}
  </style>
</head>
<body style="text-align: center; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6; color: #000000; min-width: 600px; overflow-x: auto;" align="center">
  <div style="text-align: center; width: 100%; min-width: 600px;">
    
    <!-- Logo Container -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding: 20px;" width="596">
            <img style="width: 120px; max-width: 120px; height: auto; text-align: center;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png" align="center" width="120">
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Header Section -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding: 40px 30px; text-align: center;" width="596">
            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">🎁</div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Özel İndirim Fırsatı!</h1>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Content Section -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding: 40px 30px;" width="596">
            
            <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {musteri.ad_soyad}! 👋</h2>
            <div style="width: 60px; height: 3px; background: #f97316; margin: 0 auto 30px; border-radius: 2px;"></div>
            
            <table style="width: 100%; margin: 30px 0;">
              <tr>
                <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                  <p style="margin: 0; color: #92400e; font-size: 16px; line-height: 1.7;">
                    Sadece sizin için özel bir indirim fırsatı hazırladık! ✨
                  </p>
                </td>
              </tr>
            </table>

            <!-- Promotion Card -->
            <table align="center" style="width: 100%; margin: 40px 0; background: linear-gradient(135deg, #f97316, #fb923c); border-radius: 16px; overflow: hidden;" width="100%">
              <tbody>
                <tr>
                  <td style="padding: 40px 30px; text-align: center; position: relative;">
                    <h3 style="color: white; margin: 0 0 15px 0; font-size: 48px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">%25 İNDİRİM</h3>
                    <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 20px; font-weight: 500;">Tüm organik ürünlerde</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- CTA Button -->
            <a href="{site.url}" style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); font-size: 18px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; padding: 18px 36px; color: #ffffff; border-radius: 8px; display: inline-block; margin: 20px 0;">
              🛒 Hemen Alışveriş Yap
            </a>

            <table style="width: 100%; margin: 30px 0;">
              <tr>
                <td style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 1px solid #fbbf24;">
                  <p style="margin: 0; color: #856404; font-size: 15px;">
                    ⏰ <strong>Son Tarih:</strong> {tarih} - Bu fırsat sınırlı sürelidir!
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin: 0; color: #1f2937; font-weight: 600;">
              Fırsatı kaçırmayın!<br>
              <span style="color: #f97316;">Beyraha Ekibi</span> 💜
            </p>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #f8fafc;" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding: 30px;" width="596">
            <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="Beyraha Logo" src="https://www.beyraha.com/logo-for-light.png" align="center" width="100">
            <p style="margin: 0; font-size: 12px; color: #64748b;">© 2024 Beyraha. Tüm hakları saklıdır.</p>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</body>
</html>`

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
      'siparis.urunler_degerlendirme': 'Sipariş Ürünleri (Değerlendirme Butonları ile)',
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
      </div>`,
      '{siparis.urunler_degerlendirme}': `
        <div style="border-bottom: 1px solid #e5e5e5; padding: 15px 0; display: flex; align-items: center; justify-content: space-between;">
          <div style="flex: 1;">
            <div style="font-weight: bold; margin-bottom: 5px;">
              <a href="https://beyraha.com/urun/organik-zeytinyagi" style="color: #007bff; text-decoration: underline; font-weight: 500;" target="_blank">2x Organik Zeytinyağı</a>
            </div>
            <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Boyut: 500ml, Renk: Altın Sarısı</div>
            <div style="font-size: 14px; color: #333;">Birim: 99.00 TL × 2 = <strong>198.00 TL</strong></div>
          </div>
          <div style="margin-left: 20px;">
            <a href="https://beyraha.com/urun/organik-zeytinyagi?degerlendirme=true" 
               style="background: #f59e0b; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block;" 
               target="_blank">
              ⭐ Değerlendir
            </a>
          </div>
        </div>
        <div style="border-bottom: 1px solid #e5e5e5; padding: 15px 0; display: flex; align-items: center; justify-content: space-between;">
          <div style="flex: 1;">
            <div style="font-weight: bold; margin-bottom: 5px;">
              <a href="https://beyraha.com/urun/dogal-bal" style="color: #007bff; text-decoration: underline; font-weight: 500;" target="_blank">1x Doğal Bal</a>
            </div>
            <div style="font-size: 14px; color: #333;">Birim: 91.90 TL × 1 = <strong>91.90 TL</strong></div>
          </div>
          <div style="margin-left: 20px;">
            <a href="https://beyraha.com/urun/dogal-bal?degerlendirme=true" 
               style="background: #f59e0b; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block;" 
               target="_blank">
              ⭐ Değerlendir
            </a>
          </div>
        </div>
      `
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