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
        primary: 'black', // Siyah renk
        secondary: '#F97316', // Tailwind CSS'in orange-500 rengi
        tertiary: '#3B82F6', // Tailwind CSS'in blue-500 rengi
        quaternary: '#9CA3AF', // Gri renk, Tailwind CSS'in gray-400 rengi
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
        'primary': ['Urbanist' ], // İlk yazı tipi olarak Bebas Neue
        'secondary': ['Open Sans', 'sans-serif'], // İkinci yazı tipi olarak Open Sans
      },
    },
  },
  plugins: [],
}

