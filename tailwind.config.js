/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f9fafb',  // gray-50
          '100': '#f3f4f6', // gray-100
          '200': '#e5e7eb', // gray-200
          '300': '#d1d5db', // gray-300
          '400': '#9ca3af', // gray-400
          '500': '#6b7280', // gray-500 (Default)
          '600': '#4b5563', // gray-600
          '700': '#374151', // gray-700
          '800': '#1f2937', // gray-800
          '900': '#111827', // gray-900
        },
        'secondary': {
          '50': '#fff7ed',  // orange-50
          '100': '#ffedd5', // orange-100
          '200': '#fed7aa', // orange-200
          '300': '#fdba74', // orange-300
          '400': '#fb923c', // orange-400
          '500': '#f97316', // orange-500 (Default)
          '600': '#ea580c', // orange-600
          '700': '#c2410c', // orange-700
          '800': '#9a3412', // orange-800
          '900': '#7c2d12', // orange-900
        },
        'tertiary': {
          '50': '#f8fafc',  // slate-50
          '100': '#f1f5f9', // slate-100
          '200': '#e2e8f0', // slate-200
          '300': '#cbd5e1', // slate-300
          '400': '#94a3b8', // slate-400
          '500': '#64748b', // slate-500 (Default)
          '600': '#475569', // slate-600
          '700': '#334155', // slate-700
          '800': '#1e293b', // slate-800
          '900': '#0f172a', // slate-900
        },
        'quaternary': {
          '50': '#f9fafb',  // gray-50
          '100': '#f3f4f6', // gray-100
          '200': '#e5e7eb', // gray-200
          '300': '#d1d5db', // gray-300
          '400': '#9ca3af', // gray-400
          '500': '#6b7280', // gray-500 (Default)
          '600': '#4b5563', // gray-600
          '700': '#374151', // gray-700
          '800': '#1f2937', // gray-800
          '900': '#111827', // gray-900
        },

      },
      spacing: {
        'section-desktop': '100px', // Y ekseninde masaüstü bölüm aralığı
        'section-mobil': '50px',  // Y ekseninde mobil bölüm aralığı
        'x-desktop': '100px', // X ekseninde masaüstü kenar boşluğu
        'x-mobil': '25px',  // X ekseninde mobil kenar boşluğu
        'minimal': '20px',
      },
      borderColor: {
        'primary': 'black', // Normal durum için birincil kenarlık rengi
        'hover': '#F97316',   // Hover durumu için kenarlık rengi
      },
      fontSize: {
        'heading-1': '2rem', // Başlık 1 için yazı boyutu
        'heading-2': '1.5rem', // Başlık 2 için yazı boyutu
        'heading-3': '1.25rem', // Başlık 3 için yazı boyutu
      },
      fontFamily: {
        'primary': ['Urbanist'], // İlk yazı tipi olarak Bebas Neue
        'secondary': ['Open Sans', 'sans-serif'], // İkinci yazı tipi olarak Open Sans
      },
    },
  },
  plugins: [],
}

