// findObjectIndex fonksiyonu
export function findObjectIndex(array, objectToFind, excludeKeys) {
  // Convert the objectToFind to raw data
  const rawObjectToFind = toRaw(objectToFind);

  // Filter and sort keys, then convert to a comparable string
  const filteredObjectToFind = JSON.stringify(
    Object.keys(rawObjectToFind)
      .filter(key => !excludeKeys.includes(key))
      .sort()
      .reduce((obj, key) => {
        obj[key] = rawObjectToFind[key];
        return obj;
      }, {})
  );

  // Convert array objects to raw and compare
  return array.findIndex(item => {
    const rawItem = toRaw(item);
    const filteredObj = JSON.stringify(
      Object.keys(rawItem)
        .filter(key => !excludeKeys.includes(key))
        .sort()
        .reduce((newObj, key) => {
          newObj[key] = rawItem[key];
          return newObj;
        }, {})
    );
    return filteredObj === filteredObjectToFind;
  });
}


export function formatPrice(value) {
  // Kuruşları TL'ye çevir
  const tlValue = value / 100;

  // Fiyatı formatla
  const formattedPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(tlValue);

  // TL işaretini başa ekle
  return `₺${formattedPrice.replace('₺', '').trim()}`;
}

export function calculateTotal(unitPrice, quantity) {
  // Birim fiyatı ve miktarı çarp, sonucu 1 liraya yuvarla
  const total = Math.round((unitPrice * quantity) / 100) * 100;

  // Toplam fiyatı formatla ve döndür
  return formatPrice(total);
}

export function formatDate(dateString) {
  // Tarihi Date nesnesine dönüştür
  const date = new Date(dateString);

  // Aylar Türkçe olarak
  const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  // Gün, ay, yıl ve saat/dakika bilgilerini al
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Sonucu formatla
  return `${day} ${month} ${year} - ${hours}:${minutes}`;
}


export function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  // Eğer zaman farkı 24 saatten büyükse, tam tarihi döndür
  const oneDay = 86400; // 24 saat = 86400 saniye
  if (seconds > oneDay) {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  if (interval >= 1) {
    return `${interval} yıl önce`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} ay önce`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} gün önce`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} saat önce`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} dakika önce`;
  }
  return `şimdi`;
}

export function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

