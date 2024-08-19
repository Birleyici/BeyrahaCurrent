import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import slugify from 'slugify'

export default defineNuxtPlugin(() => {
  const { public: { slugify: slugifyConfig } } = useRuntimeConfig()

  // Default to an empty object if slugifyConfig is undefined
  const extend = slugifyConfig?.extend || {}
  const defaults = slugifyConfig?.defaults || {}

  if (Object.keys(extend).length) {
    slugify.extend(extend)
  }

  return {
    provide: {
      slugify: (
        string,
        options = {}
      ) => {
        if (typeof options === 'string') {
          options = {
            replacement: options,
          }
        }
        return slugify(string, { ...defaults, ...options })
      },
    },
  }
})
