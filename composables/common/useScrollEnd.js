export function useScrollEnd(elementId, callback) {
    let observer = null;

    onMounted(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        const element = document.getElementById(elementId);
        if (element) {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  callback();
                }
              });
            },
            {
              root: null, // viewport
              threshold: 0.1 // Elementin %10'u göründüğünde tetiklenecek
            }
          );
          observer.observe(element);
        }
      } else {
        console.warn('IntersectionObserver is not supported by your browser.');
      }
    });
  
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
      }
    });
  }
  