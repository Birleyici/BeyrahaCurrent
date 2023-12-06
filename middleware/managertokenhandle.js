export default defineNuxtRouteMiddleware(async (to, from) => {
  // const access_token = useCookie('manager_token')
  // if (!access_token.value && useRoute().fullPath.indexOf('login') == -1) {
  //   const headers = useRequestHeaders(['cookie'])
  //   const { data: token } = await useFetch('/api/token', { headers })
  //   access_token.value = token.value.jwt
  // }
})