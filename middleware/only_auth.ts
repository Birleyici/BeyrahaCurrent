import { useStore } from '~~/stores/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()
  console.log('store.user', store.user)
  if (!store.user) {
    if (to.path !== '/login') {
      return navigateTo({ path: '/login' }, { replace: true })
    }
    return
  }
  
})
