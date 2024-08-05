export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth.token')
    if(token.value){
      useNuxtApp().$changeMainState({isAuthenticate: true})
    } else {
      useNuxtApp().$changeMainState({isAuthenticate: false})
    }
    // if (!token.value && !to.fullPath.startsWith('/management/login') && useRoute().fullPath.startsWith('/management')) {
    //   return navigateTo('/management/login')
    // }
  })
  