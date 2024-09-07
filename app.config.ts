export default defineAppConfig({
ui: {
    input: {
      variant: {
        custom: 'shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400'
      },
      default: {
        variant: 'custom',
      },
    }
  },
})
