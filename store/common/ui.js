import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    menuSlide: false,
    cartSlide: false,
    accountSlide: false,
  }),
  actions: {
    closeAll() {
      for (const key in this.$state) {
        if (this.$state.hasOwnProperty(key)) {
          this.$state[key] = false;
        }
      }
    }
  },
})
