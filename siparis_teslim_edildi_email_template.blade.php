<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siparişiniz Teslim Edildi</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5;">
    <!-- Container -->
    <div style="max-width: 100%; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #f97316; color: #ffffff; text-align: center; padding: 30px 20px;">
            <div style="font-size: 32px; margin-bottom: 10px;">🎉</div>
            <h1 style="font-size: 24px; margin: 10px 0; color: #ffffff;">Siparişiniz Teslim Edildi!</h1>
            <p style="font-size: 16px; opacity: 0.9; margin: 0; color: #ffffff;">Ürünlerinizi değerlendirmeyi unutmayın!</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">

            <!-- Greeting -->
            <div style="font-size: 20px; color: #f97316; margin-bottom: 20px; font-weight: bold;">
                Sayın {{ $kullanici_adi }},
            </div>

            <!-- Success Message -->
            <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; color: #166534; border-radius: 4px;">
                🎉 Siparişiniz başarıyla teslim edildi. Ürünlerinizi değerlendirmeyi unutmayın!
            </div>

            <!-- Order Details -->
            <div style="background-color: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📋 Sipariş Detayları</h3>

                <div style="margin: 8px 0; font-size: 14px;">
                    <strong style="color: #374151;">Sipariş No:</strong> {{ $siparis_numara }}
                </div>

                <div style="margin: 8px 0; font-size: 14px;">
                    <strong style="color: #374151;">Teslim Tarihi:</strong> {{ $bugunku_tarih }}
                </div>

                <div style="margin: 8px 0; font-size: 14px;">
                    <strong style="color: #374151;">Toplam:</strong>
                    <span style="color: #f97316; font-weight: bold;">{{ $toplam_tutar }} {{ $para_birimi }}</span>
                </div>
            </div>

            <!-- Order Status -->
            <div style="background-color: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📊 Sipariş Durumu</h3>

                <div style="padding: 8px 0; font-size: 14px;">✓ Sipariş Onaylandı</div>
                <div style="padding: 8px 0; font-size: 14px;">✓ Hazırlandı</div>
                <div style="padding: 8px 0; font-size: 14px;">✓ Kargoya Verildi</div>
                <div style="padding: 8px 0; font-size: 14px; color: #16a34a; font-weight: bold;">
                    🎉 Teslim Edildi - {{ $bugunku_tarih }}
                </div>
            </div>

            <!-- Products Section -->
            <div style="margin: 30px 0;">
                <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">🛒 Ürünler</h3>

                @foreach($siparis_urunleri as $urun)
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0;">

                    <!-- Product Name -->
                    <div style="font-weight: bold; color: #f97316; font-size: 16px; margin-bottom: 8px;">
                        <a href="{{ $urun['urun_linki'] }}" style="color: #f97316; text-decoration: none;">
                            {{ $urun['urun_adi'] }}
                        </a>
                    </div>

                    <!-- Product Variation -->
                    @if($urun['varyasyon_bilgisi'])
                    <div style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">
                        {{ $urun['varyasyon_bilgisi'] }}
                    </div>
                    @endif

                    <!-- Product Details -->
                    <div style="margin: 10px 0; font-size: 14px;">
                        <div style="margin: 5px 0;">
                            <strong style="color: #374151;">Adet:</strong> {{ $urun['adet'] }}
                        </div>
                        <div style="margin: 5px 0;">
                            <strong style="color: #374151;">Fiyat:</strong>
                            <span style="font-weight: bold; color: #1f2937;">{{ $urun['fiyat'] }} {{ $para_birimi }}</span>
                        </div>
                    </div>

                    <!-- Review Button -->
                    <div style="margin-top: 15px; text-align: center;">
                        <a href="{{ $site_adresi }}/urun/{{ $urun['urun_slug'] }}?action=review"
                            style="background-color: #f97316; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-size: 14px; width: 80%; text-align: center; max-width: 200px;">
                            ⭐ Değerlendir
                        </a>
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Total Section -->
            <div style="background-color: #fef3e2; padding: 20px; border-radius: 8px; margin: 20px 0;">

                <div style="display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px;">
                    <span><strong>Kargo:</strong></span>
                    <span><strong>{{ $kargo_ucreti }} {{ $para_birimi }}</strong></span>
                </div>

                <div style="font-weight: bold; font-size: 16px; color: #f97316; border-top: 1px solid #fed7aa; padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between;">
                    <span><strong>Toplam:</strong></span>
                    <span><strong>{{ $toplam_tutar }} {{ $para_birimi }}</strong></span>
                </div>
            </div>

            <!-- Buttons Section -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="margin: 10px 0;">
                    <a href="{{ $site_adresi }}/hesap/siparislerim"
                        style="background-color: #f97316; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-size: 14px; margin: 5px; min-width: 140px; text-align: center;">
                        📦 Siparişlerim
                    </a>
                </div>
                <div style="margin: 10px 0;">
                    <a href="{{ $site_adresi }}"
                        style="background-color: #6366f1; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-size: 14px; margin: 5px; min-width: 140px; text-align: center;">
                        🛍️ Alışverişe Devam
                    </a>
                </div>
            </div>

            <!-- Important Box -->
            <div style="background-color: #fef3e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
                <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">💡 Önemli</h3>
                <p style="color: #92400e; margin: 5px 0; font-size: 14px;">• Ürünlerinizi değerlendirin!</p>
                <p style="color: #92400e; margin: 5px 0; font-size: 14px;">• Sorularınız için: {{ $iletisim_email }}</p>
            </div>

            <!-- Signature -->
            <div style="margin: 20px 0 0 0; font-size: 14px;">
                Saygılarımızla,<br>
                <strong style="color: #f97316;">{{ $site_adi }} Ekibi</strong> 💜
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            © {{ date('Y') }} {{ $site_adi }}. Tüm hakları saklıdır.
        </div>
    </div>
</body>

</html>