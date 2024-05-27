import { defineStore } from 'pinia';

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        isMobile: false,
        isOpenSearch: false,
        isLoaded: false,
        token: null
        
    }),


});





