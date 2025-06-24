export function useShowElement(elementId, callback, options = {}) {
    let observer = null;
    let isProcessing = ref(false);
    let lastTriggerTime = 0;
    
    const {
      threshold = 0.1,
      debounceTime = 500,
      rootMargin = '100px' // Elementin 100px öncesinde tetiklenir
    } = options;

    const throttledCallback = () => {
      const now = Date.now();
      
      // Debounce kontrolü - çok hızlı tetiklenmeyi engeller
      if (now - lastTriggerTime < debounceTime) {
        return;
      }

      // İşlem yapılıyorsa yeni çağrı yapmayı engelle
      if (isProcessing.value) {
        return;
      }

      lastTriggerTime = now;
      isProcessing.value = true;

      // Callback'i asenkron çalıştır
      Promise.resolve(callback()).finally(() => {
        // Kısa bir süre sonra yeniden tetiklenebilir hale getir
        setTimeout(() => {
          isProcessing.value = false;
        }, 300);
      });
    };

    onMounted(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        const element = document.getElementById(elementId);
        if (element) {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  throttledCallback();
                }
              });
            },
            {
              root: null,
              threshold,
              rootMargin
            }
          );
          observer.observe(element);
        } else {
          console.warn(`Element with ID "${elementId}" not found for IntersectionObserver.`);
        }
      } else {
        console.warn('IntersectionObserver is not supported by your browser.');
      }
    });
  
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      isProcessing.value = false;
    });

    return {
      isProcessing: readonly(isProcessing)
    };
}
  