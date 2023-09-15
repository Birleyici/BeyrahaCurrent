<template>
    <div class="relative inline-flex items-center">
      <input type="checkbox" class="hidden" id="customCheckbox" />
      <label
        for="customCheckbox"
        class="flex items-center space-x-2 cursor-pointer"
      >
        <div>
          <span
          class="block w-5 h-5 border-2 border-gray-300 rounded-md relative"
        >
          <Icon
            name="material-symbols:fitbit-check-small-rounded"
            class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0"
          ></Icon>
        </span>
        </div>
        <span class="text-gray-700 no-select text-sm"><slot></slot></span>
      </label>
    </div>
  </template>
  
  <style>
  #customCheckbox:checked + label span:first-child svg {
    opacity: 1;
  }
  
  #customCheckbox:checked + label span:first-child {
    background-color: #F97316; /* bg-secondary-500 */
  }
  </style>
  