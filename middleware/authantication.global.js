export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    if (!token.value && !to.fullPath.startsWith('/management/login') && useRoute().fullPath.startsWith('/management')) {
      return navigateTo('/management/login')
    }
  })
  