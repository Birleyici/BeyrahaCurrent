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
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title>Sipariş Onayı - {{ $site_ad }}</title>
    <style type="text/css">
        table.container {
            min-width: 600px !important;
            width: 600px !important;
        }

        a,
        a[href],
        a:hover,
        a:link,
        a:visited {
            text-decoration: none !important;
            color: #f97316;
        }

        .link {
            text-decoration: underline !important;
        }

        p,
        p:visited {
            font-size: 15px;
            line-height: 24px;
            font-family: 'Helvetica', Arial, sans-serif;
            font-weight: 300;
            text-decoration: none;
            color: #374151;
        }

        h1 {
            font-size: 24px;
            line-height: 28px;
            font-family: 'Helvetica', Arial, sans-serif;
            font-weight: 600;
            text-decoration: none;
            color: #1f2937;
        }

        h2 {
            font-size: 20px;
            line-height: 24px;
            font-family: 'Helvetica', Arial, sans-serif;
            font-weight: 600;
            text-decoration: none;
            color: #f97316;
        }

        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td {
            line-height: 100%;
        }

        .ExternalClass {
            width: 100%;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f3f4f6;">
    <div style="width: 100%; overflow-x: auto; min-width: 600px;">
        <table class="container" align="center" style="width: 600px; min-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
            <tr>
                <td style="padding: 0;">

                    <!-- Header Section -->
                    <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
                        <tr>
                            <td style="padding: 40px 30px; text-align: center;">
                                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">✅</div>
                                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Siparişiniz Onaylandı!</h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Siparişiniz başarıyla onaylandı ve işleme alındı</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Content Section -->
                    <table style="width: 100%; background-color: #ffffff;">
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Sayın {{ $musteri_ad_soyad }}, 👋</h2>
                                <div style="width: 60px; height: 3px; background: #f97316; margin: 0 0 30px; border-radius: 2px;"></div>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #dcfce7; padding: 25px; border-radius: 8px; border-left: 4px solid #16a34a;">
                                            <p style="margin: 0; color: #166534; font-size: 16px; line-height: 1.7;">
                                                🎉 Harika haber! Siparişiniz onaylandı ve hazırlık sürecine alındı. En kısa sürede kargoya teslim edeceğiz.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Order Status Timeline -->
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                            <h3 style="color: #1f2937; margin: 0 0 20px; font-size: 18px;">📊 Sipariş Durumu</h3>
                                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                                <div style="width: 20px; height: 20px; background: #16a34a; border-radius: 50%; margin-right: 15px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 12px;">✓</div>
                                                <span style="color: #16a34a; font-weight: 600;">Sipariş Onaylandı</span>
                                                <span style="color: #64748b; margin-left: 10px; font-size: 14px;">{{ $siparis_tarih }}</span>
                                            </div>
                                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                                <div style="width: 20px; height: 20px; background: #f97316; border-radius: 50%; margin-right: 15px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 12px;">2</div>
                                                <span style="color: #f97316; font-weight: 600;">Hazırlanıyor</span>
                                            </div>
                                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                                <div style="width: 20px; height: 20px; background: #e5e7eb; border-radius: 50%; margin-right: 15px; display: inline-flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">3</div>
                                                <span style="color: #9ca3af;">Kargoya Verilecek</span>
                                            </div>
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 20px; height: 20px; background: #e5e7eb; border-radius: 50%; margin-right: 15px; display: inline-flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">4</div>
                                                <span style="color: #9ca3af;">Teslim Edildi</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                            <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">📋 Sipariş Detayları</h3>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş No:</strong> {{ $siparis_numara }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Tarihi:</strong> {{ $siparis_tarih }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Durumu:</strong> <span style="color: #16a34a; font-weight: 600;">{{ $siparis_durumu }}</span></p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Toplam Tutar:</strong> <span style="color: #f97316; font-weight: 600;">{{ $siparis_toplam }} {{ $para_birimi }}</span></p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Ödeme Yöntemi:</strong> {{ $odeme_yontem }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Ödeme Durumu:</strong> <span style="color: #16a34a; font-weight: 600;">{{ $odeme_durum }}</span></p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Tahmini Teslimat:</strong> {{ $teslimat_tarihi }}</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Order Items Table -->
                                <table style="width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                                    <thead>
                                        <tr style="background: #f8fafc;">
                                            <th style="padding: 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">🛒 Ürün</th>
                                            <th style="padding: 16px; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Adet</th>
                                            <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Birim Fiyat</th>
                                            <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Toplam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($siparis_urunler as $urun)
                                        <tr>
                                            <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #374151;">{{ $urun["name"] }}</td>
                                            <td style="padding: 12px 16px; text-align: center; border-bottom: 1px solid #f1f5f9; color: #374151;">{{ $urun["quantity"] }}</td>
                                            <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #f1f5f9; color: #374151;">{{ $urun["unit_price"] }} {{ $para_birimi }}</td>
                                            <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #374151;">{{ $urun["price"] }} {{ $para_birimi }}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                    <tfoot>
                                        <tr style="background: #fef3e2;">
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;" colspan="3">Genel Toplam:</td>
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;">{{ $siparis_toplam }} {{ $para_birimi }}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <!-- Delivery Address -->
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                                            <h3 style="color: #0c4a6e; margin: 0 0 15px; font-size: 18px;">🚚 Teslimat Adresi</h3>
                                            <p style="margin: 0; color: #0c4a6e; line-height: 1.6;">
                                                <strong>{{ $musteri_ad_soyad }}</strong><br>
                                                {{ $teslimat_adresi }}<br>
                                                {{ $ilce }} / {{ $il }}<br>
                                                {{ $posta_kodu }}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Action Button -->
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="text-align: center;">
                                            <a href="{{ $tracking_url }}" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);">
                                                🔍 Siparişimi Takip Et
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                                            <h3 style="color: #92400e; margin: 0 0 15px; font-size: 18px;">💡 Önemli Bilgiler</h3>
                                            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                                                <li style="margin-bottom: 8px;">Siparişinizin durumu değiştiğinde size bilgilendirme e-postası göndereceğiz</li>
                                                <li style="margin-bottom: 8px;">Kargo takip numaranız kargoya verildiğinde size iletilecektir</li>
                                                <li style="margin-bottom: 8px;">Teslimat süresi 2-5 iş günü arasındadır</li>
                                                <li>Herhangi bir sorunuz varsa {{ $iletisim_email }} adresinden bize ulaşabilirsiniz</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 30px 0 10px; color: #64748b; font-size: 15px;">
                                    {{ $site_ad }} ailesine katıldığınız için teşekkür ederiz. Siparişinizle ilgili güncellemeleri size bildireceğiz.
                                </p>
                                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                                    {{ $saygilar }},<br>
                                    <span style="color: #f97316;">{{ $site_ad }} Ekibi</span> 💜
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer -->
                    <table style="width: 100%; background-color: #f8fafc;">
                        <tr>
                            <td style="padding: 30px; text-align: center;">
                                <img style="width: 120px; max-width: 120px; height: auto; margin-bottom: 15px;" alt="{{ $site_ad }} Logo" src="{{ $logo_url }}">
                                <p style="margin: 0 0 10px; font-size: 14px; color: #64748b;">
                                    <strong>{{ $site_ad }}</strong><br>
                                    {{ $site_adres }}<br>
                                    Tel: {{ $site_telefon }} | E-posta: {{ $site_email }}
                                </p>
                                <p style="margin: 0; font-size: 12px; color: #64748b;">{{ $copyright }}</p>
                                <div style="margin-top: 15px;">
                                    <a href="{{ $site_url }}" style="color: #f97316; text-decoration: none; margin: 0 10px;">🌐 Web Sitesi</a>
                                    <a href="{{ $iletisim_email }}" style="color: #f97316; text-decoration: none; margin: 0 10px;">📧 İletişim</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>