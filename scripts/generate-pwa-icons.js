const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// PWA için gerekli ikon boyutları
const sizes = [
  { size: 144, name: 'pwa-144x144.png' },
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 72, name: 'pwa-72x72.png' },
  { size: 96, name: 'pwa-96x96.png' },
  { size: 128, name: 'pwa-128x128.png' },
  { size: 256, name: 'pwa-256x256.png' },
  { size: 384, name: 'pwa-384x384.png' }
];

async function generatePwaIcons() {
  const inputPath = path.join(__dirname, '../public/logo-for-light.png');
  const outputDir = path.join(__dirname, '../public');

  // Kaynak dosyasının varlığını kontrol et
  if (!fs.existsSync(inputPath)) {
    console.error('❌ logo-for-light.png dosyası bulunamadı!');
    return;
  }

  console.log('🎨 PWA ikonları oluşturuluyor...');

  try {
    // Her boyut için ikon oluştur
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Şeffaf arka plan
        })
        .png({
          quality: 90,
          compressionLevel: 6
        })
        .toFile(outputPath);
      
      console.log(`✅ ${name} oluşturuldu (${size}x${size})`);
    }

    // Favicon için 32x32 ve 16x16 oluştur
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    await sharp(inputPath)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    console.log('✅ favicon-32x32.png oluşturuldu');
    console.log('✅ favicon-16x16.png oluşturuldu');

    // Apple touch icon için 180x180 oluştur
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // Apple için opak arka plan
      })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    console.log('✅ apple-touch-icon.png oluşturuldu (180x180)');

    console.log('\n🎉 Tüm PWA ikonları başarıyla oluşturuldu!');
    
  } catch (error) {
    console.error('❌ İkon oluşturma hatası:', error);
  }
}

// Script'i çalıştır
generatePwaIcons(); 