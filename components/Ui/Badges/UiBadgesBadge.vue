<template>
  <div
    class="bg-slate-100 rounded-full pl-2 pr-1 py-1 lg:!p-2 text-xs lg:text-sm flex items-center space-x-2"
  >
    <span><slot></slot></span>
    <button class="rounded-full bg-slate-300 w-5 h-5 flex items-center justify-center">
      <Icon name="mdi:close"></Icon>
    </button>
  </div>
</template>
