export const useBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.beyraha.com/'
  } else {
    return 'https://api.beyraha.com/'
  }
}
