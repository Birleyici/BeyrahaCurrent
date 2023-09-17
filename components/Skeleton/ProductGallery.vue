<template>
  <div class="col-span-3">
    <div class="min-w-full h-[500px] bg-tertiary-100 rounded-md animate-pulse"></div>
    <div class="flex">
      <SkeletonUiThumb v-for="item in 3"></SkeletonUiThumb>
    </div>
  </div>
</template>
