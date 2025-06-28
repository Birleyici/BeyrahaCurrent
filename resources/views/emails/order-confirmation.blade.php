<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Sipariş Onayı</title>
    <style type="text/css">
        table.container {
            min-width: 600px !important;
            width: 600px !important;
        }

        @media only screen and (max-width: 620px) {
            .container {
                width: 100% !important;
                min-width: 100% !important;
            }

            .mobile-padding {
                padding: 20px !important;
            }

            .mobile-center {
                text-align: center !important;
            }

            h1 {
                font-size: 24px !important;
            }

            h2 {
                font-size: 18px !important;
            }

            .mobile-hide {
                display: none !important;
            }
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
                    <!-- Logo Container -->
                    <table style="width: 100%; background-color: #ffffff;">
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <img style="width: 120px; max-width: 120px; height: auto;" alt="{{ $site_ad }} Logo" src="https://www.beyraha.com/logo-for-light.png">
                            </td>
                        </tr>
                    </table>

                    <!-- Header Section -->
                    <table style="width: 100%; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
                        <tr>
                            <td style="padding: 40px 30px; text-align: center;" class="mobile-padding">
                                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">📦</div>
                                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Siparişiniz Alındı!</h1>
                            </td>
                        </tr>
                    </table>

                    <!-- Content Section -->
                    <table style="width: 100%; background-color: #ffffff;">
                        <tr>
                            <td style="padding: 40px 30px;" class="mobile-padding">
                                <h2 style="color: #f97316; margin: 0 0 15px; font-size: 24px; font-weight: 600;">Merhaba {{ $musteri_ad_soyad }}! 👋</h2>
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
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş No:</strong> #{{ $siparis_numara }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Sipariş Tarihi:</strong> {{ $siparis_tarih }}</p>
                                            <p style="margin: 5px 0; color: #64748b;"><strong style="color: #1f2937;">Toplam Tutar:</strong> <span style="color: #f97316; font-weight: 600;">{{ $siparis_toplam }}</span></p>
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
                                        @foreach($siparis_urunler as $urun)
                                        <tr>
                                            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #374151;">{{ $urun['name'] }}</td>
                                            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">{{ $urun['quantity'] }}</td>
                                            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151; font-weight: 600;">{{ $urun['total'] }} TL</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                    <tfoot>
                                        <tr style="background: #fef3e2;">
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;" colspan="2">Genel Toplam:</td>
                                            <td style="padding: 16px; text-align: right; font-weight: 700; color: #f97316;">{{ $siparis_genel_toplam }}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                @if($odeme_yontem === 'Havale/EFT')
                                <table style="width: 100%; margin: 30px 0;">
                                    <tr>
                                        <td style="background: #fef3e2; padding: 25px; border-radius: 8px; border-left: 4px solid #f97316;">
                                            <h3 style="color: #92400e; margin: 0 0 15px; font-size: 18px;">💳 Ödeme Bilgileri</h3>
                                            <p style="margin: 0 0 10px; color: #92400e; font-size: 14px;">
                                                <strong>Havale/EFT bilgileri:</strong>
                                            </p>
                                            <div style="background: #ffffff; padding: 15px; border-radius: 6px; margin: 10px 0;">
                                                <p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Banka:</strong> {{ $banka_ad }}</p>
                                                <p style="margin: 5px 0; color: #374151; font-size: 14px; word-break: break-all;"><strong>IBAN:</strong> {{ $banka_iban }}</p>
                                                <p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Hesap Sahibi:</strong> {{ $banka_hesap_sahibi }}</p>
                                                <p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Açıklama:</strong> Sipariş No: #{{ $siparis_numara }}</p>
                                            </div>
                                            <p style="margin: 0; color: #92400e; font-size: 13px;">
                                                ⚠️ Havale/EFT yaparken mutlaka sipariş numaranızı açıklama kısmına yazınız.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                @endif

                                <p style="margin: 30px 0 10px; color: #64748b; font-size: 15px;">
                                    Siparişinizle ilgili güncellemeleri size bildireceğiz.
                                </p>
                                <p style="margin: 0; color: #1f2937; font-weight: 600;">
                                    <span style="color: #f97316;">{{ $site_ad }} Ekibi</span> 💜
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer -->
                    <table style="width: 100%; background-color: #f8fafc;">
                        <tr>
                            <td style="padding: 30px; text-align: center;">
                                <img style="width: 100px; max-width: 100px; height: auto; margin-bottom: 15px;" alt="{{ $site_ad }} Logo" src="https://www.beyraha.com/logo-for-light.png">
                                <p style="margin: 0; font-size: 12px; color: #64748b;">© 2025 {{ $site_ad }}. Tüm hakları saklıdır.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>