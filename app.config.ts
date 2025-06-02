export default defineAppConfig({
ui: {
    input: {
      variant: {
        custom: 'shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400'
      },
      default: {
        variant: 'custom',
      },
    },
    select: {
      variant:{
        custom:'shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-{color}-400 focus:ring-2 focus:ring-orange-500 dark:focus:ring-{color}-400'
      },
      default: {
        variant: 'custom',
      }
    },
    slideover: {
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enter: 'ease-in-out duration-500',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in-out duration-500',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0'
        }
      },
      base: 'relative flex-1 flex flex-col w-full focus:outline-none',
      background: 'bg-white dark:bg-gray-900',
      ring: 'ring-1 ring-gray-300 dark:ring-gray-700',
      rounded: '',
      padding: '',
      shadow: 'shadow-xl',
      width: 'w-screen sm:w-96',
      translate: {
        base: 'transform transition ease-in-out duration-300',
        enter: '',
        enterFrom: '',
        enterTo: '',
        leave: '',
        leaveFrom: '',
        leaveTo: ''
      },
      wrapper: 'fixed inset-0 flex z-[9999]'
    },
    modal: {
      wrapper: 'relative z-[9999999]',
      inner: 'fixed inset-0 overflow-y-auto z-[9999999]',
      container: 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 z-[9999999]',
      padding: 'p-4 sm:p-6',
      margin: 'sm:my-8',
      base: 'relative text-left rtl:text-right flex flex-col z-[9999999]',
      overlay: {
        base: 'fixed inset-0 transition-opacity z-[9999998]',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0'
        }
      },
      background: 'bg-white dark:bg-gray-900',
      ring: 'ring-1 ring-gray-300 dark:ring-gray-700',
      rounded: 'rounded-lg',
      shadow: 'shadow-xl',
      width: 'w-full sm:max-w-lg',
      height: '',
      fullscreen: 'w-screen h-screen',
      transition: {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        enterTo: 'opacity-100 translate-y-0 sm:scale-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
      }
    },
  },
})
