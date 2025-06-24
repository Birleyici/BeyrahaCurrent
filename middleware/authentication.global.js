import { useAuthStore } from "~/store/common/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Server-side rendering sırasında çalışmasın
  if (import.meta.server) return

  const protectedRoutes = ['/hesap', '/management'];

  // Protected route kontrolü
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (isProtectedRoute) {
    // Token var mı kontrol et
    if (!authStore.token) {
      console.log('No token found, redirecting to auth')
      return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
    }

    // Token geçerliliği kontrolü
    try {
      // Eğer currentUser yoksa veya token geçersizse, user fetch dene
      if (!authStore.currentUser) {
        console.log('No current user, attempting to fetch...')
        await authStore.fetchUser()
      }

      // Hala user yoksa token geçersiz demektir
      if (!authStore.currentUser) {
        console.log('Failed to fetch user, token might be invalid')
        authStore.token = null
        return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
      }

      // Management alanı için admin kontrolü
      if (to.path.startsWith('/management')) {
        const userRole = authStore.currentUser?.user?.role || authStore.currentUser?.role
        if (userRole !== 'admin' && userRole !== 'vendor') {
          console.log('Insufficient permissions for management area')
          throw createError({
            statusCode: 403,
            statusMessage: 'Bu sayfaya erişim yetkiniz bulunmamaktadır.'
          })
        }
      }

    } catch (error) {
      console.error('Auth middleware error:', error)
      
      // Auth hatası durumunda token'ı temizle ve login'e yönlendir
      authStore.token = null
      authStore.currentUser = null
      
      return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
    }
  }

  // Auth sayfasındayken zaten giriş yapmışsa ana sayfaya yönlendir
  if (to.path === '/auth' && authStore.token && authStore.currentUser) {
    const callback = to.query.callback
    if (callback && typeof callback === 'string') {
      return navigateTo(decodeURIComponent(callback))
    }
    return navigateTo('/')
  }
})
