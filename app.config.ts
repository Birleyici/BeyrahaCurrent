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
          outline: 'shadow-sm bg-white dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        },
        orange: {
          outline: 'shadow-sm bg-white dark:bg-gray-800 ring-1 ring-orange-200 dark:ring-orange-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        },
        gray: {
          outline: 'shadow-sm bg-gray-50 dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        }
      },
      variant: {
        outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      icon: {
        base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
        color: 'text-orange-500 dark:text-orange-400',
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
    textarea: {
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
      form: 'form-textarea',
      rounded: 'rounded-xl',
      placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
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
      color: {
        white: {
          outline: 'shadow-sm bg-white dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        },
        orange: {
          outline: 'shadow-sm bg-white dark:bg-gray-800 ring-1 ring-orange-200 dark:ring-orange-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        },
        gray: {
          outline: 'shadow-sm bg-gray-50 dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0'
        }
      },
      variant: {
        outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-offset-0',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      default: {
        size: 'lg',
        color: 'white',
        variant: 'outline'
      }
    },
    select: {
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
      form: 'form-select',
      rounded: 'rounded-xl',
      placeholder: 'text-gray-400 dark:text-gray-500',
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs', 
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      gap: {
        '2xs': 'gap-1',
        xs: 'gap-1.5',
        sm: 'gap-1.5', 
        md: 'gap-2',
        lg: 'gap-2',
        xl: 'gap-2.5'
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
          outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400'
        }
      },
      variant: {
        outline: 'shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400',
        custom: 'shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-400 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400'
      },
      icon: {
        base: 'flex-shrink-0 text-gray-400',
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
        variant: 'outline',
        loadingIcon: 'i-heroicons-arrow-path-20-solid',
        trailingIcon: 'i-heroicons-chevron-down-20-solid'
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
 
    button: {
      base: 'flex items-center justify-center focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
      font: 'font-medium',
      rounded: 'rounded-xl',
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      gap: {
        '2xs': 'gap-x-1',
        xs: 'gap-x-1.5',
        sm: 'gap-x-1.5',
        md: 'gap-x-2',
        lg: 'gap-x-2',
        xl: 'gap-x-2.5'
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-3 py-2',
        md: 'px-3 py-2.5',
        lg: 'px-4 py-3.5',
        xl: 'px-4 py-4'
      },
      square: {
        '2xs': 'p-1',
        xs: 'p-1.5',
        sm: 'p-2',
        md: 'p-2.5',
        lg: 'p-3.5',
        xl: 'p-4'
      },
      color: {
        white: {
          solid: 'shadow-sm ring-1 ring-inset ring-gray-300 text-gray-900 bg-white hover:bg-gray-50 disabled:bg-white focus-visible:ring-2 focus-visible:ring-secondary-500',
          ghost: 'text-gray-900 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-500 dark:text-white dark:hover:bg-gray-900'
        },
        gray: {
          solid: 'shadow-sm ring-1 ring-inset ring-gray-300 text-gray-900 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 focus-visible:ring-2 focus-visible:ring-secondary-500',
          ghost: 'text-gray-900 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-500 dark:text-white dark:hover:bg-gray-900',
          soft: 'text-gray-500 bg-gray-50 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-500 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800'
        },
        black: {
          solid: 'shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500',
          soft: 'text-gray-900 bg-gray-50 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800'
        }
      },
      variant: {
        solid: 'shadow-sm text-white bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 focus-visible:ring-2 focus-visible:ring-{color}-500',
        outline: 'ring-1 ring-inset ring-current text-{color}-500 hover:bg-{color}-50 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:hover:bg-{color}-950',
        soft: 'text-{color}-500 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:bg-{color}-950 dark:hover:bg-{color}-900',
        ghost: 'text-{color}-500 hover:bg-{color}-50 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:hover:bg-{color}-950',
        link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 underline-offset-4 hover:underline'
      },
      icon: {
        base: 'flex-shrink-0',
        size: {
          '2xs': 'h-4 w-4',
          xs: 'h-4 w-4',
          sm: 'h-5 w-5',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6'
        }
      },
      default: {
        size: 'lg',
        variant: 'solid',
        color: 'secondary',
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      }
    },
    card: {
      base: 'overflow-hidden',
      background: 'bg-white dark:bg-gray-900',
      divide: 'divide-y divide-gray-200 dark:divide-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      rounded: 'rounded-xl',
      shadow: 'shadow-soft',
      body: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:p-6'
      },
      header: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:px-6'
      },
      footer: {
        base: '',
        background: '',
        padding: 'px-4 py-4 sm:px-6'
      }
    },
    formGroup: {
      wrapper: '',
      inner: '',
      label: {
        base: 'block font-medium text-gray-700 dark:text-gray-200',
        required: "after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"
      },
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      container: 'mt-1 relative',
      description: 'text-gray-500 dark:text-gray-400',
      hint: 'text-gray-500 dark:text-gray-400',
      help: 'mt-2 text-gray-500 dark:text-gray-400',
      error: 'mt-2 text-red-500 dark:text-red-400',
      default: {
        size: 'lg'
      }
    },
  },
})
