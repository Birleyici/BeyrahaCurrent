import { useUIStore } from '~/store/common/ui.js'

export default defineNuxtPlugin(() => {
    const uiStore = useUIStore()
    return {
        provide: {
            uiStore: {
                state: uiStore.$state,
                closeAll: () => {
                    uiStore.closeAll()
                }
            },

        }
    }
})