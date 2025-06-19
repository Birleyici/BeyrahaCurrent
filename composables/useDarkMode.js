export const useDarkMode = () => {
  const isDark = useState('darkMode', () => false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateDarkMode();
  };

  const setDarkMode = (value) => {
    isDark.value = value;
    updateDarkMode();
  };

  const updateDarkMode = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  };

  const initDarkMode = () => {
    if (process.client) {
      // Önce localStorage'dan oku
      const stored = localStorage.getItem('darkMode');
      
      if (stored !== null) {
        // localStorage'da kayıtlı ayar varsa onu kullan
        isDark.value = stored === 'true';
      } else {
        // Yoksa sistem tercihini kontrol et
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      updateDarkMode();
    }
  };

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  };
}; 