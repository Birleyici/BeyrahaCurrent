<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Siparişlerim</b>

    <div class="grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10">
      <div class="col-span-1 ">
      <div class="border-l-8 border-tertiary-100 space-y-2">
        <div class="flex  items-center cursor-pointer hover:rounded-r-full duration-300 hover:bg-slate-100 space-x-4 bg-slate-100 p-2 rounded-r-full">
          <Icon name="mdi:cart" class="w-5 h-5"></Icon>
          <p>Siparişlerim</p>
        </div>
        <div class="flex  items-center cursor-pointer hover:rounded-r-full duration-300 hover:bg-slate-100 space-x-4 p-2 rounded-r-full">
          <Icon name="mdi:paper" class="w-5 h-5"></Icon>
          <p>Adreslerim</p>
        </div>
        <div class="flex  items-center cursor-pointer hover:rounded-r-full duration-300 hover:bg-slate-100 space-x-4 p-2 rounded-r-full">
          <Icon name="mdi:account" class="w-5 h-5"></Icon>
          <p>Hesap ayarları</p>
        </div>
        <div class="flex  items-center cursor-pointer hover:rounded-r-full duration-300 hover:bg-slate-100 space-x-4 p-2 rounded-r-full">
          <Icon name="mdi:logout" class="w-5 h-5"></Icon>
          <p>Çıkış yap</p>
        </div>
      </div>
       
      </div>
      <div class="col-span-3">
        <div class="space-y-minimal ">
          <PartialsOrderMyOrderItem
            :open="item == 1"
            v-for="item in 4"
          ></PartialsOrderMyOrderItem>
        </div>
      </div>
    </div>
  </div>
</template>
