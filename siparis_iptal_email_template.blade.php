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
    <title>Sipariş İptal Edildi - {{ $site_adi }}</title>
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
            color: #dc3545;
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
            color: #dc3545;
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
                    <table style="width: 100%; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);">
                        <tr>
                            <td style="padding: 40px 30px; text-align: center;">
                                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">❌</div>
                                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Siparişiniz İptal Edildi</h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Siparişiniz başarıyla iptal edilmiştir</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Content Section -->
                    <table style="width: 100%; background-color: #ffffff;">
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="color: #dc3545; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Sayın {{ $musteri_adi }}, 👋</h2>
                                <div style="width: 60px; height: 3px; background: #dc3545; margin: 0 0 30px; border-radius: 2px;"></div>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #fee2e2; padding: 25px; border-radius: 8px; border-left: 4px solid #dc3545;">
                                            <p style="margin: 0; color: #991b1b; font-size: 16px; line-height: 1.7;">
                                                📋 {{ $siparis_kodu }} numaralı siparişiniz iptal edilmiştir. İade işlemi otomatik olarak başlatılmıştır.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                            <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">📋 Sipariş Detayları</h3>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş No:</strong> {{ $siparis_kodu }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Tarihi:</strong> {{ $siparis_tarihi }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">İptal Tarihi:</strong> {{ $bugunku_tarih }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Durumu:</strong> <span style="color: #dc3545; font-weight: 600;">İptal Edildi</span></p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Toplam Tutar:</strong> <span style="color: #dc3545; font-weight: 600;">{{ number_format($siparis_genel_toplam, 2, ',', '.') }} {{ $para_birimi }}</span></p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Order Items Table -->
                                <table style="width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                                    <thead>
                                        <tr style="background: #f8fafc;">
                                            <th style="padding: 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">🛒 İptal Edilen Ürünler</th>
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
                                            <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #f1f5f9; color: #374151;">{{ number_format($urun["unit_price"], 2, ',', '.') }} {{ $para_birimi }}</td>
                                            <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #374151;">{{ number_format($urun["total"], 2, ',', '.') }} {{ $para_birimi }}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                    <tfoot>
                                        <tr style="background: #fef2f2;">
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #dc3545;" colspan="3">İade Edilecek Tutar:</td>
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #dc3545;">{{ number_format($siparis_genel_toplam, 2, ',', '.') }} {{ $para_birimi }}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <!-- Refund Information -->
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #fff3cd; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                            <h3 style="color: #92400e; margin: 0 0 15px; font-size: 18px;">💰 İade Bilgileri</h3>
                                            <p style="margin: 5px 0; color: #92400e;"><strong>İade Tutarı:</strong> {{ number_format($siparis_genel_toplam, 2, ',', '.') }} {{ $para_birimi }}</p>

                                            @if(isset($odeme_durum) && $odeme_durum == 'Ödendi')
                                            <div style="background: #dcfce7; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #16a34a;">
                                                <p style="margin: 0; color: #166534; font-weight: 600;">✅ Ödeme Yapılmış Sipariş</p>
                                                <p style="margin: 5px 0 0; color: #166534;"><strong>İade Süresi:</strong> 3-7 iş günü içinde hesabınıza iade edilecektir</p>
                                                <p style="margin: 5px 0 0; color: #166534;"><strong>İade Yöntemi:</strong> Ödeme yaptığınız {{ $odeme_yontem }} kartına/hesabına iade edilecektir</p>
                                            </div>
                                            @else
                                            <div style="background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #0284c7;">
                                                <p style="margin: 0; color: #0c4a6e; font-weight: 600;">ℹ️ Ödeme Beklenen Sipariş</p>
                                                <p style="margin: 5px 0 0; color: #0c4a6e;">Henüz ödeme yapılmadığı için herhangi bir iade işlemi gerçekleştirilmeyecektir.</p>
                                                <p style="margin: 5px 0 0; color: #0c4a6e;">Sipariş iptal edildiği için ödeme talep edilmeyecektir.</p>
                                            </div>
                                            @endif

                                            <p style="margin: 10px 0 5px; color: #92400e;"><strong>İade Durumu:</strong>
                                                @if(isset($odeme_durum) && $odeme_durum == 'Ödendi')
                                                <span style="color: #f59e0b;">İşleme Alındı</span>
                                                @else
                                                <span style="color: #64748b;">İade Gerektirmiyor</span>
                                                @endif
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Contact Information -->
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #e7f3ff; padding: 25px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                                            <h3 style="color: #0c4a6e; margin: 0 0 15px; font-size: 18px;">🤝 Yardıma mı ihtiyacınız var?</h3>
                                            <p style="margin: 0; color: #0c4a6e; line-height: 1.6;">
                                                Herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.<br>
                                                <strong>E-posta:</strong> {{ $site_email }}<br>
                                                <strong>Telefon:</strong> {{ $site_telefon }}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #fef2f2; padding: 25px; border-radius: 8px; border-left: 4px solid #dc3545;">
                                            <h3 style="color: #991b1b; margin: 0 0 15px; font-size: 18px;">💡 Önemli Bilgiler</h3>
                                            <ul style="margin: 0; padding-left: 20px; color: #991b1b;">
                                                @if(isset($odeme_durum) && $odeme_durum == 'Ödendi')
                                                <li style="margin-bottom: 8px;">✅ İade işlemi otomatik olarak başlatılmıştır</li>
                                                <li style="margin-bottom: 8px;">💳 İade tutarı 3-7 iş günü içinde ödeme yaptığınız kart/hesaba yansıyacaktır</li>
                                                <li style="margin-bottom: 8px;">📧 İade işlemi tamamlandığında bilgilendirme e-postası alacaksınız</li>
                                                <li style="margin-bottom: 8px;">🏦 Banka işlem süreçleri nedeniyle iade süresi değişiklik gösterebilir</li>
                                                @else
                                                <li style="margin-bottom: 8px;">ℹ️ Henüz ödeme yapılmadığı için iade işlemi gerektirmemektedir</li>
                                                <li style="margin-bottom: 8px;">🚫 Sipariş iptal edildiği için ödeme talep edilmeyecektir</li>
                                                <li style="margin-bottom: 8px;">✅ Herhangi bir ek işlem yapmanız gerekmemektedir</li>
                                                @endif
                                                <li>📞 Herhangi bir sorunuz varsa {{ $site_email }} adresinden bize ulaşabilirsiniz</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 30px 0 10px; color: #64748b; font-size: 15px;">
                                    Anlayışınız için teşekkür ederiz. İade işleminiz en kısa sürede tamamlanacaktır.
                                </p>
                                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                                    Saygılarımızla,<br>
                                    <span style="color: #dc3545;">{{ $site_adi }} Ekibi</span> 💜
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer -->
                    <table style="width: 100%; background-color: #f8fafc;">
                        <tr>
                            <td style="padding: 30px; text-align: center;">
                                <p style="margin: 0; font-size: 12px; color: #64748b;">Beyraha - Tüm hakları saklıdır.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>