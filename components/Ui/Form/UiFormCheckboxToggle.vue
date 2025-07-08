<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" class="sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 border-none after:border-none before:border-none peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-500">
    </div>
    <span class="ml-3 text-sm font-medium text-gray-900">
      <slot></slot>
    </span>
  </label>
</template>
