import { getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Renk belirtilmeyen ürünler için siyah varyantlarına yönlendirme
  if (url.pathname === '/urun/sultanbas-carsaf-takimi') {
    return sendRedirect(event, '/urun/sultanbas-carsaf-takimi--siyah-22', 308)
  }
  if (url.pathname === '/urun/sultanbas-afgan-carsaf-takimi-lacivert') {
    return sendRedirect(event, '/urun/sultanbas-carsaf-takimi--siyah-22', 308)
  }
  if (url.pathname === '/urun/kendinden-peceli-tek-parca-suud-cilbabi-siyah') {
    return sendRedirect(
      event,
      '/urun/kendinden-peceli-tek-parca-suud-cilbabi-ozel-dikim--27',
      308
    )
  }
  if (url.pathname === '/urun/iki-katli-super-soft-pece') {
    return sendRedirect(event, '/urun/iki-katli-super-soft-pece--48', 308)
  }
  if (url.pathname === '/urun/kendinden-peceli-afgan-carsaf-takimi') {
    return sendRedirect(
      event,
      '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--siyah-37',
      308
    )
  }
  if (url.pathname === '/urun/bassiz-afgan-takimi-tunik-etek-takimi') {
    return sendRedirect(
      event,
      '/urun/bassiz-afgan-takimi-ozel-dikim--siyah-71',
      308
    )
  }
  if (url.pathname === '/urun/tek-katli-pece-siyah') {
    return sendRedirect(event, '/urun/tek-katli-pece--siyah-79', 308)
  }
  if (url.pathname === '/urun/ic-pece-siyah') {
    return sendRedirect(event, '/urun/ic-pece--siyah-88', 308)
  }
  if (url.pathname === '/urun/buyuk-boy-kolsuz-meryem-suflesi') {
    return sendRedirect(
      event,
      '/urun/buyuk-boy-kolsuz-meryem-suflesi--siyah-114',
      308
    )
  }
  if (url.pathname === '/urun/orta-boy-tek-katli-khimar-sufle') {
    return sendRedirect(
      event,
      '/urun/orta-boy-tek-katli-khimar-sufle--siyah-111',
      308
    )
  }
  if (url.pathname === '/urun/buyuk-boy-sultanbas-oval-kesim-kolsuz-sufle') {
    return sendRedirect(
      event,
      '/urun/buyuk-boy-sultanbas-kolsuz-sufle--37',
      308
    )
  }

  // Kategori yönlendirmeleri
  if (url.pathname === '/kategori/eldiven') {
    return sendRedirect(event, '/tesettur-eldiven-a57', 308)
  }
  if (url.pathname === '/kategori/ferace') {
    return sendRedirect(event, '/ferace-a52', 308)
  }
  if (url.pathname === '/kategori/carsaf') {
    return sendRedirect(event, '/carsaf-a51', 308)
  }
  if (url.pathname === '/kategori/pece') {
    return sendRedirect(event, '/pece-a56', 308)
  }
  if (url.pathname === '/kategori/esarp') {
    return sendRedirect(event, '/esarp-sal-a58', 308)
  }
  if (url.pathname === '/kategori/sufle') {
    return sendRedirect(event, '/sufle-a55', 308)
  }
  if (url.pathname === '/kategori/etek') {
    return sendRedirect(event, '/etek-a59', 308)
  }
  if (url.pathname === '/kategori/genel') {
    return sendRedirect(event, '/', 308) // Genel kategoriyi ana sayfaya yönlendirme
  }

  // Diğer yönlendirmeler
  if (url.pathname === '/urun/kare-esarp') {
    return sendRedirect(event, '/urun/kare-esarp--46', 308)
  }
  if (url.pathname === '/urun/iki-katli-arabia-pece') {
    return sendRedirect(event, '/urun/iki-katli-pece--32', 308)
  }
  if (url.pathname === '/urun/tam-klos-ferace') {
    return sendRedirect(event, '/urun/sultanbas-carsaf-takimi--7', 308)
  }
  if (url.pathname === '/urun/carsaf-eldiveni') {
    return sendRedirect(event, '/urun/carsaf-eldiveni--45', 308)
  }
  if (url.pathname === '/urun/uc-katli-peceli-khimar-sufle') {
    return sendRedirect(event, '/urun/uc-katli-peceli-khimar-sufle--34', 308)
  }
  if (url.pathname === '/urun/uc-katli-arabia-pece') {
    return sendRedirect(
      event,
      '/urun/uc-katli-kelebek-model-arabia-pece--29',
      308
    )
  }
  if (
    url.pathname === '/urun/kendinden-peceli-afgan-carsaf-takimi-kahverengi'
  ) {
    return sendRedirect(
      event,
      '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--kahverengi-59',
      308
    )
  }
  if (url.pathname === '/urun/ic-pece-lacivert') {
    return sendRedirect(event, '/urun/ic-pece--lacivert-89', 308)
  }
  if (url.pathname === '/urun/buyuk-boy-kolsuz-meryem-suflesi-lacivert') {
    return sendRedirect(
      event,
      '/urun/buyuk-boy-kolsuz-meryem-suflesi--lacivert-115',
      308
    )
  }
  if (url.pathname === '/urun/mansetli-robali-ferace-murdum') {
    return sendRedirect(event, '/urun/kat-kat-robali-soft-krep-ferace--43', 308)
  }
  if (url.pathname === '/urun/bonebas-yarasakol-ferace-lacivert') {
    return sendRedirect(
      event,
      '/urun/bonebas-yarasakol-ferace-ozel-dikim--42',
      308
    )
  }
  if (url.pathname === '/urun/yarasa-kol-ferace') {
    return sendRedirect(event, '/urun/yarasa-kol-ferace-ozel-dikim--41', 308)
  }
  if (url.pathname === '/urun/iki-katli-tam-boy-pece') {
    return sendRedirect(event, '/urun/iki-katli-pece--32', 308)
  }
  if (url.pathname === '/urun/tek-katli-pece-kahverengi') {
    return sendRedirect(event, '/urun/tek-katli-pece--kahverengi-81', 308)
  }
  if (url.pathname === '/urun/tek-katli-pece-lacivert') {
    return sendRedirect(event, '/urun/tek-katli-pece--lacivert-80', 308)
  }
  if (url.pathname === '/urun/buyuk-boy-ucgen-model-fransiz-bas-kolsuz-sufle') {
    return sendRedirect(
      event,
      '/urun/orta-boy-tek-katli-khimar-sufle--siyah-111',
      308
    )
  }
  if (url.pathname === '/urun/tekli-tek-katli-pece-yesil') {
    return sendRedirect(event, '/urun/tek-katli-pece--yesil-82', 308)
  }
  if (url.pathname === '/urun/orta-boy-sultanbas-oval-kesim-kolsuz-sufle') {
    return sendRedirect(event, '/urun/orta-boy-sultanbas-kolsuz-sufle--35', 308)
  }
  if (
    url.pathname === '/urun/orta-boy-sultanbas-oval-kesim-kolsuz-sufle-yesil'
  ) {
    return sendRedirect(event, '/urun/orta-boy-sultanbas-kolsuz-sufle--35', 308)
  }
  if (url.pathname === '/urun/kisa-boy-sultanbas-oval-kesim-kolsuz-sufle') {
    return sendRedirect(
      event,
      '/urun/kucuk-boy-sultanbas-kolsuz-sufle--36',
      308
    )
  }
  if (url.pathname === '/urun/klos-carsaf-etegi') {
    return sendRedirect(event, '/urun/klos-carsaf-etegi-ozel-dikim--47', 308)
  }
  if (url.pathname === '/urun/sultanbas-afgan-carsaf-takimi') {
    return sendRedirect(
      event,
      '/urun/sultanbas-afgan-carsaf-takimi-ozel-dikim--26',
      308
    )
  }
  if (url.pathname === '/urun/kol-gecirmeli-malika-suflesi') {
    return sendRedirect(event, '/urun/orta-boy-tek-katli-khimar-sufle--39', 308)
  }
  if (url.pathname === '/urun/iki-parca-igneli-carsafi-serif') {
    return sendRedirect(
      event,
      '/urun/tek-parca-igneli-carsafi-serif-ozel-dikim--40',
      308
    )
  }
  if (url.pathname === '/urun/orta-boy-ucgen-model-kolsuz-sufle') {
    return sendRedirect(event, '/urun/orta-boy-tek-katli-khimar-sufle--39', 308)
  }
  if (url.pathname === '/urun/ic-pece-kahverengi') {
    return sendRedirect(event, '/urun/ic-pece--kahverengi-90', 308)
  }
  if (
    url.pathname ===
    '/urun/buyuk-boy-oval-kesim-sultanbas-kolsuz-sufle-lacivert'
  ) {
    return sendRedirect(
      event,
      '/urun/buyuk-boy-sultanbas-kolsuz-sufle--37',
      308
    )
  }
  if (url.pathname === '/urun/ic-pece-yesil') {
    return sendRedirect(event, '/urun/ic-pece--yesil-91', 308)
  }
  if (url.pathname === '/urun/kat-kat-robali-soft-krep-ferace') {
    return sendRedirect(event, '/urun/kat-kat-robali-soft-krep-ferace--43', 308)
  }
  if (url.pathname === '/urun/keten-elbise-ferace') {
    return sendRedirect(event, '/urun/pileli-ipek-elbise-ferace--44', 308)
  }
  if (url.pathname === '/urun/pileli-ipek-elbise-ferace') {
    return sendRedirect(event, '/urun/pileli-ipek-elbise-ferace--44', 308)
  }
  if (url.pathname === '/urun/pileli-soft-krep-ferace-sutlu-kahve') {
    return sendRedirect(event, '/urun/pileli-ipek-elbise-ferace--44', 308)
  }
  if (url.pathname === '/urun/keten-elbise-ferace-2') {
    return sendRedirect(event, '/urun/pileli-ipek-elbise-ferace--44', 308)
  }
  if (url.pathname === '/urun/robali-ferace-siyah') {
    return sendRedirect(event, '/urun/yarasa-kol-ferace-ozel-dikim--41', 308)
  }
  if (
    url.pathname === '/urun/bassiz-afgan-takimi-tunik-etek-takimi-kahverengi'
  ) {
    return sendRedirect(
      event,
      '/urun/bassiz-afgan-takimi-ozel-dikim--siyah-71',
      308
    )
  }
  if (url.pathname === '/urun/bassiz-afgan-takimi-tunik-etek-takimi-yesil') {
    return sendRedirect(
      event,
      '/urun/bassiz-afgan-takimi-ozel-dikim--siyah-71',
      308
    )
  }
  if (url.pathname === '/urun/kat-kat-medine-ipegi-ferace') {
    return sendRedirect(event, '/urun/kat-kat-robali-soft-krep-ferace--43', 308)
  }
  if (url.pathname === '/urun/igneli-butun-tek-parca-pileli-carsaf-takimi') {
    return sendRedirect(
      event,
      '/urun/tek-parca-igneli-carsafi-serif-ozel-dikim--40',
      308
    )
  }
  if (url.pathname === '/urun/uc-katli-multi-sifon-meryem-hamra-pecesi') {
    return sendRedirect(event, '/urun/uc-katli-pece--33', 308)
  }
  if (url.pathname === '/urun/sultanbas-salvarli-carsaf-takimi') {
    return sendRedirect(
      event,
      '/urun/sultanbas-afgan-carsaf-takimi-ozel-dikim--26',
      308
    )
  }
  if (url.pathname === '/urun/salvarli-afgan-carsaf-takimi-kahverengi') {
    return sendRedirect(
      event,
      '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--kahverengi-59',
      308
    )
  }
  if (url.pathname === '/urun/uc-3-katli-firfirli-arap-tulu-arabia-pece') {
    return sendRedirect(
      event,
      '/urun/uc-katli-kelebek-model-arabia-pece--29',
      308
    )
  }
  if (url.pathname === '/urun/pratik-esarp') {
    return sendRedirect(event, '/urun/kare-esarp--46', 308)
  }
  if (url.pathname === '/urun/pratik-tek-parca-sandy-namaz-elbisesi-siyah') {
    return sendRedirect(event, '/urun/yarasa-kol-ferace-ozel-dikim--41', 308)
  }
})
