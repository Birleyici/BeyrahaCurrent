import { defineNuxtPlugin } from '#app'
import { useMainStore } from '~/stores/main.js'
import MobileDetect from 'mobile-detect'


export default defineNuxtPlugin((nuxtApp) => {

    const req = useRequestEvent().req
    const md = new MobileDetect(req.headers['user-agent'])
    const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
    const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
    const isDesktop = !isMobile && !isTablet

    useMainStore().isMobile = isMobile

})
