import { callWithNuxt, useNuxtApp } from '#app'
export default defineNuxtRouteMiddleware(async (to) => {
    // It's important to do this as early as possible
    const nuxtApp = useNuxtApp()

    if (useRoute().fullPath.startsWith('/management') && !useRoute().fullPath.startsWith('/management/login')) {

        const { status, signIn } = useAuth()

        // Return immediately if user is already authenticated
        if (status.value === 'unauthenticated') {
            return navigateTo(process.env.AUTH_ORIGIN + '/management/login', {external:true})


        }
    }




})