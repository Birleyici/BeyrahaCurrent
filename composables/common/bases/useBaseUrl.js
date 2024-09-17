export const useBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.beyraha.com/api/'
  } else {
    return 'http://localhost/laravel-api/public/api/'
  }
}
