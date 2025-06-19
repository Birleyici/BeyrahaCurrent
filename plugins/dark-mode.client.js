export default defineNuxtPlugin(() => {
  // Dark mode'u sayfa yüklenmeden önce uygula (FOUC'u önlemek için)
  if (process.client) {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = stored !== null ? stored === 'true' : prefersDark;
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}); 