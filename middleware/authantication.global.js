export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth.token')
    if(token.value){
      useNuxtApp().$changeMainState({isAuthenticated: true})
    } else {
      useNuxtApp().$changeMainState({isAuthenticated: false})
    }
    // if (!token.value && !to.fullPath.startsWith('/management/login') && useRoute().fullPath.startsWith('/management')) {
    //   return navigateTo('/management/login')
    // }
  })
  