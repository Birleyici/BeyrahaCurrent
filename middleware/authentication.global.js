import { useAuthStore } from "~/store/common/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (import.meta.server) return

  const protectedRoutes = ['/hesap', '/management'];

  // Eğer rota yolu belirtilen rotalarla başlıyorsa kontrol yap
  if (protectedRoutes.some(route => to.path.startsWith(route))) {
    if (!authStore.token) {
      return navigateTo(`/auth?callback=${from.fullPath}`)
    }
  }
})
