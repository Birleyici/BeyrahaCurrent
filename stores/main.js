import { defineStore } from 'pinia';

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        isMobile: false,
        isOpenSearch: false,
        isLoaded: false,
        headers: {
            Authorization: null
        }
    }),
    actions: {
        async returnHeader() {

            const headers = useRequestHeaders(['cookie'])
            const { data } = await useFetch('/api/token', { headers, cache: 'no-cache' })

            return { Authorization: `Bearer ${data.token}`  };
        },

    }


});





