import { useAuthStore } from "~/store/common/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    useNuxtApp().$changeMainState({ isAuthenticated: true })
  } else {
    useNuxtApp().$changeMainState({ isAuthenticated: false })
  }
  // if (!token.value && !to.fullPath.startsWith('/management/login') && useRoute().fullPath.startsWith('/management')) {
  //   return navigateTo('/management/login')
  // }
})
