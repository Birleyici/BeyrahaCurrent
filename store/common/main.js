import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isOpenSearch: false,
    isLoaded: false
  })
})
