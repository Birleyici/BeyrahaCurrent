export const useDebounce = () => {
  let timeoutId = null

  const debounce = (func, delay = 300) => {
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const cancel = () => {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  return {
    debounce,
    cancel
  }
} 