<template>
  <div class="overflow-x-auto w-full py-4 lg:py-0">
    <div
      class="flex lg:block whitespace-nowrap lg:space-y-2 space-x-minimal lg:space-x-0 lg:border-l-8 lg:border-tertiary-100"
    >
      <div
        class="flex items-center cursor-pointer hover:rounded lg:hover:rounded-r-full duration-300 hover:bg-slate-100 p-2"
      >
        <Icon name="mdi:cart" class="w-5 h-5"></Icon>
        <p>Siparişlerim</p>
      </div>
      <div
        class="flex items-center cursor-pointer hover:rounded lg:hover:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-full lg:rounded-r-full bg-slate-100"
      >
        <Icon name="mdi:paper" class="w-5 h-5"></Icon>
        <p>Adreslerim</p>
      </div>
      <div
        class="flex items-center cursor-pointer hover:rounded lg:hover:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-r-full"
      >
        <Icon name="mdi:account" class="w-5 h-5"></Icon>
        <p>Hesap ayarları</p>
      </div>
      <div
        class="flex items-center cursor-pointer hover:rounded lg:hover:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-r-full"
      >
        <Icon name="mdi:logout" class="w-5 h-5"></Icon>
        <p>Çıkış yap</p>
      </div>
    </div>
  </div>
</template>
