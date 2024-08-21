import { useAuthStore } from "~/store/common/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
 

})
