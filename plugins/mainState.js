import { useMainStore } from '~/store/common/main.js'

export default defineNuxtPlugin(() => {
  const mainState = useMainStore()
  return {
    provide: {
      mainState: mainState.$state,
      changeMainState: (obj) => mainState.$patch(obj)
    }
  }
})