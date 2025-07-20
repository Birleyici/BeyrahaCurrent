// YouTube URL işleme fonksiyonları

/**
 * YouTube Shorts URL'lerini düzenli YouTube URL'lerine çevirir
 * @param {string} url - Dönüştürülecek YouTube URL'i
 * @returns {string} - Dönüştürülmüş URL
 */
export const convertYouTubeShortsToWatch = (url) => {
  if (!url) return url;

  // YouTube Shorts URL'i kontrolü
  const shortsPattern = /youtube\.com\/shorts\/([^"&?\/\s]{11})/;
  const shortsMatch = url.match(shortsPattern);

  if (shortsMatch) {
    const videoId = shortsMatch[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Eğer shorts URL'i değilse orijinal URL'i döndür
  return url;
};

/**
 * YouTube URL'den video ID'sini çıkarır (shorts dahil)
 * @param {string} url - YouTube URL'i
 * @returns {string|null} - Video ID'si veya null
 */
export const extractYouTubeId = (url) => {
  if (!url) return null;

  // Önce shorts URL'ini düzenli URL'e çevir
  const convertedUrl = convertYouTubeShortsToWatch(url);

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^"&?\/\s]{11})/ // Shorts pattern
  ];

  for (const pattern of patterns) {
    const match = convertedUrl.match(pattern);
    if (match) return match[1];
  }
  return null;
};

/**
 * YouTube embed URL'i oluşturur
 * @param {string} url - YouTube URL'i
 * @param {boolean} autoplay - Otomatik oynatma açık mı
 * @returns {string|null} - Embed URL'i veya null
 */
export const getYouTubeEmbedUrl = (url, autoplay = false) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  const autoplayParam = autoplay ? '&autoplay=1' : '';
  return `https://www.youtube.com/embed/${videoId}?rel=0${autoplayParam}`;
};

/**
 * Vimeo URL'den video ID'sini çıkarır
 * @param {string} url - Vimeo URL'i
 * @returns {string|null} - Video ID'si veya null
 */
export const extractVimeoId = (url) => {
  if (!url) return null;

  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

/**
 * Vimeo embed URL'i oluşturur
 * @param {string} url - Vimeo URL'i
 * @param {boolean} autoplay - Otomatik oynatma açık mı
 * @returns {string|null} - Embed URL'i veya null
 */
export const getVimeoEmbedUrl = (url, autoplay = false) => {
  const videoId = extractVimeoId(url);
  if (!videoId) return null;

  const autoplayParam = autoplay ? '?autoplay=1' : '';
  return `https://player.vimeo.com/video/${videoId}${autoplayParam}`;
};

/**
 * Video URL'ini işler ve embed URL'i döndürür
 * @param {string} url - Video URL'i
 * @param {string} type - Video tipi (youtube, vimeo)
 * @param {boolean} autoplay - Otomatik oynatma açık mı
 * @returns {string|null} - Embed URL'i veya orijinal URL
 */
export const getVideoEmbedUrl = (url, type, autoplay = false) => {
  if (!url) return null;

  switch (type) {
    case 'youtube':
      return getYouTubeEmbedUrl(url, autoplay) || url;
    case 'vimeo':
      return getVimeoEmbedUrl(url, autoplay) || url;
    default:
      return url;
  }
}; 