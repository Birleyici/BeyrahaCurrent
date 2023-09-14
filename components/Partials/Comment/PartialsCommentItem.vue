<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <p class="font-medium">Muhammet Ç*** Y***</p>
      <div class="flex">
        <Icon
          v-for="item in 5"
          name="material-symbols:star-rate-rounded"
          fill
          class="text-secondary-500"
        ></Icon>
      </div>
    </div>
    <div>
      <UiSlidesFullscreenSlide></UiSlidesFullscreenSlide>

      
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et odio neque, officia iste
      ratione veniam. Laboriosam possimus aut earum vero ducimus praesentium sed debitis,
      sapiente illo harum quidem magni voluptatum!
    </p>
    <p class="text-sm italic">23 Eylül 2023 tarihinde satın alındı</p>
  </div>
</template>
