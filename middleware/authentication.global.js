import { useAuthStore } from "~/store/common/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Server-side rendering sırasında çalışmasın
  if (import.meta.server) return

  const protectedRoutes = ['/hesap', '/management'];
  
  // Login sayfalarını middleware'den muaf tut
  const authPages = ['/auth', '/management/login'];
  if (authPages.some(page => to.path.startsWith(page))) {
    return
  }

  // Protected route kontrolü
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (isProtectedRoute) {
    // Token var mı kontrol et
    if (!authStore.token) {
      console.log('No token found, redirecting to auth')
      
      // Management alanı için admin login'e yönlendir
      if (to.path.startsWith('/management')) {
        return navigateTo('/management/login')
      } else {
        return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
      }
    }

    // Token geçerliliği kontrolü
    try {
      // Eğer currentUser yoksa user fetch dene
      if (!authStore.currentUser) {
        console.log('No current user, attempting to fetch...')
        const user = await authStore.fetchUser()
        
        // User fetch başarısız olursa token geçersiz demektir
        if (!user) {
          console.log('Failed to fetch user, token might be invalid')
          if (to.path.startsWith('/management')) {
            return navigateTo('/management/login')
          } else {
            return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
          }
        }
      }

      // Management alanı için admin kontrolü
      if (to.path.startsWith('/management')) {
        const userRole = authStore.currentUser?.role
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
      
      // Auth hatası durumunda login'e yönlendir
      // State temizleme işi fetchUser içinde yapılıyor
      if (to.path.startsWith('/management')) {
        return navigateTo('/management/login')
      } else {
        return navigateTo(`/auth?callback=${encodeURIComponent(to.fullPath)}`)
      }
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
