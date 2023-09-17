<template>
  <div class="overflow-x-auto w-full py-4 lg:py-0">
    <div
      class="flex lg:block whitespace-nowrap lg:space-y-2 space-x-minimal lg:space-x-0 lg:border-l-8 lg:border-tertiary-100"
    >
      <NuxtLink to="/hesap/siparislerim">
        <div
        class="flex items-center space-x-2 cursor-pointer  lg:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-full lg:rounded-l-none "
          :class="{'bg-slate-100': useRoute().fullPath == '/hesap/siparislerim'}"
        
        >
          <Icon name="mdi:cart" class="w-5 h-5"></Icon>
          <p>Siparişlerim</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/hesap/adreslerim">
        <div
          class="flex items-center space-x-2 cursor-pointer  lg:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-full lg:rounded-l-none "
          :class="{'bg-slate-100': useRoute().fullPath == '/hesap/adreslerim'}"
        >
          <Icon name="mdi:paper" class="w-5 h-5"></Icon>
          <p>Adreslerim</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/hesap/ayarlar">
        <div
        class="flex items-center space-x-2 cursor-pointer  lg:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-full lg:rounded-l-none "
          :class="{'bg-slate-100': useRoute().fullPath == '/hesap/ayarlar'}"
        
        >
          <Icon name="mdi:account" class="w-5 h-5"></Icon>
          <p>Hesap ayarları</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/hesap/logout">
        <div
        class="flex items-center space-x-2 cursor-pointer  lg:rounded-r-full duration-300 hover:bg-slate-100 p-2 rounded-full lg:rounded-l-none "
        >
          <Icon name="mdi:logout" class="w-5 h-5"></Icon>
          <p>Çıkış yap</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

