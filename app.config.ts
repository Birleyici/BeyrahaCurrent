export default defineAppConfig({
ui: {
    input: {
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
      form: 'form-input',
      rounded: 'rounded-xl',
      placeholder: 'placeholder-neutral-400 dark:placeholder-neutral-500',
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-3 py-2',
        md: 'px-3 py-2.5',
        lg: 'px-4 py-3.5',
        xl: 'px-4 py-4'
      },
      leading: {
        padding: {
          '2xs': 'ps-7',
          xs: 'ps-8',
          sm: 'ps-9',
          md: 'ps-10',
          lg: 'ps-11',
          xl: 'ps-12'
        }
      },
      trailing: {
        padding: {
          '2xs': 'pe-7',
          xs: 'pe-8',
          sm: 'pe-9',
          md: 'pe-10',
          lg: 'pe-11',
          xl: 'pe-12'
        }
      },
      color: {
        white: {
          outline: 'shadow-sm bg-white ring-1 ring-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-0'
        },
        orange: {
          outline: 'shadow-sm bg-white ring-1 ring-secondary-200 text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-0'
        },
        gray: {
          outline: 'shadow-sm bg-neutral-50 ring-1 ring-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-0'
        }
      },
      variant: {
        outline: 'shadow-sm bg-white text-neutral-900 ring-1 ring-inset ring-neutral-200 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-0',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      icon: {
        base: 'flex-shrink-0 text-neutral-400',
        color: 'text-secondary-500',
        size: {
          '2xs': 'h-4 w-4',
          xs: 'h-4 w-4',
          sm: 'h-5 w-5',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6'
        },
        leading: {
          wrapper: 'absolute inset-y-0 start-0 flex items-center',
          pointer: 'pointer-events-none',
          padding: {
            '2xs': 'px-2',
            xs: 'px-2.5',
            sm: 'px-3',
            md: 'px-3',
            lg: 'px-4',
            xl: 'px-4'
          }
        },
        trailing: {
          wrapper: 'absolute inset-y-0 end-0 flex items-center',
          pointer: 'pointer-events-none',
          padding: {
            '2xs': 'px-2',
            xs: 'px-2.5',
            sm: 'px-3',
            md: 'px-3',
            lg: 'px-4',
            xl: 'px-4'
          }
        }
      },
      default: {
        size: 'lg',
        color: 'white',
        variant: 'outline'
      }
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
