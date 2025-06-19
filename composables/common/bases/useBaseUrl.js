export const useBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://localhost/api/'
  } else {
    return 'http://localhost/api/'
  }
}
