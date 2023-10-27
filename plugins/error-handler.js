export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error) => {
        console.error('burdaaa');

      // Diğer hatalar için genel işlemler
    });
  });