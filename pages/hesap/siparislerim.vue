<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Siparişlerim</b>
    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10 max-w-full">
      <div >
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3 mt-minimal lg:mt-0">
        <div class="space-y-minimal">
          <PartialsOrderMyOrderItem
            :open="item == 1"
            v-for="item in 4"
          ></PartialsOrderMyOrderItem>
        </div>
      </div>
    </div>
  </div>
</template>
