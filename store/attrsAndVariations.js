import { defineStore } from 'pinia';

export const useAttrsAndVarsState = defineStore({
    id: 'attrsAndVariations',
    state: () => ({

        attributes: [],
        variations: [],
        globalAttrs: [],
        selectedAttrObj: null
    }),
});





