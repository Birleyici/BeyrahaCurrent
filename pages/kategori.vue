<template>
  <div class="px-x-mobil lg:px-x-desktop lg:grid grid-cols-10 gap-5">
    <div class="col-span-2">
      <b>Filtreler</b>
      <div class="rounded-md bg-white pt-minimal w-full">
        <div class="border py-2 px-4 bg-tertiary-50 rounded-t-md font-medium">Marka</div>
        <div class="p-4 border-l border-r border-b rounded-b-md grid gap-2">
          <UiFormCheckbox v-for="item in 4">Marka {{ item }}</UiFormCheckbox>
        </div>
      </div>
    </div>
    <div class="col-span-8">
      <!-- içerik -->
    </div>
  </div>
</template>
